import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Time from "./components/Time";
import { AnimatePresence } from "framer-motion";
import Forest from "./components/rooms/Forest";
import Rain from "./components/rooms/Rain";
import Sea from "./components/rooms/Sea";
import Classic from "./components/rooms/Classic";
import { useEffect, useState } from "react";
import GetRooms from "./utilites/api/GetRooms";
import Opening from "./components/Opening";
import PageLoding from "./components/PageLoding";

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
              <Route path="/forest" element={<Forest source={forestSounds} {...userInfoProps}/>} />
              <Route path="/rain" element={<Rain source={rainSounds} {...userInfoProps}/>} />
              <Route path="/sea" element={<Sea source={seaSounds} {...userInfoProps}/>} />
              <Route path="/classic" element={<Classic source={classicSounds} {...userInfoProps}/>} />        
              <Route path="*" element={<Navigate replace={true} to="/forest"/>} />
            </Routes>
          </AnimatePresence>
        </>

      }
    </>
  );
}
export default App;