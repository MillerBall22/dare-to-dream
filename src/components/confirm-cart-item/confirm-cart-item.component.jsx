import { Fragment, useContext } from 'react';
import{FaPlusCircle, FaMinusCircle} from 'react-icons/fa';
import {StoreContext, ACTION_TYPES } from "../../store/store-context";

import styles from './confirm-cart-item.module.css';

const ConfirmCartItem = ({cartItem}) => {
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
                    <div className={styles.item}>
                        <div>
                            <img src={ticketImageUrl} width={100} height={100} alt='Mossbank Logo' />
                        </div>
                        <div>{ticketTitle}</div>
                    </div>
                    <div className={styles.quantity}>
                        <div>
                            <FaPlusCircle className={styles.quantityIcons} onClick={addToCart}/>
                            <span>{ticketQuantity}</span>
                            <FaMinusCircle className={styles.quantityIcons} onClick={subtractFromCart}/>
                        </div>
                        <div>
                            <button className={styles.removeButton} onClick={removeFromCart}>
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