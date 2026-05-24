const express = require("express");
const router = express.Router();
const data = require("../data");

// ============================================
// FILMIDE MARSRUUDID
// GET /api/movies          - kõik filmid
// GET /api/movies/:id      - üks film
// GET /api/movies/search   - otsing
// GET /api/movies/genre/:genre - žanri järgi
// ============================================

// Kõik filmid (koos keskmise reitinguga)
router.get("/", (req, res) => {
  const movies = data.movies.map((movie) => {
    const movieRatings = data.ratings.filter((r) => r.movieId === movie.id);
    const avgRating =
      movieRatings.length > 0
        ? Math.round((movieRatings.reduce((sum, r) => sum + r.rating, 0) / movieRatings.length) * 10) / 10
        : null;

    return { ...movie, avgRating, ratingCount: movieRatings.length };
  });

  res.json({ movies });
});

// Otsing — peab olema ENNE /:id
router.get("/search", (req, res) => {
  const { title, genre } = req.query;

  if (!title && !genre) {
    return res.status(400).json({ error: "Lisa parameeter ?title=... või ?genre=..." });
  }

  let results = data.movies;

  if (title) {
    results = results.filter((m) => m.title.toLowerCase().includes(title.toLowerCase()));
  }

  if (genre) {
    results = results.filter((m) => m.genre.toLowerCase() === genre.toLowerCase());
  }

  res.json({ results, count: results.length });
});

// Kõik žanrid
router.get("/genres", (req, res) => {
  const genres = [...new Set(data.movies.map((m) => m.genre))];
  res.json({ genres });
});

// Žanri järgi
router.get("/genre/:genre", (req, res) => {
  const genre = req.params.genre.toLowerCase();
  const movies = data.movies.filter((m) => m.genre.toLowerCase() === genre);

  if (movies.length === 0) {
    return res.status(404).json({ error: "Selle žanriga filme ei leitud" });
  }

  res.json({ movies, count: movies.length });
});

// Üks film
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = data.movies.find((m) => m.id === id);

  if (!movie) {
    return res.status(404).json({ error: "Filmi ei leitud" });
  }

  const movieRatings = data.ratings.filter((r) => r.movieId === id);
  const avgRating =
    movieRatings.length > 0
      ? Math.round((movieRatings.reduce((sum, r) => sum + r.rating, 0) / movieRatings.length) * 10) / 10
      : null;

  res.json({ ...movie, avgRating, ratingCount: movieRatings.length, ratings: movieRatings });
});

module.exports = router;
