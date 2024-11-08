import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const models = [
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'claude-3', name: 'Claude 3' },
  { id: 'gpt-3.5', name: 'GPT-3.5' },
];

export function RobotModel() {
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [temperature, setTemperature] = useState(0.7);

  return (
    <Card>
      <h2 className="text-lg font-medium text-gray-900 mb-6">Modelo AI</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Modelo LLM
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2443ba] focus:ring-[#2443ba]"
          >
            {models.map(model => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Temperatura ({temperature})
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="mt-1 block w-full"
          />
        </div>

        <div className="flex justify-end">
          <Button type="button">
            Guardar Cambios
          </Button>
        </div>
      </div>
    </Card>
  );
}