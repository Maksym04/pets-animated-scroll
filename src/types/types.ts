import {ImageSourcePropType} from 'react-native';

export interface IMeasure {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IPetsData {
  id: number | string;
  circleColor?: CircleColor;
  name?: string;
  image?: ImageSourcePropType;
  ref: React.RefObject<any>;
}

export enum CircleColor {
  Yellow = 'yellow',
  Green = 'green',
  Brown = 'brown',
  Orange = 'orange',
  Red = 'red',
  Grey = 'grey',
  Pink = 'pink',
  Indigo = 'indigo',
  Snow = 'snow',
  Purple = 'purple',
  CadetBlue = 'cadetBlue',
  Turquoise = 'turquoise',
}
