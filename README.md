# Scripture Spies

A Codenames-style party word game with 400+ biblical words: people, places, objects, animals, and ideas. It's a static site with no backend.

## How the shared game works

Every game has a 5-character code, like `HXK7P`. A seeded random number generator turns that code into the same 25 words, the same key card, and the same starting team on every device.

| View | URL |
| --- | --- |
| Main board (TV or laptop) | `?game=HXK7P` |
| Spymaster key (phones) | `?game=HXK7P&role=spymaster` |
| Spymaster code entry | `?role=spymaster` |

When you start a new game, the board shows a QR code that links to the spymaster view. Spymasters can also type the code on the code-entry page.

Board progress (guesses, turns, undo) is saved in that browser's `localStorage`, so refreshing the page doesn't lose the game. On their own phones, spymasters can tap words to cross them off once they've been guessed.

The key is hidden only by the honor system. Anyone who knows the code and adds `&role=spymaster` to the URL can see it.

## Develop

```sh
npm install
npm run dev      # serves on your LAN; open the "Network" URL so phones can reach the QR link
npm run build    # outputs static files to dist/
```

`dist/` uses relative paths, so it can be hosted from any static host or sub-path (GitHub Pages, Netlify, S3, etc.).

## Editing words

The words live in `src/words.ts`. Boards are built from that list, so changing it changes what every existing code produces. Make sure the host and the spymasters are on the same deployed version. Keep each word to 10 letters or fewer so it stays readable on phones.
