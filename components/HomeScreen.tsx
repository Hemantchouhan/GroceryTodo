import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    CreateCategory: undefined;
    // add other routes here if needed
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const [taskInput, setTaskInput] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Index</Text>
                <TouchableOpacity>
                    <Icon name="account-circle" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="What do you want to buy today?"
                    placeholderTextColor="#666"
                    value={taskInput}
                    onChangeText={setTaskInput}
                />
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="calendar-today" size={24} color="#8687E7" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="timer" size={24} color="#8687E7" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="flag" size={24} color="#8687E7" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navButton}>
                    <Icon name="home" size={24} color="#8687E7" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('CreateCategory')}>
                    <Icon name="add" size={32} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Icon name="calendar-today" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181A20',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 24,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputContainer: {
        padding: 16,
    },
    input: {
        backgroundColor: '#252A32',
        color: '#fff',
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 16,
    },
    iconButton: {
        width: 40,
        height: 40,
        backgroundColor: '#252A32',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#252A32',
        padding: 16,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    navButton: {
        padding: 8,
    },
    addButton: {
        backgroundColor: '#8687E7',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 28,
    },
});

export default HomeScreen;
