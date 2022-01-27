import React, {forwardRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {IMAGE_WIDTH} from '../../constants/constants';
import {IPetsData} from '../../types/types';
import styles from './pets-selection-field-styles';

interface TabProps {
  index: number;
  item: IPetsData;
  scrollX: SharedValue<number>;
  onItemPress: () => void;
}

const Tab: React.ForwardRefExoticComponent<TabProps> = forwardRef(
  ({index, item, scrollX, onItemPress}, ref) => {
    const inputRange = [
      (index - 2) * IMAGE_WIDTH,
      (index - 1) * IMAGE_WIDTH,
      index * IMAGE_WIDTH,
    ];
    const animatedStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.5, 1, 0.5],
        Extrapolate.CLAMP,
      );
      return {
        opacity,
      };
    });
    if (!item.name) {
      return <View ref={ref} />;
    }
    return (
      <Animated.View style={[animatedStyle, styles.selectionLine]}>
        <TouchableOpacity
          onPress={onItemPress}
          activeOpacity={0.8}
          hitSlop={{bottom: 15}}>
          <View ref={ref} style={styles.petsNameContainer}>
            <Text style={styles.petsNameText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

export default Tab;
