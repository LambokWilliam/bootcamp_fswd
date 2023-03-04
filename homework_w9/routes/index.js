const express = require('express');
const router = express.Router();
const moviesRouter = require('./movies.js');
const usersRouter = require('./users.js');
const pool = require('../config.js');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const secretKey = 'secretoftheworld';
const { authentication } = require('../middlewares/auth.js');

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  const findUser = `
        SELECT * FROM users
        WHERE email = $1
    `;

  pool.query(findUser, [email], (err, result) => {
    if (err) next(err);

    if (result.rows.length === 0) {
      next({ name: 'ErrorNotFound' });
    } else {
      const data = result.rows[0];
      const comparePass = bcrypt.compareSync(password, data.password);

      if (comparePass) {
        const accessToken = jwt.sign(
          {
            id: data.id,
            email: data.email,
            gender: data.gender,
            role: data.role,
          },
          secretKey
        );
        res.status(200).json({
          id: data.id,
          email: data.email,
          gender: data.gender,
          role: data.role,
          accessToken: accessToken,
        });
      } else {
        next({ name: 'InvalidPassword' });
      }
    }
  });
});

router.post('/register', (req, res, next) => {
  const { email, gender, password, role } = req.body;

  const hash = bcrypt.hashSync(password, salt);
  // Karena kolom id tidak auto increment maka cari id terakhir + 1
  const lastIdQuery = `
        SELECT id FROM users 
        ORDER BY id DESC 
        LIMIT 1
      `;
  pool.query(lastIdQuery, (err, result) => {
    if (err) next(err);

    let lastId = 0;
    if (result.rows.length > 0) {
      lastId = result.rows[0].id;
    }

    const newId = lastId + 1;

    const insertQuery = `
          INSERT INTO users (email, gender, password, role, id)
              VALUES
              ($1, $2, $3, $4, $5)
        `;
    pool.query(insertQuery, [email, gender, hash, role, newId], (err, result) => {
      if (err) next(err);

      res.status(201).json({
        message: 'User Created Successfully',
      });
    });
  });
});

router.use(authentication);
router.use('/', moviesRouter);
router.use('/', usersRouter);

module.exports = router;
