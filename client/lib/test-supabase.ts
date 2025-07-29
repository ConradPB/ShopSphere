import { supabase } from './supabase';

async function test() {
  const { data, error } = await supabase.from('products').select('*');
  console.log('Data:', data, 'Error:', error);
}

test();
