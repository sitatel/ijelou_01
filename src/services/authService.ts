import { supabase } from '../config/supabase';
import { User, Session, AuthError as SupabaseAuthError } from '@supabase/supabase-js';

export interface AuthError {
  message: string;
  status?: number;
  code?: string;
}

export const authService = {
  async signUpWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('SignUp error:', error);
      throw this.parseError(error as SupabaseAuthError);
    }
  },

  async signInWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('SignIn error:', error);
      throw this.parseError(error as SupabaseAuthError);
    }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw this.parseError(error);
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw this.parseError(error);
    return session;
  },

  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Reset password error:', error);
      throw this.parseError(error as SupabaseAuthError);
    }
  },

  async updatePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
    } catch (error) {
      console.error('Update password error:', error);
      throw this.parseError(error as SupabaseAuthError);
    }
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    });
  },

  parseError(error: SupabaseAuthError): AuthError {
    let message = 'An unexpected error occurred';
    
    if (error.message === 'Invalid login credentials') {
      message = 'Invalid email or password';
    } else if (error.message.includes('Email not confirmed')) {
      message = 'Please verify your email address';
    } else if (error.message.includes('already registered')) {
      message = 'This email is already registered';
    } else if (error.message.includes('weak password')) {
      message = 'Password is too weak';
    }

    return {
      message,
      status: error.status,
      code: error?.code
    };
  }
};