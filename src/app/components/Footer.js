import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.linksContainer}>
        <a href="/privacy-policy" className={styles.link}>Privacy Policy</a>
        <a href="/terms-of-use" className={styles.link}>Terms Of Use</a>
              <a href="/refund-policy" className={styles.link}>Refund Policy</a>
              <div className={styles.copyright}>
        © 2024 Sahil Agarwal
      </div>
      </div>
      
    </footer>
  );
}
