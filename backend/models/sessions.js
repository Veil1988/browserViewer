/**
 * data structure
 * key:sessionId {
 *  operatorId: number | null,
 *  status: 'ACTIVE' | 'AWAIT',
 *  messageToUser: [{
 *      type:
 *      data:
 *  }] | null,
 *  messageToOperator: [{
 *      type:
 *      data:
 * }] | null
 */
const sessions = {};

console.log("session", sessions);

module.exports = sessions;
