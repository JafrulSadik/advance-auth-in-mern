export type UserType = {
  _id: string;
  email: string;
  password: string;
  name: string;
  lastLogin: Date;
  isVerified: boolean;
  resetPasswordToken: string | undefined;
  resetPasswordExpiresAt: Date | undefined;
  verificationToken: string | undefined;
  verificationTokenExpiresAt: Date | undefined;
};
