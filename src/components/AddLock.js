import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BaseManager} from '../database';

export default function AddLock({navigation, route}) {
  const manager = new BaseManager();

  const [title, setTitle] = useState('');
  const [lock, setLock] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lock Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={val => {
          setTitle(val);
        }}
      />

      <Text style={styles.text}>Lock</Text>
      <TextInput
        style={styles.input}
        value={lock}
        onChangeText={val => {
          setLock(val);
        }}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (title === '' || lock === '') {
            return;
          }

          manager.addLock({title, lock});

          setLock('');
          setTitle('');
          navigation.navigate('Locks');
        }}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(151,251,155)',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    height: '100%',
  },
  input: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 5,
    paddingRight: 36,
    marginBottom: 20,
  },
  text: {
    margin: 5,
    marginLeft: 0,
    fontSize: 15,
  },
  addButton: {
    padding: 5,
    margin: 5,
    marginTop: 15,
    borderWidth: 1,
    backgroundColor: 'yellow',
  },
  addButtonText: {
    textAlign: 'center',
    fontSize: 15,
  },
});
