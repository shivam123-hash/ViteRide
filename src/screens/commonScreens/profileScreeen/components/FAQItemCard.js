import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from '../../../../common/ThemeContest';
import CommonColors from '../../../../units/CommonColor';

const FAQItemCard = ({ item, isExpanded, onPress }) => {
    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    return (
        <TouchableOpacity
            style={styles.faqCard}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={metrics.iconSize.medium}
                    color={CommonColors.textSecondary}
                />
            </View>
            {isExpanded && (
                <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswer}>{item.answer}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const createStyles = (fonts, metrics) => StyleSheet.create({
    faqCard: {
        backgroundColor: CommonColors.white,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.high,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        fontFamily: fonts.bold,
        fontSize: RFValue(13),
        color: CommonColors.textPrimary,
        flex: 1,
        paddingRight: metrics.padding.medium,
        lineHeight: 20,
    },
    faqAnswerContainer: {
        marginTop: metrics.margin.medium,
        paddingTop: metrics.margin.medium,
        borderTopWidth: 1,
        borderTopColor: CommonColors.border,
    },
    faqAnswer: {
        fontFamily: fonts.regular,
        fontSize: RFValue(12),
        color: CommonColors.textSecondary,
        lineHeight: 20,
    },
});

export default FAQItemCard;