import { Message } from '../dao';

function saveMessage(user, message) {
  const newMessage = new Message({ user, message });
  return newMessage.save();
}

function getAllMessages() {
  return Message.find();
}

export { saveMessage, getAllMessages };
