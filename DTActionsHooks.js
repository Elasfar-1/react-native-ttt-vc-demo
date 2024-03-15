import {  useFocusEffect } from '@react-navigation/native';
import {endActionFactory} from './utils'; 
import { useContext } from 'react';
import { actionContex } from './contex';
// hook should be used to report Time TO Transit to next screen. 
// if keepOpen the action will stay open, otherwise the action will be closed
// action should be open if you need to measure Visually Complete. 
const useEndAction = (DTAction, keepOpen) => {
    let ctx = useContext(actionContex);
    useFocusEffect(endActionFactory(ctx, DTAction, keepOpen));
  };

  module.exports = {
    useEndAction
}