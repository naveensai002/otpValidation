import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const OtpInput = ({ length }) => {
  const [otpField, setOtp] = useState(new Array(length).fill(""));

  const inputRefs = useRef([]);
  const onOtpSubmit = () => {
    toast.success("Login Successful");
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  //onChange input method
  const otpChangeHandler = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otpField];
    //so that it takes only last character
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //on submit after filling all value

    const combinedOtp = newOtp.join("");
    combinedOtp.length === length && onOtpSubmit(combinedOtp);

    //move to the next input field if current field is filled
    //inputRefs.current[index + 1] ,means if some other field is there or not
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  };
  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otpField[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
      {otpField.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            name="otpForm"
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => handleClick(index)}
            onChange={(e) => otpChangeHandler(e, index)}
            className="otpInput"
          />
        );
      })}
    </>
  );
};

export default OtpInput;
