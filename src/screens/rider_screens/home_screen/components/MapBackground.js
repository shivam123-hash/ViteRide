// src/components/MapBackground.js
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const MapBackground = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUlpLFa13j0xsATPSiT4R-ayhdmiYgTeshFuFbfYtZnyCx_axlWQO_xBXptkAJz66I6FzpNZ9NnSIv0c00bUVtePWEfl7AluxA02mOOHyDHlZcJeIvKrY1ZB4oNDvr0JG9-P3jHn9CBMzT1-FJH6RP-a1akyLZl1U2b95zzfB5oQd5NYdDImFHzZNhWLCy1_flZhVngXcJzLaFbWEyYCUDJtq4zT982hchofdZcp8wrnbmB_DACUt7G64GzYI0iOggIyMuzoJW83TM',
        }}
        style={styles.map}
        resizeMode="cover"
      />
      {/* Top fade overlay */}
      <View style={styles.overlayTop} />
      {/* Bottom fade overlay */}
      <View style={styles.overlayBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  map: {
    width,
    height,
    opacity: 0.35,
  },
  overlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
  },
});

export default MapBackground;