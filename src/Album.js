import React, {Component} from 'react';
import { View, ScrollView, ListView, CameraRoll, TouchableOpacity, Image } from 'react-native';
import { Text, Badge, Card } from 'react-native-elements';
import Storage from './Storage';

const Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;
const cols = 5;
const cellWH = 70;
const vMargin = (screenW - cellWH * cols) / (cols + 1);
const hMargin = 10;

export default class extends Component {
  constructor() {
    super();
    this.state = {
      images: {}
    }
  }
  componentWillMount() {
    CameraRoll.getPhotos({ first: 1000, assetType: 'Photos' })
      .then(async (data) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        let images = {};
        for (let key in data['edges']) {
          let uri = data['edges'][key]['node']['image']['uri'];
          let obj = await Storage.get(uri).then(val => val);
          if (obj === null) continue;
          for (let i = 0; i < 3; ++i) {
            if (images[obj.tags[i]] === undefined) {
              images[obj.tags[i]] = [];
            }
            images[obj.tags[i]].push(uri);
          }
        }
        for (let key in images) {
          images[key] = ds.cloneWithRows(images[key]);
        }
        this.setState({images: images});
      })
  }
  renderRow(rowData) {
    return (
      <View style={{width: 65, height: 65, marginLeft: 10 / 3, marginTop: 10 / 3, alignItems: 'center'}} >
        <Image source={{uri: rowData}} style={{height: 65, width: 65}} />
      </View>
    );
  }
  render() {
    let list = [];
    let { images } = this.state;
    for (let key in images) {
      list.push(
        <Card title={key}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            return this.props.navigation.navigate('AlbumProfile', {
              searchText: key
            }
          )}}>
            <ListView
              contentContainerStyle={{flexDirection: 'row',  flexWrap: 'wrap', alignItems: 'center'}}
              dataSource={images[key]}
              renderRow={this.renderRow}
              enableEmptySections={true}
            />
          </TouchableOpacity>
        </Card>
      )
    }
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    list = ds.cloneWithRows(list);
    return (
      <ListView dataSource={list} renderRow={(rowData) => rowData} enableEmptySections={true} />
    );
  }
}
