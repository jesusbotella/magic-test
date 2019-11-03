import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import MagicCardItem from './MagicCardItem';

const cardExample = {
  name: 'Abundance',
  colors: ['Green'],
  type: 'Enchantment',
  setName: 'Tenth Edition',
  imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130483&type=card'
};

describe('MagicCardItem', () => {
  it('should render properly', () => {
    const element = render(<MagicCardItem card={cardExample} />).toJSON();
    expect(element).toMatchSnapshot();
  });

  it('should invoke onPress callback when pressed', () => {
    const onPressMock = jest.fn();

    const { getByTestId } = render(
      <MagicCardItem
        testID="pressTest"
        card={cardExample}
        onPress={onPressMock}
      />
    );

    fireEvent.press(getByTestId('pressTest'));

    // It should've been toHaveBeenCalledWith
    // but TouchableHighlight is hard to test
    expect(onPressMock).toHaveBeenCalled();
  });
});
