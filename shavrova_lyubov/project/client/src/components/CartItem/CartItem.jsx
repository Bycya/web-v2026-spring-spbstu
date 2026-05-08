import styles from "./CartItem.module.css";
import { useCart } from "../../context/CartContext";

function CartItem({ item, checked, onCheck, onDelete }) {
  const { updateQuantity } = useCart();

  const total = item.price * item.quantity;
  const imgSrc = new URL(
    `../../assets/image/${item.image}`,
    import.meta.url
  ).href;

  return (
    <div className={styles.item}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={() => onCheck(item.id)}
      />
      <img
        src={imgSrc}
        alt={item.title}
        className={styles.image}
      />
      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.price}>{item.price.toLocaleString("ru-RU")} ₽</p>
      </div>
      <div className={styles.counter}>
        <button
          className={styles.counterBtn}
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          aria-label="Уменьшить количество"
        >
          −
        </button>
        <span className={styles.qty}>{item.quantity}</span>
        <button
          className={styles.counterBtn}
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          aria-label="Увеличить количество"
        >
          +
        </button>
      </div>
      <p className={styles.total}>{total.toLocaleString("ru-RU")} ₽</p>
      <button
        className={styles.deleteBtn}
        onClick={() => onDelete(item.id)}
        aria-label="Удалить"
      >
        ✕
      </button>
    </div>
  );
}

export default CartItem;
