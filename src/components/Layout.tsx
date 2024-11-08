import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
  const location = useLocation();
  const isRobotConfig = location.pathname.includes('/robots/') && location.pathname.includes('/config');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        {!isRobotConfig && <Sidebar />}
        <main className={`flex-1 p-8 ${!isRobotConfig ? '' : 'pl-8'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}