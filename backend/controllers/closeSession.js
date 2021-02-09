const sessions = require("./../models/sessions");
let awaitSessionsList = require("./../models/awaitSessionsList");
const e = require("express");

const closeSession = async (id, userType) => {
  if (id in sessions) {
    const { status } = sessions[id];
    const index = awaitSessionsList.indexOf(id);
    if (userType === "user") {
      switch (status) {
        case "await":
          // удаление из массива активных сессий в статусе await

          if (index > -1) {
            awaitSessionsList.splice(index, 1);
          }
          await delete sessions[id];
          return "closeOnlyUser";
        case "active":
          // хз корректно или нет
          if (index > -1) {
            awaitSessionsList.splice(index, 1);
          }
          await delete sessions[id];
          return "closeUserAndOperator";
        default:
          return "pes suka mraz";
      }
    } else {
      switch (status) {
        case "active":
          // хз корректно или нет
          if (index > -1) {
            awaitSessionsList.splice(index, 1);
          }
          await delete sessions[id];
          return "closeUserAndOperator";
        default:
          return "pes suka mraz";
      }
    }
  } else {
    return false;
  }
};

module.exports = closeSession;
