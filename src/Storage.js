import { AsyncStorage } from 'react-native';

export default class {

  static get(key) {
    return AsyncStorage.getItem(key).then((value) => {
      if (value === null) return null;
      const jsonValue = JSON.parse(value);
      return jsonValue;
    })
  }

  static save(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

}
