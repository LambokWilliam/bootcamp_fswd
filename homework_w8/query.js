const pool = require('./config.js');
const express = require('express');
const router = express.Router();

// Menampilkan data seluruh list film
router.get('/film', (req, res) => {
  const findQuery = `
        SELECT * FROM film
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
        FROM film
            WHERE film_id = $1
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
            category.name AS category,
            film.title AS title
        FROM film
            INNER JOIN film_category
                ON film.film_id = film_category.film_id
            INNER JOIN category
                ON category.category_id = film_category.category_id
        ORDER BY 
            category ASC
    `;

  pool.query(findQuery, (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows);
  });
});

module.exports = router;
