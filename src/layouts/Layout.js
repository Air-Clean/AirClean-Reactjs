import React, { useMemo , useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/header/AdminHeader';
import ClientHeader from '../components/header/ClientHeader';
import './Layout.css';
import jwt_decode from 'jwt-decode'
import { callBranchData } from '../apis/MemberAPICalls';
import { useSelector , useDispatch} from 'react-redux';

function Layout() {

  const dispatch = useDispatch();

  const members = jwt_decode(window.localStorage.getItem('accessToken'))

  console.log("member toekn" ,members)
  console.log('token' , window.localStorage.getItem('accessToken'))

  useEffect(()=>{
    const memberId = members.sub;

    console.log("memberId",memberId)

    if(members.memberRole==='b'){
      dispatch(callBranchData({memberId}));
    }
    
  },[])

  const branch = useSelector(state=>state.getBranchReducer)

  useEffect(()=>{
    console.log('branch 정보 들어 왔나요?', branch)
    window.localStorage.setItem('branch',branch)
  },[branch])

  const memoizedHeader = useMemo(() => {
    
    
    if (members.memberRole==='b') {
      return <ClientHeader />;
      
    } else {
      return <AdminHeader />;
    }
   // 사용자 타입이 없는 경우
  }, []);

  return (
    <div className="layout">
      {memoizedHeader}
      <Outlet />
    </div>
  );
}

export default Layout;
