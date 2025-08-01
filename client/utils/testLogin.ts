// Simple test utility for login functionality
import { directAuth } from './directAuth';

export const testLogin = {
  // Test if credentials are valid
  validateCredentials(email: string, password: string) {
    console.log('🧪 Testing credentials...');
    const result = directAuth.validateCredentials(email, password);
    console.log('🧪 Credential test result:', result);
    return result;
  },

  // Force create admin session
  forceAdminLogin() {
    console.log('🚨 Force creating admin session...');
    try {
      const adminUser = directAuth.createAdminSession();
      console.log('✅ Admin session created:', adminUser);
      return true;
    } catch (e) {
      console.error('❌ Failed to create admin session:', e);
      return false;
    }
  },

  // Check current login status
  checkLoginStatus() {
    const session = directAuth.getAdminSession();
    const isLoggedIn = directAuth.isAdminLoggedIn();
    
    console.log('🔍 Current login status:', {
      hasSession: !!session,
      isLoggedIn,
      sessionData: session
    });
    
    return { hasSession: !!session, isLoggedIn, sessionData: session };
  }
};

// Make available globally for testing
if (typeof window !== 'undefined') {
  (window as any).testLogin = testLogin;
}
