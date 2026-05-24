# API testimine Thunder Clientiga

Thunder Client on tööriist mis laseb sul testida API päringuid otse VS Code'ist.
Sa näed päringuid ja vastuseid visuaalselt — ilma terminali käskudeta.

---

## Samm 1 — Paigalda VS Code

Kui VS Code ei ole paigaldatud:

1. Mine aadressile: **https://code.visualstudio.com**
2. Vajuta nuppu **Download**
3. Ava allalaaditud fail ja paigalda
4. Käivita VS Code

---

## Samm 2 — Paigalda Thunder Client

1. Ava VS Code
2. Kliki vasakul paneelil **Extensions** ikoonil (neli ruutu)
3. Kirjuta otsinguribale: `Thunder Client`
4. Vajuta **Install**
5. Pärast paigaldamist ilmub vasakule paneelile pikselabäikese ikoon

---

## Samm 3 — Käivita rakendus

Ava terminal ja:

```bash
cd ~/filmid-labor
docker compose up --build
```

Oota kuni terminal näitab:
```
filmid-labor  | Filmide server jookseb: http://localhost:3000
```

Kontrolli brauseris: **http://localhost:3000**

---

## Samm 4 — Loo esimene päring

Proovime näha kõiki filme.

1. Kliki VS Code vasakul paneelil **pikselabäikese ikoonil**
2. Vajuta **New Request**
3. Ilmub aken — täida nii:
   - **Meetod:** `GET` (jääb vaikimisi)
   - **URL:** `http://localhost:3000/api/movies`
4. Vajuta sinist nuppu **Send**
5. Paremas pooles näed vastust — filmide nimekiri

---

## Samm 5 — Sisselogimine

Mõned päringud vajavad tokenit. Token saadakse sisselogimisega.

1. Vajuta **New Request**
2. Muuda meetod **GET** pealt **POST** peale
3. URL: `http://localhost:3000/api/users/login`
4. Kliki **Body** sakile
5. Vali **JSON**
6. Kirjuta sisse:
```json
{
  "username": "mari",
  "password": "1234"
}
```
7. Vajuta **Send**
8. Vastuses näed `token` välja:
```json
{
  "token": "token_1_1748000000000"
}
```
9. **Kopeeri token väärtus** — seda läheb kohe vaja

---

## Samm 6 — Päring mis vajab tokenit

Näiteks — kes ma olen?

1. Vajuta **New Request**
2. Meetod: `GET`
3. URL: `http://localhost:3000/api/users/me`
4. Kliki **Headers** sakile
5. Vajuta **Add Header**
6. **Name:** `Authorization`
7. **Value:** kleebi siia oma token (samm 5-st)
8. Vajuta **Send**

Vastuses näed oma kasutaja infot.

---

## Kõik päringud

### Kasutajad

**Registreeru**
- Meetod: `POST`
- URL: `http://localhost:3000/api/users/signup`
- Body (JSON):
```json
{
  "name": "Sinu Nimi",
  "username": "sinunimi",
  "password": "1234"
}
```

**Logi sisse**
- Meetod: `POST`
- URL: `http://localhost:3000/api/users/login`
- Body (JSON):
```json
{
  "username": "mari",
  "password": "1234"
}
```

**Praegune kasutaja**
- Meetod: `GET`
- URL: `http://localhost:3000/api/users/me`
- Headers: `Authorization: SINU_TOKEN`

**Kõik kasutajad**
- Meetod: `GET`
- URL: `http://localhost:3000/api/users`

**Logi välja**
- Meetod: `POST`
- URL: `http://localhost:3000/api/users/logout`
- Headers: `Authorization: SINU_TOKEN`

---

### Filmid

**Kõik filmid**
- Meetod: `GET`
- URL: `http://localhost:3000/api/movies`

**Üks film**
- Meetod: `GET`
- URL: `http://localhost:3000/api/movies/1`
- Muuda `1` teiseks numbriks et näha teist filmi (1-10)

**Otsi filmi**
- Meetod: `GET`
- URL: `http://localhost:3000/api/movies/search?title=inception`
- Muuda `inception` teiseks otsisõnaks

**Kõik žanrid**
- Meetod: `GET`
- URL: `http://localhost:3000/api/movies/genres`

**Filmid žanri järgi**
- Meetod: `GET`
- URL: `http://localhost:3000/api/movies/genre/draama`
- Muuda `draama` teiseks žanriks: `krimi`, `sci-fi`, `action`

---

### Hinnangud

**Lisa hinne**
- Meetod: `POST`
- URL: `http://localhost:3000/api/ratings`
- Headers: `Authorization: SINU_TOKEN`
- Body (JSON):
```json
{
  "movieId": 1,
  "rating": 5,
  "comment": "Suurepärane film!"
}
```
- Muuda `movieId` (1-10) ja `rating` (1-5)

**Kõik hinnangud**
- Meetod: `GET`
- URL: `http://localhost:3000/api/ratings`

**Filmi hinnangud**
- Meetod: `GET`
- URL: `http://localhost:3000/api/ratings/movie/1`
- Muuda `1` filmi numbriga

**Kasutaja hinnangud**
- Meetod: `GET`
- URL: `http://localhost:3000/api/ratings/user/1`
- Muuda `1` kasutaja numbriga

---

## Probleemide lahendamine

**Vastus on "Could not connect"**

Rakendus ei jookse. Ava terminal:
```bash
cd ~/filmid-labor
docker compose up --build
```

**Vastus on 401 Unauthorized**

Token puudub või on vale. Logi uuesti sisse ja kopeeri token uuesti Headers sektsiooni.

**Vastus on 404 Not Found**

URL on vale. Kontrolli URL-i kirjavigu.

**Vastus on 400 Bad Request**

Body on vale. Kontrolli kas JSON on õige formaadis.
