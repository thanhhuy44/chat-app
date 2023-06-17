import express from "express";
import UserControllers from "../controllers/user.js";
import authMiddlwares from "../middlewares/auth.js";
import ConversationControllers from "../controllers/conversation.js";
import MessagesControllers from "../controllers/message.js";
const router = express.Router();

const routes = (app) => {
  // Users
  router.post("/users/register", UserControllers.signUp);
  router.post("/users/login", UserControllers.logIn);
  router.post("/users/logout", UserControllers.logOut);
  router.get("/users", UserControllers.getAll);
  router.get(
    "/search/users",
    authMiddlwares.authenticateToken,
    UserControllers.searchUsers
  );

  //Conversations
  router.post(
    "/conversations/create",
    authMiddlwares.authenticateToken,
    ConversationControllers.createConversation
  );
  router.get(
    "/conversations/:user",
    authMiddlwares.authenticateToken,
    ConversationControllers.getConversationsOfUser
  );
  router.get(
    "/conversations/detail/:id",
    authMiddlwares.authenticateToken,
    ConversationControllers.getDetailConversation
  );

  //Messages

  router.post(
    "/messages/send",
    authMiddlwares.authenticateToken,
    MessagesControllers.createMessage
  );
  router.post(
    "/messages/seen",
    authMiddlwares.authenticateToken,
    MessagesControllers.seenMessage
  );
  router.get(
    "/messages/:conversationId",
    authMiddlwares.authenticateToken,
    MessagesControllers.getAllMessages
  );

  //another routes
  router.get("*", (req, res) => {
    res.send("404: page not found");
  });

  return app.use("/api", router);
};

export default routes;
