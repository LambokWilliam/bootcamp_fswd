const jwt = require('jsonwebtoken');
const secretKey = 'secretoftheworld';
const pool = require('../config.js');

function authentication(req, res, next) {
  const { access_token } = req.headers;

  if (access_token) {
    try {
      const decodeToken = jwt.verify(access_token, secretKey);
      const { id, email, gender, role } = decodeToken;
      const findUser = `
        SELECT * FROM users
        WHERE id = $1
      `;

      pool.query(findUser, [id], (err, result) => {
        if (err) next(err);

        if (result.rows.length === 0) {
          next({ name: 'ErrorNotFound' });
        } else {
          const user = result.rows[0];

          req.userData = {
            id: user.id,
            email: user.email,
            gender: user.gender,
            role: user.role,
          };
          next();
        }
      });
    } catch (err) {
      next({ name: 'JwtError' });
    }
  } else {
    next({ name: 'Unauthenticated' });
  }
}

function authorization(req, res, next) {
  const { role, email, gender, id } = req.userData;

  if (role === 'Admin') {
    next();
  } else {
    next({ name: 'Unauthorized' });
  }
}

module.exports = {
  authentication,
  authorization,
};
