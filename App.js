import React, {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from "react-native-elements";
import Homepage from "./src/Homepage";
import Photos from "./src/Photos";
import ImageProfile from "./src/ImageProfile";

const RootStackNavigator = StackNavigator({
  Main: {
    screen: Photos,
    path: 'main',
    navigationOptions: ({navigation}) => ({
      title: 'Photos'
    })
  },
  ImageProfile: {
    screen: ImageProfile,
    path: 'image',
    navigationOptions: ({navigation}) => ({
      title: "Image profile"
    })
  }
})

const RootNavigator = TabNavigator({
  Home: {
    screen: Homepage,
    navigationOptions: ({navigation}) => ({
      title: 'Homepage'
    })
  },
  Photos: {
    screen: RootStackNavigator
  },
}, {
  tabBarPosition: 'bottom',
  tarBarOptions: {
    activeTintColor: '#e91e63',
    showIcon: true,
    showLabel: false
  }
});

export default class App extends Component {
  render() {
    return (
      <RootNavigator />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 12,
    height: 12,
  },
});
