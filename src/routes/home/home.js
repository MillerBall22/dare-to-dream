import { useState, useContext, useEffect } from 'react';
import {StoreContext, ACTION_TYPES } from "../../store/store-context";
import TicketCard from '../../components/card/ticket-card.component'
import styles from './Home.module.css'
import Slideshow from '../../components/slideshow/slideshow.component';
import { selectInSaskatchewan } from '../../store/location/location.selector';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/button.component';
import { setInSaskatchewan } from '../../store/location/location.action';

export default function Home() {
  const [tickets, setTickets] = useState('unavailable');
  const {state, dispatch} = useContext(StoreContext);
  const {cart} = state;
  const inSaskatchewan = useSelector(selectInSaskatchewan);
  const locationDispatch = useDispatch();

  useEffect(() => {
    if (cart[0].ticketQuantity !== 0 || cart[1].ticketQuantity !== 0 || cart[2].ticketQuantity !== 0) {
      setTickets('can buy');
    } else {
      dispatch({
            type: ACTION_TYPES.REMOVE_FROM_CART,
            payload: {
              ticketId: 'fiftyFiftyTickets'
            },
          });
      setTickets('unavailable')
      console.log(inSaskatchewan)
    }
  }, [cart[0].ticketQuantity, cart[1].ticketQuantity, cart[2].ticketQuantity])

  const changeLocation = () => {
    locationDispatch(setInSaskatchewan("Not In Saskatchewan"));
  }

  const regularTicketsState = 'can buy';
  return (
    <div>
      <div className={styles.banner}>
        <Slideshow/>
      </div>
      {inSaskatchewan === "No Location" && 
        <div className={styles.locationContainer}>
            <h2 className={styles.locationHeader}>Your geolocation is required to purchase tickets</h2>
            <div className={styles.buttonContainer}>
              <Button title='Get Geolocation' onClick={changeLocation}/>
            </div>
        </div>
      }
      {inSaskatchewan === "Not In Saskatchewan" &&
        <div className={styles.locationContainer}>
          <h2 className={styles.locationHeader}>Sorry, we can not confirm you are in Saskatchewan. Being in Saskatchewan is required to buy tickets.</h2>
        </div>
      }
      {inSaskatchewan === "Not In Saskatchewan" &&
        <div className={styles.locationContainer}>
          <Button title='Retry Geolocation' onClick={changeLocation} />
        </div>
      }
      {inSaskatchewan === "In Saskatchewan" &&
        <div className={styles.container}>
          <TicketCard className='ticket-card' ticketId='singleTicket' ticketTitle='1 Ticket' price={60} imageUrl='/static/1 Ticket.svg' imageAlt='1 Ticket' stateOfButton={regularTicketsState}/>
          <TicketCard className='ticket-card' ticketId='threeTickets' ticketTitle='3 Tickets' price={150} imageUrl='/static/3 Tickets.svg' imageAlt='3 Tickets' stateOfButton={regularTicketsState}/>
          <TicketCard className='ticket-card' ticketId='tenTickets' ticketTitle='10 Tickets' price={400} imageUrl='/static/10 Tickets.svg' imageAlt='10 Tickets' stateOfButton={regularTicketsState}/>
          <TicketCard className='ticket-card' ticketId='fiftyFiftyTickets' ticketTitle='50/50 Tickets' price={20} imageUrl='/static/3 Tickets.svg' imageAlt='50/50 Tickets' stateOfButton={tickets}/>
        </div>
      }
    </div>
  )
}
