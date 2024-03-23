export enum CardType {
  SIGN_IN = "signIn",
  SIGN_UP = "signUp",
}

export enum UserType {
  JOB_SEEKER = "jobSeeker",
  EMPLOYER = "employer",
}

export interface JobSeekerRegistrationUserInput {
  email: string;
  password: string;
}

export interface EmployerRegistrationUserInput
  extends JobSeekerRegistrationUserInput {
  name: string;
  company: string;
  website: string;
}
