import { useSelector } from "react-redux";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import css from "./UserCard.module.css";
import { formatPhone } from "../../utils/formatValue";
import PetsBlock from "../PetsBlock/PetsBlock";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import { useState } from "react";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";
import ModalEditUser from "../ModalEditUser/ModalEditUser";

export default function UserCard() {
  const user = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className={css.userCard}>
      <EditUserBtn mode="profile" onClick={() => setEditOpen(true)} />

      <div className={css.userTag}>
        User
        <svg className={css.icon}>
          <use href="/icons.svg#icon-user" />
        </svg>
      </div>

      <div className={css.wrap}>
        {user.avatar ? (
          <img src={user.avatar} alt="User avatar" className={css.avatar} />
        ) : (
          <svg className={css.userIcon}>
            <use href="/icons.svg#icon-profile" />
          </svg>
        )}

        {!user.avatar && (
          <EditUserBtn mode="photo" onClick={() => setEditOpen(true)} />
        )}
      </div>

      <p className={css.infoTitle}>My information</p>
      <div className={css.info}>
        <div
          className={
            user.name ? `${css.infoField} ${css.exist}` : css.infoField
          }
        >
          {user.name}
        </div>
        <div
          className={
            user.email ? `${css.infoField} ${css.exist}` : css.infoField
          }
        >
          {user.email}
        </div>
        <div
          className={
            user.phone ? `${css.infoField} ${css.exist}` : css.infoField
          }
        >
          {formatPhone(user.phone || "")}
        </div>
      </div>
      <PetsBlock />
      <LogOutBtn openModal={() => setIsModalOpen(true)} mode="profile" />

      {isModalOpen && (
        <ModalApproveAction onClose={() => setIsModalOpen(false)} />
      )}

      {editOpen && <ModalEditUser onClose={() => setEditOpen(false)} />}
    </div>
  );
}
