import { useEffect, useRef, useState } from 'react';
import './Main.css';

import treeIcon from 'assets/test-icon/trees.png';
import rainIcon from 'assets/test-icon/rainy.png';
import seaIcon from 'assets/test-icon/beach.png';
import musicIcon from 'assets/test-icon/musical-note.png';
import playIcon from 'assets/test-icon/play.png';
import stopIcon from 'assets/test-icon/play (2).png';
import { timer } from 'utils/timer';
import UpdateUser from 'features/auth/api/UpdateUser';
import Cookies from 'js-cookie';


const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
function Test(props) {
  const [isPlaying, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [currentAudio, setCurrentAudio] = useState('forest');
  const trackList = useRef([]);
  const audioList = useRef([]);

  useEffect(() => {
    for(let i = 0; i < props.source.length; i++) {
      if(!trackList.current[i]) {
        const audioElement = new Audio(props.source[i].musicList[0].source);
        audioElement.crossOrigin = "anonymous";
        audioElement.volume = volume;
        audioElement.loop = true;

        audioList.current.push(audioElement);
    
        const track = audioCtx.createMediaElementSource(audioList.current[i]);
        track.connect(analyser);
        track.connect(audioCtx.destination);
    
        trackList.current.push(track);
      }
    }

    renderVisualizer();
    audioCtx.suspend();
  }, [])

  const currentAudioStart = () => {
    switch(currentAudio) {
      case 'forest': audioStart(audioList.current[1]); break;
      case 'rain': audioStart(audioList.current[2]); break;
      case 'sea': audioStart(audioList.current[3]); break;
      case 'music': audioStart(audioList.current[0]); break;
    }
    setPlaying(true);
  }

  const currentAudioStop = () => {
    switch(currentAudio) {
      case 'forest': audioStop(audioList.current[1]); break;
      case 'rain': audioStop(audioList.current[2]); break;
      case 'sea': audioStop(audioList.current[3]); break;
      case 'music': audioStop(audioList.current[0]); break;
    }
    setPlaying(false);
  }

  const currentAudioVolumeChange = (value) => {
    switch(currentAudio) {
      case 'forest': audioList.current[1].volume = value; break;
      case 'rain': audioList.current[2].volume = value; break;
      case 'sea': audioList.current[3].volume = value; break;
      case 'music': audioList.current[0].volume = value; break;
    }
  }

  const audioStart = (audio) => {
    if(audioCtx.state === 'suspended') audioCtx.resume()
    audio.volume = volume;
    audio.play();
    renderVisualizer();

    countStart();
  }

  const audioStop = (audio) => {
    audio.pause();

    countStop();
  }

  const changeAudioMode = (mode) => {
    currentAudioStop();
    setCurrentAudio(mode);
  }

  const handleVolumeChange = (value) => {
    setVolume(value);
    currentAudioVolumeChange(value);

    const rangeSliders = document.getElementsByClassName('audio-volume-slider');

    const baseColor = '#F2EFE7';
    const activeColor = '#48A6A7';

    const progress = (value / 1) * 100;
  
    rangeSliders[0].style.background = `linear-gradient(to right, ${activeColor} ${progress}%, ${baseColor} ${progress}%)`;
  }

  
  const renderVisualizer = () => {
    const canvas = document.getElementsByClassName('audio-visualizer')[0];
    const canvasContext = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    analyser.fftSize = 16384;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function renderCircleFrame() {
      requestAnimationFrame(renderCircleFrame);
      
      let bars = 50;
      const angleStep = (Math.PI * 2) / bars;

      analyser.getByteFrequencyData(dataArray);
      canvasContext.clearRect(0 ,0, canvasWidth, canvasHeight);
      canvasContext.beginPath(); 
      
      // 円の半径
      const radius = 200;
      
      //外側の線を描画
      for (let index = 0; index < bars; index += 1) {
        const dist = (dataArray[index] / 3) + radius; //lineの長さ
        const angle = angleStep * index + 0.01;
        const x1 = canvasWidth / 2 + radius * Math.cos(angle);
        const y1 = canvasHeight / 2 + radius * Math.sin(angle);
        const x = canvasWidth / 2 + dist * Math.cos(angle);
        const y = canvasHeight / 2 + dist * Math.sin(angle);

        canvasContext.lineCap = "round";
        canvasContext.moveTo(x1, y1);
        canvasContext.lineTo(x, y);
        canvasContext.lineWidth = 18;
        canvasContext.strokeStyle = `rgb(72, 166, 167)`;
      }
      canvasContext.stroke();

      //内側の線を描画
      for (let index = 0; index < bars; index += 1) {
        const dist = (dataArray[index] / 3) + radius; //lineの長さ
        const angle = angleStep * index + 0.01;

        const x2 = canvasWidth / 2 + radius * Math.cos(angle);
        const y2 = canvasHeight / 2 + radius * Math.sin(angle);
        const x3 = canvasWidth / 2 + dist * Math.cos(angle);
        const y3 = canvasHeight / 2 + dist * Math.sin(angle);

        canvasContext.lineCap = "round";
        canvasContext.moveTo(x2, y2);
        canvasContext.lineTo(x3, y3);
        canvasContext.lineWidth = 12;
        canvasContext.strokeStyle = `rgb(242, 239, 231)`;
      }
      canvasContext.stroke();
    }

    renderCircleFrame();
  }

  //ユーザーのtotaltimeの更新
  const timerRef = useRef(new timer());
  const countStart = () => {
    timerRef.current.countStart();
  }
  const countStop = () => {
    timerRef.current.countStop();
    if(props.userInfo) {
      props.userInfo.total_time += timerRef.current.count;
      let jwtToken = Cookies.get('token');
      UpdateUser(props.userInfo, jwtToken).catch(() => {
        let uncalculatedTime = Number(Cookies.get('uncalculatedTime')) || 0;
        console.log(uncalculatedTime + timerRef.current.count);
        Cookies.set('uncalculatedTime', uncalculatedTime + timerRef.current.count);
      });
    }
  }

  const buttonSelectedStyle = {
    margin: '16px',
    border: '7px solid #48A6A7'
  }

  return (
    <>
      {/* メインコンテンツ */}
      <div className="test-container">


        {/* オーディオビジュアライザー */}
        <div className="audio-visualizer-container">
          <canvas className="audio-visualizer"/>
        </div>

        {/* タイトル */}
        <div className="title-container">
          <h1 className="title">Coooms</h1>
        </div>

        {/* 再生ボタンとボリューム */}
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
            style={{background : 'linear-gradient(to right, #48A6A7 20%, #F2EFE7 20%)'}}
            />
            {
              isPlaying ?
              <div className="audio-select-button" onClick={() => currentAudioStop()}>
                <img className="audio-play-icon" src={stopIcon} alt='play icon' />
              </div>
              :
              <div className="audio-select-button" onClick={() => currentAudioStart()}>
                <img className="audio-stop-icon" src={playIcon} alt='play icon' />
              </div>
            }
        </div>

        {/* 音声切り替えボタン */}
        <div className="audio-select-container">
          <div className="audio-select-button" 
              style={currentAudio === 'forest' ? buttonSelectedStyle : {}} 
              onClick={() => changeAudioMode('forest')}>
            <img className="audio-select-icon" src={treeIcon} alt='tree icon' />
          </div>
          <div className="audio-select-button"
              style={currentAudio === 'rain' ? buttonSelectedStyle : {}} 
              onClick={() => changeAudioMode('rain')}>
            <img className="audio-select-icon" src={rainIcon} alt='rain icon' />
          </div>
          <div className="audio-select-button" 
              style={currentAudio === 'sea' ? buttonSelectedStyle : {}} 
              onClick={() => changeAudioMode('sea')}>
            <img className="audio-select-icon" src={seaIcon} alt='sea icon' />
          </div>
          <div className="audio-select-button" 
              style={currentAudio === 'music' ? buttonSelectedStyle : {}} 
              onClick={() => changeAudioMode('music')}>
            <img className="audio-select-icon" src={musicIcon} alt='music icon' />
          </div>
        </div>
      </div>
    </>
  );
}

export default Test;