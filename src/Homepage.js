import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Linking
} from 'react-native';
import {Card, Icon, Button} from 'react-native-elements';

export default class extends Component {
  constructor() {
    super()
  }
  static navigationOptions = {
    tabBarLabel: 'Home',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: <Icon name="home" />,
  };
  render() {
    let url = "https://github.com/lzmhhh123/LLphoto";
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Card title="ABOUT APP">
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
      </View>
    )
  }
}
