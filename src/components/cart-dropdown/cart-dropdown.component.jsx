import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import styles from './cart-dropdown.module.css';

import { useNavigate } from 'react-router-dom';
import { selectCart } from '../../store/cart/cart.selector';
import { removeFromCart } from '../../store/cart/cart.action';
import { setCartDropdown } from '../../store/dropdowns/dropdowns.action';

const CartDropdown = () => {
    const [ticketTotal, setTicketTotal] = useState(0);
    const naviagte = useNavigate();
    const dispatch = useDispatch();

    const goToCheckoutHandler = () => {
        if (ticketTotal === 0) {
            return;
        }
        dispatch(setCartDropdown(false))
        naviagte('/confirm-cart')
    };

    const {cart} = useSelector(selectCart);

    useEffect(() => {
        if (cart[0].ticketQuantity !== 0 || cart[1].ticketQuantity !== 0 || cart[2].ticketQuantity !== 0) {
            return;
        } else {
            dispatch(removeFromCart('fiftyFiftyTickets'));
        }
    }, [cart[0].ticketQuantity, cart[1].ticketQuantity, cart[2].ticketQuantity])

    useEffect(() => {
        setTicketTotal(cart[0].ticketQuantity + cart[1].ticketQuantity + cart[2].ticketQuantity + cart[3].ticketQuantity)
      },[cart])

    return (
        <div className={styles.container} >
            <h3 className={styles.title}>
                Your Cart  
            </h3>
            <div className={styles.cartItems}>
                {ticketTotal ? (cart.map((item) => <CartItem key={item.ticketId} cartItem={item} />)
                    ) : (
                <div className={styles.emptyMessage}>Your cart is empty</div>
                )}
            </div>
            <Button title='GO TO CHECKOUT' onClick={goToCheckoutHandler}/>
        </div>);
}

export default CartDropdown;