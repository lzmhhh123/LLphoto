import React, {Component} from 'react';
import { View, ScrollView, ListView, CameraRoll } from 'react-native';

export default class extends Component {
  constructor() {
    super();
    CameraRoll.getPhotos({ first: 10000, assetType: 'Photos' })
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
        this.state = {
          images: images
        };
      })
  }
  render() {
    return (
      <ListView
        contentContainerStyle={{flexDirection: 'row',  flexWrap: 'wrap', alignItems: 'center'}}
        
      />
    );
  }
}
