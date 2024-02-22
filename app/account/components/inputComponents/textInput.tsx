export enum TextInputField {
  NAME = "name",
  AGE = "age",
  COMPANY = "company",
}

const TextInput = (props: {
  title: String;
  type: TextInputField;
  isInvalid?: boolean;
}) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text ">{props.title}</span>
      </div>
      <input
        type={props.type === TextInputField.AGE ? "number" : "text"}
        name={props.type}
        min={props.type === TextInputField.AGE ? 1 : undefined}
        onInput={
          props.type === TextInputField.AGE
            ? (event: any) => {
                if (Number(event.target.value) < 1) {
                  event.target.value = 1;
                }
              }
            : undefined
        }
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
      />
      {props.isInvalid && (
        <div className="label">
          <span className="label-text-alt text-red-500">
            This field is required
          </span>
        </div>
      )}
    </label>
  );
};

export default TextInput;
