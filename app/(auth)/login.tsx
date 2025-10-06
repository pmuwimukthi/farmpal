import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/theme";
import InputContainer from "@/components/ui/input-container";
import CustomButton from "@/components/ui/custom-button";
import GoogleIcon from "@/components/ui/google-icon";
import { SetStateAction, useState } from "react";
import { FIREBASE_AUTH } from "@/config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;

  const router = useRouter();

  const signIn = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)");
    } catch (err: any) {
      let msg = "Something went wrong. Please try again.";
      // if (err.code === "auth/user-not-found") msg = "No account found with that email.";
      if (err.code === "auth/invalid-credential") msg = "Invalid Credentials.";
      alert(msg);
    }
  };

  const { signInWithGoogle, signOutGoogle, loading, user } = useGoogleLogin();


  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.main}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/farmpal-icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Header */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Farm Pal</Text>
          <Text style={styles.subtitle}>Welcome Back</Text>
        </View>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        {/* Email Input */}
        <InputContainer
          icon="person"
          placeholder="Email"
          value={email}
          onChangeText={(text: SetStateAction<string>) => { setEmail(text) }}
          autoCapitalize="none"
        />

        {/* Password Input */}
        <InputContainer
          icon="lock"
          placeholder="Password"
          inputType="password"
          value={password}
          onChangeText={(text: SetStateAction<string>) => { setPassword(text) }}
          autoCapitalize="none"
          secureTextEntry
        />

        {/* Forgot Password */}
        <CustomButton
          title="Forgot Password"
          onPress={() => { router.push("/forgot-password") }}
          buttonStyle={styles.forgotButton}
          textStyle={styles.forgotText}
        />

        {/* Login Button */}
        <CustomButton
          title="Login"
          onPress={signIn}
          buttonStyle={styles.loginButton}
          textStyle={styles.loginText}
        />

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google Login Button */}
        <CustomButton
          icon={<GoogleIcon size={24} />}
          title="Login with Google"
          onPress={signInWithGoogle}
          buttonStyle={styles.googleButton}
          textStyle={styles.googleText}
          // disabled={!request}
        />

        {/* Sign Up Button */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don’t have an account?</Text>
          <CustomButton
            title="Sign Up"
            onPress={() => { router.push("/signup") }}
            buttonStyle={styles.signupButton}
            textStyle={styles.signupButtonText}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* Container */
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  /* Main Section */
  main: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 75,
  },

  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 75,
    width: 120,
    height: 120,
    backgroundColor: Colors.light.greenLight,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 200,
    height: 200,
  },

  /* Text Section */
  textContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: Colors.light.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    letterSpacing: 0.5,
  },

  /* Form Section */
  formContainer: {
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },

  /* Forgot Password */
  forgotButton: {
    alignSelf: "flex-end",
    backgroundColor: "transparent",
  },
  forgotText: {
    color: Colors.light.textSecondary,
    fontSize: 15,
  },

  /* Login */
  loginButton: {
    backgroundColor: Colors.light.greenPrimary,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  loginText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  /* Divider */
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "rgba(0, 0, 0, 0.4)",
    fontSize: 14,
  },

  /* Google Button */
  googleButton: {
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: 20,
  },
  googleText: {
    color: Colors.light.textPrimary,
    fontSize: 18,
  },

  /* Sign Up */
  signupContainer: {
    width: "100%",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 16,
  },
  signupButton: {
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.light.greenPrimary,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.greenPrimary,
  },
});