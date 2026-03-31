import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Svg, { Path, G, Rect, Circle } from 'react-native-svg';
import CommonColors from '../../../../units/CommonColor';

const RouteMap = () => (
    <View style={styles.container}>
        <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3a3rdBZzsre68JEnEYubNIdJ9O3WzbJBDHAwxYiEHRb5OFrh4WERoWOl_ay3FVbzo4rU3NpiWf5Jrpcd7hsOR3NoAPTqCYE_p-UILqOJ1fBWK90iaMI24WzMsewiH3HW-ZP1kziVWEQfC3uSpAS0kNbgfMwNcG0rC7-80AZNTcbO1zxt0glAXntvnuccA-qtGoXmE368vgXL5GyoxoboYvjQE_HukwACyauItW6UqZX8BqUsrJxM12BeQvk5Dk-DlUW5zQBjXU4po' }}
            style={styles.mapImage}
            resizeMode="cover"
        />
        <View style={styles.mapOverlay} />

        <Svg
            style={StyleSheet.absoluteFill}
            viewBox="0 0 400 800"
            preserveAspectRatio="none"
        >
            <Path
                d="M 100 600 Q 150 450 300 400 T 200 100"
                fill="none"
                stroke={CommonColors.primary}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <G transform="translate(190, 320) rotate(-45)">
                <Rect x="-10" y="-15" width="20" height="30" rx="4" fill={CommonColors.primary} />
                <Circle cx="0" cy="0" r="4" fill={CommonColors.white} />
            </G>

            <G transform="translate(200, 100)">
                <Circle cx="0" cy="0" r="8" fill={CommonColors.primary} />
                <Circle cx="0" cy="0" r="3" fill={CommonColors.white} />
            </G>
        </Svg>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    mapImage: {
        width: '100%',
        height: '100%',
        opacity: 0.4,
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(249,249,249,0.15)',
    },
});

export default RouteMap;