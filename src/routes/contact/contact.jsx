
import { useState } from 'react'
import Button from '../../components/button/button.component'
import FormInput from '../../components/form-input/form-input.component'
import TextArea from '../../components/text-area/text-area.component'
import styles from './contact.module.css'

const defaultFormFields = {
    name: '',
    email: '',
    phone: '',
    remarks: '',
}

export default function Contact() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {name, email, phone, remarks} = formFields;

  const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

  const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

  return (
    <div className={styles.container}>
      <h1 className={styles.title} >Contact Form</h1>
      <FormInput
        label='Name:'
        type='text'
        onChange={handleChange}
        name='name'
        value={name}
        placeholder='John Doe'
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
        label='Phone Number:'
        type='tel'
        onChange={handleChange}
        name='phone'
        value={phone}
        placeholder='1 (306) 999-9999'
      />
      <TextArea
        label='Remarks:'
        type='textarea'
        onChange={handleChange}
        name='remarks'
        value={remarks}
        placeholder={'Write your message here'}
      />
      <div className={styles.buttonContainer}>
        <Button title='Reset' onClick={resetFormFields}/>
        <Button title='Submit' onClick={() => {}}/>
      </div>
    </div>
  )
}
