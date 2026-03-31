import React, { useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from '../../../../common/ThemeContest';
import CommonBtn from '../../../../components/CommonBtn';
import strings from '../../../../units/CommonStrings';
import GlobalMetrics from '../../../../units/GlobalMetricsStyles';

const DocumentUploadCard = ({
    iconName,
    title,
    description,
    file,
    onPress,
}) => {
    const { colors, fonts } = useTheme();
    const styles = useMemo(() => createStyles(colors, fonts), [colors, fonts]);

    const isUploaded = !!file;

    return (
        <View style={styles.card}>
            <View style={styles.topRow}>
                <Ionicons
                    name={iconName}
                    size={GlobalMetrics.iconSize.medium}
                    color={colors.textPrimary}
                />

                <View style={[styles.badge, isUploaded ? styles.badgeUploaded : styles.badgePending]}>
                    <Text style={[styles.badgeText, isUploaded && styles.badgeTextUploaded]}>
                        {isUploaded ? strings.documentUploaded : strings.documentPending}
                    </Text>
                </View>
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.desc}>{description}</Text>

            <CommonBtn
                title={isUploaded ? strings.documentChangeFile : strings.documentUpload}
                backgroundColor={isUploaded ? '#EFEFEF' : colors.textPrimary}
                textColor={isUploaded ? colors.textPrimary : colors.white}
                height={50}
                borderRadius={GlobalMetrics.borderRadius.high}
                textStyle={styles.btnText}
                leftComponent={
                    <Ionicons
                        name={isUploaded ? 'pencil' : 'cloud-upload-outline'}
                        size={GlobalMetrics.iconSize.low}
                        color={isUploaded ? colors.textPrimary : colors.white}
                        style={styles.leftIcon}
                    />
                }
                onPress={onPress}
            />
        </View>
    );
};

const createStyles = (colors, fonts) =>
    StyleSheet.create({
        card: {
            backgroundColor: colors.white,
            borderRadius: GlobalMetrics.borderRadius.extraHigh,
            padding: GlobalMetrics.padding.veryHigh,
            marginBottom: GlobalMetrics.margin.high,
            elevation:5
        },
        topRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: GlobalMetrics.margin.high,
        },
        badge: {
            paddingHorizontal: GlobalMetrics.padding.medium,
            paddingVertical: 6,
            borderRadius: GlobalMetrics.borderRadius.circular,
        },
        badgePending: {
            backgroundColor: '#F3F3F3',
        },
        badgeUploaded: {
            backgroundColor: '#F1F6F2',
        },
        badgeText: {
            fontSize: RFValue(9),
            fontFamily: fonts.bold,
            color: '#A0A0A0',
        },
        badgeTextUploaded: {
            color: '#4A8F59',
        },
        title: {
            fontSize: RFValue(24),
            fontFamily: fonts.bold,
            color: colors.textPrimary,
            marginBottom: GlobalMetrics.margin.low,
        },
        desc: {
            fontSize: RFValue(12),
            lineHeight: RFValue(18),
            fontFamily: fonts.regular,
            color: colors.textSecondary,
            marginBottom: GlobalMetrics.margin.extraHigh,
        },
        btnText: {
            fontSize: RFValue(13),
            fontFamily: fonts.semiBold,
        },
        leftIcon: {
            marginRight: GlobalMetrics.margin.medium,
        },
    });

export default DocumentUploadCard;