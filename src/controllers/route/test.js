import Route from "../../models/route.js";

async function newRoutes(req, res) {
  const newRoute = new Route({
    userId: "66686bc6a80465247dafb562",
    name: "Домой",
    data: {
      addressStartPoint: "ул. Кирова, д. 6",
      addressEndPoint: "ул. Кирова, д. 32",
      coordinatesStartPoint: [131.912075, 43.171974],
      coordinatesEndPoint: [131.910991, 43.167785],
    },
  });

  // Сохранение маршрута в базе данных
  newRoute.save();

  // Поиск маршрутов по userId
  Route.find({ userId: "66686bc6a80465247dafb562" });
  res.status(200).json({
    success: true,
  });
}
export default newRoutes;
