## React 17 with TypeScript

## Info

-   Repo przygotowane podczas oglądania kursu `Complete Intro to React v7` na Frontend Masters.
-   Kurs pokazuje fajny sposób na developowanie apki od zera bez `create-react-app` oraz za pomocą Parcela, dzięki czemu można pominąć m.in. żmudną konfigurację Webpacka.
-   Nie jest to kod z kursu, tylko mój własny testowy kod:
    -   zastosowałem tu sporo koncepcji pokazanych w kursie;
    -   pisałem wszystko w TSie;
    -   stworzyłem strukturę plików i folderów w projekcie;
    -   dodałem własny config Prettiera, ESLinta i TSa;
    -   skonfigurowałem krótsze ścieżki do podstawowych folderów (w `tsconfig.json` oraz `package.json`);
    -   wszystkie style są w jednym pliku - `style.css`;
    -   prawie każdy komponent ma też pusty plik przeznaczony na style - po dodaniu `emotion` tam będziemy stylować komponenty;
-   Paczkę developerską i produkcyjną możemy rozróżnić w zakładce Network w DevToolsach - pliki JS z apką w wersji developerskiej będą ważyć około 1-2 MB, a w wersji PROD nawet 10+ razy mniej (wagę plików w tej wersji Parcel pokaże też przy bundlowaniu za pomocą `npm run build`). Dodatkowo jeśli mamy zainstalowane w przeglądarce React Developer Tools, to ikona tego dodatku też pokazuje, czy używamy produkcyjnej wersji Reacta.
-   Jeśli przy budowaniu paczek Parcel będzie rzucał errorami, to usunąć folder `.parcel-cache` i `dist`.
-   Docelowo chciałbym traktować to repo jako cheatsheet z podstawowych zastosowań Reacta. Przy kursie intermediate albo je zaktualizuję albo przygotuję osobne repo.

## Quick Start

-   `npm i`
-   `npm run dev` to start local development
-   `npm run build` to build for prod
-   `npx serve dist` to run live server with your prod bundle (use `npm run build` first)

## Start nowego projektu od zera

Opis krok po kroku, jak powstał ten projekt:

-   Tworzymy pusty folder projektu.
-   Dodajemy plik ze swoim configiem Prettiera - `.prettierrc.json`.
-   `npm init -y`
-   `npm i react@17.0.2 react-dom@17.0.2 @types/react @types/react-dom`
-   `npm i -D typescript`
-   Dodajemy plik ze swoim configiem TSa - `tsconfig.json`.
-   `npm i -D eslint eslint-config-airbnb eslint-config-airbnb-base eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser`
-   Dodajemy plik ze swoim configiem ESLinta - `.eslintrc.json` lub działamy na ustawieniach domyślnych i będziemy już podczas pracy w projekcie modyfikować niektóre zasady.
-   `npm i -D parcel`
-   W `package.json` dodajemy skrypt: `"dev": "parcel src/index.html"` oraz `"build": "parcel build src/index.html"`.
-   Żeby Parcel dobrze działał z `paths` z `tsconfig.json`, trzeba dodać ich odpowiedniki jako `alias` w `package.json`. Musimy je wtedy mieć w dwóch miejscach - w PJ, żeby budlowanie działało i w TSconf, żeby TS nie krzyczał.
-   Dodajemy folder `src`.
-   Dodajemy w `src` plik `index.html`.
-   Poza standardową templatką HTML w `body` potrzebujemy tylko:
    ```html
    <div id="root">not rendered</div>
    <script src="./index.js" type="module"></script>
    ```
-   Dodajemy w `src` plik `index.js`, a w nim:

    ```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './components/App/App.component';

    ReactDOM.render(<App />, document.getElementById('root'));
    ```

-   Dodajemy plik `App.tsx`, który będzie zawierał naszą apkę - na początek zwykły komponent reactowy, który będzie importował inne komponenty (lokalizacja j/w).
