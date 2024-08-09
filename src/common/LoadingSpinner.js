
import { useEffect, useState } from 'react';
import laundryImage from '../assets/laundryvideo.gif'
const Loading = ({delay = 1000}) => {

  const [show, setShow] = useState(false);

  useEffect(()=>{
    const timer = setTimeout(()=>setShow(true),delay);

    return ()=> clearTimeout(timer);
  },[delay])
  if(!show){
    return null
  }
  return (
    <div className="loading" style={{display : 'flex' , alignItems : 'center', justifyContent : 'center' , zIndex : '4'}}>
      <img src={laundryImage} alt='이미지 없음'/>
    </div>
  );
};

export default Loading;
