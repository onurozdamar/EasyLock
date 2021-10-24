import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setOpenModal} from '../store/lock/actions';

const MyModal = props => {
  const {onSuccess} = props;

  const dispatch = useDispatch();
  const openModal = useSelector(({lockReducer}) => lockReducer.openModal);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          dispatch(setOpenModal(false));
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Silmek İstediğinize Emin misiniz?
            </Text>
            <View style={styles.actions}>
              <Pressable
                style={[styles.button, styles.buttonDelete]}
                onPress={() => {
                  onSuccess && onSuccess();
                  dispatch(setOpenModal(false));
                }}>
                <Text style={styles.textStyle}>Sil</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => dispatch(setOpenModal(false))}>
                <Text style={styles.textStyle}>İptal</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonCancel: {
    backgroundColor: '#2196F3',
  },
  buttonDelete: {
    backgroundColor: '#F2311F',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default MyModal;
