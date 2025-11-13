import css from "./RegisterPage.module.css";
import PetBlock from "../../components/PetBlock/PetBlock";
import Title from "../../components/Title/Title";
import AuthForm from "../../components/AuthForm/AuthForm";
import { registerSchema } from "../../utils/schemas";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/authOperations";

export default function RegisterPage() {
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const cleanData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    dispatch(registerUser(cleanData));
  };

  return (
    <main className="container">
      <div className={css.wrap}>
        <PetBlock mode="register" />

        <div className={css.registerBox}>
          <Title
            text="Registration"
            subtext="Thank you for your interest in our platform."
          />

          <AuthForm
            schema={registerSchema}
            buttonText="Registration"
            onSubmit={onSubmit}
            fields={[
              { name: "name", type: "text", placeholder: "Name" },
              { name: "email", type: "email", placeholder: "Email" },
              { name: "password", type: "password", placeholder: "Password" },
              {
                name: "confirmPassword",
                type: "password",
                placeholder: "Confirm password",
              },
            ]}
          />

          <p className={css.text}>
            Already have an account?
            <Link to="/login" className={css.link}>
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
