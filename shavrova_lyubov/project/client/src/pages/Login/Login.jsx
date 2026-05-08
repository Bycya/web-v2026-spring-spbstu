import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

function Login() {
  const [form, setForm] = useState({ login: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.login.trim()) e.login = "Заполните обязательное поле";
    if (!form.password.trim()) e.password = "Заполните обязательное поле";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await login(form.login, form.password);
      navigate("/");
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
          "Такого пользователя нет — возможно, неправильный логин или пароль. Проверьте данные."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.decorations} aria-hidden="true">
        <div className={styles.shape1} />
        <div className={styles.shape2} />
        <div className={styles.shape3} />
        <div className={styles.shape4} />
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>Добро пожаловать!</h1>

        {serverError && (
          <div className={styles.serverError}>{serverError}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login">
              Логин <span className={styles.required}>*</span>
            </label>
            <input
              id="login"
              name="login"
              type="text"
              value={form.login}
              onChange={handleChange}
              className={`${styles.input} ${errors.login ? styles.inputError : ""}`}
              placeholder="Введите логин"
              autoComplete="username"
            />
            {errors.login && (
              <span className={styles.errorText}>{errors.login}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Пароль <span className={styles.required}>*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              placeholder="Введите пароль"
              autoComplete="current-password"
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.btn}
            disabled={loading}
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
