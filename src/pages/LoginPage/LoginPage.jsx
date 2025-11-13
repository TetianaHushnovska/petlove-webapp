import { Link } from "react-router";
import AuthForm from "../../components/AuthForm/AuthForm";
import PetBlock from "../../components/PetBlock/PetBlock";
import Title from "../../components/Title/Title";
import { loginSchema } from "../../utils/schemas";
import css from "./LoginPage.module.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/authOperations";

export default function LoginPage() {
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <main className="container">
      <div className={css.wrap}>
        <PetBlock mode="login" />

        <div className={css.loginBox}>
          <Title
            text="Log in"
            subtext="Welcome! Please enter your credentials to login to the platform:"
          />

          <AuthForm
            schema={loginSchema}
            buttonText="Log in"
            onSubmit={onSubmit}
            fields={[
              { name: "email", type: "email", placeholder: "Email" },
              { name: "password", type: "password", placeholder: "Password" },
            ]}
          />

          <p className={css.text}>
            Don’t have an account?
            <Link to="/register" className={css.link}>
              {" "}
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
