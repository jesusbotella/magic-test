import React from 'react';
import { StyleSheet, Modal, SafeAreaView, Button, Image } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  modal__content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal__image: {
    width: 223,
    height: 310,
    marginBottom: 10
  }
});

export default function MagicCardModal(props) {
  const { isModalVisible, modalItem, onClosePress } = props;

  return (
    <Modal animationType="slide" visible={isModalVisible}>
      <SafeAreaView style={styles.modal__content}>
        <Image
          style={styles.modal__image}
          source={{ uri: modalItem.imageUrl }}
        />

        <Button title="Close" onPress={onClosePress} />
      </SafeAreaView>
    </Modal>
  );
}

MagicCardModal.propTypes = {
  isModalVisible: PropTypes.bool,
  modalItem: PropTypes.shape({
    imageUrl: PropTypes.string
  }),
  onClosePress: PropTypes.func
};

MagicCardModal.defaultProps = {
  isModalVisible: false,
  modalItem: {},
  onClosePress: () => {}
};
