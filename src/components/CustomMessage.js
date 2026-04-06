import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from '@react-native-vector-icons/ionicons';
import { hideMessage } from '../redux/features/messageSlice/messageSlice';

const { width } = Dimensions.get('window');

const CustomMessage = () => {
    const dispatch = useDispatch();
    const { visible, text, type } = useSelector((state) => state.message);

    const [isRendered, setIsRendered] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-50)).current;

    useEffect(() => {
        let timer;
        if (visible) {
            setIsRendered(true);
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }),
            ]).start();
            timer = setTimeout(() => {
                dispatch(hideMessage());
            }, 3000);
        } else {
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: -50, duration: 250, useNativeDriver: true }),
            ]).start(() => {
                setIsRendered(false);
            });
        }
        return () => clearTimeout(timer);
    }, [visible, text, dispatch, fadeAnim, translateY]);

    if (!isRendered) return null;

    const isSuccess = type === 'success';

    return (
        <Animated.View
            pointerEvents="none"
            style={[
                styles.container,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY }],
                },
            ]}
        >
            <Ionicons
                name={isSuccess ? "checkmark-circle" : "alert-circle"}
                size={24}
                color={isSuccess ? "#10b981" : "#ef4444"}
            />
            <Text style={styles.text}>{text}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 60,
        alignSelf: 'center',
        zIndex: 9999,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 12,
        width: width * 0.9,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.3,
        marginLeft: 12,
        flex: 1,
    },
});

export default CustomMessage;