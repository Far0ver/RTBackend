import jwt from "jsonwebtoken";
import key from "../config/key.js";

async function createNewToken(userId) {
  const payload = {
    userId: userId,
    // email: email,
  };
  const newToken = jwt.sign(payload, key.jwt_key, { expiresIn: "30d" });
  return newToken;
}

export default createNewToken