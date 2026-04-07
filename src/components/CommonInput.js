import React, { memo, useState, useCallback } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CommanInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  placeholderTextColor = '#fff',
  iconName,
  iconSize = 18,
  iconColor = '#fff',
  textInput,
  enabled = true
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = secureTextEntry;

  const handleTogglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <View style={[styles.inputContainer, style]}>

      {!isPasswordField && iconName && (
        <Ionicons
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      )}
      {isPasswordField && (
        <TouchableOpacity >
          <Ionicons
            name={'lock-closed'}
            size={18}
            color={iconColor}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      <TextInput
        editable={enabled}
        style={[styles.input, textInput]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPasswordField && !showPassword}
        keyboardType={keyboardType}
      />
      {isPasswordField && (
        <TouchableOpacity onPress={handleTogglePassword}>
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={23}
            color={iconColor}
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(CommanInput);

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#7A869A',
    height: windowHeight / 17,
    borderRadius: 15,
    paddingHorizontal: windowWidth * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 10,
    width: '100%',
    backgroundColor: '#F1F4F8',
    justifyContent: 'space-between'
  },
  input: {
    color: '#000',
    fontSize: RFValue(12),
    height: '100%',
    width: '70%',
    paddingBottom: 6
  },
  icon: {
    padding: 5
  },
});
