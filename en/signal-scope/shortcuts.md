# Shortcuts and quick navigation

Fast diagnosis comes from adding up small gestures: shortcuts, links between
tables and one-click filters. This guide gathers them all.

## Keyboard shortcuts

They work across the whole panel, and **F1** lists them inside the app:

| Shortcut | Action |
|---|---|
| `Ctrl+S` | Save (consolidates the project file for copying or backup) |
| `Ctrl+N` | New project |
| `Ctrl+Space` | Freeze / resume the tables' live refresh |
| `Ctrl+A` | Register a device manually by its IP |
| `Ctrl+H` | Save a Snapshot of the current state |
| `Ctrl+M` | Switch between the Monitor and the coverage Map |
| `Ctrl+K` | **Global search** for devices (see below) |
| `Ctrl+F` | Browser find on screen (highlights, does not filter) |
| `Ctrl+↓` / `Ctrl+↑` | Jump to the next / previous table, with the cursor in its search box |
| `Tab` | From a table's search box, each row's short path: IP, name and its AP |
| `← ↑ ↓ →` | Inside a table: ←→ walk every action in the row; ↑↓ move between rows, headers (Enter sorts), search box and columns menu |
| `Esc` | In layers (see below) |
| `Ctrl+click` | On the Map, over an AP: selects it and shows only that one; again on the same one brings everything back |
| `F1` | Help and shortcuts |

Two clarifications:

- **`Ctrl+F` and each table's search box do different things.** `Ctrl+F`
  highlights text on screen without touching anything; the table's search box
  **filters** the rows. To work on a subset, use the search box.
- **`Esc` works in layers**, most recent first. The first Esc clears what you
  were typing in a search box, the next closes the modal you were looking at,
  and the next clears the status filter and the search boxes. A few Esc
  presses always bring you back to the full table. If you are viewing a
  Snapshot, with the focus on it and nothing else to clear, one more Esc leaves
  the Snapshot.

## The global search (Ctrl+K)

This is the fastest gesture when a customer calls. Press `Ctrl+K` (or the
**magnifier** on the bar, in the Monitor and the Map) and type their name, or
their IP, MAC, SSID, model or manufacturer; MACs and IPs can be typed without
separators. When you pick a result, the app sets the table for you:

- Pick a **station**: its row is isolated and, in the AP table, its AP. That is
  the pair a report gets solved with: is it this customer or their sector?
- Pick an **AP**: its row is isolated and, above, its stations.
- Pick a target from **References**: its row in that table. It is not offered
  on the Map, because the map does not draw third-party devices.

On the **Map**, the chosen device is selected with its card open, the view
centers on it and the rest of the map is hidden.

The search finds devices **even when a filter has them hidden**, because it
searches the project and not what is painted. Navigate with `↑↓` and `Enter`;
it also works inside a Snapshot, searching what the Snapshot saved.

::: tip Ctrl+K vs Ctrl+F
`Ctrl+F` searches on-screen text and only highlights. `Ctrl+K` searches the
project's **devices** and acts: it filters and moves the focus. They complement
each other.
:::

## One-click filters

- **Counters filter.** Click **Critical** (or Good, Warning, Absent) and the
  stations table narrows to that group, which is the day's work list. **Clear
  filter** appears on the bottom rail.
- **The name isolates.** Click a station's or AP's name and its table shows
  only that row; another click in the same spot undoes it.
- **The stations search crosses with the AP.** Typing an AP's name lists all of
  its stations.

## The trips between tables

Every question has its click, no manual hunting:

| You are in… | Click | It answers |
|---|---|---|
| Stations, AP column | the AP's **name** | "how is its base station?" → its row |
| Stations, AP column | the **antenna icon** | "and its other clients?" → the table filtered to that AP |
| AP, Stations cell | the **counter** | "who hangs off here?" → its stations |
| AP, Stations cell | the **ping icon** | continuous ping to all its registered stations, already running |
| A **sentinel alert** | the card | straight to the device (clearing the filter so it is not hidden) |
| A **notice in the bell** | the line | to the device that notice was about |
| A **Windows notification** | the toast | opens the app **on the device that caused it**, inside its project |
| The notice from an AP that added new stations to Detected | **"View in Detected"** | to the Detected table |

## Direct access on the rows

- **The IP is a link** that opens the radio's web interface in the browser.
  Next to it, the **ping button** opens a console with a continuous ping to that
  IP.
- **"Mark"** pins the baseline without leaving the row, and the **×** removes
  it.
- The **Columns menu** hides what you don't use. Fewer columns read faster, and
  the choice is remembered per table.

## On the Map

- The **side search drives the view**: click a result and the map selects and
  centers it (zooming in if needed, never out).
- **`Ctrl` + click on an AP** leaves it **alone on screen**, and the same
  gesture on the same AP brings everything back. The cards have the equivalent
  button, "Mostrar solo este AP" or "Mostrar solo esta estación".
- **`Esc`** closes whatever is open: first the marked-point bubble, then a panel
  open inside a card, and then the card. It also exits the marking and
  node-placing modes.
- While relocating a node with "Posición", **`Enter`** applies and **`Esc`**
  puts it back where it was.
- A card header's **← arrow** **goes back to the previous card**, for example
  from a station to its AP and back, without hunting for it again.
- Each card's **crosshair** centers the map on the selection.
- **Mark** drops an ephemeral pin to copy coordinates, measure the **distance to
  a node** or **annotate the position** of a MikroTik station.

Each gesture is covered in detail in [Coverage map](./interface/map#searching-and-moving-around).

## Three diagnosis routes, chained

**A customer complains.** Their name in the Stations search → the signal
cell's tooltip is the full diagnosis → if the cause smells like the sector,
the antenna icon in the AP column shows their neighbors: just them, or
everyone?

**A sector under suspicion.** AP table → its Status and the Spikes column →
the Stations counter lists its clients → the ping icon launches the
continuous ping to all of them, at once.

**Closing the day.** Click **Critical** (or Critical + Warning) → that is
the work list → Report button with the "Critical + Warning" scope and out
comes the PDF for tomorrow's technician.
