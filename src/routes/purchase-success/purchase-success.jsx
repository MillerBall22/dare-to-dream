
import styles from './purchase-success.module.css'

export default function PurchaseSuccess() {
  return (
    <div className={styles.container}>
        <h2 className={styles.message}>Thank you for your purchase!!!</h2>
        <h2 className={styles.message}>A Dare To Dream representive will be reaching out to you soon.</h2>
    </div>
  )
}
