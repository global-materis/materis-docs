# Stations

The main table. **One row = one customer antenna**, refreshing live.

![The live stations table: per-row traffic light, local and remote signal, pinned references, latency, CPU and free RAM — with the diagnosis tooltip open on one row](/signal-scope/tabla-estaciones.png)

## The columns

| Column | What it shows |
|---|---|
| **Session** | The connection state to the radio (SSH or HTTP). An HTTP session is painted amber with an open padlock: on that network credentials and metrics travel unencrypted, and it is better to know. |
| **Signal · local / remote** | The product's core reading. Local = what the station receives; remote (in grey) = what the AP receives from it. Meter bar with the traffic-light color. |
| **Reference** | The **"Mark OK"** button pins the current signal as that antenna's reference. With a reference, the signal axis judges the drift (Δ dB), not the absolute value; to update it, first remove it with the **×**. |
| **IP** | A link that opens the radio's web UI, plus a **ping** button that opens a terminal with a continuous ping. |
| **Latency** | The link latency **measured by the radio itself toward its AP** — not a ping from your PC. See below. |
| **Sessions** | The customer's simultaneous connections, counted by the radio when it works in router mode. Informational: tells a quiet customer from a busy one. |
| **AP** | Which base station it is associated with. The **name** jumps to that AP's row; the **antenna icon** filters this table to its other clients. |
| **Link** | airMAX link quality (%), averaged to avoid false criticals. |
| **Modulation** | The rate the station receives at (`6x`, `8x`… or Mbps depending on firmware). Informational: the story behind a reduced capacity. |
| **CPU · Free RAM** | The radio's health: how much CPU it uses and how much memory it has **available** (for free RAM, more is better). Deliberately uncolored — the verdict comes from the diagnosis, which also judges the sustained value, not the instant. |
| **Downlink / Uplink** | The link's estimated capacity according to the AP. **Empty on airOS 6 devices**, which do not compute it: an empty cell tells the truth. |
| **Air** | The link's air efficiency (%). A low value points at the client that is slowing down the rest of its AP. |
| **Thr. TX / RX** | That link's traffic right now. Empty on each session's first reading (nothing to compare against yet). |
| **Ports** | The station's Ethernet port, as an RJ45 connector icon. See below. |
| **Name · Model · MAC · Firmware · Distance · Connected** | Identity and context, as reported by the radio itself. Firmware helps spot outdated devices. |

Almost all of them can be hidden from the **Columns** menu; the choice is
remembered.

## The signal tooltip is the diagnosis

Hovering the signal cell shows the **full multi-variable diagnosis**: state,
causes in plain words (signal below what its distance should give, noise,
channel interference, latency, capacity), SNR/CINR and distance. The
[traffic light and diagnostics](../diagnostics) guide explains how to read
each cause.

## Latency: the average and the peak

The cell shows **two numbers**:

- The **big one** is the sustained average: it answers *"is it usually high?"*.
- The small **`▲`** is the peak of the last 2 minutes, and it only appears when
  the link is genuinely struggling and the jumps are persistent: it answers
  *"does it spike often?"*.

The tooltip carries the detail: average, peak with its age, and the share of
time spent over the threshold.

And there is an optional third number: with **"Medir también con ping
propio"** (Preferences → *Sonda de red*, off by default), the cell adds the
ping **from SignalScope** to each online station, with its loss — the cell
then reads `2 ms / 57 ms`.

::: tip Two measurements that need not match — and that is the point
The radio's latency measures the air hop alone; the ping from SignalScope
crosses the whole path (PC → switch → AP → air → radio). Contrasting them is
pure diagnosis: **if they drift far apart, the bottleneck is not in that
station's air**. One detail when reading the ping: its average only counts
the packets that came back — which is why it always travels with the loss
next to it.
:::

## Ports: the RJ45 connector

The icon summarizes the station's Ethernet port state:

| Look | Meaning |
|---|---|
| Grey | No data (not a fault) |
| Slashed connector, amber | No cable |
| Amber | Half duplex |
| Red | ≤ 10 Mbps — damaged cable or split pair |
| Blue | Fast Ethernet (100 Mbps) — informational, not a problem |
| Green | Gigabit |

100 Mbps is deliberately not flagged as a problem: many installs use Cat5 on
purpose. What does warn is **degradation against the device's own history**:
the app learns the top speed that device has ever negotiated and, if one day
it negotiates less, an amber **`↓`** appears. If the change was legitimate
(the cable was replaced), clicking the `↓` accepts that speed as the new
normal — except at 10 Mbps, which is never an installation decision and
cannot be signed off as normal.

The column also exists in the [AP table](./access-points), where degradation
weighs even more.
