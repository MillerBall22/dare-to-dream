import { useState, useEffect } from 'react';
import TicketCard from '../../components/card/ticket-card.component'
import styles from './Home.module.css'
import Slideshow from '../../components/slideshow/slideshow.component';

import { useGeolocated } from "react-geolocated";
import { httpGetLocation } from '../../services/locationIQ/locationIQ';
import Button from '../../components/button/button.component';
import AltButton from '../../components/alt-button/alt-button.component';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/cart/cart.selector';
import Poster from '../../components/poster/poster';


export default function Home() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
    });

  const [tickets, setTickets] = useState('unavailable');
  const [inSaskatchewan, setInSaskatchewan] = useState('unavailable');
  const [showPoster, setShowPoster] = useState(true)
  const { cart } = useSelector(selectCart);
  const locate = useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
    });

  useEffect(() => {
    if (cart[0].ticketQuantity !== 0 || cart[1].ticketQuantity !== 0 || cart[2].ticketQuantity !== 0) {
      setTickets('can buy');
    } else {
      setTickets('unavailable')
    }
  }, [cart[0].ticketQuantity, cart[1].ticketQuantity, cart[2].ticketQuantity])

  const getLocation = async () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = locate
    let location = await httpGetLocation(coords.latitude, coords.longitude);
    console.log(location)
    setInSaskatchewan(location.address.state)
  }
  const regularTicketsState = 'can buy';

  const flipPoster = () => {
    setShowPoster(!showPoster)
  }
  return (
    <div>
    {showPoster ? <div><AltButton title="Close Poster" onClick={flipPoster}/><Poster/><AltButton title="Close Poster" onClick={flipPoster}/></div> : <AltButton title="Open Poster" onClick={flipPoster}/>}
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
          <TicketCard className='ticket-card' ticketId='tenTickets' ticketTitle='10 Tickets' price={400} imageUrl='/static/10 Tickets.svg' imageAlt='10 Tickets' stateOfButton={"sold out"}/>
          <TicketCard className='ticket-card' ticketId='fiftyFiftyTickets' ticketTitle='50/50 Tickets' price={20} imageUrl='/static/3 Tickets.svg' imageAlt='50/50 Tickets' stateOfButton={tickets}/>
        </div>
            ) : inSaskatchewan !== "Saskatchewan" & inSaskatchewan !== "unavailable" ? (
              <div className={styles.locationContainer}>
                <h2 className={styles.locationHeader}>Sorry you are not eligible to buy tickets.</h2>
                <h3 className={styles.locationHeader}>If you think this is a mistake please check your computer's location services' settings</h3>
              </div>
            ): isGeolocationEnabled && ( 
              <div>
                <div className={styles.locationContainer}>
                  <h2 className={styles.locationHeader}>Press the button to get location data and continue to purchasing.</h2>
                  <Button title='Get Location' onClick={getLocation}/>
                  </div>
                  <div>
                  <h3 className={styles.locationHeader}>Must be in Saskatchewan to be eligible to purchase tickets.</h3>
                </div>
              </div>
            )
      }
    </div>
  )
}
