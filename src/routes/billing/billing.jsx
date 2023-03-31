import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/button.component';
import FormInput from '../../components/form-input/form-input.component';
import styles from './billing.module.css';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useEffect } from 'react';
import { getUserById, updateUser, createUser,getUser } from '../../utils/airtable/users';
import { setCurrentUser } from '../../store/user/user.action';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { selectCart } from '../../store/cart/cart.selector';
import { createPurchase } from '../../utils/airtable/purchases';
import LoadingMessage from '../../components/loading-message/loading-message.component';
import { useNavigate } from 'react-router-dom';
import {removeFromCart } from '../../store/cart/cart.action';


const defaultFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  primaryPhone: '',
  secondaryPhone: '',
  address: '',
  city: '',
  postalCode: '',
}

export default function Billing() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [amount, setAmount] = useState(0);
  const [ticketTotal, setTicketTotal] = useState(0);
  const [confirmation, setConfirmation] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { firstName, lastName, email, primaryPhone, secondaryPhone, address, city, postalCode } = formFields;
  const currentUser = useSelector(selectCurrentUser);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    setUserInfo();
  }, [])

    const {cart} = useSelector(selectCart);

  useEffect(() => {
      setAmount((cart[0].ticketQuantity * 60) + (cart[1].ticketQuantity * 150) + (cart[2].ticketQuantity * 400) + (cart[3].ticketQuantity * 20));
      setTicketTotal((cart[0].ticketQuantity) + (cart[1].ticketQuantity) + (cart[2].ticketQuantity) + (cart[3].ticketQuantity));
    },[cart])

  const setUserInfo = async () => {
    let userEmail = '';
    let userFirstName = '';
    let userLastName = '';
    let userPrimaryPhone = '';
    let userSecondaryPhone = '';
    let userAddress = '';
    let userCity = '';
    let userPostalCode = '';
    if (currentUser) {
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

  async function clearCart () {
      dispatch(removeFromCart("singleTicket"));
      dispatch(removeFromCart("threeTickets"));
      dispatch(removeFromCart("tenTickets"));
      dispatch(removeFromCart("fiftyFiftyTickets"));
  }

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (firstName === "" || lastName === "" || email === "" || primaryPhone === "" || address === "" || city === "" || postalCode=== "") {
      setConfirmation("Missing required information. please check that you have filled out the form to completion")
      return;
    }
    if (!stripe || !elements) {
      return;
    }
    const fullName = `${firstName} ${lastName}`;
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
          name: fullName,
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
      setConfirmation("Payment Unsuccessful");
    } else {
      if (currentUser) {
        saveDetails();
      }
      if (paymentResult.paymentIntent.status === 'succeeded') {
        const purchaseInfo = {
          lastName,
          firstName,
          email,
          primaryPhone,
          secondaryPhone,
          address,
          city,
          postalCode,
          ticketsPurchased: ticketTotal,
          singleTicket: cart[0].ticketQuantity,
          threeTickets: cart[1].ticketQuantity,
          tenTickets: cart[2].ticketQuantity,
          fiftyFiftyTickets: cart[3].ticketQuantity,
          totalPrice: amount
        }
        createPurchase(purchaseInfo)
        clearCart()
        navigate('/purchase-success')
      }
    }
  };

  const createAndPayHandler = async (e) => {
    e.preventDefault();
    if (firstName === "" || lastName === "" || email === "" || primaryPhone === "" || address === "" || city === "" || postalCode=== "") {
      setConfirmation("Missing required information. please check that you have filled out the form to completion")
      return;
    }
    if (!stripe || !elements) {
      return;
    }
    const fullName = `${firstName} ${lastName}`;
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
          name: fullName,
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
      setConfirmation("Payment Unsuccessful");
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        const userCheck = await getUser(email);
          if (!userCheck) {
            await createUser(email)
          }
        const createdUser = await getUser(email)
        const update = {email, firstName, lastName, primaryPhone, secondaryPhone, address, city, postalCode}
        await updateUser(createdUser.id, update)
        const purchaseInfo = {
          lastName,
          firstName,
          email,
          primaryPhone,
          secondaryPhone,
          address,
          city,
          postalCode,
          ticketsPurchased: ticketTotal,
          singleTicket: cart[0].ticketQuantity,
          threeTickets: cart[1].ticketQuantity,
          tenTickets: cart[2].ticketQuantity,
          fiftyFiftyTickets: cart[3].ticketQuantity,
          totalPrice: amount
        }
        createPurchase(purchaseInfo)
        clearCart()
        navigate('/purchase-success')
      }
    }
  };

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
          label='Primary Phone:'
          type='tel'
          onChange={handleChange}
          name='primaryPhone'
          value={primaryPhone}
          placeholder='(306) 999-9999'
        />
        <FormInput
          label='Secondary Phone:'
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
      <div className={styles.cardElementContainer} >
            <CardElement />
        </div>
      {isProcessingPayment ? <LoadingMessage/> :
        <div className={styles.buttonContainer}>
          <Button title='Reset' onClick={resetFormFields} />
          {!currentUser && 
            <Button title='Create Account & Purchase' onClick={createAndPayHandler} />
          }
          <Button title='Purchase' onClick={paymentHandler}/>
        </div>
      }
      <h2>{confirmation}</h2>
    </div>
  )
}
