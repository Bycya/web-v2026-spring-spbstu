import vkIcon from "../../assets/icons/vk.png";
import tgIcon from "../../assets/icons/telegram.png";
import waIcon from "../../assets/icons/whatsapp.png";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoBlue}>Gadget</span>
              <span> Hub</span>
            </div>
            <p className={styles.tagline}>Магазин надежных гаджетов</p>
            <p className={styles.copy}>© 2024 ООО «Гаджет Хаб». Все права защищены</p>
          </div>

          <div className={styles.contacts}>
            <a href="tel:88006783424" className={styles.contact}>
              8 (800) 678-34-24
            </a>
          </div>

          <div className={styles.social}>
            <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="ВКонтакте">
              <img src={vkIcon} alt="ВКонтакте" />
            </a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Telegram">
              <img src={tgIcon} alt="Telegram" />
            </a>
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp">
              <img src={waIcon} alt="WhatsApp" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
