import { Colors } from "../../constants/theme";
import { JSX } from "react";
import { StyleProp, TouchableOpacityProps } from "react-native";
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, View, ActivityIndicator } from "react-native";

type CustomButtonProps = {
    icon?: string | JSX.Element;
    title: string;
    onPress?: (data?: any) => void;
    data?: any;
    buttonStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
} & TouchableOpacityProps;

export default function CustomButton({ icon, title, onPress, data, buttonStyle, textStyle, loading, ...props }: CustomButtonProps) {
    return loading ? (
        <ActivityIndicator size="small" color={Colors.light.tint} />
    ) : (
        <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={() => {
                if (onPress) onPress(data);
            }}
            {...props}
        >
            <View style={styles.content}>
                {icon && <View style={styles.icon}>{icon}</View>}
                <Text style={[styles.text, textStyle]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 12,
        backgroundColor: "#2196F3",
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 16,
    },
    icon: {
        marginRight: 16,
    },
});