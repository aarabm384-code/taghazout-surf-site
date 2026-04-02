import { createClient } from '@supabase/supabase-js'

// هاد القيم دابا محطوطين ديريكت باش نقطعو الشك فـ الـ Connection
const supabaseUrl = 'https://koofjrlzfelfmkbgzfpn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtvb2Zqcmx6ZmVsZm1rYmd6ZnBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2OTIyMTYsImV4cCI6MjA1NjI2ODIxNn0.V_XkGkm1he8D3_SsqIszvug_lSBGT0Jd78yR5N_rdxl'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)