import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  CameraRoll
} from 'react-native';
import {Card, Icon, Button} from 'react-native-elements';
import {BubblesLoader} from 'react-native-indicator';
import Storage from './Storage';

const fs = require('react-native-fs');
console.log(fs);

export default class extends Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    let uri = [];
    CameraRoll.getPhotos({ first: 1000, assetType: 'Photos' })
      .then( async (data) => {
        for (let i = 0; i < data.edges.length; i++) {
          let uriI = data.edges[i].node.image.uri;
          let value = await Storage.get(uriI).then(val => val);
          // console.log(uriI, value);
          if (value === null) {
            console.log('need to solve' + i);
            await fs.readFile(uriI, 'base64').then(res => {
              fetch('http://10.131.235.84:5000/upload', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: res })
              })
              .then(res => {
                let dd = JSON.parse(res._bodyText);
                console.log(i, dd);
                Storage.save(uriI, dd);
              })
            })
          }
        }
        setTimeout(() => this.setState({
          loading: false
        }), 10000);
      })
  }
  render() {
    let url = "https://github.com/lzmhhh123/LLphoto";
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Card title="ABOUT APP" containerStyle={{marginBottom: 20}}>
          <Image source={require("../img/LOGO2.png")} resizeMode="contain" style={{width: '100%'}}/>
          <Text style={{marginBottom: 10}} >
            A photo ablum converting your photos into structural and searchable metadata.
          </Text>
          <Button
            icon={{name: 'home'}}
            backgroundColor='black'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Follow us on Github'
            onPress={() => Linking.canOpenURL(url).then(supported => {
              if (supported) {
                Linking.openURL(url);
              } else {
                console.log('Can not open ' + url);
              }
            })} />
        </Card>
        {this.state.loading ? <BubblesLoader /> : null}
        {this.state.loading ? <Text>Photos are syncing. Please wait...</Text> : null}
      </View>
    )
  }
}
