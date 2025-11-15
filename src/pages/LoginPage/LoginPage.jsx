import { Link, useNavigate } from "react-router";
import AuthForm from "../../components/AuthForm/AuthForm";
import PetBlock from "../../components/PetBlock/PetBlock";
import Title from "../../components/Title/Title";
import { loginSchema } from "../../utils/schemas";
import css from "./LoginPage.module.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/authOperations";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const user = await dispatch(loginUser(data)).unwrap();
      console.log("Logged in user:", user);
      navigate("/profile");
    } catch (err) {
      iziToast.error({
        title: "Error",
        message: err || "Login failed",
        position: "topLeft",
      });
    }
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
