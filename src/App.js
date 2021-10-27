import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Navbar } from './components/UI/navbar/Navbar';
import { About } from './pages/About';
import Posts from './pages/Posts';
import { Error } from './pages/Error';
import { AppRouter } from './components/AppRouter';
import { Authcontext } from './context';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setIsLoading(false);
  }, [])
  return (
    <Authcontext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </Authcontext.Provider>

  );
}

export default App;
