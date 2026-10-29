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

## Controale și Limbi (RO / EN)

- **Limbi disponibile**: Română (`RO`) și Engleză (`EN`), cu comutare instantanee din ecranul de start, din HUD-ul de joc sau din meniul de pauză (alegerea este salvată în `localStorage`).
- **Desktop**: `A` / `D` sau săgețile stânga / dreapta; `P`, `Space` sau `Escape` pentru pauză.
- **Telefon și tabletă**: butoanele vizibile de rotire, atingere pe jumătatea ecranului sau glisare circulară.

## Gameplay Infinit și Progresie Dinamică

- **Scalare asimptotică infinită**: viteza sferelor și ritmul de apariție cresc progresiv odată cu nivelul, păstrând un prag fizic echitabil și unghiuri controlate pentru sesiuni oricât de lungi.
- **Sfere Speciale**:
  - **Sferă Prismă (★)**: wildcard cromatic ce se potrivește cu orice segment (sau inițiază un segment gol) și repară scutul.
  - **Sferă Chrono (⧗)**: activează dilatarea temporală (încetinește sferele în zbor) și regenerează stabilitatea scutului.
- **Regenerare prin îndemânare**: alinierile perfecte (`PERFECT`), fuziunile în lanț și exploziile `SUPERNOVA` (nivelul 6) refac stabilitatea scutului.

## Verificare înainte de publicare

```bash
npm run check
```

Testează cel puțin la 390 × 844, 768 × 1024 și 1440 × 900. Progresul rămâne local în browserul fiecărui jucător.

## Confort și accesibilitate

- Prima vizită urmărește tema dispozitivului. Paletele luminoasă și întunecată sunt disponibile fără deblocare, cu comutare rapidă printr-un singur click; alegerea explicită se păstrează.
- Muzica este sintetizată local, cu tonalitate aleatorie la fiecare încărcare. Pornește după interacțiune; volumul zero oprește muzica și se păstrează. Butonul de sunet oprește și muzica. Ascunderea filei suspendă sunetul.
- Rotirea ține cont de timpul dintre cadre. Menținerea tastei de pauză nu comută repetat jocul. Tremurul ecranului este oprit implicit.
- Test de browser: `node .audit/playtest.cjs`, cu Playwright și Microsoft Edge disponibile.
