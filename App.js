import React, {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon } from "react-native-elements";
import Homepage from "./src/Homepage";
import Photos from "./src/Photos";
// class HomeScreen extends Component {
//   static navigationOptions = {
//     tabBarLabel: 'Home',
//     // Note: By default the icon is only shown on iOS. Search the showIcon option below.
//     tabBarIcon: <Icon name="home" />,
//   };
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//       </View>
//     )
//   }
// };

// class DetailsScreen extends Component {
//   static navigationOptions = {
//     tabBarLabel: 'Details',
//     // Note: By default the icon is only shown on iOS. Search the showIcon option below.
//     tabBarIcon: ({ tintColor }) => (
//       <Image
//         source={require('./icons/ic_home_black_24dp/android/drawable-hdpi/ic_home_black_24dp.png')}
//         style={[styles.icon, {tintColor: tintColor}]}
//       />
//     ),
//   };
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Details Screen</Text>
//       </View>
//     )
//   }
// };

const RootNavigator = TabNavigator({
  Home: {
    screen: Homepage
  },
  Photos: {
    screen: Photos
  },
}, {
  tabBarPosition: 'bottom',
  tarBarOptions: {
    activeTintColor: '#e91e63',
    showIcon: true,
    showLabel: false
  }
});

// RootNavigator.navigationOptions = {
//   title: 'LLphoto'
// }

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
