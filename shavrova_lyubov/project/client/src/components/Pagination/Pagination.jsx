import styles from "./Pagination.module.css";

function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;

  const pages = [];

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, "...", total);
    } else if (current >= total - 2) {
      pages.push(1, "...", total - 2, total - 1, total);
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", total);
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow}
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        aria-label="Предыдущая страница"
      >
        ‹
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className={styles.dots}>
            …
          </span>
        ) : (
          <button
            key={p}
            className={`${styles.page} ${p === current ? styles.active : ""}`}
            onClick={() => onChange(p)}
            aria-current={p === current ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        className={styles.arrow}
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        aria-label="Следующая страница"
      >
        ›
      </button>
    </div>
  );
}

export default Pagination;
