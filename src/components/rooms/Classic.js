import 'css/rooms/Classic.css';
import PageLoding from 'components/PageLoding';
import AudioVisualizer from 'components/parts/AudioVisualizer';
import BackgroundBlack from 'components/parts/BackgroudBlack';


function Classic(props) {
  const imageSrc = "./img/background/lo-fi_bg.jpg";
  const img = new Image()
  img.src = imageSrc //プリロード

  const userInfoProps = {
    userInfo: props.userInfo,
    setUserInfo: props.setUserInfo,
  }

  return (
    <>
      <PageLoding />
      <AudioVisualizer source={props.source} {...userInfoProps}/>
      <BackgroundBlack />
      <div className="classic-container">
        <img className="background-img" src={imageSrc} alt='background img'/>
      </div>
    </>
  );
}

export default Classic;