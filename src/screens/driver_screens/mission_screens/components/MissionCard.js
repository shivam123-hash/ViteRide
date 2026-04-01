import React from 'react';
import { View, Text, Image } from 'react-native';

const MissionCard = ({ mission, styles }) => {
    const progress = mission.current / mission.target;

    return (
        <View style={styles.missionCard}>
            <View style={styles.missionCardTop}>
                <View style={styles.missionTagBlock}>
                    <Text style={styles.missionTag}>{mission.tag}</Text>
                    <Text style={styles.missionTitle}>{mission.title}</Text>
                </View>

                <View style={[styles.bonusBadge, mission.bonusDark && styles.bonusBadgeDark]}>
                    <Text style={[styles.bonusBadgeText, mission.bonusDark && styles.bonusBadgeTextDark]}>
                        {mission.bonus}
                    </Text>
                </View>
            </View>

            <Image
                source={{ uri: mission.image }}
                style={styles.missionImage}
                resizeMode="cover"
            />

            <View style={styles.progressBlock}>
                <View style={styles.progressTopRow}>
                    <Text style={styles.progressDescription}>{mission.description}</Text>
                    <Text>
                        <Text style={styles.progressCounter}>{mission.current}</Text>
                        <Text style={styles.progressCounterTarget}>/{mission.target}</Text>
                    </Text>
                </View>

                <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, { width: `${Math.min(progress * 100, 100)}%` }]} />
                </View>

                <Text style={styles.progressFooter}>{mission.footer}</Text>
            </View>
        </View>
    );
};

export default MissionCard;