import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://mpwxosdyzztuczeqnygv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wd3hvc2R5enp0dWN6ZXFueWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3ODQ3MTIsImV4cCI6MjA2NDM2MDcxMn0.fvzuGKaHs7dSFp8DBOV-hLUGkbp69D6AJfl2ljuGzkQ';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  realtime: {
    // No additional options needed here; 'enabled' is not a valid property.
  },
});