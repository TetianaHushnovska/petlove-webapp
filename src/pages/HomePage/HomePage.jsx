import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={css.section}>
      <div className={css.titleWrap}>
        <h1 className={css.title}>
          Take good <span className={css.span}>care</span> of your small pets
        </h1>
        <p className={css.subtitle}>
          Choosing a pet for your home is a choice that is meant to enrich your
          life with immeasurable joy and tenderness.
        </p>
      </div>
      <div className={css.hero}></div>
    </section>
  );
}
