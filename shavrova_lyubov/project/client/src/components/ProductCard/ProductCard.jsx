import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import styles from "./ProductCard.module.css";

function ProductCard({ product, onOpenModal }) {
  const { user } = useAuth();
  const { addToCart, updateQuantity, getQuantity } = useCart();
  const qty = getQuantity(product.id);

  const imgSrc = new URL(
    `../../assets/image/${product.image}`,
    import.meta.url
  ).href;

  return (
    <div className={styles.card} onClick={() => onOpenModal(product)}>
      <div className={styles.imgWrap}>
        {product.isNew && <span className={styles.badgeNew}>Новинка</span>}
        {product.isHit && <span className={styles.badgeHit}>Хит</span>}
        <img src={imgSrc} alt={product.title} className={styles.img} />
      </div>

      <div className={styles.body}>
        <div className={styles.price}>
          {product.price.toLocaleString("ru-RU")} ₽
        </div>
        <h3 className={styles.title}>{product.title}</h3>
        {product.rating > 0 && (
          <div className={styles.rating}>
            <span className={styles.star}>★</span>
            {product.rating}
          </div>
        )}

        {user && (
          <div
            className={styles.cartArea}
            onClick={(e) => e.stopPropagation()}
          >
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
                <span className={styles.counterVal}>{qty} шт.</span>
                <button
                  className={styles.counterBtn}
                  onClick={() => addToCart(product)}
                >
                  +
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
