import { useState, createContext, useEffect } from 'react';
import { login, signup } from '../api/auth-api';

export const AuthContext = createContext(null);

const getUsernameFromToken = (token) => {
  try {
    const jwt = token.replace(/^BEARER\s+/i, '').split('.')[1];
    return JSON.parse(atob(jwt)).username;
  } catch {
    return '';
  }
};

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (existingToken) {
      setIsAuthenticated(true);
      setUserName(getUsernameFromToken(existingToken));
    }
  }, [existingToken]);

  const setToken = (data) => {
    localStorage.setItem('token', data);
    setAuthToken(data);
  };

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      setUserName(username);
      return { success: true };
    }
    return { success: false, msg: result.msg || 'Login failed.' };
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    return result.success;
  };

  const signout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserName('');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
        authToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
