const pool = require('./config.js');
const express = require('express');
const router = express.Router();

// Menampilkan data seluruh list film
router.get('/film', (req, res) => {
  const findQuery = `
        SELECT * FROM film_list
    `;

  pool.query(findQuery, (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows);
  });
});

// Menampilkan data film tertentu berdasarkan id
router.get('/film/:id', (req, res) => {
  const { id } = req.params;

  const findQuery = `
        SELECT 
            * 
        FROM film_list
            WHERE fid = $1
  `;

  pool.query(findQuery, [id], (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows[0]);
  });
});

// Menampilkan data list category
router.get('/category', (req, res) => {
  const findQuery = `
        SELECT * FROM category
    `;
  pool.query(findQuery, (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows);
  });
});

// Menampilkan data list film berdasarkan category
router.get('/filmbycategory', (req, res) => {
  const findQuery = `
        SELECT
            film_list.category AS category,
            film_list.title AS title
        FROM
            film_list
        ORDER BY
            category ASC
    `;

  pool.query(findQuery, (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows);
  });
});

module.exports = router;
