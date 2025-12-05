import React from 'react';
import { NavLink } from 'react-router';
import styles from './Header.module.scss';
import { useAuth } from 'auth/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const Header = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.logo} ${styles.active}` : styles.logo
        }
      >
        <span className={styles.brand}>Contester</span>
      </NavLink>
      <nav className={styles.navbar}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.active}` : undefined
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/contests"
          className={({ isActive }) =>
            isActive ? `${styles.active}` : undefined
          }
        >
          Contests
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) =>
            isActive ? `${styles.active}` : undefined
          }
        >
          Leaderboard
        </NavLink>
        <NavLink
          to="/results/1504"
          className={({ isActive }) =>
            isActive ? `${styles.active}` : undefined
          }
        >
          Results
        </NavLink>
      </nav>
      {token ? (
        <div className={styles.user_menu}>
          <span className={styles.notifications}></span>
          <NavLink to="/profile" className={styles.user_profile}>
            {user.username[0].toUpperCase()}
          </NavLink>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <button className={styles.logout_button} onClick={handleLogOut}>
            <FaSignOutAlt />
          </button>
        </div>
      ) : (
        <NavLink to="/login" className={styles.login}>
          Login/Signup
        </NavLink>
      )}
    </header>
  );
};

export default Header;
