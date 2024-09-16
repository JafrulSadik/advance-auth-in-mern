import dotenv from "dotenv";

dotenv.config();

const config = {
  saltRound: process.env.SALT_ROUND,
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET,
  env: process.env.ENV,
  mailtrapToken: process.env.MAILTRAP_TOKEN,
  mailtrapSender: process.env.MAILTRAP_SENDER,
};

export default Object.freeze(config);
