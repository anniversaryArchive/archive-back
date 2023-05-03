const jwt = require('jsonwebtoken');

function getUserId (context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.split('Bearer ')[1]
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  }
}

module.exports = getUserId;
