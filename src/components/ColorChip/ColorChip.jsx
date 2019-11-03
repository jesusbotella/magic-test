import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  chip: {
    borderRadius: 50,
    borderColor: '#e3e3e3',
    borderWidth: 2,
    width: 10,
    height: 10
  }
});

export default function ColorChip(props) {
  const { color } = props;

  const style = {
    ...styles.chip,
    // Let's avoid mapping because all colors
    // are available as CSS color strings
    backgroundColor: color.toLowerCase()
  };

  return <View style={style} />;
}

ColorChip.propTypes = {
  color: PropTypes.string
};

ColorChip.defaultProps = {
  color: ''
};
