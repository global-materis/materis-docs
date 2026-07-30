# Security and privacy

The principle that orders everything else: **your network's data lives on your
machine**. IPs, MACs, names, metrics, locations, projects, snapshots and
credentials are stored only on your computer. No cloud, no usage analytics, no
tracking.

## When the app uses the internet

Three specific situations, and none of them carries your network's data:

| Situation | What travels |
|---|---|
| **Activating and revalidating the Full license** | Your email, your license key and the machine identifier (HWID). Only that, and only for that. The **trial is 100 % local**: it sends nothing. |
| **Checking for a new version** | A request to a public version file, like any web download. |
| **The coverage Map** | Map images are downloaded from public cartography providers (CARTO/OpenStreetMap and, in satellite view, Esri). They see what any web server sees: your IP and which map area you requested — **never** your devices' locations, names or metrics, which stay in your project. If you don't open the Map, these requests never happen. |

The app **does not access your device's location**: your nodes' coordinates
are placed by you, by hand, on the map.

## Inside your network

What the app does on your local network stays on your local network:

- **Discovery**: pings to the ranges you register and the system's ARP table.
  It installs no drivers and captures no traffic.
- **Radio sessions**: with the credentials you register, and **read-only**
  state queries.
- **Tools** (continuous ping, traceroute, device watch): they generate traffic
  only toward the devices you choose and only while you use them.
- **SNMP**: off by default; it only acts if you enter a community, and only
  with read queries.

## Your credentials

Your radios' passwords are stored **encrypted** on your machine. The master
key protecting them lives in the **Windows credential store**, anchored to
your user and your machine — never in a file. That is why copying an `.sscope`
to another PC does not expose credentials: that is what the
[transfer code](./sharing#sharing-the-project-the-transfer-code) is for.

In transit, **SSH and HTTPS encrypt** the session with the radio. **HTTP does
not** — if a device only accepts that mode, the app marks it amber with an
open padlock so the decision is yours, instead of hiding it.

## Read-only, always

SignalScope **never sends a configuration command to a radio**. It is a design
rule of the product, not an option: no path exists in the app to modify a
device.

## Your data, your control

- Local data is removed by deleting the app's files or uninstalling it.
- License data (email, key, HWID) is kept in the licensing system while your
  license is active; you can request its removal by writing to
  **support@materis.io**.
- When sharing, you decide what leaves: files travel by your own means — never
  through our servers — and
  [snapshot protection](./sharing#protecting-sensitive-data) trims what is
  sensitive before sending.

---

The complete, current text is in SignalScope's
[privacy policy](https://signal-scope.materis.io/en/privacidad).
