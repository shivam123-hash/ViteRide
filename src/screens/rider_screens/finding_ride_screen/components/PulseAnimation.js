import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import CommonColors from '../../../../units/CommonColor';

const PulseRing = ({ delay }) => {
    const scale   = useRef(new Animated.Value(0.33)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            scale.setValue(0.33);
            opacity.setValue(0);

            Animated.sequence([
                Animated.delay(delay),
                Animated.parallel([
                    Animated.timing(scale, {
                        toValue: 1.2,
                        duration: 3000,
                        useNativeDriver: true,
                    }),
                    Animated.sequence([
                        Animated.timing(opacity, {
                            toValue: 0.12,
                            duration: 1500,
                            useNativeDriver: true,
                        }),
                        Animated.timing(opacity, {
                            toValue: 0,
                            duration: 1500,
                            useNativeDriver: true,
                        }),
                    ]),
                ]),
            ]).start(() => animate());
        };

        animate();
    }, []);

    return (
        <Animated.View
            style={[
                styles.ring,
                { transform: [{ scale }], opacity },
            ]}
        />
    );
};

const PulseAnimation = () => (
    <View style={styles.container}>
        <PulseRing delay={0} />
        <PulseRing delay={1000} />
        <PulseRing delay={2000} />
        <View style={styles.dot} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ring: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: CommonColors.primary,
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: CommonColors.primary,
    },
});

export default PulseAnimation;