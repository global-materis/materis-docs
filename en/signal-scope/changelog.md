# Release notes

The app's **What's new** view sums up each version in headlines; here is the
detail, with links to each feature's guide.

## 1.2.0 — July 2026

The biggest version so far: monitoring gets completed with a map, alerts,
spectrum planning and field tools.

**[Coverage map](./interface/map)** — the second main view, peer to the
Monitor. Register your nodes (the site: tower, mast, pole), assign their APs
and paint each one's sector with azimuth, beamwidth and range, colored by
band. Stations are placed by their own coordinates, with their diagnosis
color and their link drawn to the real AP. The plan travels frozen inside
snapshots.

**[Service sentinel](./sentinel)** — warns about the failures the signal does
not betray: fallen AP (one alert per node, saying how many stations it drags
down), dropped session, unplugged LAN cable, half duplex, misaligned antenna
and saturated radio. With Windows notifications on, notices reach the desktop
even with the app minimized, and clicking one takes you to the device.

**[Frequency planner](./tools#frequency-planner)** — which slice of the
spectrum each AP occupies, how much is free and which channels fit the width
you want, with suggestions, DFS detection and the AP list grouped by node.

**[Multi-variable diagnosis](./diagnostics)** — the verdict is no longer
signal alone: seven axes (signal in context, noise/interference, link
quality, capacity, Ethernet port, chain imbalance and radio health), with
causes in plain words. The table adds Ethernet port, modulation, link latency
and sessions columns; the
[AP gets its own three-axis diagnosis](./interface/access-points).

**[Field tools](./tools)** — continuous ping with per-target statistics
(grouped by sector, minimizable), traceroute with your radios highlighted
along the route, iperf speed test against your PC and
[snapshot comparison](./snapshots#comparing-two-moments).

**[Global search — Ctrl+K](./shortcuts#the-global-search-ctrl-k)** — type the
customer who called and the app leaves their station and its AP on screen,
ready to look at — even if a filter had them hidden.

**[Network score](./sentinel#the-network-score)** — a 0–100 grade for the
whole network, with its coverage declared, downloadable as an image to share.

**[Detected and Others](./interface/detected-and-others)** — what used to be
one drawer splits in two: the scan's temporary queue and the permanent
inventory of the devices you do not manage (routers, ONUs, switches), with an
editable name and optional availability watch.

**And also** — a third report format: **CSV**, ready to open with a double
click in a Spanish-locale Excel; **CPU and free RAM** columns in the stations
and AP tables (with **Airtime** as its own column on APs); the **Ports column
reaches the APs too** (a degraded AP cable strangles its whole sector); an
optional **ping probe** alongside the radio's latency to contrast the air
against the full path; the **Others** inventory travels inside each capture
too, read-only; and **Help → "Cómo se calibran los umbrales"**, the behind
the scenes of the app's limits.

**More faithful readings** — M5 and other airOS 6 devices are back in; each
AP's air usage is no longer read multiplied; a radio that changes IP
reconnects on its own (its identity is its MAC).

**New look** — visual redesign and the Welcome reorganized as a shell with
direct access to Projects, What's new and License.

## 1.1.2 — July 2026

- **Microsoft Store** channel preparation.
- Text fixes after ceasing to be a portable app (data lives in the user
  profile and migrates on its own).

## 1.1.1 — July 2026

- **New-version notice** on startup.
- **Hardened transfer code**: an `.sscope` that asks for a code no longer
  half-opens — without the code, nothing is shown.

## 1.1.0 — July 2026

- **[Snapshot privacy](./sharing#protecting-sensitive-data)**: trim sensitive
  data (IPs, MACs, names, model) before sharing a capture, permanently and in
  the file itself.
- Open an `.sscope` or `.ssnap` with a **double click** from the file
  explorer.
- **Single instance**: double-clicking with the app open brings it to the
  front instead of duplicating it.

## 1.0.0 — July 2026

First version: driverless network scanning (ping + ARP), SSH/HTTP sessions
with airMAX radios and automatic classification into Stations/APs, signal
traffic light with
[per-antenna references](./diagnostics#references-compare-against-your-own-network),
snapshots and PDF/Excel reports.
