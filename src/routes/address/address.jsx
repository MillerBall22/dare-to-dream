
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/button.component';
import FormInput from '../../components/form-input/form-input.component';
import styles from './address.module.css';
import { selectCurrentUser } from '../../store/user/user.selector';
import { useEffect } from 'react';
import { getUserById, updateUser } from '../../utils/airtable/users';
import { setCurrentUser } from '../../store/user/user.action';

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

export default function Address() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [confirmation, setConfirmation] = useState("");
  const { firstName, lastName, email, primaryPhone, secondaryPhone, address, city, postalCode } = formFields;
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

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
      <div className={styles.buttonContainer}>
        <Button title='Reset' onClick={resetFormFields} />
        <Button title='Confirm Purchase' onClick={() => {}}/>
      </div>
      <h2>{confirmation}</h2>
    </div>
  )
}
