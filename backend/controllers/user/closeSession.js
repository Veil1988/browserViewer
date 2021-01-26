const sessions = require("./../../models/sessions");
let awaitSessionsList = require("./../../models/awaitSessionsList");

const closeSession = async (id) => {
  if (id in sessions) {
    const { status } = sessions[id];
    switch (status) {
      case "await":
        await delete awaitSessionsList[id];
        await delete sessions[id];
        return "closeOnlyUser";
      case "active":
        return "closeUserAndOperator";
      default:
        return "pes suka mraz";
    }
  } else {
    return false;
  }
};

module.exports = closeSession;
