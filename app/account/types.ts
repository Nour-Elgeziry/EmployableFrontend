export enum CardType {
  SIGN_IN = "signIn",
  SIGN_UP = "signUp",
}

export enum UserType {
  EMPLOYEE = "employee",
  EMPLOYER = "employer",
}

export interface EmployeeRegistrationUserInput {
  email: string;
  password: string;
}

export interface EmployerRegistrationUserInput
  extends EmployeeRegistrationUserInput {
  name: string;
  company: string;
  website: string;
}
