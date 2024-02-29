export enum OptionInputField {
  EDUCATION = "education",
  EXPERIENCE = "experience",
  SENIORITY = "seniority",
  TITLE = "title",
}

const OptionInput = (props: {
  title: string;
  type: OptionInputField;
  options: string[];
  allowMultiple: boolean;
}) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer mb-2">
        <span className="label-text max-w-40">{props.title}</span>
        <select
          name={props.type}
          multiple={props.allowMultiple}
          className="select select-bordered min-w-40 max-w-40"
        >
          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default OptionInput;
