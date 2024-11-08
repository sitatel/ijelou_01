import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { supabase } from '../config/supabase';

interface AuthUser extends User {
  role?: 'admin' | 'client';
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data?.role;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return 'client';
    }
  };

  const handleUserSession = async (session: any) => {
    if (session?.user) {
      const role = await getUserRole(session.user.id);
      setUser({ ...session.user, role });
      
      // Redirect based on role
      const from = (location.state as any)?.from?.pathname || '/';
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from);
      }
    } else {
      setUser(null);
      navigate('/login');
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await authService.getSession();
        if (session) {
          await handleUserSession(session);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (session) {
        await handleUserSession(session);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { session } = await authService.signInWithEmail(email, password);
      await handleUserSession(session);
    } catch (error) {
      console.error('SignIn error:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const { session } = await authService.signUpWithEmail(email, password);
      await handleUserSession(session);
    } catch (error) {
      console.error('SignUp error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading,
        signInWithEmail,
        signUpWithEmail,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}