import React, { useState } from "react";

import { toast } from "sonner";
import OtpInput from "./OtpInput";

function PhoneOtpForm() {
  const [phoneNumber, setNumber] = useState("");
  const [showOtpForm, setOtpForm] = useState(false);

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    console.log(phoneNumber);
    //phone validations
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      toast.error("Invalid Phone number");
      return;
    }
    //show otpForm
    setOtpForm(true);
  };
  return (
    <>
      {!showOtpForm ? (
        <form onSubmit={handlePhoneNumberSubmit}>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter your phone number"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h3>Enter the Otp sent to your phone {phoneNumber}</h3>
          <OtpInput length={4} />
        </div>
      )}
    </>
  );
}

export default PhoneOtpForm;
