# Cascade

Cascade is a browser version of Klondike solitaire played on a felt table. Build four foundations from Ace to King while arranging alternating-color descending runs in the tableau. When all 52 cards reach the foundations, they launch into a card cascade that paints over the table.

## Setup

Install dependencies with `npm ci`.

Run the development server with `npm run dev` and open the local URL it prints. Produce the static production site with `npm run build`; the complete site is written to `dist/` and can be served from any static file server.

## Controls

- Click or tap **NEW GAME** to deal. Drag cards or runs to move them.
- Click or tap the stock to turn three cards. It recycles when empty.
- Double-click a playable waste or tableau card to send it to a foundation.
- Use the bottom **NEW GAME**, **MENU**, and **SOUND** controls during play.
- The title and how-to menus also work with Up/Down (or W/S), Enter/Space, and Escape.
