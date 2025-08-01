import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { User as AppUser } from '@shared/types';

interface AuthContextType {
  user: User | null;
  appUser: AppUser | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: { name: string; phone?: string }) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  updateProfile: (updates: Partial<AppUser>) => Promise<{ error: Error | null }>;
  isOwner: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchAppUser(session.user.id);
      }
      
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchAppUser(session.user.id);
        } else {
          setAppUser(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchAppUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching app user:', JSON.stringify(error, null, 2));
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });

        // If user doesn't exist in our users table (PGRST116 = not found), create it for the admin
        if (error.code === 'PGRST116') {
          const { data: authUser } = await supabase.auth.getUser();
          if (authUser.user?.email?.toLowerCase() === 'rajkarthikeya10@gmail.com') {
            console.log('Creating admin user profile...');
            const { error: insertError } = await supabase
              .from('users')
              .insert({
                id: userId,
                name: 'Satya Photography Admin',
                email: authUser.user.email,
                role: 'owner'
              });

            if (insertError) {
              console.error('Error creating admin user:', JSON.stringify(insertError, null, 2));
            } else {
              console.log('Admin user profile created successfully');
              // Retry fetching the user
              const { data: newData, error: retryError } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();

              if (!retryError && newData) {
                setAppUser(newData);
              } else {
                console.error('Error retrying user fetch:', JSON.stringify(retryError, null, 2));
              }
            }
          }
        }
        return;
      }

      setAppUser(data);
    } catch (error) {
      console.error('Unexpected error in fetchAppUser:', error);
    }
  };

  const signUp = async (email: string, password: string, userData: { name: string; phone?: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
          }
        }
      });

      if (error) return { error };

      // Create user profile in our users table
      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            name: userData.name,
            email: email,
            phone: userData.phone || null,
            role: 'user'
          });

        if (profileError) {
          console.error('Error creating user profile:', JSON.stringify(profileError, null, 2));
          // Return the error to show to user
          return { error: { message: `Failed to create user profile: ${profileError.message}` } as AuthError };
        }
      }

      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string) => {
    // Check if this is the admin email (case insensitive)
    if (email.toLowerCase() !== 'rajkarthikeya10@gmail.com') {
      return { error: { message: 'Only admin access is permitted' } as AuthError };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Login error:', JSON.stringify(error, null, 2));
    }

    // If login successful but user doesn't exist in our users table, create it
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email?.toLowerCase() === 'rajkarthikeya10@gmail.com') {
        // Ensure user exists in our users table
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (fetchError && fetchError.code === 'PGRST116') {
          // User doesn't exist, create it
          console.log('Creating user profile for logged in admin...');
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: user.id,
              name: 'Satya Photography Admin',
              email: user.email,
              role: 'owner'
            });

          if (insertError) {
            console.error('Error creating user profile:', JSON.stringify(insertError, null, 2));
          } else {
            console.log('User profile created successfully');
          }
        }
      }
    }

    return { error };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const updateProfile = async (updates: Partial<AppUser>) => {
    try {
      if (!user) return { error: new Error('No user logged in') };

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (error) return { error: new Error(error.message) };

      // Refresh app user data
      await fetchAppUser(user.id);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const isOwner = appUser?.role === 'owner';

  const value = {
    user,
    appUser,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    updateProfile,
    isOwner
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
