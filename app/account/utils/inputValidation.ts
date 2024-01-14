export enum ValidationError {
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
  NULL = "null",
}

export interface ValidationResult {
  isValid: boolean;
  error: ValidationError;
}

function validateEmail(email: string): ValidationResult {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return {
    isValid: re.test(email),
    error: ValidationError.EMAIL,
  };
}

function validatePassword(password: string): ValidationResult {
  return {
    isValid: password.length >= 8,
    error: ValidationError.PASSWORD,
  };
}

function validateConfirmPassword(
  password: string,
  confirmPassword: string
): ValidationResult {
  return {
    isValid: password === confirmPassword,
    error: ValidationError.CONFIRM_PASSWORD,
  };
}

export function validateEmailAndConfirmPassword(
  email: string,
  password: string,
  confirmPassword: string
) {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  const confirmPasswordValidation = validateConfirmPassword(
    password,
    confirmPassword
  );

  const result = [
    emailValidation,
    passwordValidation,
    confirmPasswordValidation,
  ];

  return {
    isValid: result.every((validation) => validation.isValid),
    error: result
      .filter((validation) => !validation.isValid)
      .map((validation) => validation.error),
  };
}
