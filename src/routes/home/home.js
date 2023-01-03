import { useState, useEffect } from 'react';
import TicketCard from '../../components/card/ticket-card.component'
import styles from './Home.module.css'
import Slideshow from '../../components/slideshow/slideshow.component';

import { useGeolocated } from "react-geolocated";
import { httpGetLocation } from '../../services/locationIQ/locationIQ';
import Button from '../../components/button/button.component';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/cart/cart.selector';

export default function Home() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
    });

  const [tickets, setTickets] = useState('unavailable');
  const [inSaskatchewan, setInSaskatchewan] = useState('unavailable');
  const { cart } = useSelector(selectCart);

  useEffect(() => {
    if (cart[0].ticketQuantity !== 0 || cart[1].ticketQuantity !== 0 || cart[2].ticketQuantity !== 0) {
      setTickets('can buy');
    } else {
      setTickets('unavailable')
    }
  }, [cart[0].ticketQuantity, cart[1].ticketQuantity, cart[2].ticketQuantity])

  const getLocation = async () => {
    const location = await httpGetLocation(coords.latitude, coords.longitude);
    setInSaskatchewan(location.address.state)
  }
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
      ) : inSaskatchewan === "Saskatchewan" ? (
        <div className={styles.container}>
          <TicketCard className='ticket-card' ticketId='singleTicket' ticketTitle='1 Ticket' price={60} imageUrl='/static/1 Ticket.svg' imageAlt='1 Ticket' stateOfButton={regularTicketsState}/>
          <TicketCard className='ticket-card' ticketId='threeTickets' ticketTitle='3 Tickets' price={150} imageUrl='/static/3 Tickets.svg' imageAlt='3 Tickets' stateOfButton={regularTicketsState}/>
          <TicketCard className='ticket-card' ticketId='tenTickets' ticketTitle='10 Tickets' price={400} imageUrl='/static/10 Tickets.svg' imageAlt='10 Tickets' stateOfButton={regularTicketsState}/>
          <TicketCard className='ticket-card' ticketId='fiftyFiftyTickets' ticketTitle='50/50 Tickets' price={20} imageUrl='/static/3 Tickets.svg' imageAlt='50/50 Tickets' stateOfButton={tickets}/>
        </div>
            ) : isGeolocationEnabled ? ( 
                <div className={styles.locationContainer}>
                  <h2 className={styles.locationHeader}>Press the button to get location data. </h2>
                  <Button title='Get Location' onClick={getLocation}/>
                </div>
            ) : inSaskatchewan !== "Saskatchewan" ? (
              <div className={styles.locationContainer}>
                <h2 className={styles.locationHeader}>Sorry you are not eligible to buy tickets.</h2>
              </div>
            ) : (
        <div className={styles.locationContainer}>
            <h2 className={styles.locationHeader}>Getting the location data&hellip; </h2>
        </div>
      )
      }
    </div>
  )
}
