import css from "./PetBlock.module.css";

export default function PetBlock({ mode }) {
  if (mode === "register") {
    return (
      <div className={css.registerWrap}>
        <div className={css.card}>
          <div className={css.img}>🐈</div>
          <div className={css.details}>
            <div className={css.box}>
              <p className={css.name}>Jack</p>
              <p className={css.date}>
                <span className={css.span}>Birthday:</span> 18.10.2021
              </p>
            </div>
            <p className={css.desc}>
              Jack is a gray Persian cat with green eyes. He loves to be
              pampered and groomed, and enjoys playing with toys.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "login") {
    return (
      <div className={css.loginWrap}>
        <div className={css.card}>
          <div className={css.img}>🐶</div>
          <div className={css.details}>
            <div className={css.box}>
              <p className={css.name}>Rich</p>
              <p className={css.date}>
                <span className={css.span}>Birthday:</span> 21.09.2020
              </p>
            </div>
            <p className={css.desc}>
              Rich would be the perfect addition to an active family that loves
              to play and go on walks. I bet he would love having a doggy
              playmate too!
            </p>
          </div>
        </div>
      </div>
    );
  }
}
