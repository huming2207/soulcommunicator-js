import { DeviceListener } from "./listener";
import dotenv from "dotenv";

dotenv.config();

const listener = new DeviceListener("mqtt://127.0.0.1:1883", {
  username: process.env.SOUL_COMM_TEST_USERNAME as string,
  password: process.env.SOUL_COMM_TEST_PASSWORD as string,
});

await listener.startListen();
