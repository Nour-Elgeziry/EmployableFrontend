import TextInput, { TextInputField } from "../inputComponents/textInput";
import CountryInput from "../inputComponents/countryInput";
// import PhoneNumberInput from "../../UIComponents/phoneNumberInput";

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
