import { useSelector } from "react-redux";
import css from "./UserBar.module.css";
import { selectUser } from "../../redux/auth/authSelector";
import { useLocation, useNavigate } from "react-router";

export default function UserBar() {
  const user = useSelector(selectUser);
  const location = useLocation();
  const isHome = location.pathname === "/home";
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <div className={css.wrap} onClick={handleClick}>
      {user.avatarURL ? (
        <img src={user.avatarURL} alt="User avatar" className={css.avatar} />
      ) : (
        <svg className={css.icon}>
          <use href="/icons.svg#icon-profile" />
        </svg>
      )}
      <p className={isHome ? css.nameHome : css.name}>{user.name}</p>
    </div>
  );
}
