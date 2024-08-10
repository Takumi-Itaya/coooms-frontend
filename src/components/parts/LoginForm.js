import Cookies from 'js-cookie';
import { useState } from 'react';
import '../../css/parts/LoginForm.css';
import GetUserInfo from '../../utilites/api/GetUserInfo';
import GetJWTToken from '../../utilites/api/GetJWTToken';
import UpdateUser from '../../utilites/api/UpdateUser';

function LoginForm(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setError] = useState('hidden');
  const [errorMessage, setErrorMessage] = useState('');

  const handlerequestLogin = () => {
    GetJWTToken(email, password).then(jwtToken => {
      if(jwtToken !== undefined) {
        //本番環境ではCookieにdomainを指定する domain: 'coooms.com',
        Cookies.set('token', jwtToken, { expires: 1, path: '/', domain: 'coooms.com', secure: true })
        GetUserInfo(jwtToken).then(user_info => {
          if(Number(Cookies.get('uncalculatedTime')) > 0) {
            user_info.total_time += Number(Cookies.get('uncalculatedTime'));
            UpdateUser(user_info, jwtToken);
            Cookies.set('uncalculatedTime', 0);
          }
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