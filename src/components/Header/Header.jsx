import css from "./Heade.module.css";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import AuthNav from "../AuthNav/AutnNav";
import { useLocation } from "react-router";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/home";

  return (
    <header className={isHome ? css.headerHome : css.header}>
      <Logo />
      <Nav />
      <AuthNav />
    </header>
  );
}
