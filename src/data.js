// ============================================
// ANDMESALV
// Kõik andmed hoitakse mälus (andmebaasi pole)
// Rakenduse taaskäivitamisel andmed kaovad
// ============================================

const data = {
  users: [
    { id: 1, username: "mari", password: "1234", name: "Mari Maasikas" },
    { id: 2, username: "jaan", password: "1234", name: "Jaan Jansen" },
  ],

  movies: [
    { id: 1, title: "The Shawshank Redemption", genre: "draama", year: 1994, description: "Kaks vangi seovad aastakümnetepikkuse õnnetuse ja lunastuse ajal sõpruse." },
    { id: 2, title: "The Godfather", genre: "krimi", year: 1972, description: "Makaavli jõukas perekond juhib organiseeritud kuritegevuse impeeriumi." },
    { id: 3, title: "Inception", genre: "sci-fi", year: 2010, description: "Varas, kes varastab ettevõtte saladusi unenägude kaudu." },
    { id: 4, title: "The Dark Knight", genre: "action", year: 2008, description: "Batman seisab silmitsi Jokeriga, kes tahab Gotham City'sse kaose tuua." },
    { id: 5, title: "Pulp Fiction", genre: "krimi", year: 1994, description: "Omavahel põimuvad lood Los Angelese allmaailmast." },
    { id: 6, title: "Forrest Gump", genre: "draama", year: 1994, description: "Alabama mehe elulugu läbi USA ajaloo oluliste sündmuste." },
    { id: 7, title: "Interstellar", genre: "sci-fi", year: 2014, description: "Astronaudid otsivad uut kodu inimkonnale läbi ussiaugu." },
    { id: 8, title: "The Matrix", genre: "sci-fi", year: 1999, description: "Häkker avastab et reaalsus on arvutisimulatsioon." },
    { id: 9, title: "Goodfellas", genre: "krimi", year: 1990, description: "Mees tõuseb maffia ridadesse ja langeb alla." },
    { id: 10, title: "Fight Club", genre: "draama", year: 1999, description: "Unetu kontorimees loob põrandaaluse võitlusklubi." },
  ],

  ratings: [],

  sessions: {},

  nextUserId: 3,
  nextRatingId: 1,
};

module.exports = data;
