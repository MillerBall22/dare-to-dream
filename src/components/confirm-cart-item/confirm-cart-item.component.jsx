import { Fragment } from 'react';
import{FaPlusCircle, FaMinusCircle} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, subtractFromCart } from '../../store/cart/cart.action';

import styles from './confirm-cart-item.module.css';

const ConfirmCartItem = ({cartItem}) => {
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
                    <div className={styles.item}>
                        <div>
                            <img src={ticketImageUrl} className={styles.ticketImage} alt='Mossbank Logo' />
                        </div>
                        <div>{ticketTitle}</div>
                    </div>
                    <div className={styles.quantity}>
                        <div>
                            <FaPlusCircle className={styles.quantityIcons} onClick={addToCartButton}/>
                            <span>{ticketQuantity}</span>
                            <FaMinusCircle className={styles.quantityIcons} onClick={subtractFromCartButton}/>
                        </div>
                        <div>
                            <button className={styles.removeButton} onClick={removeFromCartButton}>
                                Remove Item
                            </button>
                        </div>
                    </div>
                    <div className={styles.price}>
                        <span>${ticketPrice}</span>
                    </div>
                    <div className={styles.total}>
                        <span>${ticketPrice * ticketQuantity}</span>
                    </div>
                </div>
            }
        </Fragment>
    );
}

export default ConfirmCartItem;