import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feed from './components/Feed';
import AddLock from './components/AddLock';
import UpdateLock from './components/UpdateLock';
import {useDispatch} from 'react-redux';
import {setOpenModal} from './store/lock/actions';

const Stack = createStackNavigator();

const Menu = () => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={{margin: 15}}
      hitSlop={{top: 15, bottom: 15, left: 20, right: 20}}
      onPress={() => {
        dispatch(setOpenModal(true));
      }}>
      <Icon name={'ellipsis-v'} size={30} color={'black'} />
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Locks" component={Feed} />
        <Stack.Screen name="Add Lock" component={AddLock} />
        <Stack.Screen
          name="Update Lock"
          component={UpdateLock}
          options={{
            headerRight: () => <Menu />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
