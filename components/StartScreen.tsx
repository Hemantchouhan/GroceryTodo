import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StartScreen = ({ onLogin, onSignup }: { onLogin?: () => void; onSignup?: () => void }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to GroceryTodo</Text>
        <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSignup}>
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
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
    button: {
        backgroundColor: '#8687E7',
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 32,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default StartScreen;
