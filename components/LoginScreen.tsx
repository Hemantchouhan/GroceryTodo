import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen = ({ onLogin, onGoogle }: { onLogin?: () => void; onGoogle?: () => void }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#AFAFAF" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#AFAFAF" secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton} onPress={onGoogle}>
            <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181A20',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#252A32',
        color: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        width: '100%',
    },
    button: {
        backgroundColor: '#8687E7',
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 32,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    googleButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 32,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#181A20',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default LoginScreen;
