import { useState, useEffect} from 'react';
import styles from './navigation-bar.module.css';
import { useDispatch, useSelector} from 'react-redux';

import {HiShoppingCart} from 'react-icons/hi';
import {RiAccountCircleFill} from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import {FaTwitterSquare, FaFacebookSquare, FaInstagramSquare} from 'react-icons/fa';

import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import LoginDropdown from '../login-dropdown/login-dropdown.component';
import AccountOptionsDropdown from '../account-options-dropdown/account-options-dropdown.component';
import { Link } from 'react-router-dom';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCart } from '../../store/cart/cart.selector';
import { selectCartDropdown, selectLoginDropdown } from '../../store/dropdowns/dropdowns.selector';
import { setCartDropdown, setLoginDropdown } from '../../store/dropdowns/dropdowns.action';
import MobileNavDropdown from '../mobile-nav-dropdown/mobile-nav-dropdown.component';

function NavigationBar() {
  const [ticketTotal, setTicketTotal] = useState(0);
  const [dropdownComponent, setDropdownComponent] = useState(<LoginDropdown/>)
  const [mobileDropdown, setMobileDropdown] = useState(false)
  const {cart} = useSelector(selectCart);

  const cartDropdown = useSelector(selectCartDropdown);
  const loginDropdown = useSelector(selectLoginDropdown);

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

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
  }, [ currentUser])

  function ToggleMobileNav() {
    setMobileDropdown(!mobileDropdown)
  }

  async function toggleCart() {
    dispatch(setLoginDropdown(false));
    dispatch(setCartDropdown(!cartDropdown));
  }

  async function toggleLogin() {
    dispatch(setCartDropdown(false));
    dispatch(setLoginDropdown(!loginDropdown));
  }

  return (
    <>
      <div className={styles.desktopContainer}>
        <div className={styles.navigationTop}>
          <div className={styles.socialLinks}>
            <a href="https://www.facebook.com/lifeisbetterinmossbank/" target='blank'><FaFacebookSquare className={styles.socialLink}/></a>
            <a href="https://www.instagram.com/townofmossbank/" target='blank'><FaInstagramSquare className={styles.socialLink}/></a>
            <a href="https://twitter.com/Dare2DreamLotto" target='blank'><FaTwitterSquare className={styles.socialLink}/></a>
          </div>
          <div className={styles.phoneAndEmail}>
            1-866-359-2WIN (2946) | mossbankdaretodreamlotto@gmail.com
          </div>
        </div>
        <div className={styles.navigationBottom}>
          <div>
            <Link className={styles.navigationLink} to="/">
              Home
            </Link>
          </div>
          {/*<div>
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
          */}
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

      <div className={styles.mobileContainer}>
        <div className={styles.mobileNavigation}>
          <div className={styles.mobileLinks} onClick= {ToggleMobileNav}>
            <Link className={styles.navigationLink}>
            <GiHamburgerMenu className={styles.navBars} /> &nbsp; Dare To Dream
            </Link>
          </div>
          <div className={styles.mobileIcons}>
            <div onClick={toggleCart}>
              <Link className={styles.mobileNavigationLink}>
                <HiShoppingCart className={styles.linkIcons} />
              </Link>
            </div>
            <div onClick={toggleLogin}>
              <Link className={styles.mobileNavigationLink}>
                <RiAccountCircleFill className={styles.linkIcons} />
              </Link>
            </div>
          </div>
            {cartDropdown && <CartDropdown />}
            {loginDropdown && dropdownComponent}
            {mobileDropdown && <MobileNavDropdown/>}
        </div>
      </div>
    </>
  );
}

export default NavigationBar;
