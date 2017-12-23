import React, {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from "react-native-elements";
import Homepage from "./src/Homepage";
import Photos from "./src/Photos";
import ImageProfile from "./src/ImageProfile";
import AlbumProfile from "./src/AlbumProfile";
import Album from "./src/Album";

const RootStackNavigator = StackNavigator({
  MainPhotos: {
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
  MainHome: {
    screen: Homepage,
    navigationOptions: ({navigation}) => ({
      title: 'Homepage'
    })
  }
})

const AlbumStackNavigator = StackNavigator({
  MainAlbum: {
    screen: Album,
    path: 'main',
    navigationOptions: ({navigation}) => ({
      title: 'Albums'
    })
  },
  AlbumProfile: {
    screen: AlbumProfile,
    path: 'profile',
    navigationOptions: ({navigation}) => ({
      title: 'Album Profile'
    })
  },
  ImageProfile2: {
    screen: ImageProfile,
    path: 'imageProfile2',
    navigationOptions: ({navigation}) => ({
      title: "Image profile"
    })
  }
})

const RootNavigator = TabNavigator({
  Home: {
    screen: HomeStackNavigator,
  },
  Photos: {
    screen: RootStackNavigator
  },
  Album: {
    screen: AlbumStackNavigator
  }
  // Album: {
  //   screen: Album
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
