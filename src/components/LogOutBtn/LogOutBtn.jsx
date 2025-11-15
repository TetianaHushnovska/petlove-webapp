import { useLocation } from "react-router";
import css from "./LogOutBtn.module.css";

export default function LogOutBtn({ openModal }) {
  const location = useLocation();
  const isHome = location.pathname === "/home";
  return (
    <button
      type="button"
      className={isHome ? css.btnHome : css.btn}
      onClick={openModal}
    >
      Log out
    </button>
  );
}
