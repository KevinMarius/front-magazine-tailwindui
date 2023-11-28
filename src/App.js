import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import IndexRouter from './routes/IndexRouter';
import SignIn from './pages/SignIn';
import AdminRouter from './routes/AdminRouter';

import { AuthProvider } from './contexts/AuthContext';
import { NotificationContainer } from 'react-notifications';

function App() {
  return (
    <React.Fragment>
      <NotificationContainer />
      <Routes>
        <Route path='*' element={<IndexRouter />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path="dashboard/*" element={
          <AuthProvider>
            <AdminRouter />
          </AuthProvider>
        } />
      </Routes>
    </React.Fragment>
  )
}

export default App;
