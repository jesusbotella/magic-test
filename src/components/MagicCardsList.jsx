import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { SearchBar } from 'react-native-elements';
import { getCards } from '../services/magic-api';
import MagicCardItem from './MagicCardItem/MagicCardItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3'
  }
});

export default function MagicCardsList(props) {
  const { onItemPress: onItemPressCallback } = props;

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cards, setCards] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const loadCards = async function loadCards() {
    const cardsList = await getCards({ page, name: search });

    if (!cardsList.cards || !cardsList.cards.length) {
      setHasMoreItems(false);
      setIsLoading(false);
      return;
    }

    setCards([...cards, ...cardsList.cards]);
    setIsLoading(false);
  };

  useEffect(() => { loadCards(); }, [page, search]);

  const loadMoreCards = () => {
    if (!hasMoreItems) {
      return;
    }

    setIsLoading(true);
    setPage(page + 1);
  };

  const updateSearch = (searchText) => {
    // Should've used a debounce so that
    // queries are not sent as user types
    setIsLoading(true);
    setHasMoreItems(true);
    setCards([]);
    setPage(1);
    setSearch(searchText);
  };

  const onItemPress = (item) => onItemPressCallback(item);

  return (
    <>
      <SearchBar
        key="searchBar"
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />

      <FlatList
        key="cardsList"
        style={styles.container}
        data={cards}
        keyExtractor={(item) => item.id}
        onEndReached={loadMoreCards}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <MagicCardItem card={item} key={item.id} onPress={onItemPress} />
        )}
      />

      { isLoading && <ActivityIndicator key="activityIndicator" size="large" color="#0000ff" /> }
    </>
  );
}

MagicCardsList.propTypes = {
  onItemPress: PropTypes.func
};

MagicCardsList.defaultProps = {
  onItemPress: () => {}
};
