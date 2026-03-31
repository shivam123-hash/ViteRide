import React from 'react';
import { View, Text, Image } from 'react-native';
import strings from '../../../../units/CommonStrings';

const DriverSnapshot = ({ styles }) => (
    <View style={styles.driverSnapshot}>
        <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAftJiIq1PqtzFn-9y08lIsQqvk8maxi3T2p7GqfBwq2bWOtJiC8Q5MH15gjm-5nY7s31XjRhM1wJFfoyBktSAWqD8lHF3OLRb_Is2kErWD3n8wsOyCW5D6aZoDGMd5r2Ci1G6V70Y3SK1_EfMJtYgPEiABLkvmGT3DHa4AxvtDomQAkSrStvsTDyO1RNQEGavXYzvGhSg_Z39j84zJnKkqbe5gRfXGkEDlriOZsbrwbVOiWDrdoMqJLrJuZPgifY45aw38aIcrmT_M' }}
            style={styles.driverAvatar}
            resizeMode="cover"
        />
        <View>
            <Text style={styles.driverName}>{strings.driverNameSummary}</Text>
            <Text style={styles.driverVehicle}>{strings.driverVehicleSummary}</Text>
        </View>
    </View>
);

export default DriverSnapshot;