/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Dynatrace, DataCollectionLevel, UserPrivacyOptions } from '@dynatrace/react-native-plugin';

// Privacy settings configured below are only provided
// to allow a quick start with capturing monitoring data.
// This has to be requested from the user
// (e.g. in a privacy settings screen) and the user decision
// has to be applied similar to this example.
let privacyConfig = new UserPrivacyOptions(DataCollectionLevel.UserBehavior, true);
Dynatrace.applyUserPrivacyOptions(privacyConfig);

AppRegistry.registerComponent(appName, () => App);

