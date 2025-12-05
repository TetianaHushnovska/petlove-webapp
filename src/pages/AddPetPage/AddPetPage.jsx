import AddPetForm from "../../components/AddPetForm/AddPetForm";
import PetBlock from "../../components/PetBlock/PetBlock";
import css from "./AddPetPage.module.css";

export default function AddPetPage() {
  return (
    <main className="container">
      <div className={css.wrap}>
        <PetBlock mode="add-pet" />
        <AddPetForm />
      </div>
    </main>
  );
}
