import AddPet from "../AddPet/AddPet";
import PetsList from "../PetsList/PetsList";
import css from "./PetsBlock.module.css";

export default function PetsBlock() {
  return (
    <div className={css.wrap}>
      <AddPet />
      <h3 className={css.title}>My pets</h3>

      <PetsList />
    </div>
  );
}
