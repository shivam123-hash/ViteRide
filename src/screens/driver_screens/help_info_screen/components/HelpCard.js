import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';

const HelpCard = ({ card, styles, metrics }) => (
    <View style={styles.helpCard}>
        <View style={styles.helpCardTitleRow}>
            <View style={[styles.helpCardIconBox, card.iconDark && styles.helpCardIconBoxDark]}>
                <MaterialIcons
                    name={card.icon}
                    size={metrics.iconSize.medium}
                    color={card.iconDark ? CommonColors.white : CommonColors.primary}
                />
            </View>
            <Text style={styles.helpCardTitle}>{card.title}</Text>
        </View>

        <Text style={styles.helpCardBody}>{card.body}</Text>

        {card.showProgress && (
            <View style={styles.progressTrack}>
                <View style={[
                    styles.progressFill,
                    { width: `${Math.min(card.progressValue * 100, 100)}%` },
                ]} />
            </View>
        )}
    </View>
);

export default HelpCard;