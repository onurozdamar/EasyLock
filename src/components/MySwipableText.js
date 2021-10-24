import React, {useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default function MySwipableText(props) {
  const [swipeRef, setSwipeRef] = useState(null);
  const {data, navigation} = props;

  const renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <RectButton
        style={styles.leftAction}
        onPress={() => {
          swipeRef.close();
          navigation.navigate('Update Lock', {data: data});
        }}>
        <AnimatedIcon
          name="edit"
          size={30}
          color="#fff"
          style={[
            styles.actionIcon,
            {
              transform: [{scale: scale}],
            },
          ]}
        />
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{scale: scale}],
            },
          ]}>
          Edit
        </Animated.Text>
      </RectButton>
    );
  };

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => {
          swipeRef.close();
          Clipboard.setString(data.lock);
        }}>
        <AnimatedIcon
          name="content-copy"
          size={30}
          color="#fff"
          style={[
            styles.actionIcon,
            {
              transform: [{scale: scale}],
            },
          ]}
        />
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{scale: scale}],
            },
          ]}>
          Copy
        </Animated.Text>
      </RectButton>
    );
  };

  return (
    <Swipeable
      ref={setSwipeRef}
      friction={2}
      leftThreshold={80}
      rightThreshold={41}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      <View style={styles.card}>
        <Text style={styles.text}>{data.title}</Text>
        <Text style={styles.text}>{data.lock}</Text>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 0.2,
    backgroundColor: '#388e3c',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  actionIcon: {
    width: 30,
  },
  actionText: {
    color: '#fff',
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#497AFC',
    flex: 0.2,
    justifyContent: 'space-evenly',
    margin: 10,
  },
  card: {
    backgroundColor: 'rgb(151,251,155)',
    padding: 5,
    margin: 5,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    backgroundColor: 'rgb(141,241,145)',
    margin: 5,
    padding: 5,
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
});
