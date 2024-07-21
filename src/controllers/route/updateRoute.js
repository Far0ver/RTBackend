import Route from '../../models/route.js';

async function updateRoute(req, res) {
  try {
    // const routeId = req.params.id; 
    const { routeId } = req.body;
    const userId = req.user.id; 

    const { name, addressStartPoint, addressEndPoint, coordinatesStartPoint, coordinatesEndPoint } = req.body;

    const route = await Route.findById(routeId);

    if (!route) {
      return res.status(404).json({ message: 'Маршрут не найден' });
    }

    if (route.userId.toString() !== userId) {
      return res.status(401).json({ message: 'Маршрут принадлежит другому пользователю' });
    }

    route.name = name;
    route.data.addressStartPoint = addressStartPoint;
    route.data.addressEndPoint = addressEndPoint;
    route.data.coordinatesStartPoint = coordinatesStartPoint;
    route.data.coordinatesEndPoint = coordinatesEndPoint;

    await route.save();

    res.status(200).json({ 
        message: 'Маршрут обновлен', 
        route: route 
    });
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка обновления маршрута' });
  }
}

export default updateRoute;