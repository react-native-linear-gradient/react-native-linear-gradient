import LinearGradientAndroid from './index.android.js';
import LinearGradientIos from './index.ios.js';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';

const LinearGradient =
  Platform.OS === 'ios' ? LinearGradientIos : LinearGradientAndroid;

LinearGradient.propTypes = {
  end: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  start: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
};
export default LinearGradient;
