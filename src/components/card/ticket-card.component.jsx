import styles from './ticket-card.module.css';

import ToggleButton from '../toggle-button/toggle-button.component';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cart/cart.action';
const TicketCard = ({ticketId, ticketTitle, price, imageUrl ,imageAlt, stateOfButton}) => {

    //const {dispatch} = useContext(StoreContext);
    const dispatch = useDispatch();
    async function addToCartButton () {
        dispatch(addToCart(ticketId));
    }
    return (
        <div className={styles.container} >
            <h2 className={styles.title}>{ticketTitle}</h2>
            <h3 className={styles.price}>${price}</h3>
            <div className={styles.imageContainer}>
                <img src={imageUrl} width={200} height={200} alt={imageAlt}/>
            </div>
            <ToggleButton buttonState={stateOfButton} onClick={addToCartButton}/>
        </div>);
}

export default TicketCard;