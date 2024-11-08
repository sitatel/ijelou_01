import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const actionStates = [
  { id: 'active', name: 'Activo' },
  { id: 'sleeping', name: 'Dormido' },
];

export function RobotActions() {
  const [actionState, setActionState] = useState('active');

  return (
    <Card>
      <h2 className="text-lg font-medium text-gray-900 mb-6">Acciones</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estado de Generación de Acciones
          </label>
          <select
            value={actionState}
            onChange={(e) => setActionState(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2443ba] focus:ring-[#2443ba]"
          >
            {actionStates.map(state => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
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