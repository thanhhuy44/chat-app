import express from "express";
import UserControllers from "../controllers/user.js";
import authMiddlwares from "../middlewares/auth.js";
const router = express.Router();

const routes = (app) => {
  router.post("/user/register", UserControllers.signUp);
  router.post("/user/login", UserControllers.logIn);
  router.post("/user/logout", UserControllers.logOut);
  router.post("/user/renew-token", UserControllers.getNewToken);
  router.get("/users", UserControllers.getAll);
  router.get("/search/user", UserControllers.searchUsers);

  router.get("*", (req, res) => {
    res.send("404: page not found");
  });

  return app.use("/api", router);
};

export default routes;
