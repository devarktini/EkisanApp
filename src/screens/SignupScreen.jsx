import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import { 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    ImageBackground, 
    Animated, 
    StyleSheet,
    Alert, 
    Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { signupAuthService } from '../services/authservice';

const SignupScreen = () => {
    const navigation = useNavigation();

    // Persist animated values with useRef
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            })
        ]).start();
    }, [fadeAnim, slideAnim]);

    const validateForm = () => {
        const { fullName, email, password, confirmPassword } = formData;

        if (!fullName || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'All fields are required.');
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            Alert.alert('Error', 'Invalid email format.');
            return false;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters.');
            return false;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return false;
        }

        return true;
    };

    const onChangeTextHandler = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const onHandlerSignup = async () => {
        if (!validateForm()) return;
    
        setIsSubmitting(true);
        const userData = {
            fullName: formData.fullName,
            email: formData.email
        };
    
        try {
            const results = await signupAuthService(formData.email, formData.password, userData);
            console.log("Signup Response: ", results);
    
            if (results.success) {
                Alert.alert('Success', 'Account created successfully!');
                navigation.navigate('SignIn');
            } else {
                Alert.alert('Signup Failed', results.error || 'Please try again.');
            }
        } catch (error) {
            console.error("Unexpected Error:", error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ImageBackground 
            source={require('../../assets/splashscreen_logo.png')}
            style={{ flex: 1 }}
            blurRadius={3}
        >
            <LinearGradient
                colors={['#2E7D32', '#1B5E20', '#004D40']}
                style={{ flex: 1 }}
            >
                <ScrollView style={{ flex: 1 }}>
                    <Animated.View 
                        style={[
                            styles.container,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }]
                            }
                        ]}
                    >
                        <View style={styles.headerWrapper}>
                            <View style={styles.logoWrapper}>
                                <Image
                                    source={require('../../assets/splashscreen_logo.png')}
                                    style={styles.logo}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.headerText}>Welcome</Text>
                            <Text style={styles.subHeaderText}>
                                Create your account to get started
                            </Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="email" size={20} color="#fff" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your Name"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    value={formData.fullName}
                                    onChangeText={(value) => onChangeTextHandler('fullName', value)}
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="email" size={20} color="#fff" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your email"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    value={formData.email}
                                    onChangeText={(value) => onChangeTextHandler('email', value)}
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
                                    value={formData.password}
                                    onChangeText={(value) => onChangeTextHandler('password', value)}
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
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="lock" size={20} color="#fff" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Re-enter your password"
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                    value={formData.confirmPassword}
                                    onChangeText={(value) => onChangeTextHandler('confirmPassword', value)}
                                    secureTextEntry={!showPassword1}
                                />
                                <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)}>
                                    <MaterialIcons
                                        name={showPassword1 ? "visibility" : "visibility-off"}
                                        size={20}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={onHandlerSignup} style={styles.signInButton}>
                                <Text style={styles.signInButtonText}>Sign Up</Text>
                            </TouchableOpacity>

                            <View style={styles.socialContainer}>
                                <Text style={styles.socialText}>Or continue with</Text>
                            </View>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                <Text style={styles.footerLink}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </ScrollView>
            </LinearGradient>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 48,
        flex: 1,
    },
    headerWrapper: {
        alignItems: 'center',
        marginBottom: 24,
    },
    logoWrapper: {
        width: 96,
        height: 96,
        backgroundColor: 'transparent',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        transform: [{ rotate: '12deg' }],
    },
    logo: {
        width: 80,
        height: 80,
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 8,
    },
    subHeaderText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
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
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginTop: 20,
    },
    signInButtonText: {
        color: '#4c669f',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    socialContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    socialText: {
        color: '#fff',
        marginBottom: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 24,
    },
    footerText: {
        color: '#fff',
        fontSize: 16,
    },
    footerLink: {
        color: '#4CAF50',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SignupScreen;
