import {MoonLoader} from 'react-spinners'
import laundryImage from '../assets/laundryvideo.gif'
const Loading = () => {
  return (
    <div className="loading" style={{display : 'flex' , alignItems : 'center', justifyContent : 'center' , zIndex : '4'}}>
      <img src={laundryImage} alt='이미지 없음'/>
    </div>
  );
};

export default Loading;
