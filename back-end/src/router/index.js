import express from 'express';
import UserControllers from '../controllers/user.js';
import authMiddlwares from '../middlewares/auth.js';
const router = express.Router();

const routes = (app) => {
  router.post('/user/register', UserControllers.signUp);
  router.post('/user/login', UserControllers.logIn);
  router.post(
    '/user/logout',
    authMiddlwares.authenticateToken,
    UserControllers.logOut
  );
  router.post(
    '/user/renew-token',
    authMiddlwares.authenticateRefreshToken,
    UserControllers.getNewToken
  );
  router.get(
    '/users',
    authMiddlwares.authenticateToken,
    UserControllers.getAll
  );
  router.get(
    '/search/user',
    authMiddlwares.authenticateToken,
    UserControllers.searchUsers
  );

  router.get('*', (req, res) => {
    res.send('404: page not found');
  });

  return app.use('/api', router);
};

export default routes;
