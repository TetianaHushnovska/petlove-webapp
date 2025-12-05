import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import css from "./AddPetForm.module.css";

import { addPetSchema } from "../../utils/schemas";
import { addPet } from "../../redux/auth/authOperations";
import Dropdown from "../Dropdown/Dropdown";

import { fetchTypes } from "../../redux/pets/petsOperations";
import toast from "react-hot-toast";

export default function AddPetForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sex, setSex] = useState("");
  const [preview, setPreview] = useState("");
  const [birthday, setBirthday] = useState(null);

  // For active field highlight
  const [activeField, setActiveField] = useState(null);

  const speciesList = useSelector((state) => state.pets.typesList);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addPetSchema),
    defaultValues: {
      imgUrl: "",
      title: "",
      name: "",
      birthday: "",
      species: "",
      sex: "",
    },
  });

  const watchAll = watch();

  useEffect(() => {
    setValue("sex", sex, { shouldValidate: true });
  }, [sex, setValue]);

  // Fetch pet species
  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  // Update preview when URL changes
  useEffect(() => {
    if (watchAll.imgUrl) setPreview(watchAll.imgUrl);
  }, [watchAll.imgUrl]);

  // Select gender
  const selectSex = (value) => {
    setSex(value);
    setValue("sex", value, { shouldValidate: true });
  };

  // Select birthday (DatePicker)
  const handleDatePick = (date) => {
    setBirthday(date);
    const iso = date.toISOString().split("T")[0];
    setValue("birthday", iso, { shouldValidate: true });
  };

  // Submit form
  const onSubmit = async (data) => {
    console.log("🔥 submitting:", data);

    try {
      const payload = {
        name: data.name,
        title: data.title,
        imgURL: data.imgUrl,
        species: data.species,
        birthday: data.birthday,
        sex: data.sex,
      };

      console.log("👉 CLEAN PAYLOAD:", payload);

      await dispatch(addPet(payload)).unwrap();

      toast.success("Pet successfully added!");
      navigate("/profile");
    } catch (error) {
      toast.error(error?.message || "Failed to add pet");
    }
  };

  const validateAndSubmit = (data) => {
    if (!data.sex) {
      toast.error("Please select your pet’s sex");
      return;
    }

    onSubmit(data);
  };

  const isFilled = (field) => Boolean(watchAll[field]);

  return (
    <form className={css.form} onSubmit={handleSubmit(validateAndSubmit)}>
      <h1 className={css.title}>
        Add my pet / <span className={css.span}>Personal details</span>
      </h1>

      <input type="hidden" {...register("sex")} />

      {/* IMAGE + SEX BUTTONS */}
      <div className={css.imgCard}>
        <div className={css.genderWrap}>
          <button
            type="button"
            className={`${css.genderBtn} ${css.female} ${
              sex === "female" ? css.active : ""
            }`}
            onClick={() => selectSex("female")}
          >
            <svg className={css.icon}>
              <use href="/icons.svg#icon-girl" />
            </svg>
          </button>

          <button
            type="button"
            className={`${css.genderBtn} ${css.male} ${
              sex === "male" ? css.active : ""
            }`}
            onClick={() => selectSex("male")}
          >
            <svg className={css.icon}>
              <use href="/icons.svg#icon-boy" />
            </svg>
          </button>

          <button
            type="button"
            className={`${css.genderBtn} ${css.gender} ${
              sex === "multiple" ? css.active : ""
            }`}
            onClick={() => selectSex("multiple")}
          >
            <svg className={css.iconGender}>
              <use href="/icons.svg#icon-gender" />
            </svg>
          </button>
        </div>

        {preview ? (
          <img src={preview} alt="preview" className={css.preview} />
        ) : (
          <div className={css.placeholder}>
            <svg className={css.pawIcon}>
              <use href="/icons.svg#icon-paw" />
            </svg>
          </div>
        )}
      </div>

      {/* URL + Upload */}
      <div className={css.urlRow}>
        <input
          type="text"
          placeholder="Enter URL"
          className={`${css.inputUrl} ${
            isFilled("imgUrl") || activeField === "imgUrl"
              ? css.activeInput
              : ""
          }`}
          {...register("imgUrl")}
          onFocus={() => setActiveField("imgUrl")}
          onBlur={() => setActiveField(null)}
        />

        <button type="button" className={css.uploadBtn}>
          Upload photo
          <svg className={css.iconUpload}>
            <use href="/icons.svg#icon-upload" />
          </svg>
        </button>
      </div>
      {errors.imgUrl && <p className={css.error}>{errors.imgUrl.message}</p>}

      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        className={`${css.input} ${
          isFilled("title") || activeField === "title" ? css.activeInput : ""
        }`}
        {...register("title")}
        onFocus={() => setActiveField("title")}
        onBlur={() => setActiveField(null)}
      />
      {errors.title && <p className={css.error}>{errors.title.message}</p>}

      {/* Name */}
      <input
        type="text"
        placeholder="Pet's Name"
        className={`${css.input} ${
          isFilled("name") || activeField === "name" ? css.activeInput : ""
        }`}
        {...register("name")}
        onFocus={() => setActiveField("name")}
        onBlur={() => setActiveField(null)}
      />
      {errors.name && <p className={css.error}>{errors.name.message}</p>}

      {/* DATE + SPECIES */}
      <div className={css.row}>
        {/* DATE PICKER */}
        <div
          className={`${css.dateWrapper} ${
            birthday || activeField === "birthday" ? css.activeInput : ""
          }`}
        >
          <DatePicker
            selected={birthday}
            onChange={handleDatePick}
            dateFormat="dd.MM.yyyy"
            placeholderText="00.00.0000"
            className={css.dateInput}
            calendarClassName={css.calendar}
            onFocus={() => setActiveField("birthday")}
            onBlur={() => setActiveField(null)}
          />

          <svg className={css.iconCalendar}>
            <use href="/icons.svg#icon-calendar" />
          </svg>
        </div>

        {/* SPECIES DROPDOWN */}
        <Dropdown
          label="Type of pet"
          value={watchAll.species}
          options={speciesList}
          onChange={(val) => setValue("species", val, { shouldValidate: true })}
          variant="addPet"
          isActive={Boolean(watchAll.species)}
          showAll={false}
        />
      </div>

      {errors.birthday && (
        <p className={css.error}>{errors.birthday.message}</p>
      )}
      {errors.species && <p className={css.error}>{errors.species.message}</p>}

      {/* BUTTONS */}
      <div className={css.buttons}>
        <button
          type="button"
          className={css.backBtn}
          onClick={() => navigate("/profile")}
        >
          Back
        </button>

        <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
