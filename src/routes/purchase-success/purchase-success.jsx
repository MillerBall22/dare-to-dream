
import styles from './purchase-success.module.css'

export default function PurchaseSuccess() {
  return (
    <div className={styles.container}>
        <h2 className={styles.message}>Thank you for your order!!!</h2>
        <h2 className={styles.message}>Please, contact <a href='mailto:d2dpaymentinfo@gmail.com' className={styles.email}>d2dpaymentinfo@gmail.com </a>to proceed with payment.</h2>
    </div>
  )
}
