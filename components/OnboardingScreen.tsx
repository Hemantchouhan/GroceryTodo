import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface OnboardingProps {
    title: string;
    description: string;
    image: React.ReactNode;
    onNext?: () => void;
    onBack?: () => void;
    showNext?: boolean;
    showBack?: boolean;
    buttonText?: string;
}

const OnboardingScreen: React.FC<OnboardingProps> = ({
    title,
    description,
    image,
    onNext,
    onBack,
    showNext = true,
    showBack = false,
    buttonText = 'NEXT',
}) => (
    <View style={styles.container}>
        <View style={styles.imageContainer}>{image}</View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.buttonRow}>
            {showBack && (
                <TouchableOpacity style={styles.button} onPress={onBack}>
                    <Text style={styles.buttonText}>BACK</Text>
                </TouchableOpacity>
            )}
            {showNext && (
                <TouchableOpacity style={styles.button} onPress={onNext}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            )}
        </View>
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
    imageContainer: {
        marginBottom: 32,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        color: '#AFAFAF',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 16,
    },
    button: {
        backgroundColor: '#8687E7',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginHorizontal: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default OnboardingScreen;
