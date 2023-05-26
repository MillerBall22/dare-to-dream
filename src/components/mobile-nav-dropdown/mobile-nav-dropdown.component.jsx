import styles from './mobile-nav-dropdown.module.css';

import { Link } from 'react-router-dom';

function MobileNavDropdown() {
  return (
    <div className={styles.container}>
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
      </div>*/}
      <div>
        <Link className={styles.navigationLink} to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default MobileNavDropdown;
