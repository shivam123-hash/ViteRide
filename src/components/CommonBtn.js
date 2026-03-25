import React, { memo } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Dimensions,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CommonButton = ({
  title = "Button",
  onPress,
  disabled = false,
  loading = false,
  backgroundColor = "#FAB713",
  height =  windowHeight/ 20,
  width = "100%",
  borderRadius = 10,
  marginTop = 15,
  elevation = 6,
  textColor = "#fff",
  fontSize = RFValue(12),
//   fontFamily = Fonts.PoppinsBold,
  leftComponent = null,
  rightComponent = null,
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? "#ccc" : backgroundColor,
          height,
          width,
          borderRadius,
          marginTop,
          elevation,
        },
        containerStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {leftComponent}
          <Text
            style={[
              styles.text,
              {
                color: textColor,
                fontSize,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightComponent}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default memo(CommonButton);

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginRight:5
  },
});
