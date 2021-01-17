const sessions = require("./../../models/sessions");

const minId = 100000;
const maxId = 999999;

let tryCount = 0;
const maxTryCount = 5;

// генерирует число в диапазоне
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// генератор ID сессий
const generateSessionId = () => {
  const generatedId = getRandomInt(minId, maxId);
  // сгенерировал существующий id
  if (generatedId in sessions && tryCount <= maxTryCount) {
    generateSessionId();
  }
  // истекло кол-во попыток
  if (generatedId in sessions && tryCount >= maxTryCount) {
    return null;
  }
  // удачно сгенерил id
  if (!(generatedId in sessions) && tryCount <= maxTryCount) {
    sessions[generatedId] = {
      status: "AWAIT",
      operatorId: null,
      messageToUser: null,
      messageToOperator: null,
    };
    console.log("session", sessions);
    return generatedId;
  }
};

module.exports = generateSessionId;
