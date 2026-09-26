# Glossary

The terms this documentation uses, in plain language. They are grouped by
topic rather than alphabetically, so related terms sit together.

## The wireless network

**WISP** (*Wireless Internet Service Provider*): the kind of operator
SignalScope exists for.

**AP (Access point)**: the **base** antenna, usually on a tower or node,
serving several customers at once. The docs also call it the "base station".

**Station (CPE)**: the radio on the **customer's** side, aimed at an AP and
connected to it. Every customer has one.

**Link**: the wireless connection between a station and its AP. When the docs
say "the link degraded", they mean that over-the-air stretch.

**Sector**: an AP and every station hanging off it. A "sector" problem affects
all of those customers at once.

**SSID**: the network name an AP broadcasts, which stations use to find it.

**Frequency / channel**: the slice of spectrum an AP transmits on. Two nearby
APs on overlapping channels interfere with each other.

**Modulation**: the "speaking speed" a radio and AP negotiate (`6x`, `8x`…).
A higher modulation gives more capacity but demands better signal. A link with
poor signal drops its modulation, which is why it delivers less than expected.
**It is negotiated separately in each direction**, and the app shows both
(`8x/1x`) because a radio can receive perfectly and transmit very badly.

**Airtime (air in use)**: the percentage of time the channel is busy. With air
at 70 % or more, the channel is saturated and clients wait their turn to
transmit.

## The signal

**dBm**: the unit of signal strength. It is **negative**, and the closer to
zero, the stronger: −55 dBm is better signal than −70 dBm. It is SignalScope's
central reading.

**Noise (noise floor)**: the background energy present on the channel even
when nobody transmits. It is measured in dBm, and a high floor "drowns" the
useful signal.

**SNR** (*Signal-to-Noise Ratio*): the margin between your signal and the
noise floor, in dB. Higher is better. With little margin, the radio cannot
tell signal from noise.

**CINR**: like SNR, but it also discounts **interference from other
transmitters** on the channel. That is why it can catch a dirty channel even
when the signal "looks fine".

**Chains (polarities)**: the two paths of a modern antenna (horizontal and
vertical), which should receive almost the same. A large imbalance betrays a
rotated or damaged antenna.

**Link quality (linkscore)**: airMAX's indicator, from 0 to 100 %, of how
healthy the link is beyond signal alone.

**CCQ**: RouterOS's equivalent indicator, also from 0 to 100 %. **It is not
the same number** as the airMAX linkscore because it is computed differently,
so the app labels it and **does not colour it** until there are field-measured
thresholds.

**Latency**: the round-trip time of data, in milliseconds (ms). With high
latency the service feels "slow" even when the contracted speed is there.

**Throughput**: the traffic the link is carrying **right now**, that is, what
the customer is consuming. Capacity, by contrast, is what the link could
carry.

## The network and its protocols

**IP**: a device's address on the network. **It can change**, which is why
SignalScope does not identify devices by their IP.

**MAC**: every network device's factory-set physical identity, which **does
not change**. SignalScope recognizes each device by its MAC even when its IP
changes.

**OUI (manufacturer)**: the first pairs of the MAC, assigned per
manufacturer. With them the app suggests what a newly detected device is.

**CIDR (range)**: the notation for a network range. `192.168.1.0/24` is that
network's 256 addresses. It is how the networks to scan are registered.

**ARP**: the system table that maps each IP to its MAC inside the local
network. It does not cross routers, which is why a "routed" device arrives
without a MAC.

**Ping (ICMP)**: the network's simplest question, "are you there?". It
measures whether a device answers and how fast.

**SSH / HTTPS / HTTP**: the means by which the app signs in to a radio. SSH
and HTTPS are **encrypted**. HTTP is not, and the app marks it amber.

**SNMP**: a protocol for querying identity and state. The app uses it only if
you configure it, and only in read mode.

**Half duplex**: an Ethernet port that can only talk in one direction at a
time (full duplex is the norm). It almost always betrays a cable or connector
problem.

**Firmware**: the radio's internal software. Different versions report
different data, and keeping it current avoids surprises.

**airOS**: the system running on Ubiquiti airMAX radios. The app reads the
system, and it is the firmware, more than whoever made the box, that decides
which data arrives.

**RouterOS**: MikroTik's system, which runs across **its whole** catalog, from
a desktop router to a tower sector. Knowing a device is a MikroTik does not
tell you what it is: the device itself says so when you sign in.

**Chassis**: the physical box, when it holds more than one radio. The app
opens **one session per chassis** and draws **one row per radio**. The
chassis data (CPU, memory, ports, model) repeats identically across all its
rows.

**Uptime**: how long a device has been powered on since its last reboot.

## SignalScope's own

**Project (`.sscope`)**: the file containing your whole network: devices,
encrypted credentials, baselines and Snapshots. It saves itself.

**Snapshot**: the whole network's state saved at a given moment, to look at
or compare later. A project holds up to 20.

**`.ssnap`**: a Snapshot exported for sharing. Another SignalScope opens it in
read-only viewer mode, and it never carries credentials.

**Baseline**: the "healthy" signal you pin per antenna with **Mark**. With a
baseline, the signal axis judges how far it dropped from it instead of the
absolute value, and the chip says *Stable*, *Dropped vs baseline* or *Check
link*.

**Detected**: the queue of what the scan found and you have not resolved yet.
It empties as you sign in to each device or move it to References.

**References**: the table of what you do not manage but look at for contrast,
such as the node's router, your provider or a domain like Google. Each row is
a **target**, and you can monitor whether it answers. Details in
[Detected and References](./interface/detected-and-others).

**Absent**: a device that lost its session. It keeps its last reading, and the
app keeps looking for it and reconnects on its own when it comes back or when
it finds it at another IP. Its chip says what is going on (*Searching*,
*Possible cut*, *Blocked at the AP*…). See
[When a device goes absent](./interface/stations#when-a-device-goes-absent).

**Reason for absence**: the label you put on an absent device when you know
why it is not there: *Suspended*, *Technical* or *Retired*. It is
informational and clears itself when the device comes back.

**Needs your attention**: the state of a session the app cannot resolve on its
own (unknown IP, rejected account or possible replacement). The app pauses
it, turns the Session chip violet and asks you for what it needs. See
[When the app needs you to step in](./interface/stations#when-the-app-needs-you-to-step-in).

**Possible replacement**: the case where another device with the same name
answers at a registered device's IP. The app puts both side by side and you
decide whether the new one inherits the old one's place.

**Session log**: the per-device record of what the app tried and how each
attempt ended, with date and time. It is in the **Log** tab of the session
window.

**Traffic light**: each station's color (green, amber or red). It is the worst
axis of its diagnosis, with signal as the main axis. Details in
[Traffic light and diagnostics](./diagnostics).

**Sentinel**: the alert system for the failures the signal does not betray,
such as a loose cable, a port in half duplex or a fallen AP. Details in
[Sentinel and network score](./sentinel).

**Notice tray (the bell)**: the list of what the app told you **while you were
working**, with the time. It differs from the sentinel in that the sentinel
says what is broken now and resolves itself, while the bell says what happened
and is read once.

**Notify on reconnection**: the mark you put on a device so the app tells you
when it connects again, **Once** or **Always**.

**Mute**: silencing **one** device's alerts for a period without ceasing to
measure it.

**Switch session off**: stopping the connection to a device. It keeps its
record and leaves it out of the diagnosis until you switch the session back
on.

**Background**: the mode SignalScope is left in when you close the window with
a project open. The app stays in the system tray, measuring and alerting. To
close it completely, use **File → Quit SignalScope** or right-click its tray
icon.

**Ping from SignalScope**: the optional latency measurement the app itself
takes against each station, on top of the one the radio reports. You turn it
on under Preferences → General → Network probe, and it helps detect problems
that are in the network or in the device's CPU, outside the wireless link.

**Coverage modes**: the three ways of drawing sectors on the Map. **Footprint**
merges them all into a single surface, **Focus** paints only the AP you are
looking at in full, and **Detail** shows each sector by its band.

**Transfer code**: the key (`XXXX-XXXX-XXXX`) that unlocks a project on
another PC. Details in [Sharing](./sharing).

**HWID**: your machine's identifier, used by the license to know which machine
it is active on.
