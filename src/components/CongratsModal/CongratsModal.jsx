import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import css from "./CongratsModal.module.css";

export default function CongratsModal({ onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.icon}>
            <use href="/icons.svg#icon-cross" />
          </svg>
        </button>

        <div className={css.iconWrapper}>🐈</div>

        <h2 className={css.title}>Congrats</h2>
        <p className={css.text}>
          The first fluff in the favorites! May your friendship be the happiest
          and filled with fun.
        </p>

        <button className={css.primaryBtn} onClick={() => navigate("/profile")}>
          Go to profile
        </button>
      </div>
    </div>
  );
}
