import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";

const CountryInput = () => {
  const [country, setCountry] = useState("");
  const [isDefault, setIsDefault] = useState(true);
  let defaultClass = "w-full max-w-xs input input-bordered";

  const selectCountry = (val: any) => {
    if (val === "") {
      setIsDefault(true);
    } else {
      setIsDefault(false);
    }

    setCountry(val);
  };

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Where are you located?</span>
      </div>
      <CountryDropdown
        name="country"
        value={country}
        onChange={selectCountry}
        defaultOptionLabel="Select country"
        classes={defaultClass + (isDefault ? " text-gray-400" : "")}
      />
    </label>
  );
};

export default CountryInput;
