import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./AuthForm.module.css";
import { useState } from "react";
import sprite from "/icons.svg";

export default function AuthForm({ fields, buttonText, onSubmit, schema }) {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [show, setShow] = useState({});

  const togglePassword = (name) => {
    setShow((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      {fields.map((field) => {
        const isError = errors[field.name];
        const isSuccess = dirtyFields[field.name] && !isError;
        const isPassword = field.type === "password";

        return (
          <div key={field.name} className={css.inputWrapper}>
            <input
              type={isPassword && show[field.name] ? "text" : field.type}
              className={`
                ${css.input}
                ${isError ? css.error : ""}
                ${isSuccess ? css.success : ""}
              `}
              placeholder={field.placeholder}
              {...register(field.name)}
            />

            {/* PASSWORD VISIBILITY ICON */}
            {isPassword && (
              <svg
                className={css.eyeIcon}
                onClick={() => togglePassword(field.name)}
              >
                <use
                  href={
                    show[field.name]
                      ? `${sprite}#icon-eye`
                      : `${sprite}#icon-eye-off`
                  }
                />
              </svg>
            )}

            {/* ERROR ICON */}
            {isError && (
              <svg className={`${css.stateIcon} ${css.errorIcon}`}>
                <use href="/icons.svg#icon-cross" />
              </svg>
            )}

            {/* SUCCESS ICON */}
            {isSuccess && (
              <svg className={`${css.stateIcon} ${css.successIcon}`}>
                <use href="/icons.svg#icon-tik" />
              </svg>
            )}

            {isError && <p className={css.errorMessage}>{isError.message}</p>}
          </div>
        );
      })}

      <button type="submit" className={css.btn}>
        {buttonText}
      </button>
    </form>
  );
}
