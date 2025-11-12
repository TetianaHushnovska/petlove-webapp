import { Link, NavLink } from "react-router";
import css from "./Heade.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <div>
        <Link to="/" className={css.link}>
          <svg className={css.logo}>
            <use href="/public/icons.svg#icon-logo" />
          </svg>
        </Link>
      </div>

      <nav className={css.nav}>
        <NavLink
          to="/news"
          className={({ isActive }) =>
            `${css.navLink} ${isActive ? css.isActive : ""}`
          }
        >
          News
        </NavLink>
        <NavLink
          to="/notice"
          className={({ isActive }) =>
            `${css.navLink} ${isActive ? css.isActive : ""}`
          }
        >
          Find pet
        </NavLink>
        <NavLink
          to="/friends"
          className={({ isActive }) =>
            `${css.navLink} ${isActive ? css.isActive : ""}`
          }
        >
          Our friends
        </NavLink>
      </nav>
    </header>
  );
}
