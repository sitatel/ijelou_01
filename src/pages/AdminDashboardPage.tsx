import { Card } from '../components/ui/Card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Users, Bot, Activity, DollarSign } from 'lucide-react';

const dailyStats = [
  { name: 'Mon', interactions: 2400, revenue: 1400 },
  { name: 'Tue', interactions: 1398, revenue: 2210 },
  { name: 'Wed', interactions: 9800, revenue: 2290 },
  { name: 'Thu', interactions: 3908, revenue: 2000 },
  { name: 'Fri', interactions: 4800, revenue: 2181 },
  { name: 'Sat', interactions: 3800, revenue: 2500 },
  { name: 'Sun', interactions: 4300, revenue: 2100 },
];

const stats = [
  {
    name: 'Total Users',
    value: '12,361',
    icon: Users,
    change: '+2.5%',
    changeType: 'increase',
  },
  {
    name: 'Active Robots',
    value: '873',
    icon: Bot,
    change: '+12%',
    changeType: 'increase',
  },
  {
    name: 'Total Interactions',
    value: '984,234',
    icon: Activity,
    change: '+5.4%',
    changeType: 'increase',
  },
  {
    name: 'Revenue',
    value: '$234,567',
    icon: DollarSign,
    change: '+8.1%',
    changeType: 'increase',
  },
];

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <div className="flex items-center">
                <div className="p-3 rounded-md bg-blue-500 bg-opacity-10">
                  <Icon className="h-6 w-6 text-blue-500" />
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Daily Interactions">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="interactions" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Revenue Overview">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}