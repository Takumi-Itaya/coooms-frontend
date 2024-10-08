import Cookies from 'js-cookie';
import { useState } from 'react';
import './SigninForm.css';
import CreateUser from 'features/auth/api/CreateUser';
import GetJWTToken from 'features/auth/api/GetJWTToken';
import GetUserInfo from 'features/auth/api/GetUserInfo';
import { COOKIE_DOMAIN, COOKIE_SECURE } from 'config/env';

function SigninForm(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setError] = useState('hidden');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRequestSignin = async () => {
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

    try {
      await CreateUser(email, password);

      const jwtToken = await GetJWTToken(email, password);

      Cookies.set('token', jwtToken, { 
        expires: 1, 
        path: '/', 
        domain: COOKIE_DOMAIN, 
        secure: COOKIE_SECURE })

      const userInfo = await GetUserInfo(jwtToken);

      props.setUserInfo(userInfo);
      props.handleIsLogin(true);
      setError('hidden');
    } catch {
      setError('visible');
      setErrorMessage('Could not create user');
    }
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