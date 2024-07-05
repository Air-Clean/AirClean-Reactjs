import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import './Layout.css';

function Layout() {
  console.log('레이아웃 입니다.');


  const memoizedHeader = useMemo(() => <Header />, []);

  return (
    <div className="layout">
      {memoizedHeader}
      <Outlet/>
    </div>
  );
}

export default Layout;
