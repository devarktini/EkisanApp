import React from 'react';
import { View } from 'react-native';
import { Rating } from 'react-native-ratings';

const CustomRating = ({
  rating = 0,
  count = 5,
  size = 20,
  showRating = false,
  readonly = true,
}) => {
  return (
    <View>
      <Rating
        type="custom"
        ratingCount={count}
        startingValue={Number(rating) || 0}
        imageSize={size}
        showRating={showRating}
        readonly={readonly}
        ratingColor="#FFB800"
        ratingBackgroundColor="#DDD"
        tintColor="#F9FAFB"
      />
    </View>
  );
};

export default CustomRating;
