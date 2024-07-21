import User from "../models/user.js";
import { removeNoValidTokens } from "../helpers/removeNoValidTokens.js";
import createNewToken from "../helpers/createNewToken.js";



async function createTokenMiddleware(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const userId = user._id

    if (!user) {
      return res.status(401).json({ message: `Пользователь не найден` });
    }

    await removeNoValidTokens(userId);
    
    const newToken = await createNewToken(userId);
    
    await user.updateOne({ $push: { tokens: newToken } });
    res.cookie("token", newToken, { maxAge: 2592000000, httpOnly: true });


    next(); 
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ message: "Ошибка создания токена" });
  }
}

export default createTokenMiddleware;
