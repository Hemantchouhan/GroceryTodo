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
import { api } from '../utils/api';

type Category = {
  name: string;
  icon: string;
  color: string;
  itemCount: number;
};

const CategoryScreen = ({ navigation }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    
    // Set up a listener for when the screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCategories();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      
      // Get all products
      const products = await api.getAllProducts();
      
      if (products) {
        // Count items by category
        const categoryCounts = {};
        products.forEach(item => {
          const category = item.category || 'Uncategorized';
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });

        // Generate category data with counts
        const categoryData = Object.keys(categoryCounts).map(name => {
          // Assign a color and icon based on category name
          const color = getCategoryColor(name);
          const icon = getCategoryIcon(name);
          
          return {
            name,
            icon,
            color,
            itemCount: categoryCounts[name]
          };
        });

        setCategories(categoryData);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch categories');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    // Map category names to colors
    const colorMap = {
      'Dairy': '#FF8080',
      'Produce': '#80FFFF',
      'Meat': '#80FF9F',
      'Bakery': '#FF80EB',
      'Frozen': '#FC80FF',
      'Beverages': '#80CFFF',
      'Snacks': '#FF8080',
      'Health': '#80FFA3',
      'Household': '#80D1FF',
      'Pantry': '#FFCC80',
      'Uncategorized': '#AFAFAF'
    };
    
    return colorMap[category] || `#${Math.floor(Math.random()*16777215).toString(16)}`;
  };

  const getCategoryIcon = (category: string) => {
    // Map category names to icons
    const iconMap = {
      'Dairy': 'shopping-cart',
      'Produce': 'eco',
      'Meat': 'restaurant',
      'Bakery': 'breakfast-dining',
      'Frozen': 'ac-unit',
      'Beverages': 'local-drink',
      'Snacks': 'fastfood',
      'Health': 'favorite',
      'Household': 'cleaning-services',
      'Pantry': 'kitchen',
      'Uncategorized': 'help-outline'
    };
    
    return iconMap[category] || 'label';
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => navigation.navigate('ListPage', { category: item.name })}>
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Icon name={item.icon} size={24} color="#FFFFFF" />
      </View>
      <View style={styles.categoryDetails}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.itemCount}>{item.itemCount} Items</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#AFAFAF" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Grocery Categories</Text>
        <TouchableOpacity>
          <Icon name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Category List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8687E7" />
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={item => item.name}
          contentContainerStyle={styles.categoryList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No categories found</Text>
            </View>
          }
        />
      )}

      {/* Add Category Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateList')}>
        <Icon name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('IndexScreen')}>
          <Icon name="home" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Grocery</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Icon name="category" size={24} color="#8687E7" />
          <Text style={[styles.navText, styles.activeNavText]}>Categories</Text>
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
  categoryList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#363636',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  itemCount: {
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

export default CategoryScreen;