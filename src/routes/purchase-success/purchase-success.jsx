
import styles from './purchase-success.module.css'

export default function PurchaseSuccess() {
  return (
    <div className={styles.container}>
        <h2 className={styles.message}>Thank you for your purchase!!!</h2>
        <h2 className={styles.message}>Your Dare To Dream tickets will be sent by mail and receipt by email!</h2>
    </div>
  )
}
