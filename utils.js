import { Dynatrace } from "@dynatrace/react-native-plugin";
// A factory function that will create a function to be passed to useFocus hook from Navigation liberary. 
// ctx is an instanse of a context. context is what memorize the starting and the ending time of an action. 
// if keepOpen is true the action won't be closed. 
const endActionFactory = (ctx, DTAction, keepOpen) => {
    return () => {
      if (!DTAction){return undefined};
      let actionManagerGetter = ctx['actionManagerGetter'];
      let setActionManager = ctx['setActionManager'];
      let actionManager = actionManagerGetter(); 

      let endTime = new Date();
      let startTime = actionManager['start'];
      let durationToFocus = (endTime - startTime) / 1000;
      setActionManager(() => {
        return { start: actionManager['start'], end: endTime, route: actionManager['route'], DTAction: actionManager['DTAction']}; 
      });
  
      //send durationToFocus (Time To Transition The screen) to dynatrace as a property.
      console.log('=======================');
      console.log(actionManager); 
      console.log(durationToFocus, startTime, endTime);
      console.log('========================', '\n \n');
      DTAction.reportDoubleValue('timetotransition', durationToFocus);       
      if (!keepOpen){
        DTAction.leaveAction()
      }
    };
  };
const nwActivity = (timeToDelay) => {
    fetch(`https://hub.dummyapis.com/delay?seconds=${timeToDelay}`).
    then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
  }; 

// this function is going to start an action. if it doesn't exist. 
const startAction = (ctx, screenName, DTAction) => {
    console.log('|--------------------------------------------------------|')
    console.log('|                                                        |')

    console.log('|                    Starting An Action                  |')
    console.log('|                                                        |')
    console.log('|--------------------------------------------------------|')
    if (ctx) {
      const actionManagerGetter =  ctx['actionManagerGetter']; 
      const actionManager = actionManagerGetter()
      if ( ! DTAction ) {
        console.log('DTaction is not provided ')
        DTAction = Dynatrace.enterAutoAction(screenName);
        ctx['setActionManager'](() => {
          return {
            start: new Date(),
            end: null,
            route: screenName,
            DTAction
          };
        }); 
        return [ctx,DTAction];
      }; 
  
      let newState = {
        start: null,
        end: null,
        route: screenName,
        DTAction
      }; 
  
      if(actionManager['start']==null){
        console.log('start is null ')
        newState.start = new Date()
      }else{
        newState['start'] = actionManager['start']
      };
  
      ctx['setActionManager'](() => {return newState ;}); 
      return [ctx, DTAction]; 
    }
    
  };
  
  
  module.exports = {
    endActionFactory, 
    nwActivity, 
    startAction, 
  }