import './Time.css';
import { useEffect, useState } from "react";

function Time() {
    const [time, setTime] = useState([])

    useEffect(() => {
      setInterval(() => {
        let d = new Date();

        let hour = d.getHours().toString().padStart(2, '0');
        let minute = d.getMinutes().toString().padStart(2, '0');
        setTime(hour + ':' + minute);
      });
    },[])

    return (
    <>
      <div className='time-container'>
        <p className='time'>{time}</p>
      </div>

    </>  
    );
}

export default Time;