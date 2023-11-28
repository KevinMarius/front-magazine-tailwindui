import { createContext } from 'react';
import { useAuth } from '../hooks/auth-hook';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => { },
  logout: () => { }
});

export const AuthProvider = ({ children }) => {
  const { token, login, logout, userId } = useAuth();
  const userData = localStorage.getItem('userData');

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout
    }}>
      { userData ? children : <Navigate to='/signIn'/>}
    </AuthContext.Provider>
  )
}
