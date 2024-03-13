import { useContext, useState } from 'react';
import './login.scss';
import {login} from '../../authContext/apiCalls'
import {AuthContext} from '../../authContext/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogin = (e) =>{
    e.preventDefault();
    login({email, password}, dispatch)
  }

  const handleHome = (e) =>{
    navigate('/');
  }
  return (
    <div className='login'>
        <div className="top">
          <div className="wrapper">
            <img className ="logo" onClick={handleHome} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="" />
          </div>
        </div>
        <div className="container">
           <form action="">
              <h1>Sign In</h1>
              <input type="email" placeholder='Email or phone number' onChange={(e)=>setEmail(e.target.value)}/>
              <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
              <button className='loginButton' onClick={handleLogin}>Sign In</button>
              <span>New to Netflix? <b>Sign up now.</b></span>
              <small>This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b></small>
           </form>
        </div>
    </div>
  )
}
