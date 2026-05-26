# Filmid

Filmisoovituste veebirakendus.

## Tehnoloogiad

* **Node.js** ja **Express.js** (Backend)
* **MongoDB** ja **Mongoose** või **PostgreSQL** (Andmebaas)
* **JSON Web Token (JWT)** (Autentimine)

## Käivitamine

1. Klooni projekt oma masinasse:
   ```bash
   git clone [https://github.com/svnder/filmid-labor.git](https://github.com/svnder/filmid-labor.git)
Liigu projekti kausta:Bashcd filmid-labor
Installi vajalikud sõltuvused:Bashnpm install
Loo juurkataloogi .env fail ja lisa vajalikud keskkonnamuutujad (nt PORT=3000, andmebaasi URL, JWT salavõti).Käivita rakendus arendusrežiimis:Bashnpm run dev
APIKasutajadMeetodURLKirjeldusPOST/api/users/signupUue kasutaja registreerimine süsteemis.POST/api/users/loginKasutaja sisselogimine ja JWT tokeni genereerimine.POST/api/users/logoutKasutaja väljalogimine (sessiooni lõpetamine).GET/api/users/meAutenditud kasutaja profiiliandmete pärimine.GET/api/usersKõikide süsteemi kasutajate nimekirja pärimine.FilmidMeetodURLKirjeldusGET/api/moviesKõikide filmide nimekirja pärimine.GET/api/movies/:idKonkreetse filmi andmete pärimine unikaalse ID alusel.GET/api/movies/searchFilmide otsimine nime või märksõna järgi.GET/api/movies/genresKõikide saadaolevate filmižanrite nimekirja pärimine.GET/api/movies/genre/:genreFilmide nimekirja pärimine konkreetse žanri järgi.HinnangudMeetodURLKirjeldusPOST/api/ratingsUue hinnangu ja arvustuse lisamine filmile.GET/api/ratingsKõikide süsteemis antud hinnangute pärimine.GET/api/ratings/movie/:idKonkreetsele filmile antud kõikide hinnangute pärimine.GET/api/ratings/user/:idKonkreetse kasutaja poolt antud kõikide hinnangute pärimine.NäitedKasutajad:Bash# Registreerimine
curl -X POST http://localhost:3000/api/users/signup -H "Content-Type: application/json" -d '{"email":"kasutaja@test.ee", "password":"parool123"}'

# Sisselogimine
curl -X POST http://localhost:3000/api/users/login -H "Content-Type: application/json" -d '{"email":"kasutaja@test.ee", "password":"parool123"}'

# Väljalogimine
curl -X POST http://localhost:3000/api/users/logout -H "Authorization: Bearer <sinu_token>"

# Enda andmete pärimine
curl -X GET http://localhost:3000/api/users/me -H "Authorization: Bearer <sinu_token>"

# Kõikide kasutajate pärimine
curl -X GET http://localhost:3000/api/users -H "Authorization: Bearer <sinu_token>"
Filmid:Bash# Kõikide filmide pärimine
curl -X GET http://localhost:3000/api/movies

# Ühe filmi pärimine ID järgi
curl -X GET http://localhost:3000/api/movies/12345

# Filmi otsing (nt "Inception")
curl -X GET "http://localhost:3000/api/movies/search?q=Inception"

# Kõikide žanrite pärimine
curl -X GET http://localhost:3000/api/movies/genres

# Filmide filtreerimine žanri järgi
curl -X GET http://localhost:3000/api/movies/genre/Action
Hinnangud:Bash# Uue hinnangu lisamine
curl -X POST http://localhost:3000/api/ratings -H "Content-Type: application/json" -H "Authorization: Bearer <sinu_token>" -d '{"movieId": "12345", "score": 5, "comment": "Väga hea film!"}'

# Kõikide hinnangute pärimine
curl -X GET http://localhost:3000/api/ratings

# Kindla filmi hinnangute pärimine
curl -X GET http://localhost:3000/api/ratings/movie/12345

# Kindla kasutaja hinnangute pärimine
curl -X GET http://localhost:3000/api/ratings/user/67890
