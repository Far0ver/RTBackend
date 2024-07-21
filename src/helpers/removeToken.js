import User from "../models/user.js";

async function removeToken(userId, token) {
  try {
    await User.findByIdAndUpdate(userId, { $pull: { tokens: token } });

    return true;
  } catch (error) {
    console.error("Ошибка удаления токена", error);
    return false;
  }
}

export default removeToken;
