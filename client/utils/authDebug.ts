// Authentication Debug Utilities
import { supabase } from '@/lib/supabase';

export const debugAuth = {
  // Test database connection
  async testConnection() {
    try {
      console.log('🔍 Testing Supabase connection...');
      const { data, error } = await supabase.from('users').select('count(*)').limit(1);
      
      if (error) {
        console.error('❌ Database connection failed:', JSON.stringify(error, null, 2));
        return false;
      }
      
      console.log('✅ Database connection successful');
      return true;
    } catch (error) {
      console.error('❌ Unexpected connection error:', error);
      return false;
    }
  },

  // Check current auth status
  async checkAuthStatus() {
    try {
      console.log('🔍 Checking auth status...');
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ Auth session error:', JSON.stringify(error, null, 2));
        return null;
      }
      
      if (session?.user) {
        console.log('✅ User authenticated:', {
          id: session.user.id,
          email: session.user.email,
          confirmed: session.user.email_confirmed_at
        });
        return session.user;
      }
      
      console.log('ℹ️ No active session');
      return null;
    } catch (error) {
      console.error('❌ Unexpected auth error:', error);
      return null;
    }
  },

  // Check if user exists in users table
  async checkUserProfile(userId: string) {
    try {
      console.log('🔍 Checking user profile for ID:', userId);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('❌ User profile error:', JSON.stringify(error, null, 2));
        
        if (error.code === 'PGRST116') {
          console.log('ℹ️ User profile does not exist (PGRST116)');
        }
        
        return null;
      }
      
      console.log('✅ User profile found:', data);
      return data;
    } catch (error) {
      console.error('❌ Unexpected profile error:', error);
      return null;
    }
  },

  // Run full diagnostic
  async runDiagnostic() {
    console.log('🚀 Starting authentication diagnostic...');
    
    const connected = await this.testConnection();
    if (!connected) return;
    
    const user = await this.checkAuthStatus();
    if (user) {
      await this.checkUserProfile(user.id);
    }
    
    console.log('✅ Diagnostic complete');
  }
};

// Make it available globally for easy testing
if (typeof window !== 'undefined') {
  (window as any).debugAuth = debugAuth;
}
