export enum FileInputField {
  CV = "cv",
}

const FileInput = (props: { type: FileInputField }) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Upload your CV</span>
      </div>
      <input
        type="file"
        name={props.type}
        className="file-input file-input-bordered w-full max-w-xs"
      />
    </label>
  );
};

export default FileInput;
