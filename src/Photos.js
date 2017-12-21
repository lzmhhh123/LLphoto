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
import ImagePicker from 'react-native-image-picker';
const Dimensions = require('Dimensions');

const screenW = Dimensions.get('window').width;
const cols = 3;
const cellWH = 100;
const vMargin = (screenW - cellWH * cols) / (cols + 1);
const hMargin = 10;

export default class Photos extends Component {
  constructor() {
    super()
    this.state = {
      images: {},
      searchText: ''
    }
    this.renderRow = this.renderRow.bind(this);
    this.changeText = this.changeText.bind(this);
  }
  componentWillMount() {
    CameraRoll.getPhotos({ first: 1000, assetType: 'Photos' })
      .then((data) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        let images = {};
        for (let key in data['edges']) {
          let date = new Date();
          date.setTime(data['edges'][key]['node']['timestamp'] * 1000);
          date = date.toDateString();
          if (images[date] === undefined) images[date] = [];
          images[date].push(data['edges'][key]['node']['image']['uri']);
        }
        for (let key in images) {
          images[key] = ds.cloneWithRows(images[key]);
        }
        this.setState({images: images})
      })
  }
  renderRow(rowData) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => {
        return this.props.navigation.navigate('ImageProfile', {
          tag: ['1', '2', '3'],
          discription: ['lzmhhhh', 'lzmhhh123', 'lzm'],
          uri: rowData
        }
      )}}>
        <View style={{width: cellWH, height: cellWH, marginLeft: vMargin, marginTop: hMargin, alignItems: 'center'}} >
          <Image source={{uri: rowData}} style={{height: 100, width: 100}} />
        </View>
      </TouchableOpacity>
    )
  }
  changeText(text) {
    this.setState({ searchText: text });
  }
  render() {
    let { images } = this.state;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let list = [];
    for (let key in images) {
      list.push(
        <View key={key} style={{marginTop: 20}}>
          <Text>{key}</Text>
          <Divider style={{backgroundColor: 'gray'}} />
          <ListView
            contentContainerStyle={{flexDirection: 'row',  flexWrap: 'wrap', alignItems: 'center'}}
            dataSource={images[key]}
            enableEmptySections={true}
            renderRow={this.renderRow} />
        </View>
      )
    }
    list = ds.cloneWithRows(list);
    return (
      <View>
        <SearchBar lightTheme onChangeText={this.changeText} placeholder='Type here to search tag.' />
        <ListView dataSource={list} renderRow={(rowData) => rowData} enableEmptySections={true} />
      </View>
    )
  }
}
