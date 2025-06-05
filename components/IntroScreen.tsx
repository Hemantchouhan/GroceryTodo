import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const IntroScreen = ({ onNext }: { onNext?: () => void }) => (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <View style={styles.logoBox}>
                <Text style={styles.logoText}>✓</Text>
            </View>
            <Text style={styles.appName}>GroceryTodo</Text>
        </View>
        {onNext && (
            <View style={{ marginTop: 80 }}>
                <Text style={styles.nextText} onPress={onNext}>
                    NEXT
                </Text>
            </View>
        )}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181A20',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoBox: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: '#252A32',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    logoText: {
        color: '#8687E7',
        fontSize: 48,
        fontWeight: 'bold',
    },
    appName: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 16,
    },
    nextText: {
        color: '#8687E7',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 40,
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#252A32',
        overflow: 'hidden',
        textAlign: 'center',
    },
});

export default IntroScreen;
