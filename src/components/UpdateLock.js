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
import MyModal from './MyModal';

export default function UpdateLock({navigation, route}) {
  const manager = new BaseManager();
  const data = route?.params?.data;

  const [title, setTitle] = useState('');
  const [lock, setLock] = useState('');

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      if (data?.id) {
        manager.getLockById(data.id).then(res => {
          setLock(res.lock);
          setTitle(res.title);
        });
      }
    });
    return willFocusSubscription;
  }, []);

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
          if (data?.id) {
            manager.updateLock({title, lock, id: data.id});
          }
          setLock('');
          setTitle('');
          navigation.navigate('Locks', {});
        }}>
        <Text style={styles.addButtonText}>Update</Text>
      </TouchableOpacity>
      <MyModal
        onSuccess={() => {
          manager.deleteLock(data.id);
          navigation.goBack();
        }}
      />
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
