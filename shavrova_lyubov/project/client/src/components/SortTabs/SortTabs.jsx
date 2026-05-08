import styles from "./SortTabs.module.css";

const TABS = [
  { key: "new", label: "Новые" },
  { key: "popular", label: "Популярные" },
  { key: "cheap", label: "Подешевле" },
  { key: "expensive", label: "Подороже" },
];

function SortTabs({ value, onChange }) {
  return (
    <div className={styles.tabs}>
      {TABS.map((t) => (
        <button
          key={t.key}
          className={`${styles.tab} ${value === t.key ? styles.active : ""}`}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export default SortTabs;
