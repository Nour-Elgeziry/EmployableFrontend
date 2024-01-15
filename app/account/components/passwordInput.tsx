"use client";

export enum PasswordType {
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}

import { useState } from "react";

const PasswordInput = (props: { type: PasswordType; isInvalid?: boolean }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">
          {props.type === PasswordType.PASSWORD
            ? "Password"
            : "Confirm Password"}
        </span>
      </div>
      <div className="items-center flex">
        <input
          type={isPasswordVisible ? "text" : "password"}
          name={
            props.type === PasswordType.PASSWORD
              ? "password"
              : "confirmPassword"
          }
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <button
          className="absolute right-6 px-4 text-gray-600" type="button"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </button>
      </div>
      {props.isInvalid && (
        <div className="label">
          <span className="label-text-alt text-red-500">
            {props.type === PasswordType.PASSWORD
              ? "Password should be at least 8 characters long"
              : "Passwords don't match"}
          </span>
        </div>
      )}
    </label>
  );
};
export default PasswordInput;
