import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://snpawlutyqngwnsyehca.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNucGF3bHV0eXFuZ3duc3llaGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMjgzMzEsImV4cCI6MjA0NTgwNDMzMX0.IAP0-kszKr65w08IiZI2zUb_Y6IEwrws1MMJUSW9nS8';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);