const OptionSelection = (props: {
  title: string;
  options: string[];
  allowMultiple: Boolean;
}) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">Remember me</span>
        <input type="checkbox" checked className="checkbox" />
      </label>
    </div>
  );
};

export default OptionSelection;
