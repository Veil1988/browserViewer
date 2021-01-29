const sessions = require("./../../models/sessions");

const setMessageToUser = (props) => {
  const { message, messageType, sessionId, cbRes } = props;
  if (sessionId in sessions) {
    try {
      Object.keys(message).map((key) => {
        sessions[sessionId][key] = message[key];
      });
      cbRes.status(200).send({ message: "success action" });
    } catch (error) {
      cbRes.status(400).send({ message: "error action from setMessageToUser" });
    }
  }
};

module.exports = setMessageToUser;
