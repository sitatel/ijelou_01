import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Bot } from 'lucide-react';
import type { Robot as RobotType } from '../types';

export function RobotsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const mockRobots: RobotType[] = [
    {
      id: '1',
      name: t('robots.customerServiceBot'),
      status: 'active',
      model: 'GPT-4',
      temperature: 0.7,
      languages: ['Español', 'Inglés'],
      voiceType: t('robots.voiceTypes.female'),
      interactionCount: 1234,
      lastActive: '2024-03-20T10:30:00Z',
      clientId: '1'
    },
    {
      id: '2',
      name: t('robots.salesAssistant'),
      status: 'inactive',
      model: 'Claude-3',
      temperature: 0.5,
      languages: ['Español'],
      voiceType: t('robots.voiceTypes.male'),
      interactionCount: 567,
      lastActive: '2024-03-19T15:45:00Z',
      clientId: '1'
    },
  ];

  const [robots] = useState<RobotType[]>(mockRobots);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">{t('robots.title')}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {robots.map((robot) => (
          <Card key={robot.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Bot className="h-8 w-8 text-[#2443ba]" />
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {robot.name}
                  </h3>
                  <p className="text-sm text-gray-500">{t('robots.model')}: {robot.model}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  robot.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {t(`robots.status.${robot.status}`)}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('common.languages')}</span>
                <span className="text-gray-900">
                  {robot.languages.join(', ')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('common.voiceType')}</span>
                <span className="text-gray-900">{robot.voiceType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('common.interactions')}</span>
                <span className="text-gray-900">
                  {robot.interactionCount.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate(`/robots/${robot.id}/config`)}
              >
                {t('common.configure')}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}