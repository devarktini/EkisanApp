import React, { useState, useContext } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity, SafeAreaView, Image, Animated, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { signinAuthService } from '../services/authservice';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const fadeAnim = new Animated.Value(0);
    const navigation = useNavigation();
    const { login } = useContext(AppContext);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }

        setLoading(true);
        const response = await signinAuthService(email, password);
        setLoading(false);
        console.log("35", response);
        if (response.success) {
            Toast.show({
                type: "success",
                text1: response.message,
                text2: "Welcome back!",
                position: "top",
            });
            await login(response.tokenResponse.idToken, response.userData);
            navigation.replace("Main", { user: response.userData });
        } else {
            Alert.alert("Login Failed", response.error);
        }
    };

    return (
        <LinearGradient
            colors={['#2E7D32', '#1B5E20', '#004D40']}
            className="flex-1"
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <Animated.View style={[
                    styles.container,
                    {
                        opacity: fadeAnim,
                        transform: [{
                            translateY: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [50, 0]
                            })
                        }]
                    }
                ]}>
                    {/* Logo and Header */}
                    <View style={styles.headerContainer}>
                        <Image
                            source={require('../../assets/splashscreen_logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.headerText}>Welcome Back</Text>
                        <Text style={styles.subHeaderText}>Sign in to continue to eKisan</Text>
                    </View>

                    {/* Input Container */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <MaterialIcons name="email" size={20} color="#fff" />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <MaterialIcons name="lock" size={20} color="#fff" />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <MaterialIcons
                                    name={showPassword ? "visibility" : "visibility-off"}
                                    size={20}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
                            <LinearGradient
                                colors={['#66BB6A', '#388E3C']}
                                style={styles.signInButtonGradient}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={styles.signInButtonText}>Sign In</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={styles.optionsContainer}>
                            <TouchableOpacity>
                                <Text style={styles.linkText}>Forgot Password?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                                <Text style={styles.linkText}>Create Account</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.socialContainer}>
                            <Text style={styles.socialText}>Or continue with</Text>
                        </View>
                    </View>
                </Animated.View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subHeaderText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
    },
    inputContainer: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
        padding: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: '#fff',
        fontSize: 16,
    },
    signInButton: {
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    signInButtonGradient: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    signInButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    linkText: {
        color: '#fff',
        fontSize: 14,
    },
    socialContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    socialText: {
        color: '#fff',
        marginBottom: 20,
    },
});
export default SignInScreen;