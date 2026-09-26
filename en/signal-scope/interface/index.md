# The interface

The monitoring panel is a single vertical screen. The scan panel and actions
sit at the top, then the counters, and the device tables below. Each part has
its own page:

- [Stations](./stations): the main table, with your customer antennas.
- [Access points](./access-points): your base stations.
- [Detected and References](./detected-and-others): the scan queue and the
  inventory of what you do not manage but look at for contrast.
- [Coverage map](./map): the other main view, with nodes, sectors and stations
  on the map.

![The full panel: registered networks and actions on top, the network counters, the snapshot history and the live stations table](/signal-scope/monitor-en-vivo.jpg)

## The top panel

Besides scanning and the cascade session (covered in
[First steps](../first-steps)), it holds:

- **Save snapshot** (`Ctrl+H`), which saves the network's current state into
  the history.
- **Report**, which exports to PDF, Excel or CSV. You pick the report type from
  General (whole network), Critical, Critical + Warning, Stations only and APs
  only; the last one is disabled when there is no AP in view.
- The snapshot strip, with your saved snapshots and the date of each one. From
  there you compare, share and protect them.
- **Update**, to the left of the project name. It only appears when a new
  version is available ([how it works](../installation#updates)).

## The two indicators in the corner

Top right, in the same spot in the **Monitor** and in the **Map**, there are two
neighbouring controls that count different things:

| | What it says | When it empties |
|---|---|---|
| **The bell** (notice tray) | What the app told you while you were working, with the time. Its counter is of **unread** notices. | When you open it. A notice you have read does not come back. |
| **The pulse** (service sentinel) | What is broken right now, and on how many devices. | On its own, when the fault clears. It is not dismissed by hand. |

A "came back online" notice describes something that already happened, and
reading it does not undo it. A loose cable, on the other hand, stays loose no
matter how long you look at it. That is why there are two indicators. Both
take you to the device with one click, and neither appears in the viewer of a
shared snapshot, because a frozen snapshot generates no events.

The details of each are in [Sentinel and network score](../sentinel).

## Counters are filters

One click on the counter row (**Stations**, **Good**, **Warning**,
**Critical** and **Absent**) filters the stations table to that group, without
freezing the refresh; **Stations** clears the filter. **Absent** filters by
lost session and not by traffic light, because an absent station keeps its
last reading.

The **AP** and **References** counters do not filter: one click takes you to
their table.

## The bottom rail

It is a floating bar with:

- Anchors to each visible table (Stations, APs, References, Detected) to jump
  without scrolling, also with `Ctrl+↓` / `Ctrl+↑`.
- **Device (+)**, to register a radio by hand by its IP, for segments you
  cannot scan.
- **Clear filter**, which appears when a filter is active.
- **Freeze / Resume**, which pauses the visual refresh so you can read calmly.
  Background monitoring continues; only the repainting stops.

::: info 🖼️ Image pending — `barra-indicadores.png`
The right-hand corner of the bar: the search magnifier, the **bell** with its
unread-notice counter and the sentinel's **pulse** with the number of devices in
fault.
:::

## Common to every table

- A search box per table (name, IP, MAC, model, AP…).
- Clickable headers to sort.
- The **Columns** menu, to hide the ones you don't use. The choice is
  remembered.
- Clicking a row's name (station or AP) isolates it in its table, and another
  click in the same spot undoes the filter. If you hide the Name column, that
  gesture goes with it, but the search box still finds the row by its name.
