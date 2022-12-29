import { useState, useContext, useEffect } from 'react';
import {StoreContext, ACTION_TYPES } from "../../store/store-context";
import TicketCard from '../../components/card/ticket-card.component'
import styles from './Home.module.css'
import Slideshow from '../../components/slideshow/slideshow.component';

import { useGeolocated } from "react-geolocated";

export default function Home() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
    });
  console.log(coords);
  const [tickets, setTickets] = useState('unavailable');
  const [inSaskatchewan, setInSaskatchewan] = useState('unavailable');
  const {state, dispatch} = useContext(StoreContext);
  const {cart} = state;

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
    }
  }, [cart[0].ticketQuantity, cart[1].ticketQuantity, cart[2].ticketQuantity])

  const regularTicketsState = 'can buy';
  return (
    <div>
      <div className={styles.banner}>
        <Slideshow/>
      </div>
      {!isGeolocationEnabled ? (
        <div className={styles.locationContainer}>
            <h2 className={styles.locationHeader}>Your geolocation is required to purchase tickets, change your browser settings and allow location access.</h2>
        </div>
      ) : !isGeolocationAvailable ? (
        <div className={styles.locationContainer}>
          <h2 className={styles.locationHeader}>Your geolocation is required to purchase tickets. Your geolocation is unavailable, please check you device settings.</h2>
        </div>
      ) : inSaskatchewan === "Not In Saskatchewan" ? (
        <div className={styles.locationContainer}>
        </div>
          ) : inSaskatchewan === "Not In Saskatchewan" ? (
        <div className={styles.container}>
          <TicketCard className='ticket-card' ticketId='singleTicket' ticketTitle='1 Ticket' price={60} imageUrl='/static/1 Ticket.svg' imageAlt='1 Ticket' stateOfButton={regularTicketsState}/>
          <TicketCard className='ticket-card' ticketId='threeTickets' ticketTitle='3 Tickets' price={150} imageUrl='/static/3 Tickets.svg' imageAlt='3 Tickets' stateOfButton={regularTicketsState}/>
          <TicketCard className='ticket-card' ticketId='tenTickets' ticketTitle='10 Tickets' price={400} imageUrl='/static/10 Tickets.svg' imageAlt='10 Tickets' stateOfButton={regularTicketsState}/>
          <TicketCard className='ticket-card' ticketId='fiftyFiftyTickets' ticketTitle='50/50 Tickets' price={20} imageUrl='/static/3 Tickets.svg' imageAlt='50/50 Tickets' stateOfButton={tickets}/>
        </div>
      ) : (
        <div className={styles.container}>
            <h2 className={styles.locationHeader}>Getting the location data&hellip; </h2>
        </div>
      )
      }
    </div>
  )
}
