// src/components/PromoBanner.js
import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import CommonColors from '../../../../units/CommonColor';

const PromoBanner = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.container}>
        {/* Badge */}
        <View style={styles.content}>
          <View style={styles.textGroup}>
            <Text style={styles.badge}>EXCLUSIVE OFFER</Text>
            <Text style={styles.headline}>
              Refer a friend and{'\n'}get 50% off
            </Text>
          </View>

          <Text style={styles.body}>
            Share the luxury of seamless travel with your inner circle and unlock rewards for every successful invite.
          </Text>

          {/* CTA Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
          >
            <Text style={styles.buttonLabel}>Refer Now</Text>
          </TouchableOpacity>
        </View>

        {/* Decorative element */}
        <View style={styles.decorCircle} />
        <View style={styles.decorCircle2} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  container: {
    backgroundColor:CommonColors.background,
    borderRadius: 24,
    padding: 24,
    shadowColor: CommonColors.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.05,
    shadowRadius: 50,
    elevation: 5,
    borderWidth: 1,
    borderColor: CommonColors.border,
    overflow: 'hidden',
  },
  content: {
    gap: 12,
    zIndex: 1,
  },
  textGroup: {
    gap: 4,
  },
  badge: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 9,
    letterSpacing: 2.5,
    color: CommonColors.primary,
    textTransform: 'uppercase',
  },
  headline: {
    fontFamily: 'Manrope-Bold',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.5,
    color: CommonColors.primary,
  },
  body: {
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: 20,
    color: CommonColors.background,
    opacity: 0.85,
  },
  button: {
    backgroundColor:CommonColors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonLabel: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.5,
    color: CommonColors.white,
    textTransform: 'uppercase',
  },
  decorCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: CommonColors.primary,
    right: -20,
    top: -20,
  },
  decorCircle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor:CommonColors.primary,
    right: 40,
    top: -30,
  },
});

export default PromoBanner;