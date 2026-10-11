# Security and privacy

The principle that orders everything else: **your network's data lives on your
machine**. IPs, MACs, names, metrics, locations, projects, Snapshots and
credentials are stored only on your computer. There is no cloud, no usage
analytics and no tracking.

## When the app uses the internet

In five specific situations. Only the last one, **optional and off by
default**, carries your network's data:

| Situation | What travels |
|---|---|
| **Activating and revalidating the Full license** | Your email, your license key and the machine identifier (HWID), to Materis's licensing system. Only that, and only for that. The **trial is 100 % local**: it sends nothing. |
| **Checking for a new version** | At startup and every six hours, a request to a public version file (on GitHub), like any web download. If you installed from the Microsoft Store, the check goes to the Store instead. |
| **The Coverage map** | Map images are downloaded from public providers: **OpenFreeMap** (with OpenStreetMap data) for the street plans, and elevation data from **Terrain Tiles** (AWS Open Data) **only if you turn relief on**, which is off by default. The **Satellite** view uses **Google Maps**, and only with **your own API key**. These providers see what any web server sees: your IP and which map area you requested. They **never** receive your devices' locations, names or metrics, which stay in your project. If you don't open the Map, these requests never happen. |
| **References outside your network** (if you monitor them) | If you add a public IP or a domain as a Reference and monitor it, the app pings it from your PC every few seconds, and resolves a domain with your system's DNS. That target sees your public IP, as with any ping, and **receives no data about your network**. It stops as soon as you remove it or turn its monitoring off. |
| **Messaging notifications** (if you enable them) | Each notification's text (the project name and, per device, its name, IP and AP) travels to **CallMeBot**'s servers, which deliver it to your WhatsApp or Telegram. If you choose a Telegram group, the whole group reads the notification. With messaging off, none of this happens. |

The app **does not access your device's location**: you place your nodes'
coordinates by hand on the map.

## Inside your network

What the app does on your local network does not go out to the internet:

- **Discovery**: pings to the ranges you register and a lookup of the
  system's ARP table. It installs no drivers and captures no traffic.
- **Radio sessions**: over SSH, HTTPS or HTTP, with the credentials you
  register, and only to **read** their state.
- **Devices that change IP**: if a device with a saved session stops
  answering at its address, the app looks for it by asking your APs and
  stations and checking the ARP table. Before updating anything, it confirms
  by MAC that it is the same device.
- **Tools** (continuous ping, traceroute, device monitoring): they generate
  traffic only toward the devices you choose and only while you use them.
- **Speed test server**: when you start it, the app opens a listening port on
  your machine. It only measures the volume transferred and stops listening
  when you stop it or quit the app.
- **SNMP**: off by default. It only acts if you enter a community in **File →
  Security → SNMP**, and then it asks for the identity of devices outside your
  local networks and of those from an unknown manufacturer. The rest are never
  queried, and nothing is ever changed on them.

## Your credentials

Your radios' passwords and the SNMP community are stored **encrypted** in
your project. The master key protecting them lives in the **Windows
credential vault**, anchored to your user and your machine, and never in a
file. That is why copying an `.sscope` to another PC does not expose
credentials: that is what the
[transfer code](./sharing#sharing-the-project-the-transfer-code) is for.

In transit, **SSH and HTTPS encrypt** the session with the radio. **HTTP does
not**: if a device only accepts that mode, the app marks it amber with an open
padlock so the decision is yours. **RouterOS devices always come in over
SSH**, so their session is always encrypted. SNMP v1 does not encrypt either:
the community travels in clear text across your network, as with any tool
that uses it.

There are two more credentials, for services that **are not part of your
network**, and they are stored differently:

- **The Google Maps API key** (Satellite view) is stored encrypted in the
  **Windows credential vault**, tied to that machine and that user. It does
  not travel inside the project and is not copied when you share it, so after
  changing PCs you have to paste it again. **Remove** in **Preferences → Map**
  deletes it.
- **The CallMeBot phone number, Telegram username and key** are stored
  **unencrypted** on your machine, among the app's preferences and outside the
  project: they do not go in an `.sscope` or in a Snapshot. Anyone using your
  Windows session can read them. The app shows them **masked** so they do not
  appear in a screenshot or in a shared session.

## Read-only, always

SignalScope **never sends a configuration command to a radio**. It is a design
rule of the product and not an option: the app has no way to modify a
device.

## Your data, your control

- Local data is removed by deleting the app's files or uninstalling it.
- License data (email, key, HWID) is kept in the licensing system while your
  license is active. Your purchase data is handled by Materis under
  [its policy](https://materis.io/privacidad). To request removal, write to
  **support@materis.io**.
- When sharing, you decide what leaves: files travel by your own means, never
  through our servers, and
  [Snapshot protection](./sharing#protecting-sensitive-data) trims what is
  sensitive before sending.

In the app, **File → Security → About** summarizes these same rules and links
to the published privacy policy.

---

The complete, current text is in SignalScope's
[privacy policy](https://sscope.materis.io/en/privacy).
