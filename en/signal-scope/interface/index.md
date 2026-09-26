# The interface

The monitoring panel is a single vertical screen: the scan panel and actions at
the top, then the counters, and the device tables below. This section walks
through it in parts:

- [Stations](./stations) — the main table: your customer antennas.
- [Access points](./access-points) — your base stations.
- [Detected and References](./detected-and-others) — the scan queue and the
  inventory of what you do not manage but look at for contrast.
- [Coverage map](./map) — the other main view: nodes, sectors and stations on
  the map.

![The full panel: registered networks and actions on top, the network counters, the snapshot history and the live stations table](/signal-scope/monitor-en-vivo.jpg)

## The top panel

Besides scanning and the cascade session (covered in
[First steps](../first-steps)), it holds:

- **Save snapshot** (`Ctrl+H`) — captures the network's current state into the
  history.
- **Report** — exports to PDF, Excel or CSV, with a scope selector: General,
  Critical, Critical + Attention, Stations only or APs only.
- **The snapshot strip** — your saved captures, each with its date; from there
  you compare, share and protect them.
- **Update** — to the left of the project name, and **only when a new version is
  available** ([how it works](../installation#updates)).

## The two indicators in the corner

Top right, always in the same spot in the **Monitor** and in the **Map**, sit two
neighbouring controls that count **different things**. Worth not confusing them:

| | What it says | When it empties |
|---|---|---|
| 🔔 **The bell** (notice tray) | What the app told you **while you were working**, with the time. Its counter is of **unread** items. | When you open it. A notice is read and does not come back. |
| 💓 **The pulse** (service sentinel) | What is **broken right now**, and on how many devices. | On its own, when the fault clears. It is not dismissed by hand. |

A "came back online" notice already happened and does not stop having happened;
a loose cable is still loose no matter how long you look at it. That is why there
are two and not one. Both take you to the device with one click, and **neither
appears inside the viewer of a shared capture**: a frozen capture generates no
events.

The details of each are in [Sentinel and network score](../sentinel).

## Counters are filters

The counter row — **Stations / Good / Attention / Critical / Absent** — is not
just a summary: **one click filters the stations table** to that group, without
freezing the refresh. **Absent** filters by lost session, not by traffic light:
an absent station keeps its last reading.

The **AP** and **References** counters are informational.

## The bottom rail

A floating bar with:

- **Anchors** to each visible table (Stations, APs, References, Detected) to jump without
  scrolling — also `Ctrl+↓` / `Ctrl+↑`.
- **Device (+)** — register a radio by hand, by IP (for segments you cannot
  scan).
- **Clear filter** — appears when a filter is active.
- **Freeze / Resume** — pauses the visual refresh so you can read calmly;
  **background monitoring continues**, only the repainting stops.

::: info 🖼️ Image pending — `barra-indicadores.png`
The right-hand corner of the bar: the search magnifier, the **bell** with its
unread-notice counter and the sentinel's **pulse** with the number of devices in
fault.
:::

## Common to every table

- **A search box per table** (name, IP, MAC, model, AP…).
- **Clickable headers** to sort.
- **A "Columns" menu** to hide the ones you don't use — the choice is
  remembered.
- **Clicking a row's name** (station or AP) isolates it in its own table;
  another click in the same spot undoes the filter.
