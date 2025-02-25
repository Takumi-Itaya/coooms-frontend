import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "components/layouts/sidebar/Sidebar";
import Time from "components/layouts/time/Time";
import { AnimatePresence } from "framer-motion";
import GetRooms from "features/room/api/GetRooms";
import Opening from "components/layouts/page-loding/Opening";
import InitialPageLoding from "components/layouts/page-loding/InitialPageLoding";
import Main from "components/layouts/main/Main";
import Background from "components/layouts/background/Background";
import PhonePage from "components/phone/PhonePage";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import gsap from "gsap";


function App() {
  const location = useLocation();
  const [isOpening, setOpening] = useState(true);
  const [isPhoneSize, setPhoneSize] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [rooms, setRooms] = useState('');
  const {width, height} = useWindowDimensions();
  
  useEffect(() => {
    if(rooms !== '') {
      setTimeout(() => {
        setOpening(false);
      }, 1.5 * 1000)
    }
  }, [rooms])

  useEffect(() => {
    if(width < 1100) {
      setPhoneSize(true);
    } else {
      setPhoneSize(false);
    }
  }, [width, height])

  useEffect(() => {
    GetRooms().then(rooms => {
      setRooms(rooms);
    })
  }, [])

  const userInfoProps = {
    userInfo: userInfo,
    setUserInfo: setUserInfo,
  }

  return(
    <>
      {
        isPhoneSize ?
          <PhonePage />
        :
        <>
        {
          isOpening ?
            <Opening/>
          :
          <>
            <Sidebar {...userInfoProps}/>
            <InitialPageLoding />
            <Time />
            <Background />
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="*" element={<Navigate replace={true} to="/"/>} />
                <Route path="/" element={<Main source={rooms} {...userInfoProps}/>} />        
              </Routes>
            </AnimatePresence>
          </>
        }
        </>
      }
    </>
  );
}
export default App;