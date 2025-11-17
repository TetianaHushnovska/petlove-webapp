import css from "./NewsItems.module.css";

export default function NewsItems({ item }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className={css.card}>
      <img
        src={item.imgUrl}
        alt={`${item.title} - news image`}
        className={css.img}
      />

      <p className={css.title}>{item.title}</p>
      <p className={css.details}>{item.text}</p>

      <div className={css.info}>
        <p className={css.date}>{formatDate(item.date)}</p>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={css.link}
        >
          Read more
        </a>
      </div>
    </div>
  );
}
