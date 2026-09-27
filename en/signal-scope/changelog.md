# Release notes

The app's **What's new** view sums up each version in headlines. Here is the
detail, with links to each feature's guide.

## 1.3.0 · September 2026

**[MikroTik RouterOS](./supported-devices).** MikroTik devices connect like
airMAX ones and land in the same tables. A box with two radios takes one row
per radio. You pick the system (airOS or RouterOS) when you log in, because
the MAC's vendor isn't enough to tell them apart.

**SignalScope in the background.** You can close the window without stopping
the diagnosis: the app stays in the system tray and the sentinel keeps
watching. To quit completely, use File → Quit SignalScope or the menu of its
tray icon. In Preferences → General you can also add it to the Windows
startup apps, and it starts with the last project you left open.

**Reconnection when a device changes IP.** The app looks for the device by
its MAC and reconnects it. You can step into the process and leave a label
with the reason for the absence.

**Sessions that don't insist after a rejection.** The app recognizes the
device's answers and, if it rejects the account, tries other ways instead of
retrying. That keeps airOS 8.7.18 and later from locking you out after failed
attempts.

**[The sentinel sees more](./sentinel).** It warns when an AP's uplink cable
negotiates at 10 Mbps or half duplex, and it groups by AP the latency that
several of its stations suffer at once: one notice per node. Every Ethernet
port on each device is now read, and in the **Ports** tab of its session you
choose which ones it watches.

**Per-device control.** You can turn off a device's session without
forgetting it (it keeps its record and leaves the diagnosis until you turn it
back on), mute it for a while, or ask to be told when it reconnects. The
**bell** gathers the session's notices.

**[References](./interface/detected-and-others).** The Others table is now
called References and accepts destinations you add by hand, such as a public
IP or a domain, with their status and latency. Each station's signal
reference is now called its **baseline**, and it works as before.

**Modulation in both directions.** The Modulation column shows downlink and
uplink (`8x/1x`), because a radio can receive perfectly and transmit very
badly.

**Fuller reports.** PDF, Excel and CSV reports include each device's CPU use
and free RAM, and your References with their status, response time and loss.

**[The Map, inside and out](./interface/map).** The light and dark maps come
from OpenFreeMap and need no key, and you can turn on terrain relief. The
satellite view uses Google Maps with your own API key, registered in
Preferences → Map. Coverage modes arrive (Footprint, Focus and Detail), along
with the marker showing the distance to each node and
[new shortcuts](./shortcuts). RouterOS devices don't report their location, so
you can pin coordinates on them by hand; those are saved only in the project.

**Update from the app.** When a new version is out, the **Update** button
appears. On Microsoft Store installs, the update downloads and installs from
inside the app.

**Fixes.**
- Dark theme contrast.
- Duplicate sessions that recorded the same device twice.
- New devices that discovery discarded because they matched others that once
  had the same IP.
- Reading coordinates on airOS.
- Where you land after clicking a sentinel notice.
- Snapshot comparison.

## 1.2.3 · August 2026

- **The sentinel's notices reach the desktop again** on **Microsoft Store**
  installs, where Windows was silently discarding them. The sentinel did
  detect the faults; what wasn't arriving was the notification.

## 1.2.2 · August 2026

- **Messaging no longer leaves your number in sight.** The destination
  summary masks your phone and your Telegram group's key, so they don't show
  up in a screenshot or a shared session.

## 1.2.1 · August 2026

- **The sentinel no longer marks a fault resolved when what dropped was the
  session.** It marks it **"Sin medir"** (not measured) and warns again as
  soon as the device responds. Before, an unstable node could silence its
  clients' misaligned antennas for hours.
- **Misaligned antenna warns from 6 dB** of difference between polarities,
  not 10. That is the limit Ubiquiti itself recommends. You will see notices
  for twisted antennas that before only showed up when opening their
  diagnosis.

## 1.2.0 · August 2026

The biggest version so far. Monitoring gets a map, alerts, phone notices,
spectrum planning and field tools.

**[Coverage map](./interface/map).** The second main view, alongside the
Monitor. You register your nodes (the site: tower, mast, pole), assign their
APs and draw each one's sector with azimuth, beamwidth and range, colored by
band. Stations are placed by their own coordinates, with their diagnosis
color and their link drawn to the real AP. The map travels frozen inside
Snapshots.

**[Service sentinel](./sentinel).** It warns about the failures the signal
doesn't reveal: AP down (one alert per node, saying how many stations it
takes down), dropped session, unplugged LAN cable, half duplex, misaligned
antenna and saturated radio. With Windows notifications on, notices reach the
desktop even with the app minimized, and clicking one takes you to the
device.

**[Phone notices](./sentinel#phone-notices-whatsapp-or-telegram).** The
failures the sentinel detects can reach you on WhatsApp or Telegram (via
CallMeBot). You choose which events go through each channel, and each type
groups and spaces its messages by urgency.

**[Frequency planner](./tools#frequency-planner).** It shows which slice of
the spectrum each AP occupies, how much is free and which channels fit the
width you want, with suggestions, DFS detection and the AP list grouped by
node.

**[Multi-variable diagnosis](./diagnostics).** The verdict no longer rests on
signal alone. There are seven axes (signal in context, noise and
interference, link quality, capacity, Ethernet port, chain imbalance and
radio health), with the causes explained in words. The table adds Ethernet
port, modulation, link latency and sessions columns, and the
[AP gets its own three-axis diagnosis](./interface/access-points).

**[Field tools](./tools).** Continuous ping with per-target statistics
(grouped by sector and minimizable), traceroute with your radios highlighted
along the route, an iperf speed test between two machines and
[comparison between two Snapshots](./snapshots#comparing-two-moments) (beta).

**[Global search (Ctrl+K)](./shortcuts#the-global-search-ctrl-k).** Type the
customer who called and the app puts their station and its AP on screen, even
if a filter had them hidden.

**[Network score](./sentinel#the-network-score).** A 0 to 100 grade for the
whole network, with its coverage declared, that you can download as an image
to share.

**[Detected and Others](./interface/detected-and-others).** What used to be
one drawer splits in two: the scan's temporary queue and the permanent
inventory of the devices you don't manage (routers, ONUs, switches), with an
editable name and optional availability watch. Since 1.3.0, Others is called
References.

**Also.** A third report format, **CSV**, that opens with a double click in a
Spanish-locale Excel. **CPU and free RAM** columns in the stations and AP
tables, with **Airtime** as its own column on APs. The **Ports** column
reaches the APs too, because a degraded cable on an AP chokes its whole
sector. An optional **ping probe** sits next to the radio's latency to compare
the air with the full path. The **license expiration notice** comes with
**"Renew license"**, which opens the payment link already issued. The
**Others** inventory also travels inside each Snapshot, read-only. The
**Ctrl+M** shortcut switches between Monitor and Map, and **Help → "How
calibration works"** explains where the app's limits come from.

**More faithful readings.** M5 and other airOS 6 devices are back in. Each
AP's air usage is no longer read multiplied. A radio that changes IP
reconnects on its own, because its identity is its MAC.

**New look.** A visual redesign, and the Welcome reorganized with direct
access to Projects, What's new and License.

## 1.1.2 · July 2026

- **Microsoft Store** channel preparation.
- Text fixes after ceasing to be a portable app: data lives in the user
  profile and migrates on its own.

## 1.1.1 · July 2026

- **New-version notice** on startup.
- **Hardened transfer code.** An `.sscope` that asks for a code no longer
  half-opens: without the code, nothing is shown.

## 1.1.0 · July 2026

- **[Snapshot privacy](./sharing#protecting-sensitive-data)**: trim sensitive
  data (IPs, MACs, names, model) before sharing a Snapshot, permanently and in
  the file itself.
- Open an `.sscope` or `.ssnap` with a **double click** from the file
  explorer.
- **Single instance**: double-clicking with the app open brings it to the
  front instead of opening another one.

## 1.0.0 · July 2026

First version: driverless network scanning (ping and ARP), SSH or HTTP
sessions with airMAX radios and automatic classification into Stations and
APs, a signal traffic light with
[per-antenna references](./diagnostics#baseline-compare-against-your-own-network)
(now called baselines),
Snapshots and PDF and Excel reports.
