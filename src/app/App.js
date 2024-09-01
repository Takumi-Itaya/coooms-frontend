import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "components/layouts/sidebar/Sidebar";
import Time from "components/layouts/time/Time";
import { AnimatePresence } from "framer-motion";
import GetRooms from "features/room/api/GetRooms";
import Opening from "app/Opening";
import Room from "components/layouts/room/Room";

import forestBg from 'assets/background/forest_bg.jpg';
import rainBg from 'assets/background/rain_bg.jpg';
import seaBg from 'assets/background/sea_bg.jpg';
import loFiBg from 'assets/background/lo-fi_bg.jpg';
import PageLoding from "components/layouts/page-loding/PageLoding";


function App() {
  const location = useLocation();

  const [isOpening, setOpening] = useState(true);
  const [userInfo, setUserInfo] = useState('');

  const [forestSounds, setForestSounds] = useState('');
  const [rainSounds, setRainSounds] = useState('');
  const [seaSounds, setSeaSounds] = useState('');
  const [classicSounds, setClassicSounds] = useState('');
  const [rooms, setRooms] = useState('');
  
  useEffect(() => {
    if(rooms !== '') {
      setTimeout(() => {
        setOpening(false);
      }, 1.5 * 1000)
    }
  }, [rooms])

  useEffect(() => {
    GetRooms().then(rooms => {
      setRooms(rooms);
      for(let j = 0; j < rooms.length; j++) {
        let list = [];
        for(let i = 0; i < rooms[j].musicList.length; i++) {
          list.push(rooms[j].musicList[i].source);
        }
        switch(rooms[j].name) {
          case 'forest':
            setForestSounds(list);
            break;
          case 'rain':
            setRainSounds(list);
            break;
          case 'sea':
            setSeaSounds(list);
            break;
          case 'classic':
            setClassicSounds(list);
            break;
          default:
            break;
        }
      }
    })
  }, [])

  const userInfoProps = {
    userInfo: userInfo,
    setUserInfo: setUserInfo,
  }

  return(
    <>
      {
        isOpening ?
          <Opening/>
        :
        <>
          <Sidebar {...userInfoProps}/>
          <PageLoding />
          <Time />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/forest" element={<Room source={forestSounds} background={forestBg} {...userInfoProps}/>} />
              <Route path="/rain" element={<Room source={rainSounds} background={rainBg} {...userInfoProps}/>} />
              <Route path="/sea" element={<Room source={seaSounds} background={seaBg} {...userInfoProps}/>} />
              <Route path="/classic" element={<Room source={classicSounds} background={loFiBg} {...userInfoProps}/>} />        
              <Route path="*" element={<Navigate replace={true} to="/forest"/>} />
            </Routes>
          </AnimatePresence>
        </>

      }
    </>
  );
}
export default App;