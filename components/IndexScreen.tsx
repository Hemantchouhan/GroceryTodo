import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api, Product } from '../utils/api';

type GroceryItem = Product & {
  date?: string;
};

const IndexScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('Today');
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroceryItems();

    // Set up a listener for when the screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchGroceryItems();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchGroceryItems = async () => {
    try {
      setLoading(true);
      const products = await api.getAllProducts();

      // Add date field for display purposes
      const items = products.map(product => ({
        ...product,
        date: new Date().toLocaleDateString() + ', ' + new Date().getHours() + ':' + new Date().getMinutes()
      }));



      setGroceryItems(items);
    } catch (error) {
      console.error('Failed to fetch grocery items:', error);
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
    <TouchableOpacity
      style={[styles.groceryItem, item.completed && styles.completedItem]}
      onPress={() => toggleItemCompletion(item.id, item.completed)}>
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
            {item.name}
          </Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
        </View>
      </View>
      <Text style={styles.itemTime}>{item.date}</Text>
    </TouchableOpacity>
  );

  const filteredItems = () => {
    switch (activeTab) {
      case 'Today':
        return groceryItems.filter(item => item.date?.includes('Today') ||
          new Date().toLocaleDateString() === item.date?.split(',')[0]);
      case 'Upcoming':
        return groceryItems.filter(item => !item.completed);
      case 'Done':
        return groceryItems.filter(item => item.completed);
      default:
        return groceryItems;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Grocery List</Text>
        <TouchableOpacity>
          <Icon name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Today', 'Upcoming', 'Done'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Grocery List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8687E7" />
        </View>
      ) : (
        <FlatList
          data={filteredItems()}
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

      {/* Add Grocery Item Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateList')}>
        <Icon name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#8687E7" />
          <Text style={[styles.navText, styles.activeNavText]}>Grocery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('CategoryScreen')}>
          <Icon name="category" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Categories</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="calendar-today" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="person" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    marginRight: 20,
    paddingBottom: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#8687E7',
  },
  tabText: {
    fontSize: 16,
    color: '#AFAFAF',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '500',
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
  itemTime: {
    fontSize: 14,
    color: '#AFAFAF',
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
    bottom: 90,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8687E7',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    backgroundColor: '#363636',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 4,
  },
  activeNavText: {
    color: '#8687E7',
  },
});

export default IndexScreen;