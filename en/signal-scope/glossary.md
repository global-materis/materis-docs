# Glossary

The terms this documentation uses, in plain language. Grouped by topic rather
than alphabetically, so related terms sit together.

## The wireless network

**WISP** — *Wireless Internet Service Provider*. The kind of operator
SignalScope exists for.

**AP (Access point)** — the **base** antenna, usually on a tower or node,
serving several customers at once. In the docs: "base station".

**Station (CPE)** — the radio on the **customer's** side, aimed at an AP and
connected to it. Every customer has one.

**Link** — the wireless connection between a station and its AP. When the
docs say "the link degraded", they mean that over-the-air stretch.

**Sector** — an AP and every station hanging off it. A "sector" problem
affects all of those customers at once.

**SSID** — the network name an AP broadcasts, which stations use to find it.

**Frequency / channel** — the slice of spectrum an AP transmits on. Two
nearby APs on overlapping channels interfere with each other.

**Modulation** — the "speaking speed" a radio and AP negotiate (`6x`, `8x`…).
Higher = more capacity, but it demands better signal; a link with poor signal
drops its modulation, which is why it delivers less than expected. **It is
negotiated separately in each direction**, which is why the app shows both
(`8x/1x`): a radio can receive perfectly and transmit very badly.

**Airtime (air in use)** — the percentage of time the channel is busy. Air at
70 % or more means a saturated channel: clients wait their turn to transmit.

## The signal

**dBm** — the unit of signal strength. It is **negative**, and closer to zero
is stronger: −55 dBm is better signal than −70 dBm. It is SignalScope's
central reading.

**Noise (noise floor)** — the background energy present on the channel even
when nobody transmits. Measured in dBm; a high floor "drowns" the useful
signal.

**SNR** — *Signal-to-Noise Ratio*: the margin between your signal and the
noise floor, in dB. Higher is better; with little margin, the radio cannot
tell signal from noise.

**CINR** — like SNR, but it also discounts **interference from other
transmitters** on the channel. That is why it can catch a dirty channel even
when the signal "looks fine".

**Chains (polarities)** — the two paths of a modern antenna (horizontal and
vertical), which should receive almost the same. A large imbalance betrays a
rotated or damaged antenna.

**Link quality (linkscore)** — airMAX's indicator (0–100 %) of how healthy
the link is, beyond signal alone.

**CCQ** — RouterOS's equivalent indicator (0–100 %). **It is not the same
number** as the airMAX linkscore: it is computed differently, so the app labels
it and **does not colour it** until there are field-measured thresholds.

**Latency** — the round-trip time of data, in milliseconds (ms). High latency
= a "slow" service even when the contracted speed is there.

**Throughput** — the traffic the link is carrying **right now** (what the
customer is consuming), as opposed to capacity (what the link could carry).

## The network and its protocols

**IP** — a device's address on the network. **It can change** (which is why
SignalScope does not identify devices by IP).

**MAC** — every network device's factory-set physical identity, which **does
not change**. It is how SignalScope recognizes each device even when its IP
changes.

**OUI (manufacturer)** — the first pairs of the MAC, assigned per
manufacturer. With them the app suggests what a newly detected device is.

**CIDR (range)** — the notation for a network range: `192.168.1.0/24` is that
network's 256 addresses. It is how the networks to scan are registered.

**ARP** — the system table that maps each IP to its MAC inside the local
network. It does not cross routers — which is why a "routed" device arrives
without a MAC.

**Ping (ICMP)** — the network's simplest question: "are you there?". It
measures whether a device answers and how fast.

**SSH / HTTPS / HTTP** — the means by which the app signs in to a radio. SSH
and HTTPS are **encrypted**; HTTP is not, and the app marks it amber.

**SNMP** — a protocol for querying identity and state. The app uses it only
if you configure it, and only in read mode.

**Half duplex** — an Ethernet port that can only talk in one direction at a
time (full duplex is the norm). It almost always betrays a cable or connector
problem.

**Firmware** — the radio's internal software. Different versions report
different data; keeping it current avoids surprises.

**Uptime** — how long a device has been powered on since its last reboot.

**airOS** — the system running on Ubiquiti airMAX radios. It is what the app
reads, not the brand: what decides which data arrives is the firmware, not who
made the box.

**RouterOS** — MikroTik's system, which runs across **its whole** catalog: from a
desktop router to a tower sector. Which is why knowing a device is a MikroTik
does not tell you what it is — only it can say, on logging in.

**Chassis** — the physical box, when it holds more than one radio. The app opens
**one session per chassis** and draws **one row per radio**; what belongs to the
chassis — CPU, memory, ports, model — repeats identically across all its rows.

## SignalScope's own

**Project (`.sscope`)** — the file containing your whole network: devices,
encrypted credentials, baselines, snapshots. It autosaves.

**Snapshot** — a capture of the whole network's state at a given moment. Up
to 10 per project.

**`.ssnap`** — a snapshot exported for sharing: another SignalScope opens it
in read-only viewer mode. It never carries credentials.

**Baseline** — the "healthy" signal you pin per antenna with **Mark**.
With a baseline, the signal axis judges how far it dropped from it instead of
the absolute value: *Stable*, *Dropped vs baseline* or *Check link*.

**Detected** — the queue of what the scan found and you have not resolved yet.
It empties as you sign in to each device or move it to References.

**References** — the table of what you do not manage but look at for contrast:
the node's router, your provider, a domain like Google. Each row is a
**target**, and you can monitor whether it answers. Details in
[Detected and References](./interface/detected-and-others).

**Absent** — a device that lost its session. It keeps its last reading, and the
app keeps looking for it and reconnects on its own when it comes back or when it
finds it at another IP. Its chip says what is going on (*Searching*, *Possible
cut*, *Blocked at the AP*…): see
[When a device goes absent](./interface/stations#when-a-device-goes-absent).

**Reason for absence** — the label you put on an absent device when you know
why it is not there: *Suspended*, *Technical* or *Retired*. It is informational
and clears itself when the device comes back.

**Session log** — the per-device record of what the app tried and how each
attempt ended, with date and time. It lives in the **Log** tab of the session
window.

**Traffic light** — each station's color (green / amber / red): the worst
axis of its diagnosis, with signal as the main axis. Details in
[Traffic light and diagnostics](./diagnostics).

**Sentinel** — the alert system for the failures the signal does not betray:
loose cable, half duplex, fallen AP. Details in
[Sentinel and network score](./sentinel).

**Notice tray (the bell)** — the list of what the app told you **while you were
working**, with the time. It is the sentinel's opposite: that one says what is
broken now and resolves itself; this one says what happened and is read once.

**Mute** — silencing **one** device's alerts for a period, without ceasing to
measure it. Different from **switching the session off**, which does stop
connecting to it.

**Transfer code** — the key (`XXXX-XXXX-XXXX`) that unlocks a project on
another PC. Details in [Sharing](./sharing).

**HWID** — your machine's identifier, used by the license to know which
machine it is active on.
