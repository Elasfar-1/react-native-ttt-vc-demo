import {View, Button, Text, Image} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import {useEndAction} from '../DTActionsHooks.js';
import {actionContex} from '../contex.js';
import {startAction} from '../utils.js';
import {Dynatrace} from '@dynatrace/react-native-plugin';

export default ({navigation, route}) => {
  let dtAction =
    route.params && route.params['dtAction'] ? route.params['dtAction'] : null;
  const [DTAction, setDTAction] = useState(null);
  let ctx = useContext(actionContex);

  // Start DT action if doesn't exist on Mounting;
  useEffect(() => {
    if (!dtAction) {
      let [contx, dtAction] = startAction(ctx, 'Home');
      console.log(contx, dtAction);
      setDTAction(old => dtAction);
      console.log('ctx value =======> ', contx.actionManagerGetter(), '\n \n');
    }
  }, []);

  // report time to transition
  useEndAction(dtAction ? dtAction : DTAction, false);

  let action = useContext(actionContex);

  const handlePress = () => {
    let actionManager = action.actionManagerGetter();
    let DTAction = Dynatrace.enterAutoAction('Go To Delayed Home');
    action['setActionManager'](() => {
      return {
        start: new Date(),
        end: null,
        route: 'Home',
        DTAction,
      };
    });
    setTimeout(() => {
      return navigation.navigate('Home', (params = {dtAction: DTAction}));
    }, 600);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>measure VC</Text>
      <Button title="Go To Delayed Home" onPress={handlePress} />
    </View>
  );
};
