# The interface

The monitoring panel is a single vertical screen: the scan panel and actions at
the top, then the counters, and the device tables below. This section walks
through it in parts:

- [Stations](./stations) — the main table: your customer antennas.
- [Access points](./access-points) — your base stations.
- [Detected and Others](./detected-and-others) — the scan queue and the
  inventory of third-party devices.
- [Coverage map](./map) — the other main view: nodes, sectors and stations on
  the map.

::: info 🖼️ Image pending — `public/signal-scope/monitor-general.png`
Screenshot of the **full panel**: scan panel, counters and the top of the
stations table.

_Existing: `ss-desktop/docs/screenshots/SignalScope-Monitor.png`._
:::

## The top panel

Besides scanning and the cascade session (covered in
[First steps](../first-steps)), it holds:

- **Save snapshot** (`Ctrl+H`) — captures the network's current state into the
  history.
- **Report** — exports to PDF or Excel, with a scope selector: General,
  Critical, Critical + Attention, Stations only or APs only.
- **The snapshot strip** — your saved captures, each with its date; from there
  you compare, share and protect them.

## Counters are filters

The counter row — **Stations / Good / Attention / Critical / Absent** — is not
just a summary: **one click filters the stations table** to that group, without
freezing the refresh. **Absent** filters by lost session, not by traffic light:
an absent station keeps its last reading.

The **AP** and **Others** counters are informational.

## The bottom rail

A floating bar with:

- **Anchors** to each visible table (Stations, APs, Others) to jump without
  scrolling — also `Ctrl+↓` / `Ctrl+↑`.
- **Device (+)** — register a radio by hand, by IP (for segments you cannot
  scan).
- **Clear filter** — appears when a filter is active.
- **Freeze / Resume** — pauses the visual refresh so you can read calmly;
  **background monitoring continues**, only the repainting stops.

## Common to every table

- **A search box per table** (name, IP, MAC, model, AP…).
- **Clickable headers** to sort.
- **A "Columns" menu** to hide the ones you don't use — the choice is
  remembered.
- **Clicking a row's name** (station or AP) isolates it in its own table;
  another click in the same spot undoes the filter.
