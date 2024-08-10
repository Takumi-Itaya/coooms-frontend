import Cookies from 'js-cookie';
import '../../css/parts/UserHome.css';
import UpdateUser from '../../utilites/api/UpdateUser';

function UserHome(props) {

  const convertTotalTime = (count) => {
    let hour = Math.floor(count / 3600).toString().padStart(2, '0');
    let minute = Math.floor(count / 60 % 60).toString().padStart(2, '0');
    let second = Math.floor(count % 60).toString().padStart(2, '0');
    return hour + ':' + minute + ':' + second
  }

  const handleLogout = () => {
    props.setUserInfo('');
    props.handleIsLogin(false);
    let jwtToken = Cookies.get('token');
    UpdateUser(props.userInfo, jwtToken);
    Cookies.remove('token');
  }

  return(
    <>
      <div className="userhome-container">
        <div className="email-text-container">
          <p className="email-label">Email</p>
          <p className="email-text">{props.userInfo.email}</p>
        </div>
        <div className="password-text-container">
          <p className="password-label">Password</p>
          <p className="password-text">**********</p>
        </div>
        <div className="totaltime-text-container">
          <p className="totaltime-label">Total Time</p>
          <p className="totaltime-text">{convertTotalTime(props.userInfo.total_time)}</p>
        </div>
        <div className="logout-btn-container">
          <button className='logout-btn' onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </>
  );
}
export default UserHome;