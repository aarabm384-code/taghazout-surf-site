import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://koofjrlzfelfmkbgzfpn.supabase.co";
const supabaseAnonKey = "sb_publishable_Dc7Gkm1he8D3_SsqIszvug_lSBGT0Jd";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);