import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import styles from "./ProductModal.module.css";

function ProductModal({ product, onClose }) {
  const { user } = useAuth();
  const { addToCart, updateQuantity, getQuantity } = useCart();
  const qty = getQuantity(product.id);

  const imgSrc = new URL(
    `../../assets/image/${product.image}`,
    import.meta.url
  ).href;

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className={styles.close} onClick={onClose} aria-label="Закрыть">
          ×
        </button>

        <div className={styles.content}>
          <div className={styles.imgSide}>
            <div className={styles.badges}>
              {product.isNew && <span className={styles.badgeNew}>Новинка</span>}
              {product.isHit && <span className={styles.badgeHit}>Хит</span>}
            </div>
            <img src={imgSrc} alt={product.title} className={styles.img} />
          </div>

          <div className={styles.info}>
            <h2 className={styles.title}>{product.title}</h2>

            {product.rating > 0 && (
              <div className={styles.rating}>
                <span className={styles.star}>★</span>
                {product.rating}
              </div>
            )}

            {product.description && (
              <p className={styles.desc}>{product.description}</p>
            )}

            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className={styles.specs}>
                <h3 className={styles.specsTitle}>Характеристики</h3>
                <dl className={styles.specsList}>
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className={styles.specRow}>
                      <dt className={styles.specKey}>{k}</dt>
                      <dd className={styles.specVal}>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className={styles.priceRow}>
              <span className={styles.price}>
                {product.price.toLocaleString("ru-RU")} ₽
              </span>
            </div>

            {user && (
              <div className={styles.cartArea}>
                {qty === 0 ? (
                  <button
                    className={styles.btnCart}
                    onClick={() => addToCart(product)}
                  >
                    🛒 В корзину
                  </button>
                ) : (
                  <div className={styles.counter}>
                    <button
                      className={styles.counterBtn}
                      onClick={() => updateQuantity(product.id, qty - 1)}
                    >
                      −
                    </button>
                    <span className={styles.counterVal}>{qty}</span>
                    <button
                      className={styles.counterBtn}
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                    <span className={styles.inCart}>В корзине {qty} шт.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
