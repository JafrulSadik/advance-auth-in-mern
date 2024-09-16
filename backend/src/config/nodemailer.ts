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
const recipients = ["misuk.sarker100@gmail.com"];

const sendMail = async (message: string, subject: string) => {
  try {
    const info = await transport.sendMail({
      from: sender,
      to: recipients,
      subject: subject,
      text: "Congrats for sending test email with Mailtrap!",
      category: "Integration Test",
    });
  } catch (error) {
    throw new Error("Email sending unsuccessfull!");
  }
};

export default sendMail;
