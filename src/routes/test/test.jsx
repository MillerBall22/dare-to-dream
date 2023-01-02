import React from "react";
import Button from '../../components/button/button.component';
import { httpGetLocation } from "../../services/locationIQ/locationIQ";

export default function Test() {
  const getLocation = async () => {
    const location = await httpGetLocation(10, 10);
    console.log(location.address.state)
  }
  return (
    <Button title='Get Location' onClick={getLocation} />
  )
}
