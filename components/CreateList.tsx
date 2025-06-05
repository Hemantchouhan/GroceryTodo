import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../utils/api';

type CreateListProps = {
  onAdd: () => void;
  navigation: any;
};

export default function CreateList({ onAdd, navigation }: CreateListProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [loading, setLoading] = useState(false);

  const handleAddItem = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter an item name');
      return;
    }

    try {
      setLoading(true);
      
      await api.createProduct({
        name,
        quantity: quantity || '1',
        category: category || 'Uncategorized',
        priority,
        completed: false
      });
      
      Alert.alert('Success', 'Item added successfully');
      onAdd();
      navigation.navigate('IndexScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to add item');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Grocery Item</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Enter item name"
            placeholderTextColor="#AFAFAF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={styles.input}
            placeholder="Enter quantity"
            placeholderTextColor="#AFAFAF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>
          <TextInput
            value={category}
            onChangeText={setCategory}
            style={styles.input}
            placeholder="Enter category"
            placeholderTextColor="#AFAFAF"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityContainer}>
            <TouchableOpacity
              style={[
                styles.priorityButton,
                priority === 'low' && styles.activePriorityButton,
                { backgroundColor: priority === 'low' ? '#4CAF50' : '#363636' },
              ]}
              onPress={() => setPriority('low')}>
              <Text style={styles.priorityText}>Low</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.priorityButton,
                priority === 'medium' && styles.activePriorityButton,
                { backgroundColor: priority === 'medium' ? '#FFA64C' : '#363636' },
              ]}
              onPress={() => setPriority('medium')}>
              <Text style={styles.priorityText}>Medium</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.priorityButton,
                priority === 'high' && styles.activePriorityButton,
                { backgroundColor: priority === 'high' ? '#FF4949' : '#363636' },
              ]}
              onPress={() => setPriority('high')}>
              <Text style={styles.priorityText}>High</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Add Button */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={handleAddItem}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.addButtonText}>Add to List</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#363636',
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activePriorityButton: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  priorityText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#8687E7',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});