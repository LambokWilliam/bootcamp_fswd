const express = require('express');
const pool = require('../config.js');
const router = express.Router();
const { authorization } = require('../middlewares/auth.js');
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

router.get('/movies', (req, res, next) => {
  const { limit, page } = req.query;
  let limitResult = limit ? limit : DEFAULT_LIMIT;
  let pageResult = page ? page : DEFAULT_PAGE;

  const findQuery = `
        SELECT * FROM movies
        LIMIT ${limitResult} OFFSET ${(pageResult - 1) * limitResult}
    `;
  pool.query(findQuery, (err, result) => {
    if (err) next(err);

    res.status(200).json(result.rows);
  });
});

router.get('/movies/:id', (req, res, next) => {
  const { id } = req.params;

  const findQuery = `
        SELECT * FROM movies
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

router.post('/movies', authorization, (req, res) => {
  const { title, genres, year } = req.body;
  // Karena kolom id tidak auto increment maka cari id terakhir + 1
  const lastIdQuery = `
      SELECT id 
      FROM movies 
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
        INSERT INTO movies (title, genres, year, id)
            VALUES
            ($1, $2, $3, $4)
      `;
    pool.query(insertQuery, [title, genres, year, newId], (err, result) => {
      if (err) next(err);

      res.status(201).json({
        message: 'Movie Created Successfully',
      });
    });
  });
});

router.put('/movies/:id', authorization, (req, res, next) => {
  const { id } = req.params;
  const { title, genres, year } = req.body;

  const updateQuery = `
        UPDATE movies
        SET title = $1,
            genres = $2,
            year = $3
        WHERE movies.id = $4
  `;

  pool.query(updateQuery, [title, genres, year, id], (err, result) => {
    if (err) next(err);

    res.status(200).json({
      message: 'Updated Successfully',
    });
  });
});

router.delete('/movies/:id', authorization, (req, res, next) => {
  const { id } = req.params;
  const findQuery = `
        SELECT * FROM movies
        WHERE id = $1
    `;

  pool.query(findQuery, [id], (err, result) => {
    if (err) next(err);

    if (result.rows[0]) {
      const deleteQuery = `
                DELETE from movies
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
