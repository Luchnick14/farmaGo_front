import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './utils/AuthContext';

import Login from './scenes/login';
import Register from './scenes/register';
import Dashboard from './scenes/dashboard/index';
import ProSidebar from './scenes/global/ProSidebar';
import Users from './scenes/users/index';

function App() {
  return (
    <div className='app'>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas sin autenticación */}
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Register />} />

          {/* Rutas protegidas con layout */}
          <Route 
            path='/'
            element={<ProtectedLayout />} 
          >
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='users' element={<Users />} />
          </Route>

          {/* Redirección para rutas no definidas */}
          <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

const ProtectedLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <ProSidebar />
      <main className='content'>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;