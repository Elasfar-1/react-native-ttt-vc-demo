/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import {
  View,
  Button,
  Text,
  Animated,
  Image,
  findNodeHandle,
} from 'react-native';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useState, createContext, useContext, useEffect} from 'react';
import Home from './screens/home';
import Profile from './screens/Profile';
import Index from './screens/index';
import {actionContex} from './contex';

import {
  Dynatrace,
  DataCollectionLevel,
  UserPrivacyOptions,
} from '@dynatrace/react-native-plugin';

// Privacy settings configured below are only provided
// to allow a quick start with capturing monitoring data.
// This has to be requested from the user
// (e.g. in a privacy settings screen) and the user decision
// has to be applied similar to this example.
let privacyConfig = new UserPrivacyOptions(
  DataCollectionLevel.UserBehavior,
  true,
);
Dynatrace.applyUserPrivacyOptions(privacyConfig);

const forFade = ({current, next}) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0,
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: {opacity},
    rightButtonStyle: {opacity},
    titleStyle: {opacity},
    backgroundStyle: {opacity},
  };
};

const Stack = createStackNavigator();

function MyStack() {
  const [actionManager, setActionManager] = useState(() => {
    return {
      route: null,
      start: null,
      end: null,
    };
  });
  const [currentDTAction, setCurrentDTAction] = useState();
  let actionContexValue = React.useMemo(() => {
    return {setActionManager};
  }, [setActionManager]);
  actionContexValue['actionManagerGetter'] = () => actionManager;
  return (
    <actionContex.Provider value={actionContexValue}>
      <Stack.Navigator
        id={'start'}
        ontransitionstart={pr => {
          console.log('hello');
        }}>
        <Stack.Screen
          name="Index"
          component={Index}
          options={{
            headerTintColor: 'white',
            headerStyle: {backgroundColor: 'tomato'},
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTintColor: 'white',
            headerStyle: {backgroundColor: 'tomato'},
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerStyleInterpolator: forFade}}
        />
      </Stack.Navigator>
    </actionContex.Provider>
  );
}

export default function App() {
  let privacyConfig = new UserPrivacyOptions(
    DataCollectionLevel.UserBehavior,
    true,
  );
  
  Dynatrace.applyUserPrivacyOptions(privacyConfig);
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
