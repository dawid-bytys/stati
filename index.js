import { AppRegistry } from 'react-native';
import { App } from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';

if (__DEV__) {
    require('./reactotron.config');
}

AppRegistry.registerComponent(appName, () => App);
