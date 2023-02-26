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
router.get('/category/:category_name', (req, res) => {
  const { category_name } = req.params;
  const findQuery = `
        SELECT
<<<<<<< HEAD
            *
        FROM film_category fc
            INNER JOIN category c
                ON fc.category_id = c.category_id
            INNER JOIN film f
                ON fc.film_id = f.film_id
            WHERE
                c.name = $1
            ORDER BY 
                f.film_id ASC
=======
            category.name AS category,
            film.title AS title
        FROM film
            INNER JOIN film_category
                ON film.film_id = film_category.film_id
            INNER JOIN category
                ON category.category_id = film_category.category_id
        ORDER BY 
            category ASC
>>>>>>> 0bb52b8b733d1d8683a09b759d032903e8b1dd75
    `;

  pool.query(findQuery, [category_name], (err, response) => {
    if (err) throw err;

    res.status(200).json(response.rows);
  });
});

module.exports = router;
