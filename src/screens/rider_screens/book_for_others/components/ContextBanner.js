import React from 'react';
import { View, Text, Image } from 'react-native';
import strings from '../../../../units/CommonStrings';

const ContextBanner = ({ styles }) => (
    <View style={styles.bannerContainer}>
        <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS7U86vbMR3dUk74HPpzwirxmQ9MzK_WX1iHzMph6WxBEJqgUUwt68FnGMRUi1Fr2JfxVgBTusLP6K9cVwSMNONYi7S99BeMusxIuAch_Lq60FM2_A_8-W1XbMGwS76LkCArhFRky213Z110MqQkUfd-Szkf0q1WeICJwh7lDhMsC7rGB5HAHGeGmzRUfvV02WE1z6Y4K5q8nGltTS2tVNQdHiYtSszCuxikyopQ6N0Me6C05ds4QLk9KKknotc4B5xgiC6DnnGhS1' }}
            style={styles.bannerImage}
            resizeMode="cover"
        />
        <View style={styles.bannerGradient}>
            <Text style={styles.bannerLabel}>{strings.premiumServiceLabel}</Text>
            <Text style={styles.bannerTitle}>{strings.premiumServiceTitle}</Text>
        </View>
    </View>
);

export default ContextBanner;