import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import styles from "./Home.module.css";

function ProductSlide({ product }) {
  const imgSrc = new URL(
    `../../assets/image/${product.image}`,
    import.meta.url
  ).href;

  return (
    <div className={styles.slide}>
      <div className={styles.slideImgWrap}>
        {product.isHit && <span className={styles.badgeHit}>Хит</span>}
        {product.isNew && <span className={styles.badgeNew}>Новинка</span>}
        <img src={imgSrc} alt={product.title} className={styles.slideImg} />
      </div>
      <div className={styles.slideInfo}>
        <div className={styles.slidePrice}>{product.price.toLocaleString("ru-RU")} ₽</div>
        <div className={styles.slideTitle}>{product.title}</div>
        {product.rating > 0 && (
          <div className={styles.slideRating}>
            <span className={styles.star}>★</span>
            {product.rating}
          </div>
        )}
      </div>
    </div>
  );
}

function Carousel({ items, title, description }) {
  const [index, setIndex] = useState(0);
  const visible = 3;
  const max = Math.max(0, items.length - visible);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(max, i + 1));

  return (
    <section className={styles.section}>
      <div className={styles.sectionLeft}>
        <div className={styles.sectionIcon}>{title === "Хиты продаж" ? "🔥" : "✨"}</div>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionDesc}>{description}</p>
      </div>
      <div className={styles.carouselWrap}>
        <button
          className={styles.arrow}
          onClick={prev}
          disabled={index === 0}
          aria-label="Назад"
        >
          ‹
        </button>
        <div className={styles.carouselWindow}>
          <div
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${index * (100 / visible)}%)` }}
          >
            {items.map((p) => (
              <div key={p.id} className={styles.slideWrapper}>
                <ProductSlide product={p} />
              </div>
            ))}
          </div>
        </div>
        <button
          className={styles.arrow}
          onClick={next}
          disabled={index >= max}
          aria-label="Вперёд"
        >
          ›
        </button>
      </div>
    </section>
  );
}

const ADVANTAGES = [
  {
    icon: "🚀",
    title: "Утром заказали, вечером получили",
    desc: "Доставляем в день заказа по всему городу",
  },
  {
    icon: "💎",
    title: "С товаром что-то не так? Вернём деньги",
    desc: "Гарантия возврата без лишних вопросов",
  },
  {
    icon: "✅",
    title: "Только оригинальные товары",
    desc: "Работаем напрямую с официальными дистрибьюторами",
  },
];

function Home() {
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    api.get("/goods").then((r) => setGoods(r.data)).catch(() => {});
  }, []);

  const hits = goods.filter((g) => g.isHit);
  const news = goods.filter((g) => g.isNew);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <div className={styles.heroSale}>SUPER SALE</div>
              <div className={styles.heroDiscount}>−10%</div>
              <div className={styles.heroDesc}>Лучшие гаджеты по лучшим ценам</div>
              <Link to="/catalog" className={styles.heroBtn}>
                Перейти в каталог
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className="container">
          {hits.length > 0 && (
            <Carousel
              items={hits}
              title="Хиты продаж"
              description="Тысячи покупателей уже одобрили эти товары. Самые популярные, проверенные и надёжные гаджеты!"
            />
          )}

          {news.length > 0 && (
            <Carousel
              items={news}
              title="Новинки"
              description="Их только произвели — они уже у нас! Всё самое новое и свежее на рынке электроники"
            />
          )}

          <section className={styles.advantages}>
            <h2 className={styles.advTitle}>Преимущества</h2>
            <div className={styles.advGrid}>
              {ADVANTAGES.map((a) => (
                <div key={a.title} className={styles.advCard}>
                  <div className={styles.advIcon}>{a.icon}</div>
                  <div className={styles.advText}>
                    <strong>{a.title}</strong>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.contacts}>
            <h2 className={styles.contactsTitle}>Работаем 24/7</h2>
            <div className={styles.contactsGrid}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                <span>8 (800) 678-34-24</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <span>gadget@hub.ru</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <span>Санкт-Петербург, ул. Барочная, д.7, корпус 2</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
