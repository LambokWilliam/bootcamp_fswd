const express = require('express');
const pool = require('../config.js');
const router = express.Router();
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const { authorization } = require('../middlewares/auth.js');
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

router.get('/users', authorization, (req, res, next) => {
  const { limit, page } = req.query;
  let limitResult = limit ? limit : DEFAULT_LIMIT;
  let pageResult = page ? page : DEFAULT_PAGE;

  const findQuery = `
        SELECT * FROM users
        LIMIT ${limitResult} OFFSET ${(pageResult - 1) * limitResult}
    `;
  pool.query(findQuery, (err, result) => {
    if (err) next(err);

    res.status(200).json(result.rows);
  });
});

router.get('/users/:id', authorization, (req, res, next) => {
  const { id } = req.params;

  const findQuery = `
        SELECT * FROM users
        WHERE id = $1
    `;

  pool.query(findQuery, [id], (err, result) => {
    if (err) next(err);
    if (result.rows.length === 0) {
      next({ name: 'ErrorNotFound' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  });
});

router.post('/users', authorization, (req, res, next) => {
  const { email, gender, password, role } = req.body;

  const hash = bcrypt.hashSync(password, salt);
  // Karena kolom id tidak auto increment maka cari id terakhir + 1
  const lastIdQuery = `
        SELECT id 
        FROM users 
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

router.put('/users/:id', authorization, (req, res, next) => {
  const { id } = req.params;
  const { email, gender, password, role } = req.body;

  const updateQuery = `
        UPDATE users
        SET email = $1,
            gender = $2,
            password = $3,
            role = $4
        WHERE users.id = $5
  `;

  pool.query(updateQuery, [email, gender, password, role, id], (err, result) => {
    if (err) next(err);

    res.status(200).json({
      message: 'Updated Successfully',
    });
  });
});

router.delete('/users/:id', authorization, (req, res, next) => {
  const { id } = req.params;
  const findQuery = `
        SELECT * FROM users
        WHERE id = $1
    `;

  pool.query(findQuery, [id], (err, result) => {
    if (err) next(err);

    if (result.rows[0]) {
      const deleteQuery = `
                DELETE from users
                WHERE id = $1
            `;
      pool.query(deleteQuery, [id], (err, result) => {
        if (err) next(err);

        res.status(200).json({
          message: 'Deleted Successfully',
        });
      });
    } else {
      next({ name: 'ErrorNotFound' });
    }
  });
});

module.exports = router;
