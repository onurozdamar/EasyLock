import * as React from 'react';
import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BaseManager} from '../database';
import MySwipableText from './MySwipableText';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Feed({navigation}) {
  const manager = new BaseManager();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    manager.createLockTable();
  });

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      getData();
    });
    return willFocusSubscription;
  }, []);

  function getData() {
    setLoading(true);
    manager.getLock().then(res => {
      setData(res);
      setLoading(false);
    });
  }

  return (
    <View style={{display: 'flex', flex: 1}}>
      <FlatList
        data={data}
        renderItem={data => {
          return <MySwipableText data={data.item} navigation={navigation} />;
        }}
        keyExtractor={(item, index) => index.toString()}
        extraData={data}
        refreshing={loading}
        onRefresh={() => {
          getData();
        }}
      />
      <TouchableOpacity
        style={styles.floatActionButton}
        onPress={() => {
          navigation.navigate('Add Lock');
        }}>
        <Icon name={'plus'} size={30} color={'green'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatActionButton: {
    backgroundColor: 'rgba(51,125,52,.5)',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(51,125,52)',
    borderRadius: 99,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
    margin: 5,
  },
});
