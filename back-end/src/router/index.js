import express from "express";
import UserControllers from "../controllers/user.js";
import authMiddlwares from "../middlewares/auth.js";
import ConversationControllers from "../controllers/conversation.js";
import MessagesControllers from "../controllers/message.js";
import chatAIControllers from "../controllers/chatGPT.js";
import chatBardControllers from "../controllers/chatBard.js";
import sse from "../controllers/sse.js";
const router = express.Router();

const routes = (app) => {
  // Users
  router.post("/users/register", UserControllers.register);
  router.post("/users/login", UserControllers.login);
  router.get(
    "/users",
    authMiddlwares.authenticateToken,
    UserControllers.getAll
  );
  router.get(
    "/users/:id",
    authMiddlwares.authenticateToken,
    UserControllers.getUser
  );

  router.post("/users/renew-token", UserControllers.renewToken);

  //Conversations
  router.post(
    "/conversations/create",
    authMiddlwares.authenticateToken,
    ConversationControllers.create
  );
  router.get(
    "/conversations",
    authMiddlwares.authenticateToken,
    ConversationControllers.getHistory
  );
  router.get(
    "/conversations/detail/by-guest",
    authMiddlwares.authenticateToken,
    ConversationControllers.getDetailByMembers
  );
  router.get(
    "/conversations/detail/:id",
    authMiddlwares.authenticateToken,
    ConversationControllers.getDetailById
  );

  //Messages
  router.post(
    "/messages/send",
    authMiddlwares.authenticateToken,
    MessagesControllers.send
  );
  router.post(
    "/messages/send/new",
    authMiddlwares.authenticateToken,
    MessagesControllers.sendNew
  );
  router.post(
    "/messages/seen",
    authMiddlwares.authenticateToken,
    MessagesControllers.seen
  );
  router.get(
    "/messages/:conversationId",
    authMiddlwares.authenticateToken,
    MessagesControllers.getAllMessages
  );
  //chat AI
  router.post("/chat-gpt", chatAIControllers.chatAI);

  // chat Bard
  router.post("/chat-bard", chatBardControllers.askBard);

  //sse
  router.get("/sse", sse);

  //another routes
  router.get("*", (req, res) => {
    res.send("404: page not found");
  });

  return app.use("/api", router);
};

export default routes;
