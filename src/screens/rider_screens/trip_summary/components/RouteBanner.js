import React from 'react';
import { View, Image } from 'react-native';

const RouteBanner = ({ styles }) => (
    <View style={styles.routeBanner}>
        <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKXKHuaJNN2S3qkZSycnGGhmIgilf4dQFqUYuZBM6IGb8wwXI2d8po7Gt7nER7GnewgSj1vkMmL4KNav2VrLRMmUDf5qev_4jp_05CvZJvO5O34iizC-IxkP3XtaCgRuI7UkKx0t-jFFUePwyIRow1HAMeVsG8M6pWGO3b5KDibeYvYD5kk7FI9-OyK6-B8LImDB6m8bQ1ufgm2x9xC0ciHbnOdhlBoJvcZwKUh1Oa--Rhcg2CoDWtBxI4jtQKcyOPe8Kl2IVnvCw-' }}
            style={styles.routeImage}
            resizeMode="cover"
        />
        <View style={styles.routeGradient} />
    </View>
);

export default RouteBanner;