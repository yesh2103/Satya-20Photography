// Direct authentication utility to bypass hanging Supabase calls
import { supabase } from '@/lib/supabase';

export const directAuth = {
  // Simple credential check without Supabase auth
  validateCredentials(email: string, password: string): boolean {
    const adminEmail = 'rajkarthikeya10@gmail.com';
    const adminPassword = 'SatyaANil@0804';
    
    return email.toLowerCase() === adminEmail.toLowerCase() && password === adminPassword;
  },

  // Create a mock session for the admin
  createAdminSession() {
    const adminUser = {
      id: 'admin-user-id',
      email: 'Rajkarthikeya10@gmail.com',
      name: 'Satya Photography Admin',
      role: 'owner',
      email_confirmed_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    // Store in sessionStorage
    sessionStorage.setItem('admin_session', JSON.stringify(adminUser));
    return adminUser;
  },

  // Get current admin session
  getAdminSession() {
    try {
      const session = sessionStorage.getItem('admin_session');
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  },

  // Clear admin session
  clearAdminSession() {
    sessionStorage.removeItem('admin_session');
  },

  // Check if admin is logged in
  isAdminLoggedIn(): boolean {
    return !!this.getAdminSession();
  }
};
