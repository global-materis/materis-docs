# Coverage map

The other main view, peer to the Monitor: your network **on the map**. You
switch with the `Monitor | Map` toggle in the bar — and when you do, live
monitoring keeps running in the background.

It is a **design plan**, meant as a field view: where your nodes are, what
each AP covers and how its stations are doing, at a glance.

![The coverage map: a node with its sectors painted by band, stations with their diagnosis color, one station's card with its metrics and the layers panel](/signal-scope/mapa-cobertura.jpg)

## Nodes: the site, not the device

A **node** is the physical site your APs hang from: the tower, the rooftop
mast, the pole. You register it with **"Register node"**, placing it on the
map (and relocate it later with its "Position" button — Enter applies, Esc
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
real position. From the **"Assign APs"** panel you choose which APs live on
each node (with a search box and a free-APs filter), and for each one you
adjust its **coverage sector**:

- **Azimuth** — where it points.
- **Beamwidth** — how wide the beam is.
- **Range** — how far its coverage is painted.

Sectors are colored **by frequency band**, so overlaps between your own APs
jump out.

::: warning It is a plan, not an RF prediction
The sector paints what you declare (azimuth, beamwidth, range). It does not
compute terrain or line of sight — the app does not promise coverage it
cannot verify.
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
coordinates". That is deliberate — it pushes you to register the real
location on the antenna, not to invent one.

Three things the map says with its drawing:

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

Cards also carry a **crosshair button ("Center")** to re-frame the selection.

## Support tools

- **Mark** — drops an ephemeral pin to **copy coordinates** (latitude and
  longitude, together or separately): handy for pasting into a freshly
  installed antenna's interface. It is not saved in the project.
- **Base map** — Automatic (follows the app's theme), Light or Dark. Map
  images are downloaded from public providers — the privacy detail is in
  [Security and privacy](../security-privacy).

## The map travels in snapshots

Every snapshot freezes that moment's plan: opening the capture — or a shared
`.ssnap` — draws the Map **exactly as it was then**, read-only. If you
enabled "Do not record location" when sharing, the capture goes without a
map — see [Sharing](../sharing#protecting-sensitive-data).
