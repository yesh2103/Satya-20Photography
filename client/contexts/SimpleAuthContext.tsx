import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { directAuth } from '@/utils/directAuth';
import type { User as AppUser } from '@shared/types';

interface SimpleAuthContextType {
  user: any | null;
  appUser: AppUser | null;
  loading: boolean;
  isOwner: boolean;
  signOut: () => Promise<{ error: any | null }>;
}

const SimpleAuthContext = createContext<SimpleAuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(SimpleAuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a SimpleAuthProvider');
  }
  return context;
};

interface SimpleAuthProviderProps {
  children: ReactNode;
}

export const SimpleAuthProvider = ({ children }: SimpleAuthProviderProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for admin session on mount
    const checkSession = () => {
      console.log('🔄 Checking admin session...');
      
      const adminSession = directAuth.getAdminSession();
      if (adminSession) {
        console.log('✅ Admin session found:', adminSession);
        
        setAppUser({
          id: adminSession.id,
          name: adminSession.name,
          email: adminSession.email,
          role: 'owner',
          phone: null,
          created_at: adminSession.created_at
        });

        setUser({
          id: adminSession.id,
          email: adminSession.email,
          email_confirmed_at: adminSession.email_confirmed_at,
          created_at: adminSession.created_at
        });
      } else {
        console.log('ℹ️ No admin session found');
        setUser(null);
        setAppUser(null);
      }
      
      setLoading(false);
    };

    checkSession();

    // Set up a periodic check for session changes
    const interval = setInterval(checkSession, 500); // Check every 0.5 seconds

    // Auto-logout when window/tab closes
    const handleBeforeUnload = () => {
      directAuth.clearAdminSession();
    };

    // Add event listener for window close
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const signOut = async () => {
    directAuth.clearAdminSession();
    setUser(null);
    setAppUser(null);
    return { error: null };
  };

  const isOwner = appUser?.role === 'owner';

  const value = {
    user,
    appUser,
    loading,
    isOwner,
    signOut
  };

  return (
    <SimpleAuthContext.Provider value={value}>
      {children}
    </SimpleAuthContext.Provider>
  );
};
