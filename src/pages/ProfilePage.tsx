import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { UserCircle, Mail, Building, Briefcase, Lock, AlertCircle, CheckCircle, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';

interface Profile {
  name: string;
  email: string;
  company: string | null;
  position: string | null;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function ProfilePage() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: user?.email || '',
    company: '',
    position: '',
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, company, position')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile({
          ...profile,
          name: data.name || '',
          company: data.company || '',
          position: data.position || '',
        });
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile data');
    }
  };

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          company: profile.company,
          position: profile.position,
        })
        .eq('id', user?.id);

      if (error) throw error;

      setSuccess(t('common.success'));
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError(t('auth.passwordsDoNotMatch'));
      setIsLoading(false);
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError(t('profile.passwordRequirements'));
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      });

      if (error) throw error;

      setSuccess(t('common.success'));
      setShowPasswordForm(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      console.error('Error updating password:', err);
      setError(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = async (language: string) => {
    await i18n.changeLanguage(language);
    // Opcionalmente, guardar la preferencia de idioma en el perfil del usuario
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ language })
        .eq('id', user?.id);

      if (error) throw error;
    } catch (err) {
      console.error('Error saving language preference:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-full bg-gray-100">
            <UserCircle className="h-16 w-16 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{profile.name}</h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
      </Card>

      {(error || success) && (
        <div className={`rounded-md ${error ? 'bg-red-50' : 'bg-green-50'} p-4`}>
          <div className="flex">
            {error ? (
              <AlertCircle className="h-5 w-5 text-red-400" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-400" />
            )}
            <div className="ml-3">
              <p className={`text-sm font-medium ${error ? 'text-red-800' : 'text-green-800'}`}>
                {error || success}
              </p>
            </div>
          </div>
        </div>
      )}

      <Card title={t('profile.personalInfo')}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('profile.name')}
              </label>
              <div className="mt-1 flex items-center">
                <UserCircle className="h-5 w-5 text-gray-400 mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2443ba] focus:ring-[#2443ba] sm:text-sm"
                  />
                ) : (
                  <span className="text-gray-900">{profile.name}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('profile.email')}
              </label>
              <div className="mt-1 flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-900">{profile.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('profile.company')}
              </label>
              <div className="mt-1 flex items-center">
                <Building className="h-5 w-5 text-gray-400 mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.company || ''}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2443ba] focus:ring-[#2443ba] sm:text-sm"
                  />
                ) : (
                  <span className="text-gray-900">
                    {profile.company || t('common.notSpecified')}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('profile.position')}
              </label>
              <div className="mt-1 flex items-center">
                <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.position || ''}
                    onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2443ba] focus:ring-[#2443ba] sm:text-sm"
                  />
                ) : (
                  <span className="text-gray-900">
                    {profile.position || t('common.notSpecified')}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="button"
                  onClick={handleProfileUpdate}
                  isLoading={isLoading}
                >
                  {t('common.save')}
                </Button>
              </>
            ) : (
              <Button type="button" onClick={() => setIsEditing(true)}>
                {t('common.edit')}
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Card title={t('profile.security')}>
        <div className="space-y-6">
          {!showPasswordForm ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{t('auth.password')}</p>
                  <p className="text-sm text-gray-500">{t('profile.changePassword')}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPasswordForm(true)}
              >
                {t('profile.changePassword')}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('profile.currentPassword')}
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2443ba] focus:ring-[#2443ba] sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('profile.newPassword')}
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2443ba] focus:ring-[#2443ba] sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t('profile.confirmNewPassword')}
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2443ba] focus:ring-[#2443ba] sm:text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordForm({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                    });
                  }}
                  disabled={isLoading}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="button"
                  onClick={handlePasswordChange}
                  isLoading={isLoading}
                >
                  {t('common.save')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card title={t('profile.language')}>
        <div className="space-y-6">
          <div className="flex items-center">
            <Globe className="h-5 w-5 text-gray-400 mr-2" />
            <div className="flex-grow">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                {t('profile.selectLanguage')}
              </label>
              <select
                id="language"
                value={i18n.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2443ba] focus:ring-[#2443ba] sm:text-sm"
              >
                <option value="en">{t('profile.languages.en')}</option>
                <option value="es">{t('profile.languages.es')}</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}