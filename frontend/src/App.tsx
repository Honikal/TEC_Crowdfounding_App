import React from 'react';
import Header from './Components/Header';
import { Outlet } from 'react-router';
import { UserProvider } from './Components/UserContext';

function App() {
  return (
    <UserProvider>
      <Header/>
      <Outlet/>
    </UserProvider>
  );
}

export default App;
