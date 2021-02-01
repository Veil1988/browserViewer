/**
 * data structure
 * key:sessionId {
 *  operatorId: number | null,
 *  status: 'active' | 'await',
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
