import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseKey: string = process.env.REACT_APP_SUPABASE_API_KEY || "";

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
