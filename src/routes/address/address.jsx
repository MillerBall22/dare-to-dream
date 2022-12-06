
import { useState } from 'react'
import Button from '../../components/button/button.component'
import FormInput from '../../components/form-input/form-input.component'
import styles from './address.module.css'

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
  const {firstName, lastName, email, primaryPhone, secondaryPhone, address, city, postalCode} = formFields;

  const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

  const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Billing Address</h1>
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
      <FormInput
        label='Email:'
        type='email'
        onChange={handleChange}
        name='email'
        value={email}
        placeholder='johndoe@email.com'
      />
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
      <FormInput
        label='Postal Code:'
        type='text'
        onChange={handleChange}
        name='postalCode'
        value={postalCode}
        placeholder='S0H 3G0'
      />
      <div className={styles.buttonContainer}>
        <Button title='Reset' onClick={resetFormFields}/>
        <Button title='Continue to Billing' onClick={() => {}}/>
      </div>
    </div>
  )
}
