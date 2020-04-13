import React, { useEffect, useReducer } from 'react';
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

const actions = {
  changePage(state, action) {
    return {
      ...state,
      isLoading: true,
      page: action.page
    };
  },

  setCards(state, action) {
    return {
      ...state,
      cards: action.cards,
      isLoading: false
    };
  },

  noMoreCardsAvailable(state) {
    return {
      ...state,
      hasMoreItems: false,
      isLoading: false
    };
  },

  search(state, action) {
    return {
      ...state,
      cards: [],
      hasMoreItems: true,
      isLoading: true,
      page: 1,
      searchText: action.searchText
    };
  },
};

const initialState = {
  page: 1,
  isLoading: true,
  searchText: '',
  cards: [],
  hasMoreItems: true
};

const reducerFn = function reducerFn(state, action) {
  const { type } = action;

  if (actions[type]) {
    return actions[type](state, action);
  }

  return state;
};

export default function MagicCardsList(props) {
  const { onItemPress: onItemPressCallback } = props;

  const [state, dispatch] = useReducer(reducerFn, initialState);

  const loadCards = async function loadCards() {
    const cardsList = await getCards({
      page: state.page,
      name: state.searchText
    });

    if (!cardsList.cards || !cardsList.cards.length) {
      dispatch({ type: 'noMoreCardsAvailable' });
      return;
    }

    dispatch({ type: 'setCards', cards: [...state.cards, ...cardsList.cards] });
  };

  useEffect(() => { loadCards(); }, [state.page, state.searchText]);

  const loadMoreCards = () => {
    if (!state.hasMoreItems) {
      return;
    }

    dispatch({ type: 'changePage', page: state.page + 1 });
  };

  const updateSearch = (searchText) => {
    // Should've used a debounce so that
    // queries are not sent as user types
    dispatch({ type: 'search', searchText });
  };

  const onItemPress = (item) => onItemPressCallback(item);

  return (
    <>
      <SearchBar
        key="searchBar"
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={state.searchText}
      />

      <FlatList
        key="cardsList"
        style={styles.container}
        data={state.cards}
        keyExtractor={(item) => item.id}
        onEndReached={loadMoreCards}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <MagicCardItem card={item} key={item.id} onPress={onItemPress} />
        )}
      />

      { state.isLoading && <ActivityIndicator key="activityIndicator" size="large" color="#0000ff" /> }
    </>
  );
}

MagicCardsList.propTypes = {
  onItemPress: PropTypes.func
};

MagicCardsList.defaultProps = {
  onItemPress: () => {}
};
