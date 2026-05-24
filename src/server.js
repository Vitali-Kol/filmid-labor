const express = require("express");
const cors = require("cors");
const path = require("path");

const usersRouter = require("./routes/users");
const moviesRouter = require("./routes/movies");
const ratingsRouter = require("./routes/ratings");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// API marsruudid
app.use("/api/users", usersRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/ratings", ratingsRouter);

// Pealeht
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Filmide server jookseb: http://localhost:${PORT}`);
});
