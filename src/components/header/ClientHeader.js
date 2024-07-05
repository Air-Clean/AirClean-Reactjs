import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../modules/Header.module.css';
import logo from '../../assets/logo2.png'; // 로고 이미지 경로를 알맞게 수정하세요

const AdminHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const showDropdown = () => setDropdownVisible(true);
  const hideDropdown = () => setDropdownVisible(false);

  const changeColor = (index) => {
    setActiveMenu(index);
  };

  return (
    <>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={styles.actions}>
            <p className={styles.alarm}>알람</p>
            <button className={styles.signUp}>Sign up</button>
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
              <div>세탁물관리</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 2 ? styles.active : ''}`}
              onClick={() => changeColor(2)}
            >
              <div>보고서관리</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 3 ? styles.active : ''}`}
              onClick={() => changeColor(3)}
            >
              <div>재고관리</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 4 ? styles.active : ''}`}
              onClick={() => changeColor(4)}
            >
              <div>물류시스템</div>
            </li>
            <li
              className={`${styles.menuItem} ${activeMenu === 5 ? styles.active : ''}`}
              onClick={() => changeColor(5)}
            >
              <div>마이페이지</div>
            </li>
          </ul>
          {dropdownVisible && (
            <div className={styles.dropdown}>
              <ul className={styles.dropdownMenu} style={{ textAlign: 'center' }}>
                <li className={styles.menuItem1} onClick={() => changeColor(1)}>
                  <NavLink to="menu1" activeClassName={styles.active}>menu1</NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink to="menu2" activeClassName={styles.active}>menu2</NavLink>
                      <ul className={styles.submenu}>
                        <li><NavLink to="#submenu1-1-2" activeClassName={styles.active}>1-2</NavLink></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem2} onClick={() => changeColor(2)}>
                  <NavLink to="#submenu1-2" activeClassName={styles.active}>2</NavLink>
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
                  <NavLink to="#submenu1-3" activeClassName={styles.active}>3</NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink to="#submenu1-3-1" activeClassName={styles.active}>3-1</NavLink>
                      <ul className={styles.submenu}>
                        <li><NavLink to="#submenu1-3-2" activeClassName={styles.active}>3-2</NavLink></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem4} onClick={() => changeColor(4)}>
                  <NavLink to="#submenu1-4" activeClassName={styles.active}>4</NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink to="#submenu1-4-1" activeClassName={styles.active}>4-1</NavLink>
                      <ul className={styles.submenu}>
                        <li><NavLink to="#submenu1-4-2" activeClassName={styles.active}>4-2</NavLink></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className={styles.menuItem5} onClick={() => changeColor(5)}>
                  <NavLink to="#submenu1-5" activeClassName={styles.active}>5</NavLink>
                  <ul className={styles.submenu}>
                    <li>
                      <NavLink to="#submenu1-5-1" activeClassName={styles.active}>5-1</NavLink>
                      <ul className={styles.submenu}>
                        <li><NavLink to="#submenu1-5-2" activeClassName={styles.active}>5-2</NavLink></li>
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
