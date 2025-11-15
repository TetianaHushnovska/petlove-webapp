import { useDispatch } from "react-redux";
import css from "./ModalApproveAction.module.css";
import { logoutUser } from "../../redux/auth/authOperations";
import { useNavigate } from "react-router";
import { useCloseOnEsc, useLockBodyScroll } from "../../utils";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default function ModalApproveAction({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useCloseOnEsc(onClose);
  useLockBodyScroll();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (err) {
      iziToast.error({
        title: "Error",
        message: err || "Logout failed",
        position: "topRight",
      });
    } finally {
      localStorage.clear();
      navigate("/home");
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={css.modalBtn} onClick={onClose}>
          <svg className={css.icon}>
            <use href="/icons.svg#icon-cross" />
          </svg>
        </button>

        <div className={css.pet}>🐈</div>
        <p className={css.title}>Already leaving?</p>
        <div className={css.btnBox}>
          <button type="submit" className={css.submit} onClick={handleSubmit}>
            Yes
          </button>
          <button type="button" className={css.cancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
