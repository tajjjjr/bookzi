import axios from "axios";
import jwt from "jsonwebtoken";

export default async function sendCallback(url: string, payload: object, secret: string): Promise<void> {
  const token = jwt.sign(payload, secret, { expiresIn: "5m" });

  await axios.post(url, {
    payload,
    signature: token,
  });
}