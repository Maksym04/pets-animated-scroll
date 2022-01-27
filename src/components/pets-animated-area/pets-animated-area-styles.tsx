import {StyleSheet} from 'react-native';
import {VOID_SPACE} from '../../constants/constants';

const styles = StyleSheet.create({
  tabsContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    overflow: 'visible',
    height: 50,
  },
  scrollContainer: {
    marginTop: 40,
  },
  voidSpace: {
    width: VOID_SPACE,
  },
});

export default styles;
