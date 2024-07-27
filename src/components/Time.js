import '../css/Time.css';
import { useEffect, useState } from "react";

function Time() {
    const [time, setTime] = useState([])
    const [count, setCount] = useState(0);
    const [countTime, setCountTime] = useState("00:00:00");

    useEffect(() => {
        setInterval(() => {
        let d = new Date();

        let hour = d.getHours().toString().padStart(2, '0');
        let minute = d.getMinutes().toString().padStart(2, '0');
        setTime(hour + ':' + minute);
        });

    },[])

    useEffect(() => {
      const interval = setInterval(() => {
          setCount(count + 1);
          let hour = Math.floor(count / 3600).toString().padStart(2, '0');
          let minute = Math.floor(count / 60 % 60).toString().padStart(2, '0');
          let second = Math.floor(count % 60).toString().padStart(2, '0');
          setCountTime(hour + ':' + minute + ':' + second)
      }, 1000);
      return () => clearInterval(interval);
    }, [count]);


    return (
    <>
      <div className='time-container'>
        <p className='time'>{time}</p>
        {/* <p className='count-time'>time {countTime}</p> */}
      </div>

    </>  
    );
}

export default Time;