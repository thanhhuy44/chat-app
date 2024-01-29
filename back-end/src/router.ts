import express, { Application } from 'express';
import UserControllers from './controllers/user';
import RoomControllers from './controllers/room';
import { authenticateToken } from './middleware/authen';
import MessageControllers from './controllers/message';

const router = express.Router();

const AppRouter = (app: Application) => {
  // auth
  router.post('/auth/register', UserControllers.register);
  router.post('/auth/login', UserControllers.login);

  // room
  router.post('/rooms', RoomControllers.get);

  // message
  router.post('/messages/:roomId', MessageControllers.send);

  router.get('*', (_, res) => {
    return res.status(404).json({
      statusCode: 404,
      message: 'Not found endpoint!',
      data: null,
    });
  });

  return app.use('/api', router);
};

export default AppRouter;
