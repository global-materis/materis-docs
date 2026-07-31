# Shortcuts and quick navigation

Fast diagnosis is not one feature: it is the sum of small gestures —
shortcuts, links between tables, one-click filters. This guide gathers them
all.

## Keyboard shortcuts

Always available on the panel (and listed inside the app with **F1**):

| Shortcut | Action |
|---|---|
| `Ctrl+S` | Save (consolidates the project file for copying/backup) |
| `Ctrl+N` | New project |
| `Ctrl+Space` | Freeze / Resume the tables' refresh |
| `Ctrl+A` | Register a device by IP |
| `Ctrl+H` | Save snapshot |
| `Ctrl+K` | **Global search** for devices (see below) |
| `Ctrl+F` | Native on-screen search (highlights, does not filter) |
| `Ctrl+↓` / `Ctrl+↑` | Jump to the next / previous table |
| `Esc` | Cascading: clears the focused search box → closes the open modal → clears the state filter and search boxes |
| `F1` | Help and shortcuts |

Two useful clarifications:

- **`Ctrl+F` and each table's search box are not the same thing**: `Ctrl+F`
  highlights text on screen without touching anything; the table's search box
  **filters** the rows. To work on a subset, use the search box.
- **`Esc` works in layers**: the first Esc undoes what you were typing, the
  second closes what you were looking at, the third clears the filters. Three
  Esc always bring you back to the full table.

## The global search (Ctrl+K)

The fastest gesture of all when a customer calls: `Ctrl+K` (or the
**magnifier** on the bar, available in the Monitor and the Map), type their
name — or IP, MAC, SSID, model or manufacturer; MACs and IPs can be typed
without separators — and **the app sets the table for you**:

- Pick a **station** → its row is isolated and, in the AP table, its AP — the
  pair a report gets solved with: is it this customer or their sector? On the
  **Map**, its card centered and its link highlighted.
- Pick an **AP** → its row isolated and, above, its stations. On the **Map**,
  the view jumps to its node with its sector.
- Pick a device from **Others** → its row in that table (not offered on the
  Map: the map does not draw third-party devices).

It finds devices **even when a filter has them hidden** — it searches the
project, not what is painted. Navigate with `↑↓` and `Enter`; it also works
inside a snapshot, searching the capture.

::: tip Ctrl+K vs Ctrl+F
`Ctrl+F` searches on-screen text and only highlights; `Ctrl+K` searches the
project's **devices** and acts: it filters and moves the focus. They are
complementary.
:::

## One-click filters

- **Counters filter**: click **Critical** (or Good, Attention, Absent) and
  the stations table narrows to that group — the day's work list in one
  click. **Clear filter** appears on the bottom rail.
- **The name isolates**: click a station's or AP's name and its table shows
  only that row; another click in the same spot undoes it.
- **The stations search crosses with the AP**: typing an AP's name lists all
  of its stations.

## The trips between tables

Every question has its click, no manual hunting:

| You are in… | Click | It answers |
|---|---|---|
| Stations, AP column | the AP's **name** | "how is its base station?" → its row |
| Stations, AP column | the **antenna icon** | "and its other clients?" → the table filtered to that AP |
| AP, Stations cell | the **counter** | "who hangs off here?" → its stations |
| AP, Stations cell | the **ping icon** | continuous ping to all its registered stations, already running |
| A **sentinel alert** | the card | straight to the device (clearing the filter so it is not hidden) |
| Detected / Others | "View in Others" / "View in Detected" on the notices | to the freshly moved device |

## Direct access on the rows

- **The IP is a link**: it opens the radio's web interface in the browser.
  Next to it, the **ping button** opens a console with a continuous ping to
  that IP.
- **"Mark OK"** pins the reference without leaving the row; the **×** removes
  it.
- The **Columns menu** hides what you don't use — fewer columns, faster
  reading; the choice is remembered per table.

## On the Map

- The **side search drives the view**: click a result and the map selects and
  centers (zooming in if needed, never out).
- Each card's **Center** button (crosshair) re-frames the selection.
- **Mark** drops an ephemeral pin to copy coordinates.

## Three diagnosis routes, chained

**A customer complains.** Their name in the Stations search → the signal
cell's tooltip is the full diagnosis → if the cause smells like the sector,
the antenna icon in the AP column shows their neighbors: just them, or
everyone?

**A sector under suspicion.** AP table → its State and the Peaks column →
the Stations counter lists its clients → the ping icon launches the
continuous ping to all of them, at once.

**Closing the day.** Click **Critical** (or Critical + Attention) → that is
the work list → Report button with the "Critical + Attention" scope and out
comes the PDF for tomorrow's technician.
