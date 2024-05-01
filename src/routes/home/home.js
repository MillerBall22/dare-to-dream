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
import { useNavigate } from 'react-router-dom';


export default function Home() {
  /*const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
    });*/

  const [tickets, setTickets] = useState('unavailable');
  const [inSaskatchewan, setInSaskatchewan] = useState('unavailable');
  const [showPoster, setShowPoster] = useState(true)
  const { cart } = useSelector(selectCart);
  //const locate = useGeolocated({
  //    positionOptions: {
  //      enableHighAccuracy: true,
  //    },
  //  });

  //useEffect(() => {
  //  if (cart[0].ticketQuantity !== 0 || cart[1].ticketQuantity !== 0 || cart[2].ticketQuantity !== 0) {
  //    setTickets('can buy');
  //  } else {
  //    setTickets('unavailable')
  //  }
  //}, [cart[0].ticketQuantity, cart[1].ticketQuantity, cart[2].ticketQuantity])

  //const getLocation = async () => {
  //  const { coords, isGeolocationAvailable, isGeolocationEnabled } = locate
  //  let location = await httpGetLocation(coords.latitude, coords.longitude);
  //  console.log(location)
  //  setInSaskatchewan(location.address.state)
  //}
  //const regularTicketsState = 'can buy';

  const navigate = useNavigate()

 const RedirectPage = () => {
    window.location.replace('https://sk.tap5050.com/apex/f?p=127:1::::APP:P0_EVENT_ID:29906')
}

  const flipPoster = () => {
    setShowPoster(!showPoster)
  }
  return (
    <div>
    {showPoster ? <div><AltButton title="Close Poster" onClick={flipPoster}/><Poster/><AltButton title="Close Poster" onClick={flipPoster}/></div> : <AltButton title="Open Poster" onClick={flipPoster}/>}
    <div className={styles.closedTickets}>
    <div className={styles.buttonLinkContainer}>
    <div className={styles.buttonLink}>
      <Button title="Buy Tickets" onClick={RedirectPage}/>
    </div>
    </div>
  </div>
  </div>
  )
}
