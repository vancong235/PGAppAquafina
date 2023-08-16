/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AllScreens from './src/navigation/AllScreens';

AppRegistry.registerComponent(appName, () => AllScreens);
