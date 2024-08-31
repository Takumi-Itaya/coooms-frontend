import Cookies from 'js-cookie';
import './Sidebar.css';
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import Footer from 'components/layouts/footer/Footer';
import LoginForm from 'features/auth/components/LoginForm';
import SigninForm from 'features/auth/components/SigninForm';
import UserHome from 'components/layouts/home/UserHome';
import { useWindowDimensions } from 'hooks/useWindowDimensions';
import GetUserInfo from 'features/auth/api/GetUserInfo';
import UpdateUser from 'features/auth/api/UpdateUser';

//image
import doorOpen from 'assets/icon/door-open.png';
import user from 'assets/icon/user.png';
import tree from 'assets/icon/tree.png';
import cloudShowers from 'assets/icon/cloud-showers.png';
import sunrise from 'assets/icon/sunrise.png';
import musicAlt from 'assets/icon/music-alt.png';
import arrowSmallLeft from 'assets/icon/arrow-small-left.png'




function Sidebar(props) {
  const {width} = useWindowDimensions();
  const [menuActive, setMenuActive] = useState(false);
  const [menuOver, setMenuOver] = useState(false);
  const [left, setLeft] = useState(width < 500 ? -(width+3) + "px": "-438px");
  const [isLogin, setLogin] = useState(false);
  const [loginActive, setLoginActive] = useState(true);


  const userClick = () => {
    if(menuActive) {
      setMenuActive(false);
      width < 500 ? setLeft(-(width+3) + "px") : setLeft("-438px");
    } else {
      setMenuActive(true);
      setLeft(0);
    }
  }

  const navigate = useNavigate();
  const navUrl = (url) => {
    navigate(url);
  }

  const handleLoginActive = (bool) => {
    setLoginActive(bool);
  }

  const handleIsLogin = (bool) => {
    setLogin(bool);
  }

  const login_props = {
    handleLoginActive: handleLoginActive, 
    handleIsLogin: handleIsLogin, 
    setUserInfo: props.setUserInfo,
  }

  //ユーザーログイン自動化
  useEffect(() => {
    let jwtToken = Cookies.get('token');
    if(jwtToken) {
      GetUserInfo(jwtToken).then(user_info => {
        if(Number(Cookies.get('uncalculatedTime')) > 0) {
          user_info.total_time += Number(Cookies.get('uncalculatedTime'));
          UpdateUser(user_info, jwtToken);
          Cookies.set('uncalculatedTime', 0);
        }
        props.setUserInfo(user_info);
        handleIsLogin(true);
      }).catch((error) => {
      })
    }
  }, [])

  //サイドバー自動開閉制御
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    if(menuActive) return;
    if(menuOver) {
      visibleSiderTub();
      if(intervalId != null) clearInterval(intervalId);
    } else {
      var count = 0
      var id = setInterval(() =>{
        count++;
        if(count === 5) {
          invisibleSiderTub();
        }
      }, 1000);
      setIntervalId(id);
    }
  }, [menuOver])

  const invisibleSiderTub = () => {
    width < 500 ? setLeft(-(width+3+70) + "px") : setLeft("-538px");;
  }
  const visibleSiderTub = () => {
    width < 500 ? setLeft(-(width+3) + "px") : setLeft("-438px");;
  }


  return (
    <>
      <div className='sidebar-container' style={{ left: left}} 
        onMouseOver={() => setMenuOver(true)}
        onMouseLeave={() => setMenuOver(false)}>
        <div className='sidebar-content' style={{width: width}}>
          <div className='coooms-header-container'>
            <p className='header-title'>Coooms</p>
          </div>
          {
            isLogin ?
            <UserHome userInfo={props.userInfo} {...login_props}/>
            : 
              loginActive ?
                <LoginForm {...login_props}/>
              : <SigninForm {...login_props}/>
          }
          <motion.img
            className='back-icon'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            src={arrowSmallLeft}
            alt='back icon'
            onClick={() => userClick()}/>
          <Footer />
        </div>
        <div className='sidebar-tab'>
          <div className='coooms-icon-container'>
            <img className='coooms-icon' src={doorOpen} alt='coooms icon'/>
          </div>
          <div className='user-container'>
            <motion.img
              className='user-icon'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              src={user}
              alt='user icon'
              onClick={() => userClick()}/>
          </div>
          <hr className='room-linear'/>
          <div className='room-container'>
            <div className='icon-wrap'>
              <div className='icon-item' onClick={() => navUrl('/forest')}>
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  src={tree}
                  alt='forest icon'/>
              </div>
              <div className='icon-item' onClick={() => navUrl('/rain')}>
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  src={cloudShowers}
                  alt='rain icon'/>
              </div>
              <div className='icon-item' onClick={() => navUrl('/sea')}>
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  src={sunrise}
                  alt='sea icon'/>
              </div>
              <div className='icon-item' onClick={() => navUrl('/classic')}>
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  src={musicAlt}
                  alt='classic icon'/>
              </div>
            </div>
          </div>
        </div>
        <div className='invisible-sideber-scope' style={{ width: '100px', height: '100vh'}}/>
      </div>

    </>
  );
}

export default Sidebar;