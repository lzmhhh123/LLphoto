import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Card, Icon} from 'react-native-elements';

export default class extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: <Icon name="home" />,
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Card
          image={require("../img/LLphoto.jpg")}
          title="ABOUT APP"
        >
          <Text style={{marginBottom: 10}} >
            A photo ablum converting your videos into structural and searchable metadata.
          </Text>
        </Card>
      </View>
    )
  }
}
