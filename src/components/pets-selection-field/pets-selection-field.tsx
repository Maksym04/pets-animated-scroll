import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {isNil} from 'lodash';
import {IMeasure, IPetsData} from '../../types/types';
import Pointer from '../pointer/pointer';
import Tab from './tab';
import styles from './pets-selection-field-styles';

interface PetsSelectionFieldProps {
  petsList: IPetsData[];
  scrollX: SharedValue<number>;
  currentIndex: number;
  onItemPress: (index: number) => void;
}

const PetsSelectionField: React.FC<PetsSelectionFieldProps> = ({
  petsList,
  scrollX,
  currentIndex,
  onItemPress,
}) => {
  const [measure, setMeasure] = useState<IMeasure[]>([]);
  const offsetX = useSharedValue<number>(0);
  const petsListRef = useRef<ScrollView>(null);
  const containerRef = useRef<View>(null);

  useEffect(() => {
    const m: IMeasure[] = [];
    petsList.forEach(item => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x: number, y: number, width: number, height: number) => {
          m.push({
            x,
            y,
            width,
            height,
          });
          if (m.length === petsList.length) {
            setMeasure(m);
          }
        },
      );
    });
  }, [petsList]);

  useEffect(() => {
    if (!isNil(measure[currentIndex])) {
      let x: number;
      if (currentIndex < 3) {
        x = 0;
        offsetX.value = 5;
      } else if (currentIndex >= petsList.length - 3) {
        x = measure[currentIndex].x;
        offsetX.value = -5;
      } else {
        x = measure[currentIndex].x - measure[currentIndex - 1].x;
        offsetX.value = 0;
      }
      petsListRef.current?.scrollTo({
        x: x,
      });
    }
  }, [measure, currentIndex, petsList, offsetX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(offsetX.value, {
            duration: 500,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <Animated.ScrollView
        ref={petsListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}>
        <View ref={containerRef} style={styles.selectionsField}>
          {petsList.map((item: IPetsData, index: number) => {
            return (
              <Tab
                key={item.id}
                index={index}
                item={item}
                ref={item.ref}
                scrollX={scrollX}
                onItemPress={() => onItemPress(index)}
              />
            );
          })}
        </View>
        {measure.length > 0 && <Pointer measures={measure} scrollX={scrollX} />}
      </Animated.ScrollView>
    </Animated.View>
  );
};

export default PetsSelectionField;
