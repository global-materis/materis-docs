# Access points

Your base stations. **One row = one AP**, with the state of the whole sector.

![The AP table: per-sector State (Operational, Unstable, High load), SSID, frequency and channel, connected stations, Peaks, Airtime and CPU](/signal-scope/tabla-ap.png)

## State: the sector's verdict

The **State** column is the AP's own diagnosis, combining three axes:

- **Channel load** — *Operational* (< 50 % air time in use), *High load*
  (50–69 %), *Saturated* (≥ 70 %).
- **Radio health** — CPU and memory: *Attention* or *Critical*.
- **Sector latency** — its stations' spikes (the Peaks column).

Two details of the criteria:

- **The sustained average is judged, not the instant.** Opening an AP's web UI
  spikes its CPU for a few seconds; that does not paint it red. The tooltip
  shows both numbers — "air in use 85 % (sustained 62 %)" — so the verdict
  always squares with what you see.
- Repeated short spikes are not saturation: that pattern has its own label,
  **Unstable**.

An AP with no reading shows **"—"**, not a green: without a measurement there
is no verdict. The State tooltip uses the same diagnosis format as the
stations: the fact and its context, with the causes.

## The Stations cell: three gestures

Next to the number of connected clients (what the AP reports about itself)
there are three distinct controls:

| Control | What it does |
|---|---|
| The **number** (link) | Filters the stations table to this AP's — *"who hangs off here?"* |
| The **radar** | **Asks the AP** which stations it has and adds to **Others** the ones the project didn't know. It does not depend on registered networks, so it discovers antennas in segments the scan cannot reach — useful to learn about a new install without scanning. |
| The **ping** | Opens the continuous Ping with this AP's **registered** stations pre-selected. The title says how many before opening. |

The stations table has the reverse trip: its AP column jumps to this row.

## The other columns

| Column | What it shows |
|---|---|
| **Session** | Connection state, same as stations. |
| **SSID** | The network name the AP broadcasts. |
| **Peaks** | `3/14` = how many of its online stations have latency spikes. Lights amber when the majority (and at least 3) have them — one client with spikes is that client; most of the sector is the shared air. With fewer than 3 stations online it shows "—". |
| **Airtime** | The channel's air in use (%), the raw figure behind the State. |
| **CPU · Free RAM** | The radio's health: CPU usage and **available** memory (for free RAM, more is better). Uncolored: the verdict comes from the State, which judges the sustained value — opening the AP's web UI spikes its CPU for a few seconds, and that is not a fault. |
| **Thr. TX / RX** | The AP's **aggregate** traffic, all its stations together. Mind the direction: here **TX is what goes down** to the clients. It answers "busy with what?" when the air comes up high. |
| **Ports** | The AP's Ethernet port, the same RJ45 connector as in [Stations](./stations#ports-the-rj45-connector). Here the strong case is **degradation**: an AP negotiating 100 Mbps where it used to give 1000 looks perfect in RF — and strangles its whole sector. The amber `↓` betrays it against its own history. |
| **Frequency / Channel** | To spot overlaps between your own APs. |
| **Firmware · MAC · Model · TX Power · Uptime** | Device identity and context. |

As in every table: its own search box, sorting by header, hideable columns,
and **clicking the name** isolates that AP (another click undoes it).

::: tip The diagnosis does not prescribe
When a sector shows spikes, the diagnosis delivers the fact and the triage —
channel, load or weak links — but it does not prescribe "change the
frequency": three different causes produce the same picture, and the call is
yours, with the context the app brings you.
:::
