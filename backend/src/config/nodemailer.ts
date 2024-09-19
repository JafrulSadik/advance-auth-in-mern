import { MailtrapTransport } from "mailtrap";
import nodemailer from "nodemailer";
import config from "./config";

const TOKEN = config.mailtrapToken as string;
const SENDER = config.mailtrapSender as string;

const transport = nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

const sender = {
  address: SENDER,
  name: "Auth Test",
};

interface Props {
  subject: string;
  template: string;
  email: string;
}

const sendMail = async (props: Props) => {
  const { subject, template, email } = props;
  const recipients = [email];
  try {
    await transport.sendMail({
      from: sender,
      to: recipients,
      subject: subject,
      html: template,
    });
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export default sendMail;
