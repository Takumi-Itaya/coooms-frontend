import Cookies from 'js-cookie';
import '../css/Sidebar.css';
import {  useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import Footer from './parts/Footer';
import LoginForm from './parts/LoginForm';
import SigninForm from './parts/SigninForm';
import UserHome from './parts/UserHome';
import { useWindowDimensions } from './hooks/useWindowDimensions';
import GetUserInfo from '../utilites/api/GetUserInfo';
import UpdateUser from '../utilites/api/UpdateUser';

function Sidebar(props) {
  const {width, height} = useWindowDimensions();
  const [menuActive, setMenuActive] = useState(false);
  const [left, setLeft] = useState(width < 500 ? -(width+3) + "px": "-438px");
  const [invisibleSideberTime, setInvisibleSideberTime] = useState(0);
  
  const [isLogin, setLogin] = useState(false);
  //ログインフォームかサインインフォーム
  const [loginActive, setLoginActive] = useState(true);


  const userClick = () => {
    if(menuActive) {
      setMenuActive(false);
      width < 500 ? setLeft(-(width+3) + "px") : setLeft("-438px");
      setInvisibleSideberTime(0);
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

  //total_time
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
        setCount(count + 1);
        //5秒たったらサイドバーを見えなくする
        if(invisibleSideberTime+1 <= 5 && !menuActive) {
          setInvisibleSideberTime(invisibleSideberTime + 1);
        }
        if(invisibleSideberTime+1 === 5) {
          invisibleSiderTub();
        }
    }, 1000);
    return () => {
      clearInterval(interval)
    };
  }, [count]);

  const invisibleSiderTub = () => {
    menuActive ? setLeft(left) : width < 500 ? setLeft(-(width+3+70) + "px") : setLeft("-538px");;
  }

  const visibleSiderTub = () => {
    menuActive ? setLeft(left) : width < 500 ? setLeft(-(width+3) + "px") : setLeft("-438px");;
    setInvisibleSideberTime(0);
  }


  return (
    <>
      <div className='sidebar-container' style={{ left: left}}>
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
            src='./img/icon/arrow-small-left.png' 
            alt='back icon'
            onClick={() => userClick()}/>
          <Footer />
        </div>
        <div className='sidebar-tab'>
          <div className='coooms-icon-container'>
            <img className='coooms-icon' src='./img/icon/door-open.png' alt='coooms icon'/>
          </div>
          <div className='user-container'>
            <motion.img
              className='user-icon'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              src='./img/icon/user.png' 
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
                  src='./img/icon/tree.png'
                  alt='forest icon'/>
              </div>
              <div className='icon-item' onClick={() => navUrl('/rain')}>
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  src='./img/icon/cloud-showers.png'
                  alt='rain icon'/>
              </div>
              <div className='icon-item' onClick={() => navUrl('/sea')}>
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  src='./img/icon/sunrise.png'
                  alt='sea icon'/>
              </div>
              <div className='icon-item' onClick={() => navUrl('/classic')}>
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  src='./img/icon/music-alt.png'
                  alt='classic icon'/>
              </div>
            </div>
          </div>
        </div>
        <div className='invisible-sideber-scope' style={{ width: '100px', height: '100vh'}} onMouseOver={visibleSiderTub}/>
      </div>

    </>
  );
}

export default Sidebar;