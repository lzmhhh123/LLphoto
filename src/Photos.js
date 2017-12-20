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
import { Card, Divider } from 'react-native-elements';
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
      images: {}
    }
  }
  componentWillMount() {
    CameraRoll.getPhotos({ first: 1000, assetType: 'Photos' })
      .then((data) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        let images = {};
        for (let key in data['edges']) {
          console.log(data['edges'][key]['node']['timestamp']);
          let date = new Date();
          date.setTime(data['edges'][key]['node']['timestamp']);
          date = date.toString();
          console.log(date);
          if (images[date] === undefined) images[date] = [];
          images[date].push(data['edges'][key]['node']['image']['uri']);
          //array.push(data['edges'][key]['node']['image']['uri']);
          //console.log(data['edges'][key]['node']);
        }
        for (let key in images) {
          images[key] = ds.cloneWithRows(images[key]);
        }
        this.setState({images: images})
      })
  }
  renderRow(rowData) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => {console.log('onPress')}} >
        <View style={{width: cellWH, height: cellWH, marginLeft: vMargin, marginTop: hMargin, alignItems: 'center'}} >
          <Image source={{uri: rowData}} style={{height: 100, width: 100}} />
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    let { images } = this.state;
    return (
      <View style={{flex: 1}}>
        {
          (() => {
            let list = [];
            for (let key in images) {
              list.push(
                <View key={key}>
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
            list.map(data => {
              return data;
            })
          })()
        }
      </View>
    )
  }
}

// async function requestAlbumPermission() {
//   try {
//     if (PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
//         === PermissionsAndroid.RESULTS.GRANTED) {
//       CameraRoll.getPhotos({ first: 5 })
//         .then((data) => {
//           console.log(data);
//         })
//     } else {
//       const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         {
//           'title': 'LLphoto Permission',
//           'message': 'LLphoto request accessing your album.'
//         }
//       )
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         CameraRoll.getPhotos({ first: 5 })
//           .then((data) => {
//             console.log(data)
//           })
//       }
//     }
//   } catch (err) {
//     console.warn(err)
//   }
// }
// requestAlbumPermission()

// ImagePicker.openPicker({
//   width: 300,
//   height: 400,
//   cropping: true
// }).then(image => {
//   console.log(image);
// });
