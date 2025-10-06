import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TextInput, View, StyleSheet, TextInputProps } from "react-native";

type InputContainerProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  placeholder: string;
  inputType?: "text" | "password";
} & TextInputProps;

export default function InputContainer({
  icon,
  placeholder,
  inputType = "text",
  ...props
}: InputContainerProps) {
  return (
    <View style={styles.inputContainer}>
      <MaterialIcons
        name={icon}
        size={20}
        color="rgba(0, 0, 0, 0.4)"
        style={styles.inputIcon}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        secureTextEntry={inputType === "password"}
        style={styles.input}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e7ebe7ff",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "transparent",
    marginBottom: 18,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});