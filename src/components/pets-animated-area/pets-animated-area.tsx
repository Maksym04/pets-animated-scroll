import React, {createRef, useCallback, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {IPetsData} from '../../types/types';
import {IMAGE_WIDTH} from '../../constants/constants';
import PetsSelectionField from '../pets-selection-field/pets-selection-field';
import PetsContainer from '../pets-container/pets-container';
import styles from './pets-animated-area-styles';

interface PetsAnimatedAreaProps {
  petsInformation: IPetsData[];
}

const PetsAnimatedArea: React.FC<PetsAnimatedAreaProps> = ({
  petsInformation,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const petsListRef = useRef<Animated.ScrollView>(null);
  const scrollX = useSharedValue<number>(0);

  const petsList = useMemo<IPetsData[]>(
    () => [
      {
        id: 'leftVoid',
        ref: createRef(),
      },
      ...petsInformation,
      {
        id: 'rightVoid',
        ref: createRef(),
      },
    ],
    [petsInformation],
  );

  const scrollHandler = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x;
  });

  const onItemPress = useCallback((index: number) => {
    petsListRef.current?.scrollTo({
      x: (index - 1) * IMAGE_WIDTH,
    });
  }, []);

  const onPetsChange = useCallback(({nativeEvent}) => {
    const currentItem = Math.floor(nativeEvent.contentOffset.x / IMAGE_WIDTH);
    setCurrentIndex(currentItem);
  }, []);

  const renderItem = useCallback(
    (item: IPetsData, index: number) => {
      return (
        <PetsContainer
          key={index}
          index={index}
          item={item}
          scrollX={scrollX}
          onPetPress={onItemPress}
        />
      );
    },
    [scrollX, onItemPress],
  );

  return (
    <>
      <View style={styles.tabsContainer}>
        <PetsSelectionField
          petsList={petsList}
          scrollX={scrollX}
          currentIndex={currentIndex}
          onItemPress={onItemPress}
        />
      </View>
      <Animated.ScrollView
        ref={petsListRef}
        horizontal
        onScroll={scrollHandler}
        onMomentumScrollEnd={onPetsChange}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToInterval={IMAGE_WIDTH}
        style={styles.scrollContainer}>
        {petsList.map((item, index) => {
          if (!item.name) {
            return <View key={index} style={styles.voidSpace} />;
          }
          return renderItem(item, index);
        })}
      </Animated.ScrollView>
    </>
  );
};

export default PetsAnimatedArea;
