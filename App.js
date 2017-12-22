import React, {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from "react-native-elements";
import Homepage from "./src/Homepage";
import Photos from "./src/Photos";
import ImageProfile from "./src/ImageProfile";
// import Album from "./src/Album";

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

const HomeStackNavigator = StackNavigator({
  Main: {
    screen: Homepage,
    navigationOptions: ({navigation}) => ({
      title: 'Homepage'
    })
  }
})

// const AlbumStackNavigator = StackNavigator({
//   Main: {
//     screen: Album,
//     navigationOptions: ({navigation}) => ({
//       title: 'Alums'
//     })
//   }
// })


const RootNavigator = TabNavigator({
  Home: {
    screen: HomeStackNavigator,
  },
  Photos: {
    screen: RootStackNavigator
  },
  // Album: {
  //   screen: Ablum
  // }
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
