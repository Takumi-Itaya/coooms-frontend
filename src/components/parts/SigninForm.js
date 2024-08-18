import Cookies from 'js-cookie';
import { useState } from 'react';
import 'css/parts/SigninForm.css';
import CreateUser from 'utilites/api/CreateUser';
import GetJWTToken from 'utilites/api/GetJWTToken';
import GetUserInfo from 'utilites/api/GetUserInfo';

function SigninForm(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setError] = useState('hidden');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRequestSignin = () => {
    if(!validateEmail(email)) {
      setError('visible');
      setErrorMessage('Please enter your email')
      return;
    }
    if(!validatePassword(password)) {
      setError('visible');
      setErrorMessage('Please enter at least 8 uppercase letters, numbers and special characters')
      return;
    }
    CreateUser(email, password).then(() => {
      GetJWTToken(email, password).then(jwtToken => {
        if(jwtToken !== undefined) {
          Cookies.set('token', jwtToken, { 
            expires: 1, 
            path: '/', 
            domain: process.env.REACT_APP_COOKIE_DOMAIN, 
            secure: process.env.REACT_APP_COOKIE_SECURE })
          GetUserInfo(jwtToken).then(user_info => {
            props.setUserInfo(user_info);
            props.handleIsLogin(true);
            setError('hidden');
          })
        }
      })
    })
    .catch(() => {
      setError('visible');
      setErrorMessage('Could not create user');
    })
  }

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&/])[A-Za-z\d@$!%*?&/]{8,}$/;
    return passwordRegex.test(password);
}

  return(
    <>
      <div className='signin-form-container'>
        <p className='signin-text'>Sign in</p>
        <div className='error-text-container' style={{visibility:isError}}>
          <p className='error-text'>{errorMessage}</p>
        </div>
        <div className='email-form-container'>
          <p className='form-text'>Email</p>
          <input type="text" className='form' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className='password-form-container'>
          <p className='form-text'>Password</p>
          <input type="text" className='form' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className='signin-button-container'>
          <p className='login-link' onClick={() => props.handleLoginActive(true)}>log in</p>
          <button className='signin-button' onClick={handleRequestSignin}>Signin</button>
        </div>
      </div>
    </>
  );
}
export default SigninForm;