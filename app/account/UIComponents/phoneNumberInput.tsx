import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input/input";

const PhoneNumberInput = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const selectPhoneNumber = (val: any) => {
    setPhoneNumber(val);
  };

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">What is your phone number?</span>
      </div>
      <PhoneInput
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={selectPhoneNumber}
        className="w-full max-w-xs input input-bordered text-gray-400"
      />
    </label>
  );
};

export default PhoneNumberInput;
// classes="w-full max-w-xs input input-bordered text-gray-400"
