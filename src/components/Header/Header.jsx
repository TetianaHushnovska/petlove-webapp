import css from "./Heade.module.css";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AutnNav";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/authSelector";
import UserNav from "../UserNav/UserNav";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/home";
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={isHome ? css.headerHome : css.header}>
      <Logo />
      <Nav />
      {isLoggedIn ? <UserNav /> : <AuthNav />}
    </header>
  );
}
