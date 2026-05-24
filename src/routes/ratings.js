const express = require("express");
const router = express.Router();
const data = require("../data");

// ============================================
// HINNANGUTE MARSRUUDID
// POST /api/ratings        - lisa hinne
// GET  /api/ratings        - kõik hinnangud
// GET  /api/ratings/movie/:id - filmi hinnangud
// GET  /api/ratings/user/:id  - kasutaja hinnangud
// ============================================

// Autentimise abifunktsioon
function getUser(token) {
  const userId = data.sessions[token];
  if (!userId) return null;
  return data.users.find((u) => u.id === userId);
}

// Lisa hinne
router.post("/", (req, res) => {
  const token = req.headers.authorization;
  const user = getUser(token);

  if (!user) {
    return res.status(401).json({ error: "Pead olema sisse logitud" });
  }

  const { movieId, rating, comment } = req.body;

  if (!movieId || !rating) {
    return res.status(400).json({ error: "Vajalikud väljad: movieId, rating (1-5)" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Hinne peab olema 1-5" });
  }

  const movie = data.movies.find((m) => m.id === parseInt(movieId));
  if (!movie) {
    return res.status(404).json({ error: "Filmi ei leitud" });
  }

  // Uuenda olemasolevat või lisa uus
  const existingIndex = data.ratings.findIndex(
    (r) => r.movieId === parseInt(movieId) && r.userId === user.id
  );

  const ratingObj = {
    id: existingIndex >= 0 ? data.ratings[existingIndex].id : data.nextRatingId++,
    movieId: parseInt(movieId),
    userId: user.id,
    username: user.name,
    rating: parseInt(rating),
    comment: comment || "",
  };

  if (existingIndex >= 0) {
    data.ratings[existingIndex] = ratingObj;
    return res.json({ message: "Hinne uuendatud!", rating: ratingObj });
  }

  data.ratings.push(ratingObj);
  res.status(201).json({ message: "Hinne lisatud!", rating: ratingObj });
});

// Kõik hinnangud
router.get("/", (req, res) => {
  res.json({ ratings: data.ratings });
});

// Filmi hinnangud
router.get("/movie/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movieRatings = data.ratings.filter((r) => r.movieId === movieId);
  res.json({ ratings: movieRatings, count: movieRatings.length });
});

// Kasutaja hinnangud
router.get("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userRatings = data.ratings.filter((r) => r.userId === userId);
  res.json({ ratings: userRatings, count: userRatings.length });
});

module.exports = router;
