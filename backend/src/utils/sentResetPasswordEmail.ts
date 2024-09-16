import sendMail from "../config/nodemailer";
import {
  resetPasswordEmailSubject,
  resetPasswordEmailTemplate,
} from "./verifyEmailTemplates";

interface Props {
  name: string;
  email: string;
  resetLink: string;
}

export const sentResetPassword = async (props: Props) => {
  const { name, email, resetLink } = props;
  try {
    const template = resetPasswordEmailTemplate(name, resetLink);

    await sendMail({
      subject: resetPasswordEmailSubject,
      template: template,
      email,
    });
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
