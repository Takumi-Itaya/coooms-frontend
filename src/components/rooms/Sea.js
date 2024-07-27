import '../../css/rooms/Sea.css';
import PageLoding from '../PageLoding';
import AudioVisualizer from '../parts/AudioVisualizer';
import BackgroundBlack from '../parts/BackgroudBlack';

function Sea(props) {
  const imageSrc = "./img/background/sea_bg.jpg";
  const img = new Image()
  img.src = imageSrc //プリロード

  const userInfoProps = {
    userInfo: props.userInfo,
    setUserInfo: props.setUserInfo,
  }

  return (
    <>
      <PageLoding />
      <AudioVisualizer source={[props.source]} {...userInfoProps}/>
      <BackgroundBlack />
      <div className="sea-container">
        <img className="background-img" src={imageSrc} alt='background img'/>
      </div>
    </>
  );
}

export default Sea;