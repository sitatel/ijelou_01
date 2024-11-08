import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Bell, Mail, Globe, Shield } from 'lucide-react';

export function AdminSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState('es');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-medium text-gray-900 mb-6">Notificaciones</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Notificaciones por Email</p>
                <p className="text-sm text-gray-500">Recibe actualizaciones por correo electrónico</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`${
                  emailNotifications ? 'bg-[#2443ba]' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2443ba] focus:ring-offset-2`}
              >
                <span
                  className={`${
                    emailNotifications ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Notificaciones Push</p>
                <p className="text-sm text-gray-500">Recibe notificaciones en tiempo real</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`${
                  pushNotifications ? 'bg-[#2443ba]' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2443ba] focus:ring-offset-2`}
              >
                <span
                  className={`${
                    pushNotifications ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-medium text-gray-900 mb-6">Preferencias</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <Globe className="h-5 w-5 text-gray-400 mr-3" />
            <div className="flex-grow">
              <label htmlFor="language" className="block text-sm font-medium text-gray-900">
                Idioma
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2443ba] focus:ring-[#2443ba] sm:text-sm"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-medium text-gray-900 mb-6">Seguridad</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Autenticación de dos factores</p>
                <p className="text-sm text-gray-500">Añade una capa extra de seguridad a tu cuenta</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                className={`${
                  twoFactorAuth ? 'bg-[#2443ba]' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2443ba] focus:ring-offset-2`}
              >
                <span
                  className={`${
                    twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="button">
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}