import { Link, useLocation } from "react-router";
import css from "./AuthNav.module.css";

export default function AuthNav() {
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
    <div className={css.authNav}>
      <Link to="/login" className={isHome ? css.loginHome : css.login}>
        Log in
      </Link>
      <Link to="/register" className={isHome ? css.registerHome : css.register}>
        Registration
      </Link>
    </div>
  );
}
