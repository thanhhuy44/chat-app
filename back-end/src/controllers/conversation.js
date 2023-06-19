import Conversation from "../model/conversation.js";
import ConversationServices from "../services/conversation.js";
import jwt from "jsonwebtoken";

const create = async (req, res) => {
  const data = await ConversationServices.handleCreateConversation(req.body);
  return res.status(200).json(data);
};

const getHistory = async (req, res) => {
  const token = req.headers["authorization"];
  const info = jwt.decode(token);
  const data = await ConversationServices.handleGetHistoryChat(info.result._id);
  return res.status(200).json(data);
};

const getDetailByMembers = async (req, res) => {
  const token = req.headers["authorization"];
  const info = jwt.decode(token);
  const members = [req.query.guestId, info.result._id];
  const data = await ConversationServices.handleGetDetailConversationByMembers(
    members
  );
  return res.status(200).json(data);
};

const getDetailById = async (req, res) => {
  const data = await ConversationServices.handleGetDetailConversationById(
    req.params.id
  );
  return res.status(200).json(data);
};

const checkExistConversation = async (req, res) => {
  const data = await ConversationServices.handleCheckExistConversation(
    req.body.members
  );
  return res.status(200).json(data);
};

const ConversationControllers = {
  create,
  getHistory,
  getDetailByMembers,
  getDetailById,
  checkExistConversation,
};

export default ConversationControllers;
