import Button from '../../components/button/button.component'
import { useState, useEffect } from 'react';
import styles from './confirm-cart.module.css'
import ConfirmCartItem from '../../components/confirm-cart-item/confirm-cart-item.component';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/cart/cart.selector';

export default function ConfirmCart() {
  const [ticketTotal, setTicketTotal] = useState(0);
  const [ticketPriceTotal, setTicketPriceTotal] = useState(0);
  const navigate = useNavigate();

  const handleApproval = () => {
    navigate('/billing')
  }

  const {cart} = useSelector(selectCart);

  useEffect(() => {
      setTicketTotal(cart[0].ticketQuantity + cart[1].ticketQuantity + cart[2].ticketQuantity + cart[3].ticketQuantity);
      setTicketPriceTotal((cart[0].ticketQuantity * 60) + (cart[1].ticketQuantity * 150) + (cart[2].ticketQuantity * 400) + (cart[3].ticketQuantity * 20));
    },[cart])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Confirm Cart</h1>
      <div className={styles.confirmCartHeader}>
        <div className={styles.headerItem}>
          <h3>Item</h3>
        </div>
        <div className={styles.headerItem}>
          <h3>Quantity</h3>
        </div>
        <div className={styles.headerItem}>
          <h3>Price</h3>
        </div>
        <div className={styles.headerItem}>
          <h3>Total</h3>
        </div>
      </div>
      <div className={styles.cartItems}>
                {ticketTotal !== 0 ? (cart.map((item) => <ConfirmCartItem key={item.ticketId} cartItem={item} />)
                    ) : (
                <div className={styles.emptyMessage}>Your cart is empty</div>
                )}
      </div>
      {ticketTotal !== 0 && (
        <div className={styles.confirmCartFooter}>
        <div className={styles.footerItem}>
          <h3></h3>
        </div>
        <div className={styles.footerItem}>
          <h3>All Items</h3>
        </div>
        <div className={styles.footerItem}>
          <h3>${ticketPriceTotal}</h3>
        </div>
        <div className={styles.footerItem}>
          <h3></h3>
        </div>
      </div>
      )}

      <div className={styles.buttonContainer}>
        <Button title='Continue to Billing Information' onClick={handleApproval}/>
      </div>
    </div>
  )
}
