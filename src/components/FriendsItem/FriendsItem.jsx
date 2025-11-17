import { getWorkTimeBadge, safeField } from "../../utils";
import css from "./FriendsItem.module.css";

export default function FriendsItem({ item }) {
  const badge = getWorkTimeBadge(item.workDays);

  return (
    <div className={css.card}>
      <img src={item.imageUrl} alt={item.title} className={css.logo} />

      <div className={css.details}>
        <div className={css.time}>{badge}</div>
        <div className={css.title}>{item.title}</div>
        <p className={css.text}>
          <span className={css.span}>Email:</span>{" "}
          {safeField(item.email, "phone only")}
        </p>
        {item.address && item.addressUrl ? (
          <p
            className={css.text}
            style={{ display: "flex", marginBottom: "0" }}
          >
            <span className={css.span}>Address:</span>
            <a
              href={item.addressUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={css.link}
            >
              {item.address}
            </a>
          </p>
        ) : (
          <p className={css.text}>
            <span className={css.span}>Address:</span>{" "}
            {safeField(item.address, "website only")}
          </p>
        )}
        <p className={css.text}>
          <span className={css.span}>Phone:</span>{" "}
          {safeField(item.phone, "email only")}
        </p>
      </div>
    </div>
  );
}
