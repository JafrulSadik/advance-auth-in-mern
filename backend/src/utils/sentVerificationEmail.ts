import sendMail from "../config/nodemailer";
import { verifyEmailSubject, verifyEmailTemplate } from "./emailTemplates";

interface Props {
  name: string;
  email: string;
  code: string;
}

export const sentVerificationEmail = async (props: Props) => {
  const { name, email, code } = props;
  try {
    const template = verifyEmailTemplate(name, code);

    await sendMail({
      subject: verifyEmailSubject,
      template: template,
      email,
    });
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
