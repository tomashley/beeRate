import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ccdevamyzihnfdoshxoq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjZGV2YW15emlobmZkb3NoeG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyODcyNDMsImV4cCI6MjAxMDg2MzI0M30._rvZ3LgSvGDclNiInc9HsIaDw4_gqP5D-7sieAc08qw';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
