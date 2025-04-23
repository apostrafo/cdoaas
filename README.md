# CDOaaS-astro Projektas

## Apie projektą

CDO as a Service svetainė, sukurta naudojant Astro ir integruota su Decap CMS. Svetainė leidžia redaguoti turinį per administratoriaus sąsają, kuri pasiekiama per `/admin` kelią.

## Decap CMS konfigūracija

CMS naudoja OAuth autentifikaciją per GitHub, kas leidžia saugiai redaguoti turinį ir saugoti pakeitimus GitHub repozitorijoje.

### OAuth konfigūracija

1. Sukurkite GitHub OAuth aplikaciją:
   - GitHub > Settings > Developer Settings > OAuth Apps > New OAuth App
   - Application name: CDOaaS CMS
   - Homepage URL: https://jūsų-svetainė.lt
   - Authorization callback URL: https://jūsų-svetainė.lt/admin/oauth-callback

2. Netlify konfigūracija:
   - Netlify > Site Settings > Identity > Services > Enable Git Gateway
   - Įveskite GitHub Client ID ir Client Secret iš ankstesnio žingsnio

## Turinio struktūra

Svetainės turinys organizuojamas per `src/content` direktoriją su šiomis kolekcijomis:

- `about` - Apie mus puslapis
- `approach` - Mūsų požiūris puslapis
- `blog` - Blogas
- `services` - Paslaugų puslapis
- `case-studies` - Praktiniai pavyzdžiai
- `team` - Komandos nariai

## Astro konfigūracija

Astro projektas konfigūruojamas per `astro.config.mjs` failą. Yra pridėtas specialus konfigūravimas, kad Decap CMS veiktų sklandžiai.

## Daugiakalbystė

Svetainė palaiko lietuvių (numatytoji) ir anglų kalbas. Vertimai valdomi per CMS internacionalizacijos funkciją.

## Medijos failai

Medijos failai įkeliami į `public/uploads` direktoriją ir pasiekiami per `/uploads` kelią.

## Diegimas

```bash
# Įdiegti priklausomybes
npm install

# Paleisti vystymo serverį
npm run dev

# Sukurti produkcijai
npm run build

# Peržiūrėti produkcinę versiją
npm run preview
```
