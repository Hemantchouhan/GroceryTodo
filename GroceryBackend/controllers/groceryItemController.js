const supabase = require('../config/supabase');

// Get all grocery items
exports.getAllItems = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('grocery_items')
      .select('*');
    
    if (error) throw error;
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single grocery item by ID
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('grocery_items')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new grocery item
exports.createItem = async (req, res) => {
  try {
    const { name, quantity, category, priority, completed } = req.body;
    
    const { data, error } = await supabase
      .from('grocery_items')
      .insert([{ name, quantity, category, priority, completed }])
      .select();
    
    if (error) throw error;
    
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a grocery item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, category, priority, completed } = req.body;
    
    const { data, error } = await supabase
      .from('grocery_items')
      .update({ name, quantity, category, priority, completed })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (data.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a grocery item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('grocery_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};