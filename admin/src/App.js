import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './app.css';
import Home from './pages/home/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newPage/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';
import { AuthContext } from './context/authContext/AuthContext';
import { useContext } from 'react';
import ListList from './pages/listList/ListList';
import List from './pages/list/List'
import NewList from './pages/newList/NewList';

function App() {
  const {user} = useContext (AuthContext);
  return ( 
    <Router>
    <Routes>
      <Route path='/login' element={ !user ? <Login/> : <Navigate to='/'/> } /> 
      {user && ( 
        <>
      <Route path='/' element={
        <>
        <Topbar/>  
        <div className='container'>
          <Sidebar/>
          <Home/>
        </div>
        </>
        } /> 

      <Route path='/users' element={
      <>
      <Topbar/>  
      <div className='container'>
        <Sidebar/>
        <UserList/>
      </div>
      </>} /> 

      
      <Route path='/user/:userId' element={
      <>
      <Topbar/>  
      <div className='container'>
        <Sidebar/>
        <User/>
      </div>
      </>} />


      <Route path='/newUser' element={
       <>
       <Topbar/>  
       <div className='container'>
         <Sidebar/>
         <NewUser/>
       </div>
       </>} />


      <Route path='/movies' element={ <>
      <Topbar/>  
      <div className='container'>
        <Sidebar/>
        <ProductList/>
      </div>
      </>} /> 


      <Route path='/product/:productId' element={ <>
      <Topbar/>  
      <div className='container'>
        <Sidebar/>
        <Product/>
      </div>
      </>} />


      <Route path='/newProduct' element={ <>
      <Topbar/>  
      <div className='container'>
        <Sidebar/>
        <NewProduct/>
      </div>
      </>} />


      <Route path='/lists' element={ <>
      <Topbar/>  
      <div className='container'>
        <Sidebar/>
        <ListList/>
      </div>
      </>} /> 


      <Route path='/list/:listId' element={ <>
      <Topbar/>  
      <div className='container'>
        <Sidebar/>
        <List/>
      </div>
      </>} />


      <Route path='/newList' element={ <>
      <Topbar/>  
      <div className='container'>
        <Sidebar/>
        <NewList/>
      </div>
      </>} /> 
      </> )}
      </Routes>
    </Router>
  );
}

export default App;
