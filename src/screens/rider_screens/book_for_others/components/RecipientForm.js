import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import CommonColors from '../../../../units/CommonColor';
import strings from '../../../../units/CommonStrings';

const RecipientForm = ({
    recipientName,
    onChangeName,
    phoneNumber,
    onChangePhone,
    tripNote,
    onChangeTripNote,
    styles,
    metrics,
}) => (
    <View style={styles.formSection}>

        <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>{strings.recipientNameLabel}</Text>
            <TextInput
                style={styles.inputField}
                value={recipientName}
                onChangeText={onChangeName}
                placeholder={strings.recipientNamePlaceholder}
                placeholderTextColor={CommonColors.textLight}
                returnKeyType="next"
            />
        </View>

        <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>{strings.phoneLabel}</Text>
            <View style={styles.phoneRow}>
                <View style={styles.phoneCodeBox}>
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8eHw8TmWM8rtKQG8a5n4kRrpySmNjPfXk8oBfJI_gARYM1xtKYcalpGwWv5ftY6LFLdoMTmug6wKBcTLE7Ng-DoklhWuySqTGmSu30KbSvuYKv8yglvg-IHMqnv8RUCsi4aNErS0b3ksAAFGj3LSEd8-qZX24Qj3kSvyFMu4wD2MbvgHpwYgmYKOhN8qmWt9AyNFGMaTTXs--6Ol3wosA0aYhL4YUt_59U9eIXdpB6BxBhAFbhaQUTIQvSj6DRNdDPeQbRkOgDdkB' }}
                        style={styles.flagImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.phoneCodeText}>{strings.phoneCode}</Text>
                </View>

                <View style={styles.phoneInputWrapper}>
                    <TextInput
                        style={styles.phoneInput}
                        value={phoneNumber}
                        onChangeText={onChangePhone}
                        placeholder={strings.phonePlaceholder}
                        placeholderTextColor={CommonColors.textLight}
                        keyboardType="phone-pad"
                        returnKeyType="next"
                    />
                    <TouchableOpacity
                        style={styles.contactIcon}
                        onPress={() => console.log('Open contacts')}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons
                            name="contacts"
                            size={metrics.iconSize.high}
                            color={CommonColors.primary}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        <View style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>{strings.tripNoteLabel}</Text>
            <TextInput
                style={styles.textAreaField}
                value={tripNote}
                onChangeText={onChangeTripNote}
                placeholder={strings.tripNotePlaceholder}
                placeholderTextColor={CommonColors.textLight}
                multiline
                numberOfLines={3}
                returnKeyType="done"
            />
        </View>
    </View>
);

export default RecipientForm;