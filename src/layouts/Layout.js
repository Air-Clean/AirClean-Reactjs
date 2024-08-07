import React, { useMemo , useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminHeader from '../components/header/AdminHeader';
import ClientHeader from '../components/header/ClientHeader';
import './Layout.css';
import jwt_decode from 'jwt-decode'
import { callLogoutAPI } from '../apis/MemberAPICalls';
import { useDispatch } from 'react-redux';


const checkTokenExpiration = (token) => {

  console.log('만기 시간',jwt_decode(token).exp)
  
  try {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Invalid token specified', error);
    alert('유효하지 않은 토큰입니다. 다시 로그인해주세요.');
    return false;
  }
};

function Layout() {


  const members = jwt_decode(window.localStorage.getItem('accessToken'))

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    const token = window.localStorage.getItem('accessToken')

    console.log('만기 확인')
    
    if(!token || !checkTokenExpiration(token)){
      console.log('만기')
      dispatch(callLogoutAPI())
      navigate("/",{replace : true})
    }
  },[navigate])

  const memoizedHeader = useMemo(() => {
    
    
    if (members.memberRole==='b') {
      return <ClientHeader />;
      
    } else {
      return <AdminHeader />;
    }
   // 사용자 타입이 없는 경우
  }, [members]);

  return (
    <div className="layout">
      {memoizedHeader}
      <Outlet />
    </div>
  );
}

export default Layout;
