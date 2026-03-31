import React, { useState, useRef, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    StatusBar,
    Image,
    Animated,
    PanResponder,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Ionicons from '@react-native-vector-icons/ionicons';
import CommonColors from '../../../units/CommonColor';
import CommonBtn from '../../../components/CommonBtn';
import CommonStrings from '../../../units/CommonStrings';
import { useTheme } from '../../../common/ThemeContest';
import { RFValue } from 'react-native-responsive-fontsize';
import RideCard from './components/RideCard';
import CommonHeader from '../../../components/CommonHeader';
import strings from '../../../units/CommonStrings';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const HEADER_HEIGHT = 60;
const SAFE_AREA_TOP = 44;
const AVAILABLE_HEIGHT = SCREEN_HEIGHT - SAFE_AREA_TOP - HEADER_HEIGHT;

const SHEET_EXPANDED = SCREEN_HEIGHT * 0.55;
const SHEET_COLLAPSED = 72;

const RIDE_TYPES = [
    { id: 'economy', label: 'Economy', price: '$12.50', eta: '3 min', icon: 'directions-car', description: 'Affordable everyday rides' },
    { id: 'premium', label: 'Premium', price: '$24.00', eta: '5 min', icon: 'star', description: 'Luxury comfort & style', isDefault: true },
    { id: 'suv', label: 'SUV', price: '$35.20', eta: '7 min', icon: 'airport-shuttle', description: 'Extra space for groups' },
    { id: 'electric', label: 'Electric', price: '$15.75', eta: '4 min', icon: 'electric-car', description: 'Eco-friendly zero emission' },
];

const SelectRideScreen = ({ navigation }) => {

    const [selectedRide, setSelectedRide] = useState('premium');
    const [isExpanded, setIsExpanded] = useState(true);

    const sheetHeightRef = useRef(new Animated.Value(SHEET_EXPANDED));
    const lastHeight = useRef(SHEET_EXPANDED);
    const dragStartHeight = useRef(SHEET_EXPANDED);
    const panResponderRef = useRef(null);

    const { fonts, metrics } = useTheme();
    const styles = useMemo(() => createStyles(fonts, metrics), [fonts, metrics]);

    const sheetHeight = sheetHeightRef.current;
    const selectedData = RIDE_TYPES.find((r) => r.id === selectedRide);

    const snapTo = (toValue, expanded) => {
        lastHeight.current = toValue;
        setIsExpanded(expanded);
        Animated.spring(sheetHeight, {
            toValue,
            useNativeDriver: false,
            bounciness: 4,
        }).start();
    };

    if (panResponderRef.current === null) {
        panResponderRef.current = PanResponder.create({
            onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 5,
            onPanResponderGrant: () => {
                dragStartHeight.current = lastHeight.current;
            },
            onPanResponderMove: (_, g) => {
                const next = dragStartHeight.current - g.dy;
                const clamped = Math.max(SHEET_COLLAPSED, Math.min(SHEET_EXPANDED, next));
                sheetHeight.setValue(clamped);
            },
            onPanResponderRelease: (_, g) => {
                const currentH = dragStartHeight.current - g.dy;
                const midPoint = (SHEET_EXPANDED + SHEET_COLLAPSED) / 2;
                snapTo(
                    currentH > midPoint ? SHEET_EXPANDED : SHEET_COLLAPSED,
                    currentH > midPoint,
                );
            },
        });
    }

    const panResponder = panResponderRef.current;

    const mapHeight = sheetHeight.interpolate({
        inputRange: [SHEET_COLLAPSED, SHEET_EXPANDED],
        outputRange: [
            AVAILABLE_HEIGHT - SHEET_COLLAPSED - 12,
            AVAILABLE_HEIGHT - SHEET_EXPANDED - 12,
        ],
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={CommonColors.background} />

            <CommonHeader
                title={strings.selectRideHeader}
                onBackPress={() => navigation?.goBack()}
            />

            <TouchableOpacity
                activeOpacity={1}
                onPress={() => !isExpanded && snapTo(SHEET_EXPANDED, true)}
            >
                <Animated.View style={[styles.mapContainer, { height: mapHeight }]}>
                    <Image
                        source={{
                            uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmrWdngJFRkmm3BETQYBcWOOl_3UknouWOsqdj-KdqjB2NsfujRznetVcZAHf-XhvuJm4LPa-FIj6zhvuHsuJOlzZ_IfIX7mcOtaats_kZFJ-PaUpTn9Lfm8kjZA9eD3fqy-qiqbTlPA1_9Sgz2xKtw4aAuATezC9t7ScI7oSH0JVaWCUEzW8TgA5x3Lu9CEk9ba2MVcSXCNo9lgdq3o92aLlRyvcHZRX366A34NdbH8RtJFJZVELMu97CpavnByr5tVvk5nuurKSy',
                        }}
                        style={styles.mapImage}
                        resizeMode="cover"
                    />
                    <View style={styles.mapOverlay} />
                    <View style={styles.routeLine} />

                    <View style={[styles.pin, styles.pinOrigin]}>
                        <View style={styles.pinInner} />
                        <View style={styles.pinRing} />
                    </View>

                    <View style={[styles.pin, styles.pinDest]}>
                        <MaterialIcons
                            name="location-on"
                            size={metrics.iconSize.veryHigh}
                            color={CommonColors.primary}
                        />
                    </View>

                    <View style={styles.tripChip}>
                        <MaterialIcons name="straighten" size={14} color={CommonColors.textSecondary} />
                        <Text style={styles.tripChipText}>4.2 km · ~18 min</Text>
                    </View>

                    {!isExpanded && (
                        <View style={styles.expandHint}>
                            <MaterialIcons name="fullscreen" size={16} color={CommonColors.white} />
                            <Text style={styles.expandHintText}>Tap to expand</Text>
                        </View>
                    )}
                </Animated.View>
            </TouchableOpacity>

            <Animated.View style={[styles.bottomSheet, { height: sheetHeight }]}>

                <TouchableOpacity
                    onPress={() => snapTo(
                        isExpanded ? SHEET_COLLAPSED : SHEET_EXPANDED,
                        !isExpanded,
                    )}
                    activeOpacity={0.8}
                    style={styles.handleArea}
                    {...panResponder.panHandlers}
                >
                    <View style={styles.sheetHandle} />
                </TouchableOpacity>

                {isExpanded && (
                    <>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionLabel}>{strings.vehicleTypes}</Text>
                            <Text style={styles.sectionSub}>
                                {RIDE_TYPES.length} {strings.optionsAvailable}
                            </Text>
                        </View>

                        <ScrollView
                            style={styles.rideList}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.rideListContent}
                        >
                            {RIDE_TYPES.map((item) => (
                                <RideCard
                                    key={item.id}
                                    item={item}
                                    isSelected={selectedRide === item.id}
                                    onPress={setSelectedRide}
                                    styles={styles}
                                    metrics={metrics}
                                />
                            ))}
                        </ScrollView>

                        <View style={styles.priceSummary}>
                            <Text style={styles.priceSummaryLabel}>{strings.totalFare}</Text>
                            <Text style={styles.priceSummaryValue}>{selectedData?.price}</Text>
                        </View>

                        <CommonBtn
                            title={CommonStrings.confirmRide}
                            backgroundColor={CommonColors.primary}
                            textColor={CommonColors.white}
                            height={metrics.windowHeight * 0.065}
                            borderRadius={metrics.borderRadius.high}
                            marginTop={metrics.margin.medium}
                            elevation={2}
                            textStyle={styles.btnTextStyle}
                            rightComponent={
                                <Ionicons
                                    name="chevron-forward"
                                    size={metrics.iconSize.medium}
                                    color={CommonColors.white}
                                    style={styles.btnIcon}
                                />
                            }
                            onPress={() => console.log('Confirm pressed')}
                        />
                    </>
                )}
            </Animated.View>
        </SafeAreaView>
    );
};
const createStyles = (fonts, metrics) => StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: CommonColors.background,
    },

    mapContainer: {
        marginHorizontal: metrics.margin.high,
        borderRadius: metrics.borderRadius.veryHigh,
        overflow: 'hidden',
        backgroundColor: CommonColors.screenBg,
    },
    mapImage: {
        width: '100%',
        height: '100%',
        opacity: 0.3,
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(245,245,245,0.25)',
    },
    routeLine: {
        position: 'absolute',
        width: 2,
        height: 80,
        backgroundColor: CommonColors.primary,
        opacity: 0.3,
        top: '20%',
        left: '50%',
        borderRadius: 1,
    },
    pin: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pinOrigin: {
        top: '25%',
        left: '46%'
    },
    pinDest: {
        bottom: '20%',
        left: '43%'
    },
    pinInner: {
        width: 12,
        height: 12,
        borderRadius: metrics.borderRadius.tiny,
        backgroundColor: CommonColors.primary,
    },
    pinRing: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: metrics.borderRadius.medium,
        borderWidth: 2,
        borderColor: `${CommonColors.primary}30`,
    },
    tripChip: {
        position: 'absolute',
        bottom: metrics.margin.medium,
        right: metrics.margin.medium,
        flexDirection: 'row',
        alignItems: 'center',
        gap: metrics.margin.low,
        backgroundColor: CommonColors.white,
        paddingHorizontal: metrics.padding.medium,
        paddingVertical: metrics.padding.low,
        borderRadius: metrics.borderRadius.veryHigh,
        elevation: 3,
    },
    tripChipText: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(12),
        color: CommonColors.textSecondary,
    },
    expandHint: {
        position: 'absolute',
        bottom: metrics.margin.medium,
        left: metrics.margin.medium,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(0,0,0,0.45)',
        paddingHorizontal: metrics.padding.medium,
        paddingVertical: metrics.padding.low,
        borderRadius: metrics.borderRadius.veryHigh,
    },
    expandHintText: {
        fontFamily: fonts.regular,
        fontSize: RFValue(11),
        color: CommonColors.white,
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: CommonColors.white,
        borderTopLeftRadius: metrics.borderRadius.extraHigh,
        borderTopRightRadius: metrics.borderRadius.extraHigh,
        paddingHorizontal: metrics.padding.high,
        paddingBottom: metrics.padding.veryHigh,
        shadowColor: CommonColors.black,
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.06,
        shadowRadius: 30,
        elevation: 20,
        overflow: 'hidden',
    },
    handleArea: {
        alignItems: 'center',
        paddingVertical: metrics.padding.medium,
    },
    sheetHandle: {
        width: 40,
        height: 4,
        borderRadius: metrics.borderRadius.tiny,
        backgroundColor: CommonColors.border,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: metrics.margin.medium,
    },
    sectionLabel: {
        fontFamily: fonts.bold,
        fontSize: RFValue(11),
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: CommonColors.textLight,
    },
    sectionSub: {
        fontFamily: fonts.regular,
        fontSize: RFValue(12),
        color: CommonColors.textLight,
    },
    rideList: {
        maxHeight: 260

    },
    rideListContent: {
        gap: metrics.margin.low,
        paddingBottom: metrics.padding.tiny
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: CommonColors.screenBg,
        borderRadius: metrics.borderRadius.high,
        padding: metrics.padding.high,
        gap: metrics.margin.medium,
        borderWidth: 2,
        borderColor: 'transparent',
        overflow: 'hidden',
    },
    cardSelected: {
        backgroundColor: CommonColors.primary,
        borderColor: CommonColors.primary

    },
    cardIconWrapper: {
        width: 52,
        height: 52,
        borderRadius: metrics.borderRadius.medium,
        backgroundColor: CommonColors.white,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
    },
    cardIconWrapperSelected: {
        backgroundColor: 'rgba(255,255,255,0.15)'
    },
    cardInfo: {
        flex: 1

    },
    cardLabel: {
        fontFamily: fonts.bold,
        fontSize: RFValue(15),
        color: CommonColors.primary,
        marginBottom: 2

    },
    cardLabelSelected: {
        color: CommonColors.white

    },
    cardDescription: {
        fontFamily: fonts.regular,
        fontSize: RFValue(12),
        color: CommonColors.textSecondary
    },
    cardDescriptionSelected: {
        color: 'rgba(255,255,255,0.65)'
    },
    cardRight: {
        alignItems: 'flex-end',
        gap: metrics.margin.tiny
    },
    cardPrice: {
        fontFamily: fonts.bold,
        fontSize: RFValue(17),
        color: CommonColors.primary,
        letterSpacing: -0.3
    },
    cardPriceSelected: {
        color: CommonColors.white
    },
    etaBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: CommonColors.white,
        paddingHorizontal: metrics.padding.low,
        paddingVertical: 3,
        borderRadius: metrics.borderRadius.veryHigh
    },
    etaBadgeSelected: {
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    etaText: {
        fontFamily: fonts.semiBold,
        fontSize: RFValue(11),
        color: CommonColors.textSecondary
    },
    etaTextSelected: {
        color: CommonColors.white
    },
    selectedDot: {
        position: 'absolute',
        top: 12,
        left: 12,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    priceSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: metrics.padding.high,
        marginTop: metrics.margin.tiny,
        borderTopWidth: 1,
        borderTopColor: CommonColors.border,
        marginBottom: metrics.margin.medium,
    },
    priceSummaryLabel: {
        fontFamily: fonts.bold,
        fontSize: RFValue(18),
        color: CommonColors.textSecondary
    },
    priceSummaryValue: {
        fontFamily: fonts.bold,
        fontSize: RFValue(22),
        color: CommonColors.primary,
        letterSpacing: -0.5
    },
    btnTextStyle: {
        fontSize: RFValue(14),
        fontFamily: fonts.semiBold
    },
    btnIcon: {
        marginLeft: metrics.margin.low

    },
});

export default SelectRideScreen;