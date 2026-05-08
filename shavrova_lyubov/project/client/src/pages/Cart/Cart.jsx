import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import api from "../../api/api";
import CartItem from "../../components/CartItem/CartItem";
import OrderForm from "../../components/OrderForm/OrderForm";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import styles from "./Cart.module.css";


function declItems(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return "товаров";
  if (mod10 === 1) return "товар";
  if (mod10 >= 2 && mod10 <= 4) return "товара";
  return "товаров";
}

function Cart() {
  const { cart, removeFromCart, removeSelected } = useCart();
  const [tab, setTab] = useState("cart");
  const [selected, setSelected] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (tab === "history") {
      setOrdersLoading(true);
      api
        .get("/orders")
        .then((r) => setOrders(r.data))
        .catch(() => {})
        .finally(() => setOrdersLoading(false));
    }
  }, [tab]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const allChecked = cart.length > 0 && selected.length === cart.length;

  const toggleAll = () => {
    setSelected(allChecked ? [] : cart.map((i) => i.id));
  };

  const toggleOne = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDeleteOne = (id) => setDeleteTarget({ type: "one", id });
  const handleDeleteSelected = () => {
    if (selected.length > 0) setDeleteTarget({ type: "selected" });
  };

  const confirmDelete = () => {
    if (deleteTarget.type === "selected") {
      removeSelected(selected);
      setSelected([]);
    } else {
      removeFromCart(deleteTarget.id);
      setSelected((prev) => prev.filter((x) => x !== deleteTarget.id));
    }
    setDeleteTarget(null);
  };

  const handleOrderSuccess = () => {
    setOrderSuccess(true);
    setSelected([]);
  };

  if (orderSuccess) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.successTitle}>Заказ оформлен!</h2>
            <p className={styles.successText}>
              Спасибо за покупку. Ваш заказ принят в обработку.
            </p>
            <button
              className={styles.successBtn}
              onClick={() => setOrderSuccess(false)}
            >
              К покупкам
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Корзина</h1>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === "cart" ? styles.tabActive : ""}`}
            onClick={() => setTab("cart")}
          >
            Корзина
            {cart.length > 0 && (
              <span className={styles.tabBadge}>{cart.length}</span>
            )}
          </button>
          <button
            className={`${styles.tab} ${tab === "history" ? styles.tabActive : ""}`}
            onClick={() => setTab("history")}
          >
            История заказов
          </button>
        </div>

        {tab === "cart" && (
          <div className={styles.cartContent}>
            {cart.length === 0 ? (
              <div className={styles.empty}>
                <p className={styles.emptyText}>Корзина пуста</p>
                <p className={styles.emptyHint}>
                  Ознакомьтесь с новинками и хитами на главной или найдите
                  нужное в каталоге
                </p>
                <Link to="/catalog" className={styles.emptyLink}>
                  Перейти в каталог
                </Link>
              </div>
            ) : (
              <div className={styles.cartLayout}>
                <div className={styles.itemsCol}>
                  <div className={styles.cartHeader}>
                    <label className={styles.selectAll}>
                      <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={toggleAll}
                        className={styles.selectAllCheck}
                      />
                      <span>Выбрать все</span>
                    </label>
                    {selected.length > 0 && (
                      <button
                        className={styles.deleteSelected}
                        onClick={handleDeleteSelected}
                      >
                        Удалить выбранные ({selected.length})
                      </button>
                    )}
                  </div>

                  <div className={styles.itemsList}>
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        checked={selected.includes(item.id)}
                        onCheck={toggleOne}
                        onDelete={handleDeleteOne}
                      />
                    ))}
                  </div>

                  <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Итого:</span>
                    <span className={styles.totalPrice}>
                      {totalPrice.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                </div>

                <div className={styles.formCol}>
                  <OrderForm cartItems={cart} onSuccess={handleOrderSuccess} />
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "history" && (
          <div className={styles.history}>
            {ordersLoading ? (
              <p className={styles.loading}>Загрузка...</p>
            ) : orders.length === 0 ? (
              <div className={styles.empty}>
                <p className={styles.emptyText}>История заказов пуста</p>
              </div>
            ) : (
              <div className={styles.ordersList}>
                {orders.map((order, idx) => {
                  const itemCount = order.items?.reduce((s, i) => s + i.quantity, 0) ?? 0;
                  const total = order.items?.reduce((s, i) => s + i.price * i.quantity, 0) ?? 0;
                  return (
                    <div key={order.id} className={styles.orderCard}>
                      <span className={styles.orderId}>Заказ №{idx + 1}</span>
                      <span className={styles.orderDate}>
                        {new Date(order.date).toLocaleDateString("ru-RU")}
                      </span>
                      <span className={styles.orderCount}>
                        {itemCount} {declItems(itemCount)}
                      </span>
                      <span className={styles.orderTotal}>
                        {total.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {deleteTarget && (
        <DeleteModal
          title={
            deleteTarget.type === "selected"
              ? `${selected.length} ${selected.length === 1 ? "товар" : selected.length < 5 ? "товара" : "товаров"}`
              : undefined
          }
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

export default Cart;
