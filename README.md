# Orbit Fusion

Joc arcade cosmic realizat doar cu HTML, CSS, Canvas și JavaScript. Nu are backend și nu are costuri de rulare obligatorii.

## Rulare locală

```bash
npm install
npm run dev
```

Jocul va fi disponibil la `http://localhost:3000`.

## Publicare gratuită

### GitHub Pages — cea mai simplă variantă

1. Creează un repository public și urcă toate fișierele din acest folder în rădăcina lui.
2. În GitHub, deschide `Settings > Pages`.
3. La `Build and deployment`, alege `Deploy from a branch`, apoi ramura `main` și folderul `/ (root)`.
4. Salvează. GitHub va afișa adresa publică după publicare.

Nu este necesară nicio comandă de build.

### Cloudflare Pages — alternativă cu distribuție globală

1. Creează un proiect Pages conectat la repository.
2. Selectează `Framework preset: None`.
3. Lasă `Build command` gol și setează directorul de output la `.`.
4. Publică proiectul.

Fișierul `_headers` adaugă automat antete de securitate pe platformele care îl acceptă.

## Controale

- Desktop: `A` / `D` sau săgețile stânga / dreapta; `P`, `Space` sau `Escape` pentru pauză.
- Telefon și tabletă: butoanele vizibile de rotire, atingere pe jumătatea ecranului sau glisare circulară.

## Verificare înainte de publicare

```bash
npm run check
```

Testează cel puțin la 390 × 844, 768 × 1024 și 1440 × 900. Progresul rămâne local în browserul fiecărui jucător.
