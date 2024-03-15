import {View, Button, Text, Image} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import {useEndAction} from '../DTActionsHooks.js';
import {actionContex} from '../contex.js';
import {nwActivity} from '../utils.js';
import {startAction} from '../utils.js';
import {Dynatrace} from '@dynatrace/react-native-plugin';
import EndSession from './endSessionButton.jsx';
import Test from '../components/delayed.js';

export default function Home({navigation, route}) {
  let dtAction =
    route.params && route.params['dtAction'] ? route.params['dtAction'] : null;
  const [DTAction, setDTAction] = useState(null);
  const [layout, setLayout] = useState(false);
  let ctx = useContext(actionContex);

  // Start DT action if doesn't exist on Mounting;
  useEffect(() => {
    if (!dtAction) {
      let [contx, dtAction] = startAction(ctx, 'Home');
      console.log(contx, dtAction);
      setDTAction(old => dtAction);
    }
    console.log('<----------------------->');
    console.log(DTAction);
    console.log('<----------------------->');
  }, []);

  // report time to transition
  useEndAction(dtAction ? dtAction : DTAction, true);

  let data = nwActivity(2);

  // press handler
  const handlePress = () => {
    let actionManager = ctx.actionManagerGetter();
    let DTAction = Dynatrace.enterAutoAction('Go to Profile');
    ctx['setActionManager'](() => {
      return {
        start: new Date(),
        end: null,
        route: 'Home',
        DTAction,
      };
    });
    setTimeout(() => {
      return navigation.navigate('Profile', (params = {dtAction: DTAction}));
    }, 700);
  };

  let height = 400;

  let Comb = (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Test dtAction={dtAction ? dtAction : DTAction} ctx={ctx} />
      <Text>Home screen</Text>
      <Button title="Go to Profile" onPress={handlePress} />
      <EndSession />
    </View>
  );
  return Comb;
}
