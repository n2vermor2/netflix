import './App.scss';
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import Login from './pages/login/Login';
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { useContext } from 'react';
import {AuthContext} from './authContext/AuthContext'

function App() {
  const {user} = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path='/' element={ user ? <Home /> : <Navigate to="/register" />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path='/movies' element={user ? <Home type="movie"/> : <Navigate to="/register"/>} />
        <Route path='/series' element={user ? <Home type="series"/> : <Navigate to="/register"/>} />
        <Route path='/watch' element={user ? <Watch /> : <Navigate to="/register"/>} />
      </Routes>
    </Router>
  );
}

export default App;
