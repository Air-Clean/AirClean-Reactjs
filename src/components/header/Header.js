import React from 'react';
import './Header.css';


function Header() {
  console.log('헤더입니다.');

  return(
      <>
          <div style={{width: '100vw', height: '50px', backgroundColor: 'blue', color:'white'}}>
              <h1>Header</h1>
          </div>
      </>
  );
  
}


export default Header;
