import React, { useState } from 'react';
import { NavLink,useNavigate} from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/logo2.png'; // 로고 이미지 경로를 알맞게 수정하세요
import { useDispatch } from 'react-redux';
import { callLogoutAPI } from '../../apis/MemberAPICalls';
import jwtDecode from 'jwt-decode';

const AdminHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showDropdown = () => setDropdownVisible(true);
  const hideDropdown = () => setDropdownVisible(false);

  const changeColor = (index) => {
    setActiveMenu(index);
  };
  
  const logoutHandler=()=>{

    const members = jwtDecode(window.localStorage.getItem('accessToken'))

    window.localStorage.removeItem('accessToken')

    dispatch(callLogoutAPI())

    alert(`${members.memberName} 님 로그아웃 하셨습니다`)
    navigate("/",{replace : true});
  }

  return (
    <>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={styles.actions}>
            <p className={styles.alarm}>알람</p>
            <button className={styles.signUp} onClick={logoutHandler}>Logout</button>
          </div>
        </header>
      </div>
      <div>
        <nav className={styles.nav} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
          <ul className={styles.menu}>
            <li
              className={`${styles.menuItem} ${activeMenu === 1 ? styles.active : ''}`}
              onClick={() => changeColor(1)}
            >
              <div>재무분석</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 2 ? styles.active : ''}`}
              onClick={() => changeColor(2)}
            >
              <div>데이터예측</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 3 ? styles.active : ''}`}
              onClick={() => changeColor(3)}
            >
              <div>지점관리</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 5 ? styles.active : ''}`}
              onClick={() => changeColor(5)}
            >
              <div>재고관리</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 6 ? styles.active : ''}`}
              onClick={() => changeColor(6)}
            >
              <div>물류시스템</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 7 ? styles.active : ''}`}
              onClick={() => changeColor(7)}
            >
              <div>보고서관리</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 8 ? styles.active : ''}`}
              onClick={() => changeColor(8)}
            >
              <div>인적자원</div>
            </li>
          </ul>
          {dropdownVisible && (
            <div className={styles.dropdown}>
              <ul className={styles.dropdownMenu} style={{ textAlign: 'center' }}>
                <li className={styles.menuItem1} onClick={() => changeColor(1)}>
                  <NavLink to="financial" activeClassName={styles.active}>재무분석</NavLink>
                  <ul className={styles.submenu}>

                  </ul>
                </li>
                <li className={styles.menuItem2} onClick={() => changeColor(2)}>
                  <NavLink to="#submenu1-2" activeClassName={styles.active}>가고싶은 주소</NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink to="#submenu1-2-1" activeClassName={styles.active}>2-1</NavLink>
                      <ul className={styles.submenu}>
                        <li><NavLink to="#submenu1-2-2" activeClassName={styles.active}>2-2</NavLink></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem3} onClick={() => changeColor(3)}>
                  <NavLink to="branch" activeClassName={styles.active}>지점관리</NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      {/* <NavLink to="#submenu1-3-1" activeClassName={styles.active}>3-1</NavLink> */}
                      <ul className={styles.submenu}>
                        {/* <li><NavLink to="#submenu1-3-2" activeClassName={styles.active}>3-2</NavLink></li> */}
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem5} onClick={() => changeColor(5)}>
                <NavLink to="stock/application" activeClassName={styles.active}>재고관리</NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink to="stock/history" activeClassName={styles.active}>내역조회</NavLink>
                      {/* <ul className={styles.submenu}>
                        <li><NavLink to="#submenu1-5-2" activeClassName={styles.active}>5-2</NavLink></li>
                      </ul> */}
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem6} onClick={() => changeColor(6)}>
                  <NavLink to="car" activeClassName={styles.active}>물류시스템관리</NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      {/* <NavLink to="#submenu1-6-1" activeClassName={styles.active}>6-1</NavLink> */}
                      {/* <ul className={styles.submenu}> */}
                        {/* <li><NavLink to="#submenu1-6-2" activeClassName={styles.active}>6-2</NavLink></li> */}
                      {/* </ul> */}
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem7} onClick={() => changeColor(7)}>
                  <NavLink to="paper/newReports" activeClassName={styles.active}>보고서 작성</NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink to="paper/reports" activeClassName={styles.active}>보고서 조회</NavLink>
                      {/* <ul className={styles.submenu}>
                        <li><NavLink to="#submenu1-7-2" activeClassName={styles.active}>7-2</NavLink></li>
                      </ul> */}
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem8} onClick={() => changeColor(8)}>
                <NavLink to="members/employee" activeClassName={styles.active}>직원</NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink to="members/branch" activeClassName={styles.active}>지점장</NavLink>
                      <ul className={styles.submenu}>
                        <li>
                          <NavLink to="members/driver" activeClassName={styles.active}>차량기사</NavLink>
                          <ul className={styles.submenu}>
                            <li><NavLink to="members/temp" activeClassName={styles.active}>보류기록</NavLink></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>

                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default AdminHeader;
