import React from 'react';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {IMAGE_WIDTH} from '../../constants/constants';
import {IMeasure} from '../../types/types';
import styles from './pointer-styles';

interface PointerProps {
  measures: IMeasure[];
  scrollX: SharedValue<number>;
}

const Pointer: React.FC<PointerProps> = ({measures, scrollX}) => {
  const inputRange = measures.map((_, index) => (index - 1) * IMAGE_WIDTH);

  const animatedStyle = useAnimatedStyle(() => {
    const pointerWidth = interpolate(
      scrollX.value,
      inputRange,
      measures.map(m => m.width),
    );
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      measures.map((m: any) => m.x),
    );
    return {
      width: pointerWidth,
      transform: [{translateX}],
    };
  });
  return <Animated.View style={[styles.pointer, animatedStyle]} />;
};

export default Pointer;
