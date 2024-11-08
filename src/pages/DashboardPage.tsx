import { Card } from '../components/ui/Card';
import { useTranslation } from 'react-i18next';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Bot, Activity } from 'lucide-react';

const data = [
  { name: 'Lun', interactions: 120 },
  { name: 'Mar', interactions: 150 },
  { name: 'Mié', interactions: 180 },
  { name: 'Jue', interactions: 140 },
  { name: 'Vie', interactions: 200 },
  { name: 'Sáb', interactions: 90 },
  { name: 'Dom', interactions: 70 },
];

export function DashboardPage() {
  const { t } = useTranslation();

  const stats = [
    {
      name: t('dashboard.stats.activeRobots'),
      value: '12',
      icon: Bot,
      change: '+2',
      changeType: 'increase',
    },
    {
      name: t('dashboard.stats.totalInteractions'),
      value: '8,450',
      icon: Activity,
      change: '+15%',
      changeType: 'increase',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <div className="flex items-center">
                <div className="p-3 rounded-md bg-[#2443ba] bg-opacity-10">
                  <Icon className="h-6 w-6 text-[#2443ba]" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <p
                      className={`ml-2 text-sm font-medium ${
                        stat.changeType === 'increase'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card title={t('dashboard.weeklyInteractions')}>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="interactions" fill="#2443ba" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}