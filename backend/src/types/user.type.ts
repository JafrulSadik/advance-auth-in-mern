export type UserType = {
  _id: string;
  email: string;
  password: string;
  name: string;
  lastLogin: Date;
  isVerified: boolean;
  resetPasswordToken: string;
  resetPasswordExpiresAt: Date;
  verificationToken: string | undefined;
  verificationTokenExpiresAt: Date | undefined;
};
