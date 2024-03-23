import OptionInput from "../inputComponents/optionInput";
import FileInput from "../inputComponents/fileInput";

import { FileInputField } from "../inputComponents/fileInput";
import { OptionInputField } from "../inputComponents/optionInput";

const CareerInformation = () => {
  const levelOfEducation = ["High School", "Bachelor", "Master", "PhD"];
  const yearsOfExperience = ["0-2", "2-5", "5-10", "10+"];
  const seniorityLevel = ["Intern", "Entry", "Mid", "Senior"];
  const fieldOfStudy = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Business",
  ];
  return (
    <span>
      <OptionInput
        title="What is your level of education?"
        type={OptionInputField.EDUCATION}
        options={levelOfEducation}
        allowMultiple={false}
      />
      <OptionInput
        title="How many years of experience do you have?"
        type={OptionInputField.EXPERIENCE}
        options={yearsOfExperience}
        allowMultiple={false}
      />
      <OptionInput
        title="What is your seniority level?"
        type={OptionInputField.SENIORITY}
        options={seniorityLevel}
        allowMultiple={false}
      />
      <OptionInput
        title="What is your field of study?"
        type={OptionInputField.TITLE}
        options={fieldOfStudy}
        allowMultiple={false}
      />
      <FileInput type={FileInputField.CV} />
    </span>
  );
};

export default CareerInformation;
