import {StyleSheet} from 'react-native';
import {IMAGE_WIDTH} from '../../constants/constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 120,
  },
  imageBorder: {
    borderColor: 'white',
    borderRadius: 100,
    borderWidth: 5,
    overflow: 'hidden',
  },
  image: {
    width: 180,
    height: 180,
  },
});

export default styles;
