import Route from "../../models/route.js";

async function findRoutes(req, res) {
  try {
    const userId = req.user.id;

    const routes = await Route.find({ userId });

    res.status(200).json({
      success: true,
      routes,
    });
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ message: "Ошибка получения списка маршрутов" });
  }
}

export default findRoutes;
