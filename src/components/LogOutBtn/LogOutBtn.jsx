import { useLocation } from "react-router";
import css from "./LogOutBtn.module.css";

export default function LogOutBtn({ openModal, mode = "nav" }) {
  const location = useLocation();
  const isHome = location.pathname === "/home";
  if (mode === "profile") {
    return (
      <button type="button" className={css.btnLog} onClick={openModal}>
        Log out
      </button>
    );
  }
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
