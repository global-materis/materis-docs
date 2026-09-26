# Supported devices

SignalScope manages two radio systems: **airOS** (Ubiquiti airMAX) and
**RouterOS** (MikroTik). Everything else on your network, such as switches,
ONUs, customer routers and even targets outside your network, is registered in
[**References**](./interface/detected-and-others#references-what-you-look-at-for-contrast)
with its own name and an availability watch.

| System | Status | Since |
|---|---|---|
| **Ubiquiti airOS** (airMAX M and AC) | Supported | v1.0.0 |
| **MikroTik RouterOS 6 and 7** | Supported | v1.3.0 |
| **Ubiquiti LTU** | Under evaluation | — |
| **TP-Link** | Planned | — |

:::info Note on MikroTik RouterOS
MikroTik support has been tested on fewer models than airMAX: verified on two
hAPs (ac² and ac lite) with versions 6.48, 6.49 and 7.23. Any claim about an
SXT, an LHG, or a Basebox is an assumption. Devices with ax chips (the new
RouterOS 7 `wifi` package) are not read — the app cannot see their radios. If
you use another model, contact us at **support@materis.io**.
:::

::: info 🖼️ Image pending: `splash.png`
The v1.3.0 splash screen: the two systems as the two ends of a link ("Ubiquiti ·
airOS" and "MikroTik · RouterOS"), with SignalScope in the middle and the loading
state on the thread that joins them.
:::

## Choosing the system when logging in

The sign-in window has a **System** selector with two options, **airOS** and
**RouterOS**. It comes preselected from the manufacturer the MAC revealed, and
changes with one click.

::: tip Why you choose it instead of the app guessing
A MAC tells you the **manufacturer**, not the operating system, and MikroTik
runs RouterOS across its entire catalog, from a desktop router to a tower
sector. To guess it, the app would have to be right twice: the manufacturer
table would have to be up to date (it is a fixed list, and the IEEE hands out
new blocks without warning) and manufacturer and system would have to match.
They do not.
:::

With **RouterOS** the transport is forced to **SSH** and the HTTP option is
disabled, with the reason in its tooltip. RouterOS 6 has **no REST API** (it
arrived in v7), and what you see open on the web port is WebFig, a browser
interface that cannot be queried. The app connects over SSH on both versions.

## One device, one row per radio

A MikroTik box with **two radios** (the 2.4 GHz one and the 5 GHz one) produces
**two rows**. The radios can be in different modes, so one row may land in
**Access points** and the other in **Stations**, each with its own SSID,
frequency, noise floor, signal and clients.

So as not to misread it:

- **It is a single session.** The app connects once to the box and both rows
  come out of it. Switching the session off, muting or forgetting affects the
  whole box, and the app warns you before you press.
- **What belongs to the chassis repeats.** CPU, memory, uptime, model, firmware
  and the port strip come out identical in both rows: it is one measurement
  shown twice.
- **The choice of watched ports belongs to the device**, not the row, and it
  applies to both.
- A **disabled radio produces no row**, because showing it with no data would
  paint it red forever. One that is on but not yet connected **does show**: a
  station hunting for a network is exactly what you want to see.
- A MikroTik **with no wireless module** (a switch, an edge router) produces no
  radio row at all. The sign-in says so, the device stays in Detected, and its
  place is **References**.

## What you see from a MikroTik, and what you do not

What does arrive, the same as on airMAX:

Signal · chains (both polarities) · noise · SNR · SSID · real frequency and
channel width · transmit power · model · firmware · CPU · free RAM · uptime ·
TX/RX traffic · the state of **every** Ethernet port with its speed, duplex and
the name you gave it · an AP's associated clients · a station's connection time ·
and the **radar** in the Stations column, which asks the AP who is hanging off it
so you can register them without scanning.

The following comes out **empty** because RouterOS 6 does not publish it. An
empty cell tells the truth; an invented number does not.

| Data | Why |
|---|---|
| **Link latency** | RouterOS does not measure latency over the air segment. On airOS the radio itself provides it. |
| **Airtime** | It does not publish channel occupancy, and without latency its AP has no Spikes column either. |
| **Distance** | What RouterOS calls `current-distance` is the ack-timeout setting, not a measurement: it read 1 over a link of a few metres. |
| **Sessions** | It is the kernel's conntrack, which describes something else. |
| **Remote signal** | A MikroTik station does not know how its AP hears it. If that AP is also in the app, its own client row carries the signal it hears. |
| **Downlink / Uplink** | RouterOS gives a single expected-throughput figure, with no direction. |
| **Coordinates** | See below. |

Two readings change form but keep their meaning:

- **Link quality.** RouterOS does not compute the airMAX linkscore, so the column
  shows **CCQ** instead, labelled and **without colour**: it has no calibrated
  thresholds, so it is reported but not judged. An AP with no associated clients
  publishes no CCQ and the cell stays empty.
- **Modulation.** RouterOS publishes no `8x`-style index in either direction, so
  the column shows **both rates in Mbps**. For the same reason, on these devices
  that column **is not compared between two Snapshots**: the PHY rate jumps
  between steps from one reading to the next.

## Coordinates: annotating them from the map

RouterOS **does not allow writing coordinates to the device**, because its GPS
package is read-only. So that a MikroTik can appear on the
[Coverage map](./interface/map#stations-on-the-map), the app lets you **annotate
its position by hand**: you mark the point and record it as that station's
position, either from the marked point's bubble or from the button on its card.

Two things worth being clear about:

- **What you annotate is stored in the project**, not on the device. The app
  says exactly that: *"SignalScope publishes it, not the device"*.
- **It never overrides what the radio reports.** If that device ever reported its
  own position, the radio's would win.

**That button does not exist on airMAX, on purpose.** There, coordinates are
registered on the radio itself (Location/GPS in its interface), where they are
useful to any tool and not just SignalScope.

## Technical details

Some aspects worth knowing:

- **Verified against two hAPs (ac² and ac lite)** running RouterOS 6.48, 6.49
  and 7.23. Any claim about an SXT, an LHG or a Basebox is still an assumption.
- **Devices with ax chips are not read.** They use the new RouterOS 7 `wifi`
  package, which has no `/interface wireless`, so the app doesn't see their
  radios.
- **A MikroTik's traffic light currently uses airMAX thresholds.** They were
  audited axis by axis (signal, chains, CPU and memory are physics and
  percentages, and do not depend on the vendor), but they are **not calibrated**
  against real MikroTik links. Read it with reservation.
  - The known bias: SNR comes from subtracting signal − noise, and **noise
    floors are not comparable**. A hAP reads −103 dBm on 2.4 GHz and −107 on
    5 GHz; a LiteBeam sits around −96. With the same signal, a MikroTik scores
    **7 to 11 dB better**. It is not corrected with an invented number, and the
    risk falls on the benign side: less gets detected, but no alarms are
    invented.
- **Services may sit on moved ports.** If you changed the SSH port on the
  device, enter it in the **Port** field when signing in.

## And whatever is not a radio

Everything else lives in **References**: a switch, an ONU, the customer's
router, a node server, and also **targets outside your network**, such as your
upstream provider's public IP or a domain. For each of them the app knows
**whether it answers and how long it takes**, with its packet-loss percentage,
and the sentinel warns you when it stops answering.

For a reference the app **opens no session and reads no configuration**: it only
checks that it answers. That is the whole promise, which is why it always holds.
