import { AsyncStorage } from 'react-native';

default export class {

  static get(key) {
    return AsyncStorage.getItem(key).then((value) => {
      const jsonValue = JSON.parse(value);
      return jsonValue;
    })
  }

  static save(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

}
