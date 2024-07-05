import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // AuthContext 사용
import './Login.css'; // Import the CSS file
import logo from '../../assets/logo1.png';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAdminLogin = () => {
    login('admin');
    navigate('/admin/menu1');
  };

  const handleClientLogin = () => {
    login('client');
    navigate('/client/menu1');
  };

  
  return (
    <div className="login-layout">
      <div class="flash"></div>
        <div class="bubbles">
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
        </div>

      <div style={{display: 'flex'}}>
        <div className='wrap1'>
          <div style={{width: '100%', height: '50vh'}}></div>
          <div style={{width: '100%', height: '50vh', display: 'flex', justifyContent: 'center'}}>
            <div style={{width: '70%', height: '80%', color: 'white'}}>          
              <p className='text' style={{marginTop:'50px'}}>Simplify laundry operations</p>
              <p className='text'> with AirClean ERP</p>
              <br/>
              <div class="sign-in-box">
              <p class="member-text">Already a member?</p>
              <p class="sign-in-text">Sign in <span class="arrow">→</span></p>
              </div>
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
                <h2 className="sign-up-title">Sign up</h2>
                
                <div style={{color:'white'}}>
                  <p className='text_input'>id</p>
                  <input type="text" id="id" name="id" placeholder='아이디를 입력해주세요'/>
                </div>
                <div  style={{color:'white'}}>
                  <p className='text_input'>password</p>
                  <input type="text" id="password" name="password" placeholder='비밀번호를 입력해주세요'/>   
                </div>      

                
                <div className="button-container">
                  <button className="login-button" onClick={handleAdminLogin}>
                    Admin
                  </button>
                  <button className="login-button" onClick={handleClientLogin}>
                    Client
                  </button>
                </div>
                <div style={{color: 'white'}}>
                  <p style={{textAlign:'center'}}>문의하기</p>
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
