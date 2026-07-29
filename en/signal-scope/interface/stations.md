# Stations

The main table. **One row = one customer antenna**, refreshing live.

::: info 🖼️ Image pending — `public/signal-scope/tabla-estaciones.png`
Screenshot of the **stations table** with several rows: traffic light, signal,
reference and latency visible.
:::

## The columns

| Column | What it shows |
|---|---|
| **Session** | The connection state to the radio (SSH or HTTP). An HTTP session is painted amber with an open padlock: on that network credentials and metrics travel unencrypted, and it is better to know. |
| **Signal · local / remote** | The product's core reading. Local = what the station receives; remote (in grey) = what the AP receives from it. Meter bar with the traffic-light color. |
| **Reference** | The **"Mark OK"** button pins the current signal as that antenna's reference. With a reference, the traffic light judges the drift (Δ dB), not the absolute value. |
| **IP** | A link that opens the radio's web UI, plus a **ping** button that opens a terminal with a continuous ping. |
| **Latency** | The link latency **measured by the radio itself toward its AP** — not a ping from your PC. See below. |
| **Sessions** | The customer's simultaneous connections, counted by the radio when it works in router mode. Informational: tells a quiet customer from a busy one. |
| **AP** | Which base station it is associated with. The **name** jumps to that AP's row; the **antenna icon** filters this table to its other clients. |
| **Link** | airMAX link quality (%), averaged to avoid false criticals. |
| **Modulation** | The rate the station receives at (`6x`, `8x`… or Mbps depending on firmware). Informational: the story behind a reduced capacity. |
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
channel interference, latency, capacity), SNR/CINR and distance. The traffic
light and diagnostics guide (coming soon) explains how to read each cause.

## Latency: the average and the peak

The cell shows **two numbers**:

- The **big one** is the sustained average: it answers *"is it usually high?"*.
- The small **`▲`** is the peak of the last 2 minutes, and it only appears when
  the link is genuinely struggling and the jumps are persistent: it answers
  *"does it spike often?"*.

The tooltip carries the detail: average, peak with its age, and the share of
time spent over the threshold.

::: tip Your PC's ping does not measure the same thing
This column is measured by the radio over its wireless hop. A ping from your
computer also crosses your local network and everything in between — the two
numbers need not match.
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
the app learns the top speed that device has ever negotiated and, if one day it
negotiates less, the icon points it out. If the change was legitimate (the
cable was replaced), one click accepts the new speed as normal.
