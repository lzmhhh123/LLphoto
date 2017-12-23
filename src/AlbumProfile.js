import React, {Component} from 'react';
import {
  View,
  ScrollView,
  CameraRoll,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
  Text,
  ListView
} from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';
import { Card, Divider, SearchBar } from 'react-native-elements';
import Storage from './Storage';
const Dimensions = require('Dimensions');

const screenW = Dimensions.get('window').width;
const cols = 3;
const cellWH = 100;
const vMargin = (screenW - cellWH * cols) / (cols + 1);
const hMargin = 10;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Photos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: {},
    }
    this.hasItem = this.hasItem.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }
  componentWillMount() {
    CameraRoll.getPhotos({ first: 1000, assetType: 'Photos' })
      .then(async (data) => {
        let images = {};
        for (let key in data['edges']) {
          let date = new Date();
          date.setTime(data['edges'][key]['node']['timestamp'] * 1000);
          date = date.toDateString();
          let uri = data['edges'][key]['node']['image']['uri'];
          let tmp = await Storage.get(uri).then(val => val);
          if (tmp === null) continue;
          if (images[date] === undefined) images[date] = [];
          let obj = {
            uri: data['edges'][key]['node']['image']['uri'],
            tag: [tmp.tags[0], tmp.tags[1], tmp.tags[2]],
            sentence: [tmp.sentence[0], tmp.sentence[1], tmp.sentence[2]]
          }
          images[date].push(obj);
        }
        this.setState({images: images});
      })
  }
  renderRow(rowData) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => {
        return this.props.navigation.navigate('ImageProfile2', {
          tag: rowData.tag,
          discription: rowData.sentence,
          uri: rowData.uri
        }
      )}}>
        <View style={{width: cellWH, height: cellWH, marginLeft: vMargin, marginTop: hMargin, alignItems: 'center'}} >
          <Image source={{uri: rowData.uri}} style={{height: 100, width: 100}} />
        </View>
      </TouchableOpacity>
    )
  }
  hasItem(image) {
    for (let k = 0; k < image.length; k++) {
      if (image[k].tag.indexOf(this.props.navigation.state.params.searchText) >= 0) return true;
    }
    return false;
  }
  render() {
    let ttImages = {};
    for (let key in this.state.images) {
      ttImages[key] = this.state.images[key];
    }
    if (this.props.navigation.state.params.searchText !== '') {
      for (let key in ttImages) {
        if (!this.hasItem(ttImages[key])) {
          delete ttImages[key]
        }
      }
    }
    let tImages = {};
    for (let key in ttImages) {
      let tmp = [];
      if (this.props.navigation.state.params.searchText !== '') {
        tmp = ttImages[key].filter(image => image.tag.indexOf(this.props.navigation.state.params.searchText) >= 0);
      } else {
        tmp = ttImages[key];
      }
      tImages[key] = ds.cloneWithRows(tmp);
    }
    let list = [];
    for (let key in ttImages) {
      list.push(
        <View key={key} style={{marginTop: 20}}>
          <Text>{key}</Text>
          <Divider style={{backgroundColor: 'gray'}} />
          <ListView
            contentContainerStyle={{flexDirection: 'row',  flexWrap: 'wrap', alignItems: 'center'}}
            dataSource={tImages[key]}
            enableEmptySections={true}
            renderRow={this.renderRow} />
        </View>
      )
    }
    let tList = ds.cloneWithRows(list);
    return (
      <View>
        <ListView dataSource={tList} renderRow={(rowData) => rowData} enableEmptySections={true} />
      </View>
    )
  }
}
