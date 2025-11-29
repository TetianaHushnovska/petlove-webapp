import { useEffect } from "react";
import css from "./ModalAttention.module.css";
import { Link } from "react-router";

export default function ModalAttention({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={css.backdrop} onClick={handleBackdrop}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.icon}>
            <use href="/icons.svg#icon-cross" />
          </svg>
        </button>

        <div className={css.img}>🐶</div>
        <h3 className={css.title}>Attention</h3>
        <p className={css.text}>
          We would like to remind you that certain functionality is available
          only to authorized users. If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>

        <div className={css.btnWrap}>
          <Link to="/login" className={css.login}>
            Log In
          </Link>
          <Link to="/register" className={css.register}>
            Registration
          </Link>
        </div>
      </div>
    </div>
  );
}
