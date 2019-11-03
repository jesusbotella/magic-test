import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import MagicCardsList from '../components/MagicCardsList';
import MagicCardModal from '../components/MagicCardModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState({});

  const onItemPressed = (item) => {
    setModalItem(item);
    setIsModalVisible(true);
  };

  const onModalClosePressed = () => setIsModalVisible(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <MagicCardsList onItemPress={onItemPressed} />
      </SafeAreaView>

      <MagicCardModal
        isModalVisible={isModalVisible}
        modalItem={modalItem}
        onClosePress={onModalClosePressed}
      />
    </>
  );
}
