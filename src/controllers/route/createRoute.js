import Route from "../../models/route.js";

async function createRoute(req, res) {
  try {
    const userId = req.user.id;
    const { name, points } = req.body;

    const newRoute = new Route({
      userId,
      name,
      points,
    });

    await newRoute.save();

    res.status(201).json({
      success: true,
      message: "Маршрут создан",
      route: newRoute,
    });
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ message: "Ошибка создания маршрута" });
  }
}

export default createRoute;
