import React, {useCallback, useMemo} from 'react';
import {
  ImageSourcePropType,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
  SharedValue,
} from 'react-native-reanimated';
import {CircleColor} from '../../types/types';
import {IMAGE_WIDTH} from '../../constants/constants';
import styles from './pet-image-styles';

interface PetImageProps {
  index: number;
  scrollX: SharedValue<number>;
  circleColor?: CircleColor;
  image: ImageSourcePropType;
  onPress: (index: number) => void;
}

const PetImage: React.FC<PetImageProps> = ({
  index,
  scrollX,
  circleColor,
  image,
  onPress,
}) => {
  const inputRange = [
    (index - 2) * IMAGE_WIDTH,
    (index - 1) * IMAGE_WIDTH,
    index * IMAGE_WIDTH,
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );
    const horizontalOffset = interpolate(
      scrollX.value,
      inputRange,
      [-200, 0, 200],
      Extrapolate.CLAMP,
    );
    const verticalOffset = interpolate(
      scrollX.value,
      inputRange,
      [-65, 0, -65],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}, {translateX: horizontalOffset}],
      top: verticalOffset,
    };
  });

  const circleAnimatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      scrollX.value,
      inputRange,
      [100, IMAGE_WIDTH, 100],
      Extrapolate.CLAMP,
    );

    return {
      width,
      height: width,
    };
  });

  const onPetPress = useCallback(() => {
    onPress && index && onPress(index);
  }, [onPress, index]);

  const circleBackgroundColor = useMemo<ViewStyle>(() => {
    switch (circleColor) {
      case CircleColor.Brown:
        return {
          backgroundColor: '#a0522d',
        };
      case CircleColor.CadetBlue:
        return {
          backgroundColor: '#4682b4',
        };
      case CircleColor.Green:
        return {
          backgroundColor: '#32cd32',
        };
      case CircleColor.Grey:
        return {
          backgroundColor: '#a9a9a9',
        };
      case CircleColor.Indigo:
        return {
          backgroundColor: '#4b0082',
        };
      case CircleColor.Orange:
        return {
          backgroundColor: '#ffa500',
        };
      case CircleColor.Pink:
        return {
          backgroundColor: '#ffc0cb',
        };
      case CircleColor.Purple:
        return {
          backgroundColor: '#800080',
        };
      case CircleColor.Red:
        return {
          backgroundColor: '#ff0000',
        };
      case CircleColor.Snow:
        return {
          backgroundColor: '#fffafa',
        };
      case CircleColor.Turquoise:
        return {
          backgroundColor: '#40e0d0',
        };
      case CircleColor.Yellow:
        return {
          backgroundColor: '#ffd700',
        };
      default:
        return {
          backgroundColor: '#b0c4de',
        };
    }
  }, [circleColor]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Animated.View
        style={[styles.circle, circleBackgroundColor, circleAnimatedStyle]}>
        <View style={styles.imageBorder}>
          <TouchableHighlight onPress={onPetPress}>
            <Animated.Image source={image} style={styles.image} />
          </TouchableHighlight>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default PetImage;
