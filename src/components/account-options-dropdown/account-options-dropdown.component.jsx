import Button from '../button/button.component';
import { logoutUser } from '../../services/magic';

import styles from './account-options-dropdown.module.css';

import { setCurrentUser } from '../../store/user/user.action';
import { useDispatch } from 'react-redux';

const AccountOptionsDropdown = () => {
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        try {
            await logoutUser();
            dispatch(setCurrentUser(null));
        } catch (error) {
            console.error(error);
        }
      };

    return (
        <div className={styles.container} >
            <h3 className={styles.title}>
                Account Options  
            </h3>
            <div>
                <a className={styles.navigationLink} href="/account-details"> Account Details</a>
            </div>
            <div className={styles.buttonContainer}>
                <Button title='SIGN OUT' onClick={handleLogOut}/>
            </div>
        </div>);
}

export default AccountOptionsDropdown;