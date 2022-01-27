import {Dimensions} from 'react-native';

export const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} =
  Dimensions.get('window');

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('screen');

export const IMAGE_WIDTH = 235;

export const VOID_SPACE = (SCREEN_WIDTH - IMAGE_WIDTH) / 2;
