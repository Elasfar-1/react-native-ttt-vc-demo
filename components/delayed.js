import React, {Component, useState} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import {
  PlaceholderContainer,
  Placeholder,
} from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';

// check if all components resolved.
let isVcComplete = unResolvedComponontes => {
  return unResolvedComponontes < 1;
};

// this function check if all plasholders has resolved. submit the time of visually complete. and ends action.
let onResolveHandler = (
  resolver,
  unResolvedComponontesCount,
  componentToBeReturned,
  dtAction,
  ctx,
) => {
  // resolver is the resolve function from the promise that will be resolved one task is finished with componentToBeReturned to replace the place holder
  // unResolvedComponontesCount is an object holding the count of the unresolved compononets.
  // componentToBeReturned is the component that will replace the place holder.
  // dtAction is the action that was created on the press on the previouse screen that leads to the current screen.
  // ctx is the context object that stores the timing for the action.

  unResolvedComponontesCount.setCount = unResolvedComponontesCount.getCount -1;
  console.log(unResolvedComponontesCount.getCount)
  if (isVcComplete(unResolvedComponontesCount.getCount)) {

    let actionManagerGetter = ctx['actionManagerGetter'];
    let setActionManager = ctx['setActionManager'];
    let actionManager = actionManagerGetter();

    let endTime = new Date();
    let startTime = actionManager['start'];
    let durationToFocus = (endTime - startTime) / 1000;
    setActionManager(() => {
      return {
        start: actionManager['start'],
        end: endTime,
        route: actionManager['route'],
        DTAction: actionManager['DTAction'],
      };
    });
    dtAction.reportDoubleValue('vcdemo', durationToFocus);
    dtAction.leaveAction();
  }

  return resolver(componentToBeReturned);
};

// A Demo for a componont that sets a place holder delayed to simulates waiting for some task to finish.
// the logic here is to wait unitl all componnts resolved. then submit VC and close the action.
export default class Test extends Component {
  unResolvedComponontes; 
  loadingComponent;
  loadingComponent1;
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.unResolvedComponontes = {
      count: 2, // 2 is becuase I have 2 components to wait for them to resolve.
      get getCount(){
        return this.count; 
      }, 
      set setCount(newCount){
        this.count = newCount; 
      },
    }
    this.loadingComponent = new Promise(resolve => {
      setTimeout(() => {
        let comp = (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={{width: 400, height: 400}}
              source={{
                uri: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg',
              }}
            />
          </View>
        );
        onResolveHandler(
          resolve,
          this.unResolvedComponontes,
          comp,
          this.props.dtAction,
          this.props.ctx,
        );
      }, 6000);
    });
    this.loadingComponent1 = new Promise(resolve => {
      setTimeout(()=>{
        onResolveHandler(
          resolve,
          this.unResolvedComponontes,
          <></>,
          this.props.dtAction,
          this.props.ctx,
        );
      }, 8000);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceholderExample loader={this.loadingComponent} />
        <PlaceholderExample1 loader={this.loadingComponent1} />
      </View>
    );
  }
}
const Gradient = () => {
  return (
    <LinearGradient
      colors={['#eeeeee', '#dddddd', '#eeeeee']}
      start={{x: 1.0, y: 0.0}}
      end={{x: 0.0, y: 0.0}}
      style={{
        flex: 1,
        width: 120,
      }}
    />
  );
};

const PlaceholderExample = ({loader}) => {
  return (
    <PlaceholderContainer
      style={styles.placeholderContainer}
      animatedComponent={<Gradient />}
      duration={1000}
      delay={1000}
      loader={loader}>
      <View style={{flexDirection: 'row'}}>
        <Placeholder style={[styles.placeholder, {width: 50, height: 50}]} />
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Placeholder
            style={[
              styles.placeholder,
              {
                width: '50%',
                height: 10,
              },
            ]}
          />
          <Placeholder
            style={[
              styles.placeholder,
              {
                width: '35%',
                height: 7,
              },
            ]}
          />
        </View>
      </View>

      <Placeholder
        style={[styles.placeholder, {marginTop: 20, width: '80%'}]}
      />
      <Placeholder style={[styles.placeholder, {width: '90%'}]} />
      <Placeholder style={[styles.placeholder, {width: '50%'}]} />
    </PlaceholderContainer>
  );
};

const PlaceholderExample1 = ({loader}) => {
  return (
    <PlaceholderContainer
      style={styles.placeholderContainer}
      animatedComponent={<Gradient />}
      duration={1000}
      delay={1000}
      loader={loader}
      replace={true}>
      <View style={{flexDirection: 'column'}}>
        <View style={styles.row}>
          <Text style={{width: '20%', textAlign: 'center'}}>Name</Text>
          <Placeholder
            style={[
              styles.placeholder,
              {
                width: '50%',
                height: 10,
              },
            ]}>
            <Text>John Doe</Text>
          </Placeholder>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.row}>
            <Text style={{width: '20%', textAlign: 'center'}}>Age</Text>
            <Placeholder
              style={[
                styles.placeholder,
                {
                  width: '15%',
                  height: 10,
                },
              ]}>
              <Text>47</Text>
            </Placeholder>
          </View>
        </View>
      </View>
    </PlaceholderContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 25,
    backgroundColor: '#f6f7f8',
  },
  placeholderContainer: {
    width: '90%',
    backgroundColor: '#fff',
    height: 200,
  },
  placeholder: {
    height: 8,
    marginTop: 6,
    marginLeft: 15,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
});
