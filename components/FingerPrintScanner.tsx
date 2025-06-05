import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FingerPrintScanner = ({ onSuccess, onError }: { onSuccess?: () => void; onError?: () => void }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Place your finger on the scanner</Text>
        <Icon name="fingerprint" size={80} color="#8687E7" style={styles.icon} />
        <TouchableOpacity style={styles.button} onPress={onSuccess}>
            <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.errorButton} onPress={onError}>
            <Text style={styles.errorText}>Not recognized? Try again</Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    icon: {
        marginBottom: 32,
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
    errorButton: {
        marginTop: 16,
    },
    errorText: {
        color: '#E57373',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default FingerPrintScanner;
