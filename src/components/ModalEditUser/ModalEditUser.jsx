import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import css from "./ModalEditUser.module.css";
import { editUserSchema } from "../../utils/schemas";
import { updateUser } from "../../redux/auth/authOperations";

import { formatPhone, normalizePhone } from "../../utils/formatValue";

export default function ModalEditUser({ onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const fileInputRef = useRef();
  const [preview, setPreview] = useState(user.avatar || "");
  const [localSelected, setLocalSelected] = useState(false);

  const [displayPhone, setDisplayPhone] = useState("+380");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      avatar: user.avatar || "",
      name: user.name || "",
      email: user.email || "",
      phone: "+380",
    },
  });

  useEffect(() => {
    if (user?.phone) {
      setDisplayPhone(formatPhone(user.phone));
      setValue("phone", normalizePhone(user.phone), { shouldValidate: false });
    }
  }, [user.phone, setValue]);

  const avatarValue = watch("avatar");

  useEffect(() => {
    if (avatarValue && avatarValue.startsWith("http")) {
      setPreview(avatarValue);
      setLocalSelected(false);
    }
  }, [avatarValue]);

  const chooseFile = () => {
    fileInputRef.current.click();
  };

  const onFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localURL = URL.createObjectURL(file);
    setPreview(localURL);
    setLocalSelected(true);

    setValue("avatar", "", { shouldValidate: false });
  };

  const onSubmit = async (data) => {
    const result = await dispatch(
      updateUser({
        ...data,
        phone: normalizePhone(data.phone),
      })
    );

    if (updateUser.rejected.match(result)) {
      alert(result.payload?.message || "Update failed");
      return;
    }

    onClose();
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={css.backdrop} onClick={handleBackdrop}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.icon}>
            <use href="/icons.svg#icon-cross" />
          </svg>
        </button>

        <h2 className={css.title}>Edit information</h2>

        <div className={css.wrap}>
          {preview ? (
            <img src={preview} alt="Avatar preview" className={css.avatar} />
          ) : (
            <svg className={css.userIcon}>
              <use href="/icons.svg#icon-profile" />
            </svg>
          )}
        </div>

        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          {/* Avatar row */}
          <div className={css.row}>
            <input
              type="text"
              {...register("avatar")}
              className={css.inputAvatar}
              placeholder="Enter avatar URL"
            />

            <button
              type="button"
              className={css.uploadBtn}
              onClick={chooseFile}
            >
              Upload photo
              <svg className={css.icon}>
                <use href="/icons.svg#icon-upload" />
              </svg>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={onFileSelect}
            />
          </div>

          {errors.avatar && (
            <p className={css.error}>{errors.avatar.message}</p>
          )}

          {localSelected && (
            <p className={css.localWarning}>
              This is just a preview. To save the photo, paste the URL into the
              field above.
            </p>
          )}

          {/* Name */}
          <label className={css.label}>
            <input type="text" {...register("name")} className={css.input} />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </label>

          {/* Email */}
          <label className={css.label}>
            <input type="text" {...register("email")} className={css.input} />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </label>

          {/* Phone */}
          <label className={css.label}>
            <input
              type="text"
              value={displayPhone}
              className={css.input}
              placeholder="+380"
              onChange={(e) => {
                const formatted = formatPhone(e.target.value);
                const normalized = normalizePhone(e.target.value);
                setDisplayPhone(formatted);
                setValue("phone", normalized, { shouldValidate: true });
              }}
            />
            {errors.phone && (
              <p className={css.error}>{errors.phone.message}</p>
            )}
          </label>

          <button type="submit" className={css.saveBtn} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
