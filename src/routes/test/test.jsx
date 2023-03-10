import { CardElement } from "@stripe/react-stripe-js";
import React from "react";
import Button from "../../components/button/button.component";

export default function Test() {
  return (
    <div>
      <CardElement />
      <Button  title='Submit' onClick={() => {}}/>
    </div>
  );
};

