import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';

export function useLanguage() {
  const { i18n } = useTranslation();
  const { user } = useAuth();

  useEffect(() => {
    const loadUserLanguage = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('language')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          if (data?.language) {
            await i18n.changeLanguage(data.language);
          }
        } catch (err) {
          console.error('Error loading user language:', err);
        }
      }
    };

    loadUserLanguage();
  }, [user, i18n]);

  const changeLanguage = async (language: string) => {
    try {
      await i18n.changeLanguage(language);
      
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ language })
          .eq('id', user.id);

        if (error) throw error;
      }
    } catch (err) {
      console.error('Error changing language:', err);
      throw err;
    }
  };

  return {
    currentLanguage: i18n.language,
    changeLanguage,
  };
}