import './Room.css';
import PageLoding from 'components/layouts/page-loding/PageLoding';
import AudioVisualizer from 'features/audio/components/AudioVisualizer';


function Room(props) {
  const img = new Image()
  img.src = props.background

  const userInfoProps = {
    userInfo: props.userInfo,
    setUserInfo: props.setUserInfo,
  }

  return (
    <>
      <PageLoding />
      <AudioVisualizer source={props.source} {...userInfoProps}/>
      <div className="room-bg-container">
        <img className="background-img" src={props.background} alt='background img'/>
      </div>
    </>
  );
}

export default Room;