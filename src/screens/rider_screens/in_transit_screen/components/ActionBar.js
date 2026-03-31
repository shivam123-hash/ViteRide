import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';
import strings from '../../../../units/CommonStrings';

const ActionBar = ({ styles, metrics, onCall, onChat, onSOS }) => (
    <View style={styles.actionBar}>
        <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.85}
            onPress={onCall}
        >
            <MaterialIcons
                name="call"
                size={metrics.iconSize.medium}
                color={CommonColors.white}
            />
            <Text style={styles.actionBtnText}>{strings.callBtn}</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.85}
            onPress={onChat}
        >
            <MaterialIcons
                name="chat-bubble"
                size={metrics.iconSize.medium}
                color={CommonColors.white}
            />
            <Text style={styles.actionBtnText}>{strings.chatBtn}</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.sosBtn}
            activeOpacity={0.85}
            onPress={onSOS}
        >
            <View style={styles.sosInner}>
                <MaterialIcons
                    name="shield"
                    size={metrics.iconSize.veryHigh}
                    color={CommonColors.danger}
                />
            </View>
        </TouchableOpacity>
    </View>
);

export default ActionBar;