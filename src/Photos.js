import React, {Component} from 'react';
import {
  View,
  ScrollView,
  CameraRoll,
  PermissionsAndroid
} from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';
import ImagePicker from 'react-native-image-crop-picker';

export default class Photos extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    async function requestAlbumPermission() {
      try {
        if (PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
            === PermissionsAndroid.RESULTS.GRANTED) {
          CameraRoll.getPhotos({ first: 5 })
            .then((data) => {
              console.log(data)
            })
        } else {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              'title': 'LLphoto Permission',
              'message': 'LLphoto request accessing your album.'
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            CameraRoll.getPhotos({ first: 5 })
              .then((data) => {
                console.log(data)
              })
          }
        }
      } catch (err) {
        console.warn(err)
      }
    }
    requestAlbumPermission()
  }
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>

      </ScrollView>
    )
  }
}
