import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Types for our database
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          role: 'user' | 'owner';
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          phone?: string | null;
          role?: 'user' | 'owner';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          role?: 'user' | 'owner';
          created_at?: string;
        };
      };
      media: {
        Row: {
          id: string;
          title: string | null;
          type: 'photo' | 'video';
          service_type: 'wedding' | 'prewedding' | 'newborn' | 'birthdays' | 'retirement' | 'events' | 'engagement';
          url: string;
          uploaded_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title?: string | null;
          type: 'photo' | 'video';
          service_type: 'wedding' | 'prewedding' | 'newborn' | 'birthdays' | 'retirement' | 'events' | 'engagement';
          url: string;
          uploaded_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string | null;
          type?: 'photo' | 'video';
          service_type?: 'wedding' | 'prewedding' | 'newborn' | 'birthdays' | 'retirement' | 'events' | 'engagement';
          url?: string;
          uploaded_by?: string;
          created_at?: string;
        };
      };
      contact_form_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          event_type: 'wedding' | 'prewedding' | 'newborn' | 'birthdays' | 'retirement' | 'events' | 'engagement';
          event_date: string;
          message: string | null;
          submitted_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          event_type: 'wedding' | 'prewedding' | 'newborn' | 'birthdays' | 'retirement' | 'events' | 'engagement';
          event_date: string;
          message?: string | null;
          submitted_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          event_type?: 'wedding' | 'prewedding' | 'newborn' | 'birthdays' | 'retirement' | 'events' | 'engagement';
          event_date?: string;
          message?: string | null;
          submitted_at?: string;
        };
      };
      packages: {
        Row: {
          id: string;
          title: string;
          description: string;
          price_range: string;
          service_type: 'wedding' | 'prewedding' | 'newborn' | 'birthdays' | 'retirement' | 'events' | 'engagement';
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          price_range: string;
          service_type: 'wedding' | 'prewedding' | 'newborn' | 'birthdays' | 'retirement' | 'events' | 'engagement';
          created_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          price_range?: string;
          service_type?: 'wedding' | 'prewedding' | 'newborn' | 'birthdays' | 'retirement' | 'events' | 'engagement';
          created_by?: string;
          created_at?: string;
        };
      };
    };
  };
};
