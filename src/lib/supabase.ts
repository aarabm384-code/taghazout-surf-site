import { createClient } from '@supabase/supabase-js'

// استعمل هاد الطريقة باش يقرأ من Vercel ومن الحاسوب بجوج بلا مشاكل
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://koofjrlzfelfmkbgzfpn.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJp... (كمل الكود الطويل هنا)'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)