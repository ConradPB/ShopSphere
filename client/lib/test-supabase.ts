import { supabase } from './supabase'

async function testSupabase() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')

    

    console.log('Products:', products)
  }
}

testSupabase()