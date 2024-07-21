import jwt from "jsonwebtoken";
import key from "../config/key.js";
import User from "../models/user.js";

async function removeExpiredTokens(userId) {
  try {
    const user = await User.findById(userId);

    const expiredTokens = await getExpiredTokens(user.tokens);

    if (expiredTokens.length > 0) {
      await User.findByIdAndUpdate(userId, {
        $pull: { tokens: { $in: expiredTokens } },
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Ошибка удаления истекших токенов:", error);
  }
}

async function getExpiredTokens(tokens) {
  const expiredTokens = [];
  for (const token of tokens) {
    if (await isTokenExpired(token)) {
      expiredTokens.push(token);
    }
  }
  return expiredTokens;
}

async function isTokenExpired(token) {
  try {
    const decoded = jwt.verify(token, key.jwt_key);
    //
    return false;
  } catch (error) {
    // если токен истек
    console.error("Ошибка проверки токена:", error);
    return true;
  }
}

async function removeNoValidTokens(userId) {
  try {
    const user = await User.findById(userId);

    const countTokens = user.tokens.length;
    if (countTokens > 4) {
      const isRemoveExpiredToken = await removeExpiredTokens(userId);

      if (!isRemoveExpiredToken) {
        await user.updateOne({ $set: { tokens: [] } });
      }
    }

    return true;
  } catch (error) {
    return { error: { status: 500, message: "Ошибка создания токена" } };
  }
}

export { removeNoValidTokens, isTokenExpired };
