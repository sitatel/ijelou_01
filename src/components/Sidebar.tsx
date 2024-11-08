import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Bot, 
  CreditCard, 
  Users, 
  Headphones, 
  UserCircle,
  Settings
} from 'lucide-react';
import { cn } from '../utils/cn';

const clientLinks = [
  { href: '/', label: 'dashboard.title', icon: LayoutDashboard },
  { href: '/robots', label: 'robots.title', icon: Bot },
  { href: '/billing', label: 'billing.title', icon: CreditCard },
  { href: '/profile', label: 'profile.title', icon: UserCircle },
  { href: '/support', label: 'support.title', icon: Headphones },
];

const adminLinks = [
  { href: '/admin', label: 'admin.dashboard', icon: LayoutDashboard },
  { href: '/admin/clients', label: 'admin.clients', icon: Users },
  { href: '/admin/settings', label: 'admin.settings', icon: Settings },
];

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const links = user?.role === 'admin' ? adminLinks : clientLinks;

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    'flex items-center px-4 py-2 text-sm font-medium rounded-md',
                    location.pathname === link.href
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {t(link.label)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}