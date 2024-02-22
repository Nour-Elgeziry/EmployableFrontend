const WebsiteInput = (props: { isInvalid?: boolean }) => {
    return (
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Website</span>
        </div>
        <input
          type="text"
          name="website"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        {props.isInvalid && (
          <div className="label">
            <span className="label-text-alt text-red-500">Invalid website</span>
          </div>
        )}
      </label>
    );
  };
  
  export default WebsiteInput;
  