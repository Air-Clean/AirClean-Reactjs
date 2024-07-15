import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import AdminHeader from '../components/header/AdminHeader';
import ClientHeader from '../components/header/ClientHeader';
import './Layout.css';

function Layout() {
  const { user } = useAuth();

  const memoizedHeader = useMemo(() => {
    if (user === 'company') {
      return <AdminHeader />;
    } else if (user === 'location') {
      return <ClientHeader />;
    }
    return null; // 사용자 타입이 없는 경우
  }, [user]);

  return (
    <div className="layout">
      {memoizedHeader}
      <Outlet />
    </div>
  );
}

export default Layout;
