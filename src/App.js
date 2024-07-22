import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './AuthContext';
import Login from './pages/login/Login';
import Layout from './layouts/Layout';
import './styles/App.css';

import ClientMenu1 from './pages/client/client_menu1/ClientMenu1';
import ClientMenu2 from './pages/client/client_menu2/ClientMenu2';

import AdminMenu1 from './pages/admin/admin_menu1/AdminMenu1';
import AdminMenu2 from './pages/admin/admin_menu2/AdminMenu2';
import EmployeeResource from './pages/admin/human_resource/employee/EmployeeResource';
import BranchResource from './pages/admin/human_resource/branch/BranchResource';
import DriverResource from './pages/admin/human_resource/driver/DriverResource';
import TempResource from './pages/admin/human_resource/Temp/TempResource';

import BranchSales from './pages/admin/report/reportsMenu/BranchSales';
import BranchSalesDetail from './pages/admin/report/reportsMenu/BranchSalesDetail';

import StockApplication from './pages/admin/stock/StockApplication';
import StockHistory from './pages/admin/stock/StockHistory';

import Branch from './pages/admin/branch/Branch';
import NewReports from './pages/admin/report/newReportsMenu/NewReports'
import Car from './pages/admin/car/Car';


// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
//   if (!user) {
//     return <Navigate to="/" />;
//   }
//   return children;
// };
// 12

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

            <Route path="stock">
              <Route index element={<StockApplication/>}/>
              <Route path='application' element={<StockApplication/>}/>
              <Route path='history' element={<StockHistory/>}/>
            </Route>

            <Route path="paper">
                <Route index element={<BranchSales/>}/>
                <Route path='newReports' element={<NewReports/>}/>
                <Route path='reports' element={<BranchSales/>}/>
                <Route path='reports/:branchReportCode' element={<BranchSalesDetail/>}/>
            </Route>


            <Route path="branch">
              <Route index element={<Branch/>} />
            </Route>


            <Route path="members">
              <Route index element={<EmployeeResource/>}/>
              <Route path='employee' element={<EmployeeResource/>}/>
              <Route path='branch' element={<BranchResource/>}/>
              <Route path='driver' element={<DriverResource/>}/>
              <Route path='temp' element={<TempResource/>}/>
            </Route>

            <Route path="car">
                <Route index element={<Car/>}/>
                
            </Route>


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
