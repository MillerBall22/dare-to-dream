import Button from '../button/button.component';

import styles from './login-dropdown.module.css';
import { useState } from 'react';
import FormInput from '../form-input/form-input.component';

import { loginUser } from '../../services/magic';

import { setCurrentUser } from '../../store/user/user.action';
import { useDispatch } from 'react-redux';
import { getUser, createUser } from '../../utils/airtable/users';

const defaultFormFields = {
    email: '',
}

const LoginDropdown = () => {
    const [loading, setLoading] = useState('');
    const [error, setError] = useState(null);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email} = formFields;

    const dispatch = useDispatch();

    const signInUser = (user) => {
        dispatch(setCurrentUser(user));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!email) {
            setLoading(false);
            setError('Email is Invalid');
            return;
        }
        try {
            await loginUser(email);
            setLoading(false);
            const user = await getUser(email);
            if (!user) {
                await createUser(email)
                const createdUser = await getUser(email)
                await signInUser(createdUser);
                return
            }
            signInUser(user);
        } catch (error) {
            setError('Unable to log in');
        }
    };

    const handleChange = (event) => {
        console.log(event)
        event.preventDefault();
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className={styles.container} >
            <h3 className={styles.title}>
                Insert your email  
            </h3>
               <FormInput
                    label='Email:'
                    type='email'
                    onChange={handleChange}
                    name='email'
                    value={email}
                    placeholder='johndoe@email.com'
               />
            <div className={styles.errorContainer}>
               <p>{error}</p>  
            </div>
            <div className={styles.buttonContainer}>
                <Button title='LOGIN/SIGN UP' onClick={handleSubmit}/>
            </div>
        </div>);
}

export default LoginDropdown;