import './App.css';
import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Survey from './components/Survey/Survey';

import AuthUserContext from './store/auth-user-context';
import axios from 'axios';

function App() {
  const authUserContext = useContext(AuthUserContext);

  function logout() {
    axios.get('http://localhost:3001/api/auth/logout', {withCredentials:true}).then(res => {
      console.log(res);
      authUserContext.setUser(null);
      authUserContext.setIsAuthenticated(false);
    }).catch(err => {
      console.log(err);
    });
  }

  console.log(authUserContext.isAuthenticated)

  return (
    <Router>
      <div>
        <header className="header">
          <h1>SQA Survey App</h1>
          <nav className="navigation-links">
            {authUserContext.isAuthenticated && (
              <ul>
                <li onClick={logout}>Logout</li>
              </ul>
            )}
          </nav>
        </header>
        <main>
          {authUserContext.loading && <p>Loading...</p>}
          {!authUserContext.loading && (
            <Routes>
              <Route path='/survey/:uuid' element={<Survey/>} />
              <Route path='/admin' element={authUserContext.isAuthenticated ? <Dashboard/> : <Navigate to='/login' />} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
