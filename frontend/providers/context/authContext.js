import React from 'react';
import ClientCookiesManager from '../../../services/clientCookiesManager';
import { ACCESS_KEY } from '../../../config/uriparts';

const manager = new ClientCookiesManager();
const AuthContext = React.createContext({
  tag: 'Auth',
  isLogged: !!(manager.get(ACCESS_KEY)),
  variant: '',
  message: '',
  setMessage(value) {
    this.message = value;
  },
  setIsLogged(value) {
    this.isLogged = value;
  },
  setVariant(value) {
    this.variant = value;
  },
});

export default AuthContext;
