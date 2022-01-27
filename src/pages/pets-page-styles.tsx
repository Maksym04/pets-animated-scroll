import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#e6e6fa',
  },
  scrollViewContainer: {
    paddingTop: 25,
  },
  mainContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  background: {
    position: 'absolute',
    backgroundColor: '#5f9ea0',
    opacity: 1,
    width: '100%',
    height: 700,
    top: -461,
    zIndex: -1,
  },
  petsScrollContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default styles;
