import React from "react";
import { NavLink } from "react-router";
import styles from "./Header.module.scss";
import { FaSignOutAlt } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { useAuth } from "../../hooks/AuthProvider";

const Header = () => {
  const auth = useAuth();

  return (
      <header className={styles.header}>
          <NavLink to="/">
              <SiLeetcode />
          </NavLink>
          <nav className={styles.navbar}>
              <NavLink
                  to="/"
                  className={({isActive}) =>
                      isActive ? `${styles.active}` : undefined
                  }
              >
                  Home
              </NavLink>

              {auth.user ? (
                  <div className={styles.user_menu}>
                      <NavLink
                          to="/contests"
                          className={({isActive}) =>
                              isActive ? `${styles.active}` : undefined
                          }
                      >
                          Contests
                      </NavLink>
                      <NavLink
                          to="/leaderboard"
                          className={({isActive}) =>
                              isActive ? `${styles.active}` : undefined
                          }
                      >
                          Leaderboard
                      </NavLink>
                      <NavLink to="/profile" className={styles.user_profile}>
                          {auth.user.username[0].toUpperCase()}
                      </NavLink>
                      <button
                          className={styles.logout_button}
                          onClick={() => auth.logOut()}
                      >
                          <FaSignOutAlt/>
                      </button>
                  </div>
              ) : (
                  <NavLink
                      to="/login"
                      className={({isActive}) =>
                          isActive ? `${styles.active}` : undefined
                      }
                  >
                      Login/Signup
                  </NavLink>
              )}
          </nav>

      </header>
  );
};

export default Header;
