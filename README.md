# aircool.net.pl

Witryna firmy F.H.U. Aircool Robert Szkliniarz - klimatyzacja i chłodnictwo, Rzezawa / Małopolska. Działa od 1997.

## Struktura repo

```
.
├── public_html/           # AKTUALNA wersja strony - to wrzucamy 1:1 na FTP do public_html/
│   ├── index.html         # Strona główna
│   ├── klimatyzacja-*.html # Podstrony miast i usług (SEO)
│   ├── logo-options.html  # Podgląd propozycji logo
│   ├── assets/            # CSS, JS, obrazy, logo SVG
│   ├── sitemap.xml
│   ├── robots.txt
│   ├── favicon.ico
│   └── .htaccess          # Apache (cyberfolks używa Apache) - gzip, cache, security
├── archive/               # Archiwum starych wersji
│   ├── public_html_2022/  # Stara wersja Bootstrap z 2022
│   ├── public_html_archive/ # Snapshot starej wersji ściągnięty z FTP przed deployem
│   ├── original_index.html
│   ├── sitemap.xml
│   └── README.md
└── .github/workflows/
    └── pages.yml          # Auto-deploy na GitHub Pages przy push do master
```

Nazwa folderu `public_html/` jest celowa - to dokładnie ten sam folder, który istnieje na cyberfolks. Dzięki temu SFTP sync (np. z VSCode SFTP extension) jest 1:1.

## Lokalny podgląd

```bash
cd public_html
python3 -m http.server 8000
# Otwórz http://localhost:8000
```

## Podgląd online (GitHub Pages)

Każdy push do `master`, który zmienia coś w `public_html/`, automatycznie odpala workflow `.github/workflows/pages.yml` i publikuje aktualną wersję pod adresem:

**https://kubaszkliniarz.github.io/aircool_website/**

Status workflow: https://github.com/kubaszkliniarz/aircool_website/actions

Można też ręcznie odpalić deploy z zakładki Actions → "Deploy public_html to GitHub Pages" → Run workflow.

## Deploy na produkcję (cyberfolks.pl)

Cyberfolks udostępnia hosting przez FTP/SFTP. Cała zawartość `public_html/` musi trafić do `public_html/` na serwerze. Ponieważ nazwy folderów są takie same, sync jest 1:1.

### Pierwszy raz (publikacja nowej wersji)

1. Zaloguj się do panelu cyberfolks - FTP/SFTP credentials
2. Połącz się klientem FTP (FileZilla / Cyberduck / Transmit / VSCode SFTP extension)
3. Na serwerze: zmień nazwę istniejącego `public_html/` na `public_html_old_backup/` (na wszelki wypadek)
4. Utwórz nowy pusty `public_html/` na serwerze
5. Wgraj zawartość lokalnego `public_html/` (cały zawartość folderu, NIE sam folder) do `public_html/` na serwerze
6. Otwórz https://aircool.net.pl - powinno się załadować

### Aktualizacje (kolejne razy)

Tylko zmienione pliki - VSCode SFTP extension ma "upload changed file" lub "sync local → remote".

### Rollback (jeśli coś pójdzie nie tak)

W panelu FTP zmień nazwę `public_html/` na `public_html_broken/`, a `public_html_old_backup/` z powrotem na `public_html/`. Strona wraca do poprzedniej wersji w sekundach.

## Po publikacji - checklist SEO

- [ ] Zgłoś nowy `sitemap.xml` w Google Search Console: https://search.google.com/search-console
- [ ] Sprawdź / zaktualizuj wpis Google Business Profile: https://business.google.com (kategorie: "Air conditioning contractor", "HVAC contractor", obszary obsługi: Bochnia, Brzesko, Rzezawa, Kraków, Tarnów)
- [ ] Wgraj logo (kwadratowe SVG/PNG) do GBP jako zdjęcie profilowe
- [ ] Poproś 3-5 zadowolonych klientów o opinię w Google
- [ ] Zarejestruj firmę w lokalnych katalogach: panoramafirm.pl, pkt.pl, aleo.com
- [ ] Sprawdź pozycje na frazy: "klimatyzacja Bochnia", "klimatyzacja Brzesko", "klimatyzacja Rzezawa" w trybie incognito po ~2 tygodniach od publikacji

## Wybór logo

Otwórz `public_html/logo-options.html` w przeglądarce - zobaczysz propozycje w wariantach poziomych i kwadratowych. Wybierz numer i podmień:

```bash
# Przykład: wybór opcji 13
cp public_html/assets/img/logo-options/13-gmaps-bold-snowflake.svg public_html/assets/img/logo-mark.svg
```

Albo poproś Claude'a, żeby to zrobił za Ciebie.

## Notki bezpieczeństwa

`.vscode/sftp.json` zawiera hasło do FTP i jest w `.gitignore` - nie wrzucaj go do repo.
