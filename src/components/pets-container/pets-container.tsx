import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {IMAGE_WIDTH} from '../../constants/constants';
import {IPetsData} from '../../types/types';
import PetImage from '../pet-image/pet-image';
import styles from './pets-container-styles';

interface PetsContainerProps {
  index: number;
  item: IPetsData;
  scrollX: SharedValue<number>;
  onPetPress: (index: number) => void;
}

const PetsContainer: React.FC<PetsContainerProps> = ({
  index,
  item,
  scrollX,
  onPetPress,
}) => {
  const inputRange = [
    (index - 2) * IMAGE_WIDTH,
    (index - 1) * IMAGE_WIDTH,
    index * IMAGE_WIDTH,
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const zIndex = interpolate(
      scrollX.value,
      inputRange,
      [0, 2, 0],
      Extrapolate.CLAMP,
    );

    return {
      zIndex,
    };
  });

  return (
    <Animated.View key={index} style={[styles.petContainer, animatedStyle]}>
      <PetImage
        index={index}
        scrollX={scrollX}
        circleColor={item.circleColor}
        image={item.image}
        onPress={onPetPress}
      />
    </Animated.View>
  );
};

export default PetsContainer;
