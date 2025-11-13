import { Link, useLocation } from "react-router";
import css from "./Logo.module.css";

export default function Logo() {
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
    <div>
      <Link to="/" className={isHome ? css.linkHome : css.link}>
        <svg className={css.logo}>
          <use href="/public/icons.svg#icon-logo" />
        </svg>
      </Link>
    </div>
  );
}
