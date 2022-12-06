import {useContext, useState, useEffect} from 'react';
import styles from './navigation-bar.module.css';
import { useSelector} from 'react-redux';

import {HiShoppingCart} from 'react-icons/hi';
import {RiAccountCircleFill} from 'react-icons/ri';
import {FaTwitterSquare, FaFacebookSquare, FaInstagramSquare} from 'react-icons/fa';

import {StoreContext, ACTION_TYPES} from "../../store/store-context";

import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import LoginDropdown from '../login-dropdown/login-dropdown.component';
import AccountOptionsDropdown from '../account-options-dropdown/account-options-dropdown.component';
import { Link } from 'react-router-dom';

import { selectCurrentUser } from '../../store/user/user.selector';

function NavigationBar() {
  const {dispatch} = useContext(StoreContext);

  const [ticketTotal, setTicketTotal] = useState(0);
  const [dropdownComponent, setDropdownComponent] = useState(<LoginDropdown/>)
  const {state} = useContext(StoreContext);
  const {cart, cartDropdown, loginDropdown, toggleLoggedin} = state;

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    setTicketTotal(cart[0].ticketQuantity + cart[1].ticketQuantity + cart[2].ticketQuantity + cart[3].ticketQuantity)
  }, [cart]);

  useEffect(() => {
    try {
      if (currentUser === null) {
        setDropdownComponent(<LoginDropdown/>)
      } else {
        setDropdownComponent(<AccountOptionsDropdown/>)
      }
    } catch (error) {
      if (currentUser) {
          setDropdownComponent(<AccountOptionsDropdown/>)
        } else {
          setDropdownComponent(<LoginDropdown/>)
        }
    }
  }, [toggleLoggedin, currentUser])

  async function toggleCart() {
    dispatch({
            type: ACTION_TYPES.TOGGLE_LOGIN_DROPDOWN,
            payload: {
              loginDropdown: false,
            },
          });
    dispatch({
            type: ACTION_TYPES.TOGGLE_CART_DROPDOWN,
            payload: {
              cartDropdown: !cartDropdown,
            },
          });
  }

  async function toggleLogin() {
    dispatch({
            type: ACTION_TYPES.TOGGLE_CART_DROPDOWN,
            payload: {
              cartDropdown: false,
            },
          });
    dispatch({
            type: ACTION_TYPES.TOGGLE_LOGIN_DROPDOWN,
            payload: {
              loginDropdown: !loginDropdown,
            },
          });
  }

  return (
    <div className={styles.container}>
      <div className={styles.navigationTop}>
        <div className={styles.socialLinks}>
          <a href="https://www.facebook.com/lifeisbetterinmossbank/" target='blank'><FaFacebookSquare className={styles.socialLink}/></a>
          <a href="https://www.instagram.com/townofmossbank/" target='blank'><FaInstagramSquare className={styles.socialLink}/></a>
          <a href="https://twitter.com/TownofMossbank" target='blank'><FaTwitterSquare className={styles.socialLink}/></a>
        </div>
        <div className={styles.phoneAndEmail}>
          306-354-2294 | townofmossbank@sasktel.net
        </div>
      </div>
      <div className={styles.navigationBottom}>
        <div>
          <Link className={styles.navigationLink} to="/">
            Home
          </Link>
        </div>
        <div>
          <Link className={styles.navigationLink} to="/past-winners">
            Past Winners
          </Link>
        </div>
        <div>
          <Link className={styles.navigationLink} to="/contact">
            Contact
          </Link>
        </div>
        <div>
          <Link className={styles.navigationLink} to="/about">
            About
          </Link>
        </div>
        <div onClick={toggleCart}>
          <Link className={styles.navigationLink}>
            <HiShoppingCart className={styles.linkIcons}/>&nbsp;{ticketTotal} Items
          </Link>
        </div>
        <div onClick={toggleLogin}>
          <Link className={styles.navigationLink}>
            <RiAccountCircleFill className={styles.linkIcons}/> &nbsp;{currentUser === null ? 'Sign In' : 'Account Options'}
          </Link>
        </div>
        {cartDropdown && <CartDropdown />}
        {loginDropdown && dropdownComponent}
      </div>
    </div>
  );
}

export default NavigationBar;
