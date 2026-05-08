import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import catalogIcon from "../../assets/icons/catalog.svg";
import profileIcon from "../../assets/icons/profile.svg";
import cardIcon from "../../assets/icons/card.svg";
import styles from "./Header.module.css";

function Header() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoBlue}>Gadget</span>
            <span className={styles.logoBlack}> Hub</span>
          </Link>

          <nav className={styles.nav}>
            <Link
              to="/catalog"
              className={`${styles.navItem} ${isActive("/catalog") ? styles.active : ""}`}
            >
              <img src={catalogIcon} alt="" />
              Каталог
            </Link>

            {user && (
              <Link
                to="/cart"
                className={`${styles.navItem} ${isActive("/cart") ? styles.active : ""}`}
              >
                <img src={cardIcon} alt="" />
                Корзина
                {totalItems > 0 && (
                  <span className={styles.badge}>{totalItems}</span>
                )}
              </Link>
            )}

            {user ? (
              <button className={styles.navItem} onClick={handleLogout}>
                <img src={profileIcon} alt="" />
                Выйти
              </button>
            ) : (
              <Link
                to="/login"
                className={`${styles.navItem} ${isActive("/login") ? styles.active : ""}`}
              >
                <img src={profileIcon} alt="" />
                Войти
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
