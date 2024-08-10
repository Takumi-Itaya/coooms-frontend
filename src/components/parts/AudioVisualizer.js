import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import '../../css/parts/AudioVisualizer.css';
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import UpdateUser from "../../utilites/api/UpdateUser";
import { timer } from "../../utilites/time/timer";


window.AudioContext = window.AudioContext || window.webkitAudioContext;
function AudioVisualizer(props) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [volume, setVolume] = useState(0.2);
  const [loop, setLoop] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(0.2);
  const [tapCount, setTapCount] = useState(0);

  //オーディオ関連
  const audioCtx = useRef(new AudioContext());
  const trackList = useRef([]);
  const audioList = useRef([]);
  const analyser = useRef(audioCtx.current.createAnalyser());

  const {width, height} = useWindowDimensions();
  
  useEffect(() => {
    for(let i = 0; i < props.source.length; i++) {
      if(!trackList.current[i]) {
        const audioElement = new Audio(props.source[i]);
        audioElement.crossOrigin = "anonymous";
        audioList.current.push(audioElement)
    
        const track = audioCtx.current.createMediaElementSource(audioList.current[i]);
        track.connect(analyser.current);
        track.connect(audioCtx.current.destination);
    
        trackList.current.push(track);
      }
    }
    for(let i = 0; i < audioList.current.length; i++) {
      // eslint-disable-next-line no-loop-func
      audioList.current[i].addEventListener('ended', () => {
        if(loop) {
          audioStart(i);
        } else if(audioList.current.length-1 > i) {
          setSourceIndex(i+1);
          audioStart(i+1);
        } else {
          setSourceIndex(0);
          audioStart(0);
        }
      })
    }

    renderVisualizer()

    return () => {
      audioStop();
    }
  }, [])

  //画面サイズ変更時canvasをリサイズ
  useEffect(() => {
    renderVisualizer();
  }, [width, height])


  //曲変更時にボリュームが初期化される問題を解決
  useEffect(() => {
    audioList.current[sourceIndex].volume = volume;
  }, [sourceIndex])


  const audioStart = (index) => {
    audioList.current[index].play();
    setPlaying(true);

    renderVisualizer();

    countStart()
  }

  const audioStop = () => {
    audioList.current[sourceIndex].pause();
    setPlaying(false);

    countStop();
  }

  const renderVisualizer = () => {
    window.innerWidth <= 900 ? renderLinearVisualizer(): renderCircleVisualizer();
  }

  const renderCircleVisualizer = () => {
    const canvas = document.getElementsByClassName('canvas')[0];
    const canvasContext = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    analyser.current.fftSize = 16384;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const bufferLength = analyser.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);


    function renderCircleFrame() {
      requestAnimationFrame(renderCircleFrame);
      
      let bars = 50;
      const angleStep = (Math.PI * 2) / bars;

      analyser.current.getByteFrequencyData(dataArray);
      canvasContext.clearRect(0 ,0, canvasWidth, canvasHeight);
      canvasContext.beginPath();
      
      // 円の半径
      const radius = 290;
      
      for (let index = 0; index < bars; index += 1) {
        const dist = (dataArray[index] / 2) + radius; //lineの長さ
        const angle = angleStep * index + 0.01;
        const x1 = canvasWidth / 2 + radius * Math.cos(angle);
        const y1 = canvasHeight / 2 + radius * Math.sin(angle);
        const x = canvasWidth / 2 + dist * Math.cos(angle);
        const y = canvasHeight / 2 + dist * Math.sin(angle);
        canvasContext.lineCap = "round";
        canvasContext.moveTo(x1, y1);
        canvasContext.lineTo(x, y);
        canvasContext.lineWidth = 15;
        canvasContext.strokeStyle = `rgba(196,197,211,0.8)`;
      }
      canvasContext.stroke();
    }

    renderCircleFrame();
  }

  const renderLinearVisualizer = () => {
    const canvas = document.getElementsByClassName('canvas')[0];
    const canvasContext = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    analyser.current.fftSize = 16384;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const bufferLength = analyser.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let bars = Math.round((canvasWidth - 40) / 15 / 2.5);
    let barMargin = Math.round((canvasWidth - bars*15 - 40) / bars);
    function renderLinearFrame() {
      requestAnimationFrame(renderLinearFrame);

      analyser.current.getByteFrequencyData(dataArray);
      canvasContext.clearRect(0 ,0, canvasWidth, canvasHeight);
      canvasContext.beginPath();
      
      for (let index = 0; index < bars; index += 1) {
        const y = canvasHeight / 2;
        const x = 40 + (index*(15+barMargin));
        const distUp = canvasHeight / 2 - (dataArray[index] / 2); 
        const distDown = canvasHeight / 2 + (dataArray[index] / 2);

        canvasContext.moveTo(x, distUp);
        canvasContext.lineTo(x, distDown);
        canvasContext.lineCap = "round";
        canvasContext.lineWidth = 15;
        canvasContext.strokeStyle = `rgba(196,197,211,0.8)`;
        canvasContext.stroke();
      }
      
    }

    renderLinearFrame();
  }

  const handleVolumeChange = (value) => {
    setVolume(value);
    audioList.current[sourceIndex].volume = value;
    if(value === 0) {
      setMute(true);
    } else {
      setMute(false);
    };
    //ボリュームバーの色の設定
    const rangeSliders = document.getElementsByClassName('audio-volume-slider');

    const baseColor = '#C4C5D3';
    const activeColor = '#5F6368';

    const progress = (value / 1) * 100;
  
    rangeSliders[0].style.background = `linear-gradient(to right, ${activeColor} ${progress}%, ${baseColor} ${progress}%)`;
  }

  const handleMute = () => {
    if(isMute) {
      setMute(false);
      handleVolumeChange(volumeBeforeMute);
    } else {
      setMute(true);
      setVolumeBeforeMute(volume);
      handleVolumeChange(0);
    }
  }


  //カウンター
  const timerRef = useRef(new timer());
  const countStart = () => {
    timerRef.current.countStart();
  }
  const countStop = () => {
    timerRef.current.countStop();
    if(props.userInfo) {
      props.userInfo.total_time += timerRef.current.count;
      let jwtToken = Cookies.get('token');
      //期限切れ検証用
      // let jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUQUtVTUlJVEFZQSIsInN1YiI6IkNvb29tc0FQSSIsImF1ZCI6ImZmZkBlbWFpbC5jb20iLCJpYXQiOjE3MjMwMDQ2OTksIm5iZiI6MTcyMzAwNDY5OSwiZXhwIjoxNzIzMDE1NDk5fQ.ZZvzMudGAingqnt2VL3kfwGKCLL5n4639LbaSqXiLVY';
      UpdateUser(props.userInfo, jwtToken).catch((error) => {
        let uncalculatedTime = Number(Cookies.get('uncalculatedTime')) || 0;
        console.log(uncalculatedTime + timerRef.current.count);
        Cookies.set('uncalculatedTime', uncalculatedTime + timerRef.current.count);
      });
    }
  }

  return(
    <>
      <div style={{ position: "absolute", zIndex: 10}}>
        <canvas className="canvas"/>
      </div>
      <div className='audio-player-container'>
        <div className="audio-volume-container">
          <input
            className="audio-volume-slider"
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={volume}
            onChange={e => {
              handleVolumeChange(e.target.valueAsNumber)
            }}
            style={{background : 'linear-gradient(to right, #5F6368 20%, #C4C5D3 20%)'}}
            />
          <div className="volume-icon-container" onClick={handleMute}>
            {isMute
              ? <img className="volume-icon" src="./img/icon/volume-mute.png" alt='volume mute icon' />
              : <img className="volume-icon" src="./img/icon/volume.png" alt='volume icon' />
            }
          </div>
        </div>
        <div className="audio-play-button">
        {isPlaying ? 
          <motion.img
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          src='./img/icon/stop.png'
          alt='stop icon' 
          onClick={audioStop}/>
          : <motion.img
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              src='./img/icon/play.png' 
              alt='play icon' 
              onClick={() => audioStart(sourceIndex)}/>
        }
        </div>
        <div className="audio-play-range" onClick={() => {
          isPlaying ? audioStop() : audioStart(sourceIndex)
          if(tapCount === 0) setTapCount(tapCount+1);
        }}>
        <div className="tap-text">
          <p>{tapCount === 0 ? "Tap to play!" : ""}</p>
        </div>
        </div>
      </div>
    </>
  )
}

export default AudioVisualizer;