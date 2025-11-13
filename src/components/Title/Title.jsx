import css from "./Title.module.css";

export default function Title({ text, subtext }) {
  return (
    <>
      <h2 className={css.title}>{text}</h2>
      <p className={css.subtext}>{subtext}</p>
    </>
  );
}
