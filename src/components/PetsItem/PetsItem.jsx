import { useDispatch } from "react-redux";
import { formatDate, safeValue } from "../../utils/formatValue";
import css from "./PetsItem.module.css";
import { deletePet } from "../../redux/auth/authOperations";
import toast from "react-hot-toast";

export default function PetsItem({ pet }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deletePet(pet._id)).unwrap();
      toast.success("Pet removed successfully!");
    } catch (err) {
      toast.error(err?.message || "Failed to delete pet");
    }
  };

  return (
    <div className={css.cardWrap}>
      <div className={css.deleteBtn} onClick={handleDelete}>
        <svg className={css.icon}>
          <use href="/public/icons.svg#icon-trash" />
        </svg>
      </div>

      <img src={pet.imgURL} className={css.img} />

      <div>
        <h3 className={css.title}>{pet.title}</h3>

        <div className={css.details}>
          <div className={css.box}>
            <p className={css.param}>Name</p>
            <p className={css.paramDetail}>{safeValue(pet.name)}</p>
          </div>

          <div className={css.box}>
            <p className={css.param}>Birthday</p>
            <p className={css.paramDetail}>{formatDate(pet.birthday)}</p>
          </div>

          <div className={css.box}>
            <p className={css.param}>Sex</p>
            <p className={css.paramDetail}>{safeValue(pet.sex)}</p>
          </div>

          <div className={css.box}>
            <p className={css.param}>Species</p>
            <p className={css.paramDetail}>{safeValue(pet.species)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
