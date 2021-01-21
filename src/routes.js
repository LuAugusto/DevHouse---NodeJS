import { Router } from 'express';
import multer from 'multer';
import SessionController from './Controllers/SessionController';
import HouseController from './Controllers/HouseController';
import uploadconfig from './config/upload';
import DashboardController from './Controllers/DashboardController';
import ReserveController from './Controllers/ReserveController';

const routes = new Router();
const upload = multer(uploadconfig);

routes.post('/sessions', SessionController.store);
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put(
      '/houses/:house_id',
      upload.single('thumbnail'),
      HouseController.update
);
routes.delete('/houses', HouseController.destroy);
routes.get('/dashboard', DashboardController.show);
routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves', ReserveController.index);
routes.delete('/reserves/cancel', ReserveController.destroy);

export default routes;
/* export sem sucrase
module.exports = routes;
*/
