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
drops its modulation, which is why it delivers less than expected.

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

## SignalScope's own

**Project (`.sscope`)** — the file containing your whole network: devices,
encrypted credentials, references, snapshots. It autosaves.

**Snapshot** — a capture of the whole network's state at a given moment. Up
to 10 per project.

**`.ssnap`** — a snapshot exported for sharing: another SignalScope opens it
in read-only viewer mode. It never carries credentials.

**Reference** — the "healthy" signal you pin per antenna with **Mark OK**.
With a reference, the signal axis judges the drift instead of the absolute
value.

**Traffic light** — each station's color (green / amber / red): the worst
axis of its diagnosis, with signal as the main axis. Details in
[Traffic light and diagnostics](./diagnostics).

**Sentinel** — the alert system for the failures the signal does not betray:
loose cable, half duplex, fallen AP. Details in
[Sentinel and network score](./sentinel).

**Transfer code** — the key (`XXXX-XXXX-XXXX`) that unlocks a project on
another PC. Details in [Sharing](./sharing).

**HWID** — your machine's identifier, used by the license to know which
machine it is active on.
