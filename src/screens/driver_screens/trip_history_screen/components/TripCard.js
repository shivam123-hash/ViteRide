import React from 'react';
import { View, Text } from 'react-native';
import strings from '../../../../units/CommonStrings';

const TripCard = ({ trip, styles }) => {
    const isCompleted = trip.status === 'completed';
    const isCancelled = trip.status === 'cancelled';

    return (
        <View style={[styles.tripCard, isCancelled && styles.tripCardCancelled]}>
            <Text style={styles.tripDatetime}>{trip.datetime}</Text>

            <View style={styles.tripRouteWrapper}>
                <View style={styles.routeLineCol}>
                    <View style={styles.dotFilled} />
                    <View style={styles.routeConnector} />
                    <View style={styles.dotOutline} />
                </View>

                <View style={styles.routeStopsCol}>
                    <View style={styles.routeStopBlock}>
                        <Text style={styles.routeStopName}>{trip.pickup}</Text>
                        <Text style={styles.routeStopLabel}>{strings.pickupLabel}</Text>
                    </View>
                    <View style={styles.routeStopBlock}>
                        <Text style={styles.routeStopName}>{trip.dropoff}</Text>
                        <Text style={styles.routeStopLabel}>{strings.dropoffLabel}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.tripCardBottom}>
                <Text style={[
                    styles.tripAmount,
                    isCancelled && styles.tripAmountCancelled,
                ]}>
                    {trip.amount}
                </Text>

                <View style={[
                    styles.statusBadge,
                    isCompleted && styles.statusBadgeCompleted,
                    isCancelled && styles.statusBadgeCancelled,
                ]}>
                    <Text style={[
                        styles.statusText,
                        isCompleted && styles.statusTextCompleted,
                        isCancelled && styles.statusTextCancelled,
                    ]}>
                        {isCompleted ? strings.statusCompleted : strings.statusCancelled}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default TripCard;