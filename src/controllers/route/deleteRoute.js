import Route from '../../models/route.js';

async function deleteRoute(req, res) {
  try {
    // const routeId = req.params.id; 
    const { routeId } = req.body;
    const userId = req.user.id;

    const route = await Route.findById(routeId);

    if (!route) {
        return res.status(404).json({ message: 'Маршрут не найден' });
    }

    if (route.userId.toString() !== userId) {
        return res.status(401).json({ message: 'Маршрут принадлежит другому пользователю' });
    }

    await route.deleteOne();
    res.status(200).json({ message: 'Маршрут удален' }); 


    
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ message: 'Ошибка удаления маршрута' });
  }
}

export default deleteRoute;