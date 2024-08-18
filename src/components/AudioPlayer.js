import { useEffect, useRef, useState } from "react";
import 'css/AudioPlayer.css';

function AudioPlayer(props) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [volume, setVolume] = useState(0.2);
  const [loop, setLoop] = useState(false);
  const [isPlaying, setPlaying] = useState(false);

  const audioRef = useRef(new Audio(props.source[sourceIndex]));

  audioRef.current.volume = volume;
  audioRef.current.addEventListener('ended', () => {
    if(loop) {
      audioRef.current.play()
    } else if(props.source.length-1 > sourceIndex) {
      audioRef.current = new Audio(props.source[sourceIndex+1]);
      audioRef.current.volume = volume;
      setSourceIndex(sourceIndex+1);
    } else {
      audioRef.current = new Audio(props.source[0]);
      audioRef.current.volume = volume;
      setSourceIndex(0);
    }
  })

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
    return () => {
      audioRef.current.pause();
    }
  }, [isPlaying, sourceIndex]);

  useEffect(() => {
    if(props.source.length === 1) setLoop(true);
  }, [])

  const handleVolumeChange = (e) => {
    setVolume(e.target.valueAsNumber);
    audioRef.current.volume = e.target.valueAsNumber;

    const rangeSliders = document.getElementsByClassName('audio-volume-slider');

    const baseColor = '#C4C5D3';
    const activeColor = '#5F6368';

    const progress = (e.target.valueAsNumber / 1) * 100;
  
    rangeSliders[0].style.background = `linear-gradient(to right, ${activeColor} ${progress}%, ${baseColor} ${progress}%)`;
  }

  return(
    <>
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
              handleVolumeChange(e)
            }}
            style={{background : 'linear-gradient(to right, #5F6368 20%, #C4C5D3 20%)'}}
            />
          <img className="volume-icon" src="./img/icon/volume.png" alt='volume icon' />
        </div>
        <div className="audio-play-button" onClick={() => setPlaying(!isPlaying)}>
          {isPlaying ? 
            <img src='./img/icon/stop.png' alt='stop icon'/>
          : <img src='./img/icon/play.png' alt='play icon'/>
          }
        </div>
      </div>
    </>
  );
}
export default AudioPlayer;