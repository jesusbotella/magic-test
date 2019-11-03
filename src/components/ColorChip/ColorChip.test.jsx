import React from 'react';
import { render } from 'react-native-testing-library';
import ColorChip from './ColorChip';

describe('ColorChip', () => {
  it('should render properly', () => {
    const element = render(<ColorChip color="green" />).toJSON();
    expect(element).toMatchSnapshot();
  });
});
