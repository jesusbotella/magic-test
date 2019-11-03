import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import PropTypes from 'prop-types';
import ColorChip from '../ColorChip/ColorChip';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignContent: 'center',
    padding: 16,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1
  },
  card__imgcontainer: {
    position: 'relative'
  },
  card__image: {
    width: 40,
    height: 55,
    marginRight: 10
  },
  card__name: {
    color: '#132B3B',
    fontSize: 20,
    fontWeight: '500',
    paddingBottom: 2
  },
  card__type: {
    color: '#164B7A',
    paddingTop: 2
  },
  card__color: {
    position: 'absolute',
    top: -5,
    right: 5
  }
});

export default function MagicCardItem(props) {
  const { card, onPress } = props;
  const { name, colors, type, setName, imageUrl } = card;

  return (
    <TouchableHighlight onPress={() => onPress(card)} underlayColor="#FAFAFA">
      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.card__name}>{name}</Text>
          <Text>{type}</Text>
          <Text style={styles.card__type}>{setName}</Text>
        </View>

        <View style={styles.card__imgcontainer}>
          <Image source={{ uri: imageUrl }} style={styles.card__image} />

          <View style={styles.card__color}>
            {colors.map((color) => <ColorChip key={color} color={color} />)}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

MagicCardItem.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
    setName: PropTypes.string,
    imageUrl: PropTypes.string
  }),
  onPress: PropTypes.func
};

MagicCardItem.defaultProps = {
  card: {},
  onPress: () => {}
};
