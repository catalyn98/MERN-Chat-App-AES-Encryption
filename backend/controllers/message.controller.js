import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { performance } from "perf_hooks";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    // Începutul măsurării timpului pentru criptarea mesajului
    const startEncrypt = performance.now();
    // Criptează mesajul înainte de salvare
    newMessage.encryptMessage();
    // Sfârșitul măsurării timpului pentru criptarea mesajului
    const endEncrypt = performance.now();
    console.log(
      `Timpul necesar pentru criptarea mesajului: ${
        endEncrypt - startEncrypt
      }ms`
    );
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    // Începutul măsurării timpului pentru decriptarea mesajului
    const startDecrypt = performance.now();
    // Decriptează mesajul pentru a-l trimite prin socket
    newMessage.decryptMessage();
    // Sfârșitul măsurării timpului pentru decriptarea mesajului
    const endDecrypt = performance.now();
    console.log(
      `Timpul necesar pentru decriptarea mesajului: ${
        endDecrypt - startDecrypt
      }ms`
    );
    console.log(
      "_________________________________________________________________________"
    );
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages.map((message) => {
      // Decriptează fiecare mesaj înainte de a-l returna
      message.decryptMessage();
      return message;
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
