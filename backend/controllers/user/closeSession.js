const sessions = require("./../../models/sessions");

const closeSession = async (id) => {
  console.log("dasdas", id);
  if (id in sessions) {
    const { status } = sessions[id];
    console.log("---", sessions);
    switch (status) {
      case "await":
        await delete sessions[id];
        console.log("----", sessions);
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
