import { useState } from "react";
import api from "../../api/api";
import { useCart } from "../../context/CartContext";
import styles from "./OrderForm.module.css";

function OrderForm({ cartItems, onSuccess }) {
  const { clearCart } = useCart();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [delivery, setDelivery] = useState("pickup");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("card");
  const [packaging, setPackaging] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};

    const digits = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      e.phone = "Введите номер телефона";
    } else if (!/^(\+7|8)\d{10}$/.test(phone.trim()) && !(digits.length === 11 && (digits[0] === "7" || digits[0] === "8"))) {
      e.phone = "Введите корректный номер телефона (+7XXXXXXXXXX)";
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      e.email = "Введите корректный email";
    }

    if (delivery === "delivery") {
      if (!address.trim()) {
        e.address = "Введите адрес доставки";
      } else if (address.trim().length < 10) {
        e.address = "Адрес слишком короткий, укажите город, улицу и дом";
      }
    }

    return e;
  };

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    setServerError("");
    try {
      await api.post("/orders", {
        phone,
        email,
        delivery,
        address: delivery === "delivery" ? address : "",
        payment,
        packaging,
        items: cartItems.map((i) => ({
          id: i.id,
          title: i.title,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
        })),
      });
      clearCart();
      onSuccess();
    } catch (err) {
      setServerError(err.response?.data?.message || "Ошибка при оформлении заказа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h3 className={styles.formTitle}>Оформление заказа</h3>

      {serverError && <div className={styles.serverError}>{serverError}</div>}

      <div className={styles.field}>
        <label className={styles.label}>Телефон *</label>
        <input
          type="tel"
          className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
          placeholder="+7 (___) ___-__-__"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); clearError("phone"); }}
        />
        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          placeholder="email@example.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Способ получения</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="delivery"
              value="pickup"
              checked={delivery === "pickup"}
              onChange={() => setDelivery("pickup")}
            />
            <span>Самовывоз</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="delivery"
              value="delivery"
              checked={delivery === "delivery"}
              onChange={() => setDelivery("delivery")}
            />
            <span>Доставка</span>
          </label>
        </div>
      </div>

      {delivery === "delivery" && (
        <div className={styles.field}>
          <label className={styles.label}>Адрес доставки *</label>
          <input
            type="text"
            className={`${styles.input} ${errors.address ? styles.inputError : ""}`}
            placeholder="Город, улица, дом, квартира"
            value={address}
            onChange={(e) => { setAddress(e.target.value); clearError("address"); }}
          />
          {errors.address && <span className={styles.error}>{errors.address}</span>}
        </div>
      )}

      <div className={styles.field}>
        <label className={styles.label}>Способ оплаты</label>
        <select
          className={styles.select}
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        >
          <option value="cash">Наличными</option>
          <option value="card">Банковской картой</option>
          <option value="online">Онлайн</option>
        </select>
      </div>

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={packaging}
          onChange={(e) => setPackaging(e.target.checked)}
        />
        <span>Подарочная упаковка</span>
      </label>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? "Оформление..." : "Оформить заказ"}
      </button>
    </form>
  );
}

export default OrderForm;
