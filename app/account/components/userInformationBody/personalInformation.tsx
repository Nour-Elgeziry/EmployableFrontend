import TextInput from "../../UIComponents/textInput";
import CountryInput from "../../UIComponents/countryInput";
// import PhoneNumberInput from "../../UIComponents/phoneNumberInput";

import { TextInputField } from "../userInformationCard";

const PersonalInformation = () => {
  return (
    <span>
      <TextInput title={"What is your name?"} type={TextInputField.NAME} />
      <TextInput title={"What is your age?"} type={TextInputField.AGE} />
      <CountryInput />
      {/* <PhoneNumberInput /> */}
    </span>
  );
};

export default PersonalInformation;
