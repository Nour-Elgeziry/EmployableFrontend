export enum ValidationError {
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
  WEBSITE = "website",
  NAME = "name",
  COMPANY = "company",
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

function validateWebsite(website: string): ValidationResult {
  const regex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return {
    isValid: regex.test(website),
    error: ValidationError.WEBSITE,
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

export function validateUserInput(
  email: string,
  password: string,
  confirmPassword: string,
  name?: string,
  company?: string,
  website?: string
) {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  const confirmPasswordValidation = validateConfirmPassword(
    password,
    confirmPassword
  );

  const websiteValidation =
    website != undefined
      ? validateWebsite(website)
      : {
          isValid: true,
          error: ValidationError.NULL,
        };

  const nameValidation =
    name != undefined
      ? {
          isValid: name.length > 0,
          error: ValidationError.NAME,
        }
      : {
          isValid: true,
          error: ValidationError.NAME,
        };

  const companyValidation =
    company != undefined
      ? {
          isValid: company.length > 0,
          error: ValidationError.COMPANY,
        }
      : {
          isValid: true,
          error: ValidationError.COMPANY,
        };

  const result = [
    emailValidation,
    passwordValidation,
    confirmPasswordValidation,
    websiteValidation,
    nameValidation,
    companyValidation,
  ];

  return {
    isValid: result.every((validation) => validation.isValid),
    error: result
      .filter((validation) => !validation.isValid)
      .map((validation) => validation.error),
  };
}
