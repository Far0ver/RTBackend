import removeToken from "../../helpers/removeToken.js";

async function logout(req, res) {
  try {
    const userId = req.user.id;
    const token = req.cookies.token;

    await removeToken(userId, token);

    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Выход успешный",
    });
  } catch (error) {
    console.error("Ошибка при выходе:", error);
    res.status(500).json({ message: "Ошибка при выходе" });
  }
}

export default logout;
