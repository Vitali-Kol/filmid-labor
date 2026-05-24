# API testimine Thunder Clientiga

Thunder Client on tööriist mis laseb sul testida API päringuid otse VS Code'ist.
See on lihtsam alternatiiv terminali käskudele.

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
2. Vajuta vasakul paneelil **Extensions** ikoonile (neli ruutu)
3. Otsinguribale kirjuta: `Thunder Client`
4. Vajuta **Install**
5. Pärast paigaldamist ilmub vasakule paneelile pikselabäikese ikoon

---

## Samm 3 — Käivita rakendus

Enne testimist peab rakendus jooksma. Ava terminal ja:

```bash
cd ~/filmid-labor
docker compose up --build
```

Oota kuni terminal näitab:
```
filmid-labor  | Filmide server jookseb: http://localhost:3000
```

Ava brauser ja kontrolli: **http://localhost:3000**

---

## Samm 4 — Impordi kollektsioon

Kollektsioon on valmis päringute kogum. Sa ei pea neid käsitsi looma.

1. Kliki VS Code vasakul paneelil **pikselabäikese ikoonil** (Thunder Client)
2. Vajuta **Collections** sakile
3. Vajuta kolme punkti ikoonile (`...`) Collections pealkirja kõrval
4. Vali **Import**
5. Vali fail `thunder-collection.json` (see on filmid-labor kaustas)
6. Vajuta **Open**

Nüüd näed vasakul kolme kausta: **Kasutajad**, **Filmid**, **Hinnangud**

---

## Samm 5 — Esimene päring

Proovime kõigepealt kõiki filme näha.

1. Ava kaust **Filmid**
2. Kliki **Kõik filmid**
3. Vajuta sinist nuppu **Send**
4. Paremas pooles näed vastust — JSON formaadis filmide nimekiri

Kui näed vastust — toimib!

---

## Samm 6 — Sisselogimine

Mõned päringud vajavad tokenit. Token saadakse sisselogimisega.

1. Ava kaust **Kasutajad**
2. Kliki **Logi sisse**
3. Vaata Body sektsiooni — seal on:
```json
{
  "username": "mari",
  "password": "1234"
}
```
4. Vajuta **Send**
5. Vastuses näed `token` välja, näiteks:
```json
{
  "token": "token_1_1748000000000"
}
```
6. **Kopeeri token väärtus** (ainult tekst, ilma jutumärkideta)

---

## Samm 7 — Tokeni kasutamine

Mõned päringud vajavad tokenit. Näiteks hinde andmine.

1. Ava kaust **Hinnangud**
2. Kliki **Lisa hinne**
3. Vajuta **Headers** sakile
4. Näed rida `Authorization` — seal on `ASENDA_SIIA_TOKEN`
5. **Asenda see oma tokeniga** (kopeeri samm 6-st)
6. Vajuta **Send**

Kui vastuses on `"message": "Hinne lisatud!"` — õnnestus!

---

## Kõik päringud

### Kasutajad

| Päring | Meetod | Vajab tokenit |
|--------|--------|---------------|
| Registreeru | POST | Ei |
| Logi sisse | POST | Ei |
| Praegune kasutaja | GET | Jah |
| Kõik kasutajad | GET | Ei |
| Logi välja | POST | Jah |

### Filmid

| Päring | Meetod | Kirjeldus |
|--------|--------|-----------|
| Kõik filmid | GET | Tagastab kõik filmid koos keskmise reitinguga |
| Üks film (ID järgi) | GET | Tagastab ühe filmi — muuda URL-is number |
| Otsi filmi | GET | Otsi pealkirja järgi — muuda `title=inception` |
| Kõik žanrid | GET | Tagastab kõik olemasolevad žanrid |
| Filmid žanri järgi | GET | Muuda URL-is `draama` teiseks žanriks |

### Hinnangud

| Päring | Meetod | Vajab tokenit |
|--------|--------|---------------|
| Lisa hinne | POST | Jah |
| Kõik hinnangud | GET | Ei |
| Filmi hinnangud | GET | Ei — muuda URL-is number |
| Kasutaja hinnangud | GET | Ei — muuda URL-is number |

---

## Päringute muutmine

### Filmi ID muutmine

Vaikimisi on filmide URL `http://localhost:3000/api/movies/1` — see on film nr 1.

Et näha filmi nr 3, muuda URL-is number:
```
http://localhost:3000/api/movies/3
```

### Otsingu muutmine

Vaikimisi otsib päring `inception`. Et otsida teist filmi:
```
http://localhost:3000/api/movies/search?title=matrix
```

### Žanri muutmine

Vaikimisi on žanr `draama`. Et näha krimi filme:
```
http://localhost:3000/api/movies/genre/krimi
```

Olemasolevad žanrid: `draama`, `krimi`, `sci-fi`, `action`

---

## Probleemide lahendamine

**Vastus on `Could not connect`**

Rakendus ei jookse. Käivita terminal ja:
```bash
cd ~/filmid-labor
docker compose up --build
```

**Vastus on `401 Unauthorized`**

Token puudub või on vale. Logi uuesti sisse ja kopeeri token uuesti.

**Vastus on `404 Not Found`**

URL on vale või ID ei eksisteeri. Kontrolli URL-i.

**Ei näe Thunder Clienti VS Code-is**

Otsi Extensions menüüst `Thunder Client` ja paigalda uuesti.
