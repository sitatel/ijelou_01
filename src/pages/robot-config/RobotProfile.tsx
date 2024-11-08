import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function RobotProfile() {
  const [name, setName] = useState('Customer Service Bot');
  const [instructions, setInstructions] = useState('');

  return (
    <Card>
      <h2 className="text-lg font-medium text-gray-900 mb-6">Perfil del Robot</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre del Robot
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2443ba] focus:ring-[#2443ba]"
          />
        </div>

        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
            Instrucciones generales
          </label>
          <textarea
            id="instructions"
            rows={4}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            maxLength={1000}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2443ba] focus:ring-[#2443ba]"
            placeholder="Ingrese las instrucciones generales para el robot..."
          />
          <p className="mt-2 text-sm text-gray-500">
            {instructions.length}/1000 caracteres
          </p>
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