
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const GlobalMetrics = {
    windowWidth: width,
    windowHeight: height,

    margin: {
        none: 0,
        tiny: 4,
        low: 8,
        medium: 12,
        high: 16,
        veryHigh: 24,
        extraHigh: 32,
        massive: 40,
    },

    padding: {
        none: 0,
        tiny: 4,
        low: 8,
        medium: 12,
        high: 16,
        veryHigh: 24,
        extraHigh: 32,
        massive: 40,
    },


    borderRadius: {
        none: 0,
        tiny: 4,
        low: 8,
        medium: 12,
        high: 16,
        veryHigh: 20,
        extraHigh: 24,
        circular: 999,
    },

    iconSize: {
        tiny: 12,
        low: 16,
        medium: 20,
        high: 24,
        veryHigh: 32,
    },
};

export default GlobalMetrics;