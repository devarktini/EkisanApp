import React from 'react';
import { AirbnbRating } from 'react-native-ratings';
import { View } from 'react-native';

const CustomRating = ({
  rating = 0,
  size = 20,
  isDisabled = true,
  showRating = false,
}) => {
  return (
    <View>
      <AirbnbRating
        count={5}
        defaultRating={Number(rating)}
        size={size}
        showRating={showRating}
        isDisabled={isDisabled}
        starContainerStyle={{ paddingVertical: 4 }}
      />
    </View>
  );
};

export default CustomRating;
