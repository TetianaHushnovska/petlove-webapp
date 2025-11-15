import { useState } from "react";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import UserBar from "../UserBar/UserBar";
import css from "./UserNav.module.css";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";

export default function UserNav() {
  const [isModalOpen, setIsModalOpen] = useState();

  return (
    <div className={css.wrap}>
      <LogOutBtn openModal={() => setIsModalOpen(true)} />
      <UserBar />

      {isModalOpen && (
        <ModalApproveAction onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
