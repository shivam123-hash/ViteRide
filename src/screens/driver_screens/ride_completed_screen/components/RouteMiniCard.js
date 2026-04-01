import React from 'react';
import { View, Text, Image } from 'react-native';
import strings from '../../../../units/CommonStrings';

const RouteMiniCard = ({ styles }) => (
    <View style={styles.routeMiniCard}>
        <View style={styles.routeThumb}>
            <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA45UW8znCC-a2_oB_zRE8NwNVsFlvbSxVKgrk2k9iAjdotZATpxbsa5K7uWkJRmQylLvst9FlKlGoHoac79UPLO_p3zDv9PvU6VqCfjG41x56w9inKQYkkr3wThySq3IFkWSqJXnCwDW8E-EU4jhpUM7ZXOe-Lh7ln91C5lCHoCI0nElSfyzfK4fG4um0LQPW59dQqrxjS_QJXs0yeCbkNWo_j6ftaWTKe7PfYwlrkMU8Bxb-o1mTRrMbQBgQ_yP8cf4X3XYAY3t_O' }}
                style={styles.routeThumbImage}
                resizeMode="cover"
            />
        </View>
        <View>
            <Text style={styles.routeMiniLabel}>{strings.distanceTimeLabel}</Text>
            <Text style={styles.routeMiniValue}>{strings.distanceTimeValue}</Text>
        </View>
    </View>
);

export default RouteMiniCard;