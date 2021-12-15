import './App.css';
import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

import AuthUserContext from './store/auth-user-context';

function App() {
  const authUserContext = useContext(AuthUserContext);
  console.log(authUserContext.isAuthenticated)

  return (
    <Router>
      <div>
        <header className="header">
          <h1>SQA Reporting App</h1>
          <nav className="navigation-links">
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
