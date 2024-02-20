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
        accept="application/pdf"
        name={props.type}
        className="file-input file-input-bordered w-full max-w-xs"
      />
      <div className="label">
        <span className="label-text-alt text-gray-600">Max size 16MB</span>
      </div>
    </label>
  );
};

export default FileInput;
