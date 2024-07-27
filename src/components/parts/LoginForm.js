import { useState } from 'react';
import '../../css/parts/LoginForm.css';
import GetUserInfo from '../../utilites/api/GetUserInfo';
import GetUserToken from '../../utilites/api/GetUserToken';

function LoginForm(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setError] = useState('hidden');
  const [errorMessage, setErrorMessage] = useState('');

  const handlerequestLogin = () => {
    GetUserToken(email, password).then(auth_token => {
      if(auth_token !== undefined) {
        props.setAuthToken(auth_token);
        GetUserInfo(email, auth_token).then(user_info => {
          props.setUserInfo(user_info);
          props.handleIsLogin(true);
          setError('hidden');
        })
      } else {
        
      }
    })
    .catch(() => {
      setError('visible');
      setErrorMessage('email or password is incorrect');
    })
  }

  return(
    <>
      <div className='login-form-container'>
        <p className='login-text'>Login</p>
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
        {/* <div className='other-text-container'>
          <hr className='linear'/>
        </div>
        <button className="google-button">Google Login</button> */}
        <div className='Login-button-container'>
          <p className='signin-link' onClick={() => props.handleLoginActive(false)}>sign in</p>
          <button className='login-button' onClick={handlerequestLogin}>Login</button>
        </div>
      </div>
    </>
  )
}
export default LoginForm;