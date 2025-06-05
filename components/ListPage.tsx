import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api, Product } from '../utils/api';

type GroceryItem = Product & {
  date?: string;
};

const ListPage = ({ route, navigation }: any) => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Get category from route params if available
  const category = route.params?.category || null;

  useEffect(() => {
    fetchGroceryItems();
  }, [category]);

  const fetchGroceryItems = async () => {
    try {
      setLoading(true);
      const products = await api.getAllProducts();
      
      // Add date field for display purposes and filter by category if needed
      let items = products.map(product => ({
        ...product,
        date: new Date().toLocaleDateString() + ', ' + new Date().getHours() + ':' + new Date().getMinutes()
      }));
      
      // Filter by category if provided
      if (category) {
        items = items.filter(item => item.category === category);
      }
      
      setGroceryItems(items);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch grocery items');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItemCompletion = async (id: string, currentStatus: boolean) => {
    try {
      await api.updateProduct(id, { completed: !currentStatus });
      
      // Update local state
      setGroceryItems(
        groceryItems.map(item =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update item status');
      console.error(error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await api.deleteProduct(id);
      
      // Update local state
      setGroceryItems(groceryItems.filter(item => item.id !== id));
      
    } catch (error) {
      Alert.alert('Error', 'Failed to delete item');
      console.error(error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#FF4949';
      case 'medium':
        return '#FFA64C';
      case 'low':
        return '#4CAF50';
      default:
        return '#4CAF50';
    }
  };

  const renderGroceryItem = ({ item }: { item: GroceryItem }) => (
    <View style={[styles.groceryItem, item.completed && styles.completedItem]}>
      <View style={styles.itemLeftSection}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            item.completed && styles.checkedBox,
            { borderColor: getPriorityColor(item.priority) },
          ]}
          onPress={() => toggleItemCompletion(item.id, item.completed)}>
          {item.completed && (
            <Icon name="check" size={16} color="#FFFFFF" />
          )}
        </TouchableOpacity>
        <View style={styles.itemDetails}>
          <Text
            style={[
              styles.itemTitle,
              item.completed && styles.completedItemText,
            ]}>
            {item.name} {item.quantity && `(${item.quantity})`}
          </Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}>
        <Icon name="delete" size={20} color="#FF4949" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {category ? category : 'All Items'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Grocery List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8687E7" />
        </View>
      ) : (
        <FlatList
          data={groceryItems}
          renderItem={renderGroceryItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.groceryList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No items found</Text>
            </View>
          }
        />
      )}

      {/* Add Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateList')}>
        <Icon name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  groceryList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  groceryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#363636',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  completedItem: {
    opacity: 0.7,
  },
  itemLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: '#8687E7',
    borderColor: '#8687E7',
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  completedItemText: {
    textDecorationLine: 'line-through',
    color: '#AFAFAF',
  },
  itemCategory: {
    fontSize: 14,
    color: '#AFAFAF',
  },
  deleteButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#AFAFAF',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8687E7',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default ListPage;