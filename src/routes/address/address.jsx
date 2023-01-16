import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/button.component';
import FormInput from '../../components/form-input/form-input.component';
import styles from './address.module.css';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useEffect } from 'react';
import { getUserById, updateUser } from '../../utils/airtable/users';
import { setCurrentUser } from '../../store/user/user.action';

import { selectCart } from '../../store/cart/cart.selector';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const defaultFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  primaryPhone: '',
  secondaryPhone: '',
  address: '',
  city: '',
  postalCode: '',
  cardNumber: '',
  cardDate: '',
  cardCVV: '',
  cardPostalCode: ''
}

export default function Address() {
  const stripe = useStripe();
  const elements = useElements();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [confirmation, setConfirmation] = useState("");
  const { firstName, lastName, email, primaryPhone, secondaryPhone, address, city, postalCode, cardNumber, cardDate, cardCVV, cardPostalCode } = formFields;
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0) 
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => {
      return res.json();
    });

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Yihua Zhang',
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful!');
      }
    }
  };

  const { cart } = useSelector(selectCart);

  useEffect(() => {
      setAmount((cart[0].ticketQuantity * 60) + (cart[1].ticketQuantity * 150) + (cart[2].ticketQuantity * 400) + (cart[3].ticketQuantity * 20));
    },[cart])

  useEffect(() => {
    setUserInfo();
  }, [])

  const setUserInfo = async () => {
    let userEmail = '';
    let userFirstName = '';
    let userLastName = '';
    let userPrimaryPhone = '';
    let userSecondaryPhone = '';
    let userAddress = '';
    let userCity = '';
    let userPostalCode = '';
    if (currentUser.fields["Email"]) {
      userEmail = currentUser.fields["Email"]
    }
    if (currentUser.fields["First Name"]) {
      userFirstName = currentUser.fields["First Name"]
    }
    if (currentUser.fields["Last Name"]) {
      userLastName = currentUser.fields["Last Name"]
    }
    if (currentUser.fields["Primary Phone"]) {
      userPrimaryPhone = currentUser.fields["Primary Phone"]
    }
    if (currentUser.fields["Secondary Phone"]) {
      userSecondaryPhone = currentUser.fields["Secondary Phone"]
    }
    if (currentUser.fields["Address"]) {
      userAddress = currentUser.fields["Address"]
    }
    if (currentUser.fields["City"]) {
      userCity = currentUser.fields["City"]
    }
    if (currentUser.fields["Postal Code"]) {
      userPostalCode = currentUser.fields["Postal Code"]
    }
    const userInfo = {
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      primaryPhone: userPrimaryPhone,
      secondaryPhone: userSecondaryPhone,
      address: userAddress,
      city: userCity,
      postalCode: userPostalCode,
    }
    setFormFields(userInfo)
  }

  const resetFormFields = () => {
    setUserInfo();
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const saveDetails = async () => {
    await updateUser(currentUser.id, formFields);
    const newUser = await getUserById(currentUser.id)
    changeUserInfo(newUser)
    setConfirmation("Details Saved")
  }

  const changeUserInfo = async (newUser) => {
    await dispatch(setCurrentUser(newUser));
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Billing Address</h1>
      <div className={styles.inputContainer}>
        <FormInput
          label='First Name:'
          type='text'
          onChange={handleChange}
          name='firstName'
          value={firstName}
          placeholder='John'
        />
        <FormInput
          label='Last Name:'
          type='text'
          onChange={handleChange}
          name='lastName'
          value={lastName}
          placeholder='Doe'
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          label='Primary Phone Number:'
          type='tel'
          onChange={handleChange}
          name='primaryPhone'
          value={primaryPhone}
          placeholder='(306) 999-9999'
        />
        <FormInput
          label='Secondary Phone Number:'
          type='tel'
          onChange={handleChange}
          name='secondaryPhone'
          value={secondaryPhone}
          placeholder='(306) 000-0000'
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          label='Address:'
          type='text'
          onChange={handleChange}
          name='address'
          value={address}
          placeholder='22 Address Street West'
        />
        <FormInput
          label='City:'
          type='text'
          onChange={handleChange}
          name='city'
          value={city}
          placeholder='Mossbank'
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          label='Postal Code:'
          type='text'
          onChange={handleChange}
          name='postalCode'
          value={postalCode}
          placeholder='S0H 3G0'
        />
        <FormInput
          label='Email:'
          type='email'
          onChange={handleChange}
          name='email'
          value={email}
          placeholder='johndoe@email.com'
        />
      </div>
    <h1 className={styles.title}>Payment Details</h1>
      <div className={styles.inputContainer}>
        <FormInput
          label='Card Number:'
          type='text'
          onChange={handleChange}
          name='cardNumber'
          value={cardNumber}
          placeholder='16 Digit Card Number'
        />
        <FormInput
          label='Expiration Date:'
          type='text'
          onChange={handleChange}
          name='cardDate'
          value={cardDate}
          placeholder='01/23'
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          label='CVV'
          type='text'
          onChange={handleChange}
          name='cardCVV'
          value={cardCVV}
          placeholder='3 Digit CVV'
        />
        <FormInput
          label='Card Postal Code:'
          type='text'
          onChange={handleChange}
          name='cardPostalCode'
          value={cardPostalCode}
          placeholder='S0H 3G0'
        />
      <CardElement />
      </div>
      <div className={styles.buttonContainer}>
        <Button title='Reset' onClick={resetFormFields} />
        {currentUser && 
          <Button title='Create Account & Confirm Purchase' onClick={() => {}} />
        }
        <Button title='Confirm Purchase' onClick={() => {}}/>
      </div>
      <h2>{confirmation}</h2>
    </div>
  )
}
