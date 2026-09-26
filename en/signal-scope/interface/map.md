# Coverage map

The other main view, peer to the Monitor: your network **on the map**. You
switch with the `Monitor | Map` toggle in the bar — and when you do, live
monitoring keeps running in the background.

It is a **design plan**, meant as a field view: where your nodes are, what
each AP covers and how its stations are doing, at a glance.

![The coverage map: a node with its sectors painted by band, stations with their diagnosis color, one station's card with its metrics and the layers panel](/signal-scope/mapa-cobertura.jpg)

## Nodes: the site, not the device

A **node** is the physical site your APs hang from: the tower, the rooftop
mast, the pole. You register it with **"Registrar nodo"**, placing it on the
map (and relocate it later with its "Posición" button — Enter applies, Esc
puts it back where it was).

Its **card** is the site's hub: the coordinates, renaming, relocating, and
the list of **its APs** — each with its sector color and frequency, to read
at a glance what that tower has on. From there you also
[plan an AP that does not exist yet](#planning-an-ap-that-does-not-exist-yet).

::: warning Deleting a node deletes its planning
Real APs survive without a node (they are just not drawn); **planned APs do
not exist outside their node** — deleting it deletes them too, and the
dialog says so.
:::

## APs and their sectors

An AP is drawn **once you assign it to a node** — without a node it has no
real position. From the **"Asignar APs"** panel you choose which APs live on
each node (with a search box and a free-APs filter), and for each one you
adjust its **coverage sector**:

- **Azimuth** — where it points.
- **Beamwidth** — how wide the beam is.
- **Range** — how far its coverage is painted.

::: warning It is a plan, not an RF prediction
The sector paints what you declare (azimuth, beamwidth, range). It does not
compute terrain or line of sight — the app does not promise coverage it
cannot verify.
:::

## Three ways of drawing coverage

With dozens of sectors over the same neighbourhood, the plan stopped being
readable: the semi-transparent wedges **added up**, and where four of them
crossed, the colour belonged to none of them. Worse: the map answered two
questions in the same language — the fill said **band**, the dots and links
said **state**.

You choose **how it is drawn**, with a selector in the top bar next
to "Base map":

| Mode | What it answers |
|---|---|
| **Footprint** (the default) | *"How far do I reach?"* — every sector merged into **a single surface in a single tone**. Two overlapping wedges no longer darken each other, and colour goes back to the traffic light as its only owner. The range arc stays crisp, so you can still read where each sector ends inside the mass. |
| **Focus** | *"What does this one cover?"* — the AP you are looking at is painted in full; the rest stay as a one-pixel outline. |
| **Detail** | The usual drawing, **each sector by its band**. Nothing was removed: it simply stopped being the first thing you see. |

Three things worth knowing:

- **The focused AP is painted in full in all three modes**, and focus comes from
  the AP you pick as much as from the station you pick (its own AP is painted).
- **Outside Detail, links dim**: the state colour is reserved for what is focused
  and the rest turns context grey. No information is lost — **each station's dot
  still says its state, and that never dims**.
- **Footprint costs something, and it is said out loud**: the frequency band
  disappears as a map reading. It is still in the coloured dot of the side list,
  in the AP's card and in the
  [frequency planner](../tools#frequency-planner), which is its home.
- A **planned AP does not join the footprint**: the footprint claims *"I reach
  this far"* and there is no device there yet. It stays as a dashed outline.

If you switch off the "Coverage AP" layer in the **Layers** panel, the selector
**is disabled in place** (it does not vanish) and the tooltip says why.

::: info 🖼️ Image pending — `cobertura-modos.png`
The same node with many sectors, in **Footprint** and in **Detail**, side by side
— and the top bar selector open with its three options.
:::

## Planning an AP that does not exist yet

On the node's card, **"Añadir AP planificado"** draws the sector of a device
**that is not installed yet**: you pick its azimuth, beamwidth and range, and
the sector is painted on the map **just like a real one** — same geometry,
same reading. It answers, before buying or climbing to the roof, *what would
an AP here, aimed there, cover? Does it overlap with what I already have?* It
is drawing only: **it does not count as a device and is not diagnosed**, and
the card itself says so.

The moment it exists for arrives with the install: the **"Pasar los ajustes a
un AP…"** button pours the plan onto the **real** device — it copies the
geometry, assigns it to the node and removes the planned one, in a single
operation. Since it overwrites a real device's settings and there is no undo,
it asks for confirmation showing exactly what will be replaced.

![A planned AP's card: azimuth, design range and beamwidth with its presets, the sector color, and the buttons to pass the settings to an AP or delete it — with the notice that it does not exist yet and is not diagnosed](/signal-scope/ap-planificado.png)

## Stations on the map

Stations are placed by **their own coordinates** — the ones the radio has
registered (Location/GPS in its interface). Without coordinates, a station
**is not drawn**: its card says so and the search list marks it "No
coordinates". That is deliberate — it pushes you to register the real location
on the antenna, where it is useful to any tool and not just to SignalScope.

### Annotating the position of a MikroTik

**RouterOS does not allow writing coordinates to the device**: its GPS package is
read-only. So for these devices — and **only for these** — the app lets you
annotate the position by hand:

1. **Mark the point** on the map where the station is.
2. Press **"Annotate here"** in the point's bubble — or use **"Annotate the
   position on the map"** from that station's card button.

Two rules the app honours and that are worth knowing:

- **What you annotate is stored in the project, not on the device.** The app says
  exactly that: *"SignalScope publishes it, not the device"*.
- **It never overrides what the radio reports.** If that device ever reported its
  own position, the radio's would win.

On airMAX that button **does not exist, and that is deliberate**: there
coordinates are registered on the radio itself.

::: info 🖼️ Image pending — `anotar-posicion.png`
The marked point's bubble with the "Annotate the position of" dropdown and the
**Annotate here** button, over a MikroTik with no coordinates.
:::

### What the map says with its drawing

- **Each dot's color is the full diagnosis** — the same verdict as the
  Monitor, not signal alone. The map dot and the table never contradict each
  other.
- **The link is drawn to the real AP** — the line goes from the station to
  the AP it is actually associated with, not to the nearest node. If that AP
  is not on the map, the station is drawn without a line.
- **An absent station is drawn hollow** — it keeps the color its link was in
  (dashed ring, faint fill) and its card says "Absent · seen N ago". Falling
  while critical is not the same as falling while fine, and the hollow tells
  you that color is a memory.

## Searching and moving around

The side search drives the view: clicking a result — station, AP or node —
selects it **and centers the map** on it (zooming in if needed, never out).
The selected station gets a halo and its link becomes a solid line: "this
one, and it hangs off that AP".

To move around the plan:

| Gesture | What it does |
|---|---|
| **Ctrl + click** on an AP | Leaves it **alone on screen** — every other sector disappears. |
| **Esc** | Closes the open card (and exits the marking or node-placing modes). |
| **Arrow ←** in a card's header | **Goes back to the previous one**: from a station to its AP and back, without hunting for it on the map again. |
| **Crosshair ("Center")** | Re-frames the selection. Never *relocates* — that is moving the node, and it is a different button. |

::: tip Small sectors are no longer buried
Before, a large sector drawn on top made the small ones it covered
**unreachable**: you could see them on screen and had to open them from the
search box. Now sectors are drawn from largest to smallest area, so **the
smallest is always on top** and can be clicked. The key is the **area**, not the
range: a 360° omni at 1 km covers more than a 30° wedge at 3 km.
:::

## Support tools

### Marking a point

**Mark** drops an ephemeral pin to **copy coordinates** (latitude and longitude,
together or separately): handy for pasting into a freshly installed antenna's
interface. **It is not saved in the project.**

From its bubble you also get:

- **"Distance to a node"** — a dropdown with **all your nodes sorted by
  proximity, each with its distance**: it answers the question without picking
  anything. Choosing one draws the line to it with the measurement on top. It is
  **dashed** on purpose: on this map a solid line already means a real link
  between two devices, and here there is no link — there is a ruler over a point
  you are considering.
- **"Annotate here"** — records that point as a MikroTik station's position (see
  above).

It is a straight line over the globe: **it is not an RF prediction** — no
terrain, no Fresnel, no mast height.

### Base map

Four options, and the privacy detail is in
[Security and privacy](../security-privacy):

| Option | What it is |
|---|---|
| **Automatic** | Follows the app's theme. |
| **Light** / **Dark** | The two street plans, served by **OpenFreeMap** — no key, no registration, no quota. |
| **Satellite** | **Google Maps** imagery, and it **only appears if you supplied your own key** (see below). |

And a separate checkbox underneath:

- **Terrain relief** — hillshading of ridges and valleys, **off by default**. It
  shows the hill that cuts a link, which is the real question when looking at the
  plan. **It is not a substitute for satellite, and the app says so**: it is bare
  terrain (~30 m), it shows no trees, buildings or rooftops. It is computed on
  your machine from open elevation data. Over the satellite base map the checkbox
  is disabled.

#### Satellite with your own Google key

The satellite option **only exists once you configure a Google Map Tiles API key**
in **Preferences**. It is yours and on your account: the app **stores it in the
Windows credential vault and it never leaves your machine**.

::: details Why isn't one included?
Because there is no free satellite imagery with rooftop resolution at world
scale. The previous provider cut off outside cities and returned — with a correct
response, no error to catch — a *"Map data not yet available"* label exactly where
the operator needed to look, which read as a SignalScope failure. We would rather
not promise it than promise it halfway.
:::

::: info 🖼️ Image pending — `mapa-base.png`
The **Base map** menu open: Automatic, Light, Dark, Satellite (when a key is
present) and, separated by a line, the **Terrain relief** checkbox.
:::

## The map travels in snapshots

Every snapshot freezes that moment's plan: opening the capture — or a shared
`.ssnap` — draws the Map **exactly as it was then**, read-only. If you
enabled "Do not record location" when sharing, the capture goes without a
map — see [Sharing](../sharing#protecting-sensitive-data).
