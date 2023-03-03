import React from "react";
import { PaymentElement } from '@stripe/react-stripe-js';

export default function Test() {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

