// API client for interacting with the local server

const API_URL = 'http://192.168.1.35:3000/api';

export type Product = {
  id?: string;
  name: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  quantity: string;
};

export const api = {
  // Get all grocery items
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_URL}/items`);
      if (!response.ok) throw new Error('Failed to fetch items');
      return response.json();
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  // Get item by ID
  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await fetch(`${API_URL}/items/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch item with ID ${id}`);
      return response.json();
    } catch (error) {
      console.error(`Error fetching item ${id}:`, error);
      throw error;
    }
  },

  // Create new item
  createProduct: async (product: Product): Promise<Product> => {
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Failed to create item');
      return response.json();
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  // Update item
  updateProduct: async (id: string, product: Partial<Product>): Promise<Product> => {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error(`Failed to update item with ID ${id}`);
      return response.json();
    } catch (error) {
      console.error(`Error updating item ${id}:`, error);
      throw error;
    }
  },

  // Delete item
  deleteProduct: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Failed to delete item with ID ${id}`);
    } catch (error) {
      console.error(`Error deleting item ${id}:`, error);
      throw error;
    }
  },
};