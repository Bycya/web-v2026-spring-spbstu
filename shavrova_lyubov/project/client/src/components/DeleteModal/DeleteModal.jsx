import { useEffect } from "react";
import styles from "./DeleteModal.module.css";

function DeleteModal({ title, onConfirm, onCancel }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onCancel]);

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className={styles.close} onClick={onCancel} aria-label="Закрыть">×</button>
        <p className={styles.text}>
          Вы действительно хотите удалить{title ? ` ${title}` : " выбранные товары"}?
        </p>
        <div className={styles.actions}>
          <button className={styles.btnCancel} onClick={onCancel}>Отмена</button>
          <button className={styles.btnConfirm} onClick={onConfirm}>Да, удалить</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
