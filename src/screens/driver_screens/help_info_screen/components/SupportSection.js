import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import strings from '../../../../units/CommonStrings';

const SupportSection = ({ styles, onContactSupport }) => (
    <View style={styles.supportSection}>
        <Text style={styles.supportTitle}>{strings.needMoreHelp}</Text>
        <Text style={styles.supportSubtitle}>{strings.needMoreHelpSubtitle}</Text>
        <TouchableOpacity
            style={styles.contactBtn}
            activeOpacity={0.88}
            onPress={onContactSupport}
        >
            <Text style={styles.contactBtnText}>{strings.contactSupportBtn}</Text>
        </TouchableOpacity>
    </View>
);

export default SupportSection;