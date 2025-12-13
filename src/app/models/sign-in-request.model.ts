// src/app/models/sign-in-request.model.ts (recommended location)

export interface SignInRequest {
  /** The user's email address (must match @IsEmail validation in backend) */
  email: string;

  /** The user's password (minimum 6 characters as per backend validation) */
  password: string;
}
