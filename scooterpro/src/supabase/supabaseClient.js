import { createClient } from '@supabase/supabase-js';

const supaUrl = process.env.REACT_APP_SUPA_URL;
const supaKey = process.env.REACT_APP_SUPA_KEY;
const supabase = createClient(supaUrl, supaKey);

export default supabase;