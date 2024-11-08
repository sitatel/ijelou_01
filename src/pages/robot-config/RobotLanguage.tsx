import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Trash2 } from 'lucide-react';

interface LanguageConfig {
  id: string;
  language: string;
  voiceType: string;
}

const availableLanguages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'];
const voiceTypes = ['Male', 'Female'];

export function RobotLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [configurations, setConfigurations] = useState<LanguageConfig[]>([]);

  const handleAdd = () => {
    if (selectedLanguage && selectedVoice) {
      const newConfig: LanguageConfig = {
        id: Date.now().toString(),
        language: selectedLanguage,
        voiceType: selectedVoice,
      };
      setConfigurations([...configurations, newConfig]);
      setSelectedLanguage('');
      setSelectedVoice('');
    }
  };

  const handleDelete = (id: string) => {
    setConfigurations(configurations.filter(config => config.id !== id));
  };

  return (
    <Card>
      <h2 className="text-lg font-medium text-gray-900 mb-6">Idioma y Tipo de Voz</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Idioma</label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2443ba] focus:ring-[#2443ba]"
          >
            <option value="">Seleccionar idioma</option>
            {availableLanguages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Voz</label>
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2443ba] focus:ring-[#2443ba]"
          >
            <option value="">Seleccionar tipo de voz</option>
            {voiceTypes.map(voice => (
              <option key={voice} value={voice}>{voice}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <Button 
          onClick={handleAdd}
          disabled={!selectedLanguage || !selectedVoice}
        >
          Agregar
        </Button>
      </div>

      {configurations.length > 0 && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Idioma
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo de Voz
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {configurations.map((config) => (
              <tr key={config.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {config.language}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {config.voiceType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(config.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}