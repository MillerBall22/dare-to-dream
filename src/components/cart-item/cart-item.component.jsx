import { Fragment } from 'react';
import{FaPlusCircle, FaMinusCircle} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, subtractFromCart } from '../../store/cart/cart.action';


import styles from './cart-item.module.css';

const CartItem = ({cartItem}) => {
    const { ticketTitle, ticketId, ticketImageUrl, ticketPrice, ticketQuantity } = cartItem;
    const dispatch = useDispatch();

    async function addToCartButton () {
        dispatch(addToCart(ticketId));
    }

    async function subtractFromCartButton () {
        dispatch(subtractFromCart(ticketId));
    }

    async function removeFromCartButton () {
        dispatch(removeFromCart(ticketId));
    }
    return (
        <Fragment>
            {ticketQuantity !== 0 &&
                <div className={styles.container} >
                    <div className={styles.imagesContainer}>
                        <FaPlusCircle className={styles.quantityIcons} onClick={addToCartButton}/>
                        <img src={ticketImageUrl} width={40} height={40} alt='Mossbank Logo' />
                        <FaMinusCircle className={styles.quantityIcons} onClick={subtractFromCartButton}/>
                    </div>
                    <div className={styles.itemDetails}>
                        <span>{ticketTitle}</span>
                        <span>: {ticketQuantity} x ${ticketPrice}</span>
                    </div>
                    <button className={styles.removeButton} onClick={removeFromCartButton}>
                        Remove Item
                    </button>
                </div>
            }
        </Fragment>
    );
}

export default CartItem;