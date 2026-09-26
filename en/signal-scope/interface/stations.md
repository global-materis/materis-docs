# Stations

The main table. **One row = one customer antenna**, refreshing live.

![The live stations table: per-row traffic light, local and remote signal, pinned baselines, latency, CPU and free RAM — with the diagnosis tooltip open on one row](/signal-scope/tabla-estaciones.png)

## The columns

| Column | What it shows |
|---|---|
| **Session** | The connection state to the radio (SSH or HTTP) — and, if it is absent, [what is going on](#when-a-device-goes-absent) — plus the marks of what *you* decided about that device: switched off, muted, reconnection notice set. One click opens the [session window](#the-session-window). An HTTP session is painted amber with an open padlock: on that network credentials and metrics travel unencrypted, and it is better to know. |
| **Signal · local / remote** | The product's core reading. Local = what the station receives; remote (in grey) = what the AP receives from it. Meter bar with the traffic-light color. |
| **Baseline** | The **"Mark"** button pins the current signal as that antenna's baseline, and the cell then shows that value (`−58 dBm`) with an **×** to remove it. With a baseline, the signal axis judges how far it dropped from it, not the absolute value; to update it, first remove it with the **×**. See [Traffic light and diagnostics](../diagnostics#baseline-compare-against-your-own-network). |
| **IP** | A link that opens the radio's web UI, plus a **ping** button that opens a terminal with a continuous ping. |
| **Latency** | The link latency **measured by the radio itself toward its AP** — not a ping from your PC. See below. |
| **Sessions** | The customer's simultaneous connections, counted by the radio when it works in router mode. Informational: tells a quiet customer from a busy one. |
| **AP** | Which base station it is associated with. The **name** jumps to that AP's row; the **antenna icon** filters this table to its other clients. |
| **Link** | airMAX link quality (%), averaged to avoid false criticals. On **RouterOS** devices this cell shows **CCQ**, labelled and **uncolored**: it is a different indicator and has no calibrated thresholds yet. |
| **Modulation** | **Both directions, down and up** (`8x/1x`). Informational: it does not change the traffic light, but it tells the story behind a reduced capacity. See [below](#modulation-both-directions). |
| **CPU · Free RAM** | The radio's health: how much CPU it uses and how much memory it has **available** (for free RAM, more is better). Deliberately uncolored — the verdict comes from the diagnosis, which also judges the sustained value, not the instant. |
| **Downlink / Uplink** | The link's estimated capacity according to the AP. **Empty on airOS 6 devices**, which do not compute it: an empty cell tells the truth. |
| **Air** | The link's air efficiency (%). A low value points at the client that is slowing down the rest of its AP. |
| **Thr. TX / RX** | That link's traffic right now. Empty on each session's first reading (nothing to compare against yet). |
| **Ports** | **Every** Ethernet port on the device, one RJ45 connector per port, in the order the device names them. See below. |
| **Name · Model · MAC · Firmware · Distance · Connected** | Identity and context, as reported by the radio itself. Firmware helps spot outdated devices. |

Almost all of them can be hidden from the **Columns** menu; the choice is
remembered.

::: tip Empty cells on MikroTik devices
Latency, Air, Distance, Sessions and the remote signal come out **empty** on
RouterOS: that system does not publish them. An empty cell tells the truth; a
number that looks like a measurement without being one does not. The full list is
in [Supported devices](../supported-devices#what-you-see-from-a-mikrotik-and-what-you-do-not).
:::

## The Session cell and what you decided

Besides the connection state, this cell carries the **marks of what you decided**
about that device. There are three, with the same glyph you will see in the
actions window — there it is learned with its text beside it, here it is
remembered at a glance:

| Mark | What it means | Where it is set |
|---|---|---|
| **Session switched off** | The app **stops connecting** to that device — no CPU cost, no flood of alerts — but **keeps its credentials and its record**. It stays off even after you close the app. One click on the cell switches it back on. | Session window → *Actions*, above Forget |
| **Alerts muted** | The device **keeps being measured**; what goes quiet is the output (panel, Windows and messaging) for the period you choose. | Session window → *Actions* |
| **Reconnection notice set** | The app will tell you when that device reconnects. | Session window → *Actions* |

All three are explained in [Sentinel and network score](../sentinel#what-you-decide-per-device).

::: warning Actions take the whole box
On a device with several radios — two rows, one session — switching off, muting
or forgetting **applies to both**. The app warns you before you press, not after.
:::

## The session window

One click on the **Session** cell of an already registered device opens its
window, with four tabs:

| Tab | What for |
|---|---|
| **Actions** | What you decide about the device: reason for absence, mute alerts, notify on reconnection, switch the session off and forget the device. It is the tab the window opens on. |
| **Ports** | Which Ethernet ports the sentinel watches. See [below](#ports-the-sentinel-watches). |
| **Log** | What the app tried with that device and how each attempt ended. See [below](#the-session-log). |
| **Connection** | IP, system, protocol, port and account, to correct them. **Update** reconnects with that data; the saved password is not shown, so you type it again. |

All of this works the same for an [access point](./access-points).

### Reason for absence

Only shown while the device is **absent**. If you know why it is not there, you
mark it: **Suspended**, **Technical** or **Retired** (**Absent** lets the app say
it). The Session cell shows your label instead of "Absent".

- It is **informational**: the app keeps trying to connect. To make it stop,
  **Switch session off**.
- With a reason set, the app does not ask you to step in for that device: you
  already know what is going on.
- It is saved in the project and **clears itself when the device comes back**,
  with a notice in the bell: *"A labeled device came back"*.

### Notify on reconnection

You mark the device and the app tells you when it reconnects: **Once** or
**Always** (on every drop and recovery, until you remove it). Details in
[Sentinel](../sentinel#notify-on-reconnection).

### When the app needs you to step in

There are three cases the app cannot solve on its own. In all three it **pauses
the session**, paints the Session chip **violet**, leaves a notice in the
[bell](../sentinel#the-bell-what-it-told-you-while-you-were-working) and shows
in *Actions* what it needs from you: the **"Needs your attention"** card with
**Try again**, or the comparison of a possible replacement.

| Case | What happens | What you do |
|---|---|---|
| **Unknown IP** | It does not answer at its IP and the app has no way to find the new one (for example, its AP sees it connected but does not know its IP). | Type the new IP in *Connection*, or press **Try again** once you have sorted it out. |
| **Account rejected** | The account is rejected at its IP and the device was not found anywhere else. | Correct the account or the IP in *Connection*, or **Try again** once you fix it on the device. |
| **Possible replacement** | **Another device with the same name** answers at its IP. | You decide in the comparison below. |

**Try again** resumes the session with the saved data. If the device comes back
on its own, the request is withdrawn; the notice stays in the bell.

#### Possible replacement

When you swap a radio for another and give it the same name, the app does not
assume it: it puts **both side by side** — name, MAC, model and firmware, IP, AP
and when it was last seen — and marks what does not match.

- **"Yes, it replaces the old one"** — the new one **inherits its place**: name,
  baseline, ports, coordinates, silences and notices, and the credential. Earlier
  snapshots keep the old one with its MAC, and when you compare them you will see
  *"Replaced by …"* / *"Replaces …"*.
- **"No, they are different devices"** — the one that answered goes to
  **Detected** and the app keeps looking for the registered one. It does not ask
  again about that same pair.

### Ports the sentinel watches

One card per port, with its real state (no cable, speed, half duplex) and a
switch. **The sentinel only warns about ports that are switched on.** It works
for any station or AP, even with a single port: switching off the only one takes
it out of the watch.

- **The first one comes on by default.** Switching them all off is valid: the
  tab warns you about the consequence, but does not stop you.
- The change applies as soon as you press.
- **Ports you do not watch are still drawn** in the Ports column, with their
  state in the tooltip, but **without severity color** and without raising
  alerts.
- **One alert per device**, even if two watched ports go down.
- **The choice belongs to the device, not the row**: on a router with two radios
  it applies to both.

::: tip Name them on the device
Each port is shown with its interface name. If you renamed it on the device, the
sentinel's alert says **that name** instead of `ether3`: *"Sector norte lost its
cable"* is understood without going to look.
:::

::: warning The app does not guess which one carries the service
Deducing it from the device's default route **does not work**: put a radio in
station mode and the route goes out over the air, so `ether1` stops being the
exit. You know it, which is why you choose it.
:::

### The session log

The **Log** tab is that device's record: **what the app tried and how it
ended**, line by line and in order, each with its date and time — the lost
session, each connection attempt with its address and result, each ping, where
its AP sees it, each IP update. It tells you what happened without guessing from
whether the row comes back.

- It keeps the **last 100 entries** per device, **while the app is open**: it is
  not saved in the project and does not travel in a capture.
- **Copy** puts it on the clipboard, to paste into a report or an email to
  support. **Clear** empties it, to see only what happens from now on.

## When a device goes absent

A station or AP that loses its session goes **Absent**, keeps its last reading,
and **the app takes care of getting it back**:

- It **watches it with ping** and logs back in as soon as it answers, or as soon
  as its AP sees it connected.
- If it **changed IP**, the app looks for it in its AP's station list, in the
  other APs' lists and via ARP on this PC's network. If it finds it — and on
  logging in confirms it is the same device — it reconnects at the new IP on its
  own and tells you. If the one that changed IP is an **AP**, it also leaves a
  notice in the bell: for an AP that is not normal.

Meanwhile, the Session chip says what is going on:

| Chip | What it tells you |
|---|---|
| **Reconnecting** | It just lost the session and the app is retrying. |
| **Searching** | It does not answer at its IP; the app is looking for it elsewhere. |
| **Possible cut** | Its AP sees it connected with its Fallback IP — a likely administrative cut, like a PPPoE cutoff for non-payment — or the device **drops and comes back** over and over. The link is not the problem. |
| **Blocked at the AP** | Its AP's access list does not let it connect. Not a fault, not a power-off. On airOS it is only detected with a full-access account on the AP. |
| **Cut at its AP** | A firewall rule on its AP (a routing MikroTik) drops its traffic. |
| **No network on this PC** | The one that lost its network is your PC. In that case you get **a single notice**, *"This PC lost its network"*, instead of one per device, and another when it is back. |
| **Out of service** | One radio of a multi-radio device vanished from its reading: it is disabled or out of service, and the rest of the device is still online. |
| **Absent** | No further clues: off or unreachable. |

The chip's tooltip gives the detail and when it was last seen; the
[Log](#the-session-log) tab tells each step. If what the app needs is an IP or
an account only you know, the chip turns
[violet](#when-the-app-needs-you-to-step-in).

## Modulation: both directions

The column shows **down and up**, separated by a slash: `8x/1x`. It is not
decoration — **they fail independently**.

The case that made it grow: a customer who kept dropping out was receiving at
`8x` and **transmitting at `1x`** — the slowest modulation there is — with the
signal at −43 dBm, balanced chains, noise at −86 and CINR at 37. No diagnosis
axis saw it, because **they all describe how the device *receives***, and the
column, showing only the downstream, said `8x`. It wasn't that it failed to
help: **it reassured**.

How to read the pair:

- **Both drop together and in proportion to the signal** (`6x/6x` at −67 dBm):
  ugly, but coherent — that is a misaligned antenna, and those customers rarely
  report outages.
- **An asymmetry with a pristine signal** (`8x/1x` at −43 dBm) is another matter:
  a stuck transmitter. It survives moving to another AP and clears by
  **restarting the radio**.
- If one side is missing it is painted `—` rather than disappearing: half a blank
  column would hide precisely the faulty direction.

On devices that **publish no index** — older airMAX and every RouterOS — the
column shows **both rates in Mbps**. They are not two different data: it is the
same measurement in whatever notation each firmware hands over.

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

And there is an optional third number: with **"Also measure with our own
ping"** (Preferences → *Network probe*, off by default), the cell adds the
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

## Ports: one connector per port

The column shows **every Ethernet port on the device**, in the order it names
them. A single-port radio — half the fleet — shows one.

Each RJ45 connector summarizes its own port's state:

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

Two reading nuances: the **no cable** state shows here and the sentinel
notifies it, but it **does not change the row's color** — a router turned off
at night or a cutoff for non-payment are not link faults. And **10 Mbps**
does put the row in Critical: no airMAX ships with that maximum.

::: tip When the port is the only problem, the signal is not painted red
The device stays flagged critical and the row stays tinted, but **the signal
number is painted for what it is worth**. The problem is pointed at by the Ports
column and the diagnosis, which is where it gets fixed — not by the antenna,
which is fine.
:::

Which ports the sentinel watches is chosen in the
[Ports](#ports-the-sentinel-watches) tab of the session window.

::: info 🖼️ Image pending — `puertos-vigilados.png`
The Ports tab of the session window: one card per port with its real state (no
cable, 1 Gbps full duplex, half duplex) and its switch.
:::

The column also exists in the [AP table](./access-points), where degradation
weighs even more.
