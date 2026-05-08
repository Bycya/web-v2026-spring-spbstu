import { useState } from "react";
import styles from "./Filters.module.css";

const PRICE_MIN = 0;
const PRICE_MAX = 100000;
const PRICE_STEP = 500;

const CATEGORIES = [
  "Смартфоны",
  "Фитнес браслеты",
  "Портативная акустика",
  "Очки виртуальной реальности",
  "Электротранспорт",
  "Умные часы",
];

const COLORS = [
  { label: "Красный", hex: "#E53935" },
  { label: "Оранжевый", hex: "#FB8C00" },
  { label: "Желтый", hex: "#FDD835" },
  { label: "Зеленый", hex: "#37C166" },
  { label: "Голубой", hex: "#29B6F6" },
  { label: "Синий", hex: "#1565C0" },
  { label: "Фиолетовый", hex: "#7B1FA2" },
];

function Filters({ onApply, onReset }) {
  const [priceFrom, setPriceFrom] = useState(PRICE_MIN);
  const [priceTo, setPriceTo] = useState(PRICE_MAX);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);

  const minPercent = (priceFrom / PRICE_MAX) * 100;
  const maxPercent = (priceTo / PRICE_MAX) * 100;

  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), priceTo - PRICE_STEP);
    setPriceFrom(val);
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), priceFrom + PRICE_STEP);
    setPriceTo(val);
  };

  const toggleCategory = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleColor = (color) => {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleApply = () => {
    onApply({ priceFrom, priceTo, categories, colors });
  };

  const handleReset = () => {
    setPriceFrom(PRICE_MIN);
    setPriceTo(PRICE_MAX);
    setCategories([]);
    setColors([]);
    onReset();
  };

  const fmt = (n) => n.toLocaleString("ru-RU");

  return (
    <div className={styles.filters}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Цена, ₽</h3>

        <div className={styles.priceLabels}>
          <span>{fmt(priceFrom)} ₽</span>
          <span>{fmt(priceTo)} ₽</span>
        </div>

        <div className={styles.sliderWrapper}>
          <div className={styles.sliderTrack}>
            <div
              className={styles.sliderRange}
              style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
            />
          </div>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={PRICE_STEP}
            value={priceFrom}
            onChange={handleMinChange}
            className={styles.rangeInput}
          />
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={PRICE_STEP}
            value={priceTo}
            onChange={handleMaxChange}
            className={styles.rangeInput}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Категория</h3>
        <div className={styles.checkList}>
          {CATEGORIES.map((cat) => (
            <label key={cat} className={styles.checkLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              <span className={styles.checkText}>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Цвет</h3>
        <div className={styles.colorGrid}>
          {COLORS.map((c) => (
            <label key={c.label} className={styles.colorLabel} title={c.label}>
              <input
                type="checkbox"
                className={styles.hiddenCheck}
                checked={colors.includes(c.label)}
                onChange={() => toggleColor(c.label)}
              />
              <span
                className={`${styles.colorCircle} ${colors.includes(c.label) ? styles.colorActive : ""}`}
                style={{ background: c.hex }}
              />
            </label>
          ))}
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.btnApply} onClick={handleApply}>
          Показать
        </button>
        <button className={styles.btnReset} onClick={handleReset}>
          Сбросить
        </button>
      </div>
    </div>
  );
}

export default Filters;
