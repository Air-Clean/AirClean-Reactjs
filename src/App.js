import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './AuthContext';
import Login from './pages/login/Login';
import Layout from './layouts/Layout';
import './styles/App.css';

import ClientMenu1 from './pages/client/client_menu1/ClientMenu1';
import ClientMenu2 from './pages/client/client_menu2/ClientMenu2';

import AdminMenu1 from './pages/admin/admin_menu1/AdminMenu1';
import AdminMenu2 from './pages/admin/admin_menu2/AdminMenu2';


// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
//   if (!user) {
//     return <Navigate to="/" />;
//   }
//   return children;
// };

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/company" element={<Layout />}>
            <Route index element={<AdminMenu1 />} />
            <Route path="menu1" element={<AdminMenu1 />} />
            <Route path="menu2" element={<AdminMenu2 />} />
          </Route>
          <Route path="/location" element={<Layout />}>
            <Route index element={<ClientMenu1 />} />
            <Route path="menu1" element={<ClientMenu1 />} />
            <Route path="menu2" element={<ClientMenu2 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
