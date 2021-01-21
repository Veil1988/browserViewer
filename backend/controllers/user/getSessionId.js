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
  // сгенерировал существующий ID
  if (generatedId in sessions && tryCount <= maxTryCount) {
    tryCount++;
    generateSessionId();
  }
  // истекло кол-во попыток
  if (generatedId in sessions && tryCount >= maxTryCount) {
    tryCount = 0;
    return null;
  }
  // удачно сгенерил ID сессии
  if (!(generatedId in sessions) && tryCount <= maxTryCount) {
    tryCount = 0;
    sessions[generatedId] = {
      status: "await",
      operatorId: null,
      messageToUser: null,
      messageToOperator: null,
    };
    return generatedId;
  }
};

module.exports = generateSessionId;
