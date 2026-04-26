# aircool.net.pl

Witryna firmy F.H.U. Aircool Robert Szkliniarz — klimatyzacja i chłodnictwo, Rzezawa / Małopolska. Działa od 1997.

## Struktura repo

```
.
├── new_website/           # AKTUALNA wersja strony — to wrzucamy na FTP
│   ├── index.html         # Strona główna
│   ├── klimatyzacja-*.html # Podstrony miast (SEO)
│   ├── logo-options.html  # Podgląd 5 propozycji logo (do wyboru)
│   ├── assets/            # CSS, JS, obrazy, logo SVG
│   ├── sitemap.xml
│   ├── robots.txt
│   └── .htaccess          # Apache (cyberfolks używa Apache) — gzip, cache
├── archive/               # Stara wersja (Bootstrap 3, ~2022) — backup
└── .github/workflows/
    └── pages.yml          # Auto-deploy na GitHub Pages przy push do master
```

## Lokalny podgląd

```bash
cd new_website
python3 -m http.server 8000
# Otwórz http://localhost:8000
```

## Podgląd online (GitHub Pages)

Po pierwszym pushu trzeba jednorazowo włączyć Pages w ustawieniach repo:

1. https://github.com/kubaszkliniarz/aircool_website/settings/pages
2. Source: **GitHub Actions** (NIE „Deploy from a branch")
3. Zapisz

Każdy push do `master`, który zmienia coś w `new_website/`, automatycznie odpali workflow `.github/workflows/pages.yml` i opublikuje aktualną wersję pod adresem:

**https://kubaszkliniarz.github.io/aircool_website/**

Status workflow: https://github.com/kubaszkliniarz/aircool_website/actions

Można też ręcznie odpalić deploy z zakładki Actions → „Deploy new_website to GitHub Pages" → Run workflow.

## Deploy na produkcję (cyberfolks.pl)

Cyberfolks udostępnia hosting przez FTP/SFTP. Cała zawartość `new_website/` musi trafić do `public_html/` na serwerze.

### Pierwszy raz (publikacja nowej wersji)

1. Zaloguj się do panelu cyberfolks → FTP/SFTP credentials
2. Połącz się klientem FTP (FileZilla / Cyberduck / Transmit)
3. Na serwerze: zmień nazwę istniejącego `public_html/` na `public_html_old_backup/` (na wszelki wypadek)
4. Utwórz nowy pusty `public_html/`
5. Wgraj zawartość lokalnego `new_website/` (cały zawartość folderu, NIE sam folder) do `public_html/`
6. Otwórz https://aircool.net.pl — powinno się załadować

Struktura na serwerze powinna wyglądać tak:

```
public_html/
├── index.html
├── klimatyzacja-bochnia.html
├── klimatyzacja-brzesko.html
├── klimatyzacja-krakow.html
├── klimatyzacja-tarnow.html
├── sitemap.xml
├── robots.txt
├── favicon.ico
├── .htaccess              # ważne — z kropką na początku!
└── assets/
    ├── css/
    ├── js/
    └── img/
```

### Aktualizacje (kolejne razy)

Tylko zmienione pliki — zwykle wystarczy podmienić `index.html`, jakiś plik CSS lub obrazek. Nie trzeba uploadować całości.

### Rollback (jeśli coś pójdzie nie tak)

W panelu FTP zmień nazwę `public_html/` na `public_html_broken/`, a `public_html_old_backup/` z powrotem na `public_html/`. Strona wraca do poprzedniej wersji w ciągu sekund.

## Po publikacji — checklist SEO

- [ ] Zgłoś nowy `sitemap.xml` w Google Search Console: https://search.google.com/search-console
- [ ] Sprawdź / zaktualizuj wpis Google Business Profile: https://business.google.com (kategorie: „Air conditioning contractor", „HVAC contractor", obszary obsługi: Bochnia, Brzesko, Rzezawa, Kraków, Tarnów)
- [ ] Wgraj logo (kwadratowe SVG/PNG) do GBP jako zdjęcie profilowe
- [ ] Poproś 3–5 zadowolonych klientów o opinię w Google
- [ ] Zarejestruj firmę w lokalnych katalogach: panoramafirm.pl, pkt.pl, aleo.com
- [ ] Sprawdź pozycje na frazy: „klimatyzacja Bochnia", „klimatyzacja Brzesko", „klimatyzacja Rzezawa" w trybie incognito po ~2 tygodniach od publikacji

## Wybór logo

Otwórz `new_website/logo-options.html` w przeglądarce — zobaczysz 5 propozycji w wariantach poziomych i kwadratowych. Wybierz numer i podmień:

```bash
# Przykład: wybór opcji 3
cp new_website/assets/img/logo-options/03-pill-modern.svg new_website/assets/img/logo.svg
cp new_website/assets/img/logo-options/03-pill-modern-square.svg new_website/assets/img/logo-mark.svg
```

Albo poproś Claude'a, żeby to zrobił za Ciebie.
