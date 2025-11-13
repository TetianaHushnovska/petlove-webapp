import { NavLink, useLocation } from "react-router";
import css from "./Nav.module.css";

export default function Nav() {
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
    <nav className={css.nav}>
      <NavLink
        to="/news"
        className={({ isActive }) =>
          `${css.navLink} ${isActive ? css.isActive : ""} ${
            isHome ? css.navLinkHome : ""
          }`
        }
      >
        News
      </NavLink>
      <NavLink
        to="/notices"
        className={({ isActive }) =>
          `${css.navLink} ${isActive ? css.isActive : ""} ${
            isHome ? css.navLinkHome : ""
          }`
        }
      >
        Find pet
      </NavLink>
      <NavLink
        to="/friends"
        className={({ isActive }) =>
          `${css.navLink} ${isActive ? css.isActive : ""} ${
            isHome ? css.navLinkHome : ""
          }`
        }
      >
        Our friends
      </NavLink>
    </nav>
  );
}
