import { useParams, Link, Routes, Route } from 'react-router-dom';
import { Bot, Languages, Database, Brain, Play } from 'lucide-react';
import { RobotProfile } from './robot-config/RobotProfile';
import { RobotLanguage } from './robot-config/RobotLanguage';
import { RobotKnowledge } from './robot-config/RobotKnowledge';
import { RobotModel } from './robot-config/RobotModel';
import { RobotActions } from './robot-config/RobotActions';

const configMenu = [
  { path: '', label: 'Perfil del Robot', icon: Bot },
  { path: 'language', label: 'Idioma y Tipo de Voz', icon: Languages },
  { path: 'knowledge', label: 'Base de Conocimiento', icon: Database },
  { path: 'model', label: 'Modelo AI', icon: Brain },
  { path: 'actions', label: 'Acciones', icon: Play },
];

export function RobotConfigPage() {
  const { robotId } = useParams();

  return (
    <div className="flex">
      <aside className="w-64 min-h-[calc(100vh-4rem)] bg-white border-r border-gray-200">
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/robots"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
              >
                <Bot className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            {configMenu.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={`/robots/${robotId}/config${item.path ? `/${item.path}` : ''}`}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Routes>
          <Route index element={<RobotProfile />} />
          <Route path="language" element={<RobotLanguage />} />
          <Route path="knowledge" element={<RobotKnowledge />} />
          <Route path="model" element={<RobotModel />} />
          <Route path="actions" element={<RobotActions />} />
        </Routes>
      </main>
    </div>
  );
}