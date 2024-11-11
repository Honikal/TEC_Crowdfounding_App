import React from 'react';
import Header from './Components/Header';
import { Outlet } from 'react-router';
import { UserProvider } from './Components/UserContext';
import { AuthProvider } from './Components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Header/>
        <Outlet/>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
