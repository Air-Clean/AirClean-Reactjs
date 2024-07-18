import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { callLoginAPI } from '../../apis/MemberAPICalls';
import './Login.css'; // Import the CSS file
import logo from '../../assets/logo1.png';
import AskWindow from './AskWindow';

// 토큰 복호화 용 임포트
import jwt_decode from 'jwt-decode'


const Login = () => {

  // react-router-dom
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();

  // useState

  const [form,setForm] = useState({
    memberId:'',
    memberPassword : ''
  })


  
  

  const loginMember = useSelector(state=>state.memberReducer);

  

  useEffect(()=>{
    if(loginMember.status === 200){
      console.log("[Login] Login SUCCESS {}", loginMember);

      // 앞으로 이방식으로 토큰값을 꺼내서 쓸수 있다
      const members =jwt_decode(window.localStorage.getItem('accessToken'))

      console.log(members)
      
      if(members.memberRole==='b'){
        window.location.href='location'
      }
      else{
        navigate('/company',{replace : true})
      }

      setForm({memberId: '',memberPassword: ''})
    }
  },[loginMember, navigate]);


  const handleAdminLogin = () => {
    dispatch(callLoginAPI({
      form: form
    }))

    
  };

  const loginKeyHandler = e => {
    if(e.key=== 'Enter'){
      dispatch(callLoginAPI({
        form: form
      }))
    }
  }

  const onChangeHandler=e=>{
    setForm({
      ...form,[e.target.name] : e.target.value
    })
  }


  
  return (
    <div className="login-layout">
      <div className="flash"></div>
        <div className="bubbles">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
        </div>

      <div style={{display: 'flex'}}>
        <div className='wrap1'>
          <div style={{width: '100%', height: '50vh'}}></div>
          <div style={{width: '100%', height: '50vh', display: 'flex', justifyContent: 'center'}}>
            <div style={{width: '70%', height: '80%', color: 'white'}}>          
              <p className='text' style={{marginTop:'50px'}}>Simplify laundry operations</p>
              <p className='text'> with AirClean ERP</p>
              <br/>
            </div>
          </div>
        </div>

        <div className='wrap2'>
          <div className='login_input' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width:'70%', height:'70vh'}}>
              <div style={{height: '30%'}}>
                <img src={logo} alt="Logo" style={{marginLeft:'25px'}}/>
              </div>
              <div className="sign-up-box" style={{height: '70%'}}>
                <h2 className="sign-up-title">Sign in</h2>
                
                <div style={{color:'white'}}>
                  <p className='text_input'>id</p>
                  <input type="text" id="id" name="memberId" placeholder='ID' onChange={onChangeHandler} onKeyDown={loginKeyHandler} value={form.memberId} autoComplete='off'/>
                </div>
                <div  style={{color:'white'}}>
                  <p className='text_input'>password</p>
                  <input type="password" id="password" name="memberPassword" placeholder='PASSWORD' onChange={onChangeHandler} onKeyDown={loginKeyHandler} value={form.memberPassword} autoComplete='off'/>   
                </div>      

                
                <div className="button-container">
                  <button className="login-button" onClick={handleAdminLogin} >
                    Sign in
                  </button>
                  {/* <button className="login-button" onClick={handleClientLogin}>
                    Client
                  </button> */}
                </div>
                <div style={{color: 'white'}}>
                  <AskWindow/>
                </div>
              </div>
            
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;
