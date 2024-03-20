import express, { Application } from "express";
import UserControllers from "./controllers/user";
import RoomControllers from "./controllers/room";
import { authenticateToken } from "./middleware/authen";
import MessageControllers from "./controllers/message";

const router = express.Router();

const AppRouter = (app: Application) => {
  // auth
  router.post("/auth/register", UserControllers.register);
  router.post("/auth/login", UserControllers.login);
  router.post("/auth/login-google", UserControllers.loginGoogle);
  router.post("/auth/login-github", UserControllers.loginGithub);

  //user
  router.get("/users", authenticateToken, UserControllers.getAll);
  router.delete("/users/:id", UserControllers.deleteUser);
  // room
  router.post("/rooms", authenticateToken, RoomControllers.get);
  router.get("/rooms", authenticateToken, RoomControllers.getAll);
  router.get("/rooms/info/:id", authenticateToken, RoomControllers.getInfo);

  // message
  router.post("/messages/:roomId", authenticateToken, MessageControllers.send);
  router.get("/messages/:roomId", authenticateToken, MessageControllers.getAll);

  router.get("*", (_, res) => {
    return res.status(404).json({
      statusCode: 404,
      message: "Not found endpoint!",
      data: null,
    });
  });

  return app.use("/api", router);
};

export default AppRouter;
