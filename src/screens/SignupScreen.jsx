import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    ImageBackground, 
    Dimensions, 
    Animated, 
    StyleSheet,
    Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const SignupScreen = () => {
    const navigation = useNavigation();
    const fadeAnim = new Animated.Value(0);
    const slideAnim = new Animated.Value(50);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
        React.useEffect(() => {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }, []);
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
    }, []);

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

    const onChangeTextHandler = (value) => {
        setFormData({
            ...formData,
            [value]: value  });
    }

    const onHandlerSignup = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Mock API request
            const response = await new Promise((resolve) =>
                setTimeout(() => resolve({ success: true }), 2000)
            );

            if (response.success) {
                Alert.alert('Success', 'Account created successfully!');
                navigation.navigate('Home'); // Navigate to home or desired screen
            } else {
                Alert.alert('Error', 'Signup failed. Please try again.');
            }
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ImageBackground 
            source={require('../../assets/icon.png')}
            className="flex-1"
            blurRadius={3}
        >
            <LinearGradient
                colors={['#4CAF50',  '#2E7D32', '#FFFFFF']} className="flex-1"
                
            >
                <ScrollView className="flex-1">
                    <Animated.View 
                        className="px-4 pt-12 flex w-full"
                        style={{
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }}
                    >
                        <View className="flex-col items-center justify-center mb-8">
                            <View className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl items-center justify-center mb-6 shadow-xl rotate-12">
                                <Ionicons name="leaf-outline" size={48} color="white" />
                            </View>
                            <Text className="text-4xl font-bold text-center mb-3 text-green-600 tracking-wider">
                                Welcome
                            </Text>
                            <Text className="text-center text-white mb-4 text-lg">
                                Create your account to get started
                            </Text>
                        </View>

                        <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <MaterialIcons name="email" size={20} color="#fff" />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Name"
                                placeholderTextColor="#rgba(255,255,255,0.7)"
                                value={formData.fullName}
                                onChangeText={()=>{onChangeTextHandler('name')}}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <MaterialIcons name="email" size={20} color="#fff" />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="#rgba(255,255,255,0.7)"
                                value={formData.email}
                                onChangeText={()=>{onChangeTextHandler('email')}}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <MaterialIcons name="lock" size={20} color="#fff" />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor="#rgba(255,255,255,0.7)"
                                value={formData.password}
                                onChangeText={()=>{onChangeTextHandler('passowrd')}}
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
                                placeholder="Renter your password"
                                placeholderTextColor="#rgba(255,255,255,0.7)"
                                value={formData.confirmPassword}
                                onChangeText={()=>{onChangeTextHandler('confirmPassword')}}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)}>
                                <MaterialIcons
                                    name={showPassword ? "visibility" : "visibility-off"}
                                    size={20}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.signInButton}>
                            <Text style={styles.signInButtonText}>Sign Up</Text>
                        </TouchableOpacity>

                        <View style={styles.socialContainer}>
                            <Text style={styles.socialText}>Or continue with</Text>
                            
                        </View>
                    </View>

                        <View className="flex-row justify-center mt-8 mb-8">
                            <Text className="text-white text-lg">Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                <Text className="text-green-600 font-bold text-lg">Login</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </ScrollView>
            </LinearGradient>
        </ImageBackground>
    );
};

// Styles
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
        color: '#rgba(255,255,255,0.8)',
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
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    socialButton: {
        borderRadius: 10,
        overflow: 'hidden',
    },
});

export default SignupScreen;


