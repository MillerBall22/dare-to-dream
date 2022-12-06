import { Fragment, useContext } from 'react';
import{FaPlusCircle, FaMinusCircle} from 'react-icons/fa';
import {StoreContext, ACTION_TYPES } from "../../store/store-context";

import styles from './cart-item.module.css';

const CartItem = ({cartItem}) => {
    const { ticketTitle, ticketId, ticketImageUrl, ticketPrice, ticketQuantity } = cartItem;
    const {dispatch} = useContext(StoreContext);

    async function addToCart () {
        dispatch({
            type: ACTION_TYPES.ADD_TO_CART,
            payload: {
              ticketId,
            },
          });
    }

    async function subtractFromCart () {
        dispatch({
            type: ACTION_TYPES.SUBTRACT_FROM_CART,
            payload: {
              ticketId,
            },
          });
    }

    async function removeFromCart () {
        dispatch({
            type: ACTION_TYPES.REMOVE_FROM_CART,
            payload: {
              ticketId,
            },
          });
    }
    return (
        <Fragment>
            {ticketQuantity !== 0 &&
                <div className={styles.container} >
                    <div className={styles.imagesContainer}>
                        <FaPlusCircle className={styles.quantityIcons} onClick={addToCart}/>
                        <img src={ticketImageUrl} width={40} height={40} alt='Mossbank Logo' />
                        <FaMinusCircle className={styles.quantityIcons} onClick={subtractFromCart}/>
                    </div>
                    <div className={styles.itemDetails}>
                        <span>{ticketTitle}</span>
                        <span>: {ticketQuantity} x ${ticketPrice}</span>
                    </div>
                    <button className={styles.removeButton} onClick={removeFromCart}>
                        Remove Item
                    </button>
                </div>
            }
        </Fragment>
    );
}

export default CartItem;