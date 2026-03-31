import React from 'react';
import { View, Text, Image } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';
import strings from '../../../../units/CommonStrings';

const DriverCard = ({ styles, metrics }) => (
    <View style={styles.detailCard}>
        <View style={styles.driverAvatarWrapper}>
            <Image
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCXn7fwDZfQb_iARaJg1lDbar93lojUQP7PxZOqcsfzw_Icl1Vd2NPqfuPTTUxySyXdoPdN0-WMorVZvSobBEvx16LdNTZBozy-qOqOenf0k2D1o-5DzZMUJqlr4WrS3BMhShdGa73cSU4Qo1XScWM6M2Tt2uOBVUF-wwAFGLjgrNkbAMOdqsVpDVNyzbEk4KxgOMgE2BCetWKW_QweOwqy5ykGvUDjMmyPyK3ezjaKSpGoYnF4LTn_W1EnKhY3Oh8j0Pcw2ez7PqI' }}
                style={styles.driverAvatar}
                resizeMode="cover"
            />
            <View style={styles.driverRatingBadge}>
                <MaterialIcons name="star" size={9} color={CommonColors.primary} />
                <Text style={styles.driverRatingText}>{strings.driverRatingInTransit}</Text>
            </View>
        </View>
        <View style={styles.detailCardRight}>
            <Text style={styles.detailCardSubLabel}>{strings.yourDriverLabel}</Text>
            <Text style={styles.detailCardTitle}>{strings.driverName}</Text>
        </View>
    </View>
);

export default DriverCard;