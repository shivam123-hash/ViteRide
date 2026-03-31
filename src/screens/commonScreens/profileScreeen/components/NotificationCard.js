import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '../../../../common/ThemeContest';
import CommonColors from '../../../../units/CommonColor';

const NotificationCard = ({ item }) => {
    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    return (
        <View style={styles.cardContainer}>
            {item.image && (
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
                    {item.badgeText && (
                        <View style={styles.badgeContainer}>
                            <Text style={styles.badgeText}>{item.badgeText}</Text>
                        </View>
                    )}
                </View>
            )}
            <View style={styles.cardContent}>
                <View style={styles.iconBox}>
                    <Ionicons name={item.icon} size={metrics.iconSize.high} color={CommonColors.white} />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardTime}>{item.time}</Text>
                    </View>

                    <Text style={styles.cardDescription}>{item.description}</Text>
                    {item.hasButton && (
                        <TouchableOpacity style={styles.cardButton} activeOpacity={0.7}>
                            <Text style={styles.cardButtonText}>View Details</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

const createStyles = (fonts, metrics) => StyleSheet.create({
    cardContainer: {
        backgroundColor: CommonColors.white,
        borderRadius: metrics.borderRadius.high,
        marginBottom: metrics.margin.high,
        overflow: 'hidden',
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },
    imageWrapper: {
        width: '100%',
        height: 130,
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    badgeContainer: {
        position: 'absolute',
        bottom: metrics.margin.medium,
        left: metrics.margin.high,
        backgroundColor: CommonColors.white,
        paddingHorizontal: metrics.padding.medium,
        paddingVertical: metrics.padding.tiny,
        borderRadius: metrics.borderRadius.tiny,
    },
    badgeText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(9),
        color: CommonColors.primary,
        letterSpacing: 0.5,
    },
    cardContent: {
        flexDirection: 'row',
        padding: metrics.padding.high,
    },
    iconBox: {
        width: 48,
        height: 48,
        backgroundColor: CommonColors.primary,
        borderRadius: metrics.borderRadius.medium,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: metrics.margin.high,
    },
    textContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: metrics.margin.tiny,
    },
    cardTitle: {
        fontFamily: fonts.bold,
        fontSize: RFValue(15),
        color: CommonColors.textPrimary,
        flex: 1,
        paddingRight: metrics.padding.low,
    },
    cardTime: {
        fontFamily: fonts.regular,
        fontSize: RFValue(10),
        color: CommonColors.textLight,
    },
    cardDescription: {
        fontFamily: fonts.regular,
        fontSize: RFValue(13),
        color: CommonColors.textSecondary,
        lineHeight: 20,
    },
    cardButton: {
        marginTop: metrics.margin.medium,
        alignSelf: 'flex-start',
        backgroundColor: '#F0F2F5',
        paddingHorizontal: metrics.padding.medium,
        paddingVertical: 8,
        borderRadius: metrics.borderRadius.medium,
    },
    cardButtonText: {
        fontFamily: fonts.bold,
        fontSize: RFValue(11),
        color: CommonColors.textPrimary,
    },
});

export default NotificationCard;