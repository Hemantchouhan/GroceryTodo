# Grocery Backend API

A REST API for grocery application built with Node.js, Express, and Supabase.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   PORT=3000
   ```

3. Start the server:
   ```
   npm start
   ```
   
   For development with auto-reload:
   ```
   npm run dev
   ```

## API Endpoints

### Grocery Items

- `GET /api/items` - Get all grocery items
- `GET /api/items/:id` - Get a specific grocery item
- `POST /api/items` - Create a new grocery item
- `PUT /api/items/:id` - Update a grocery item
- `DELETE /api/items/:id` - Delete a grocery item

## Database Schema

The API assumes you have a `grocery_items` table in your Supabase database with the following structure:

- `id` (auto-generated)
- `name` (string)
- `quantity` (string)
- `category` (string)
- `priority` (string)
- `completed` (boolean)
- `created_at` (timestamp with timezone, default: now())