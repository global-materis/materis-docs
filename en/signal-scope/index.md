# SignalScope

**See the signal across your whole WISP network at a glance.**

SignalScope is a desktop application for **wireless internet service providers
(WISPs)**. It scans your network, logs into each radio and shows you the
**signal in dBm in real time**, with a traffic light that tells you instantly
which links are healthy and which need attention.

It manages **Ubiquiti airMAX** radios and **MikroTik devices running
RouterOS** — the latter **in beta**, which here means *tested on fewer
models*, not unstable. The details are in
[Supported devices](./supported-devices).

It is **strictly read-only**: it never changes your radios' configuration.

![The live monitor: the stations table with signal in dBm, traffic light, latency, model and AP, with the network counters and snapshot history on top](/signal-scope/monitor-en-vivo.jpg)

## The problem it solves

Without monitoring, an operator learns about a degraded link when a customer
complains — and the complaint rarely tells the whole story: demanding customers
speak up first, the rest suffer in silence, and the link they complain about is
not always the one causing the problem. Watching it by hand does not scale
either: logging into one AP after another to check each link is not sustainable
with dozens of antennas.

SignalScope puts the whole network on one screen and watches it for you:

- **It warns you before the customer calls**: the traffic light and the sentinel
  point at the link that is degrading, even while nobody feels it yet.
- **It points at the origin, not the symptom**: the diagnosis explains whether
  it is signal, noise, AP or frequency saturation — or not a radio problem at
  all.
- **It helps you improve, not just repair**: per-antenna baselines ("this is
  what healthy looks like") and the first hints of saturation, before they turn
  into complaints.
- **It keeps watching after you close the window**: with a project open, the app
  tucks itself next to the clock and goes on measuring and alerting.

## Who it is for

The typical user is the **field technician or network lead** at a rural or
neighborhood WISP: someone who needs to see at a glance which customer antennas
are degraded, keep a record of it and share that record with a colleague.

You do not need to be an RF specialist. The app translates the radio's raw
metrics into an understandable state and a plain-language explanation.

## What it does

| | |
|---|---|
| 🛰️ **Discovers your network** | Scans the CIDR ranges you register and finds devices through ping + the system ARP table. No drivers, no extra installs. |
| 🔑 **Logs into each radio** | Over HTTP or SSH, one by one or in a cascade (all at once). You pick the device's **System** — airOS or RouterOS — and it reports its own mode: it is classified automatically as a **Station** or an **Access Point**. |
| 📡 **Monitors live** | Continuous refresh of signal, noise, SNR, link quality, throughput, distance and uptime. |
| 🚦 **Traffic light per link** | Green / amber / red by dBm thresholds, or relative to the **baseline you set** for that antenna. |
| 🧠 **Diagnoses** | Explains each link's state in plain language and points at where to look. |
| 🛎️ **Service sentinel** | Warns about faults the signal does not reveal: a loose LAN cable, half duplex, a port down to 10 Mbps, a misaligned antenna, a saturated radio, a slow link. |
| 🔕 **Mutes what you already know about** | A device with a known fault goes quiet for a while — without ever stopping being measured. |
| 🔔 **Tells you when something comes back** | Mark a device that went down and the app notifies you the moment it answers, once or every time. |
| 🔁 **Recovers sessions on its own** | If a device changes IP, the app finds it through its AP and reconnects on its own; if only you can solve it, it asks you. |
| 📱 **Phone notices** | The sentinel's alerts can reach you on WhatsApp or Telegram, choosing which events and with what urgency. |
| 🧾 **Watches what you don't manage** | A switch, an ONU, the customer's router — and also a public IP or a domain outside your network: they live in **References** with their own name and an "is it still alive?" watch, with response time and packet loss. |
| 📸 **Keeps history** | Snapshots of the network state, with the difference (Δ) against the present moment. |
| 📄 **Exports** | PDF, Excel and CSV reports for the customer or for your own records. |
| 🗺️ **Coverage map** | Your devices and their state placed on a map, with terrain relief and three ways of drawing coverage. |
| 🏅 **Scores the network** | A grade for the whole fleet, downloadable as an image. |
| 🤝 **Shares without exposing** | A snapshot strips sensitive names and IPs; the other operator opens it in viewer mode. |

![The diagnosis of a critical station: signal 9 dB below what is expected at its distance, low link quality and downlink well below expectations](/signal-scope/diagnostico.png)

## What it does **not** do

Just as important as the above:

- **It does not configure radios.** SignalScope never sends a write command to a
  device. There is no way to take a link down by accident from the app.
- **It does not send your data to any server.** Your network's information lives
  only on your computer, in an encrypted file.
- **It does not replace the radio's own interface** for configuration work: it
  is the observation and diagnosis layer above it.
- **It does not watch with the app fully closed.** Closing the window leaves it
  watching next to the clock; quitting from its tray icon menu stops monitoring.

## How your devices are organized

The app works with four tables, and understanding the difference between them
saves confusion from day one:

| Table | What it holds | Permanence |
|---|---|---|
| **Detected** | What the scan just found and you have not identified yet. It is your **work queue**. | **Temporary**: it empties as you resolve each device, and disappears from view once no rows are left. |
| **Stations** | Customer radios (CPE), with their signal, traffic light and diagnosis. | Permanent |
| **Access points** | Your base antennas, with connected clients, channel, frequency and load. | Permanent |
| **References** | What you **do not manage** but look at for contrast: the node's router, an ONU, a switch — and also targets outside your network, such as your provider or a domain like Google. You name them and, if you want, watch whether they still answer. | Permanent: always there, even when empty |

A device leaves **Detected** in one of two ways: by **logging into it** — the
radio itself declares whether it is a station or an AP, and the classification is
automatic — or with **"Move to References…"**, which sends it down to the inventory
with its name and its watch already set. That decision is stored in the project,
so a later scan will not ask you about it again.

::: tip The app suggests, you decide
Detected includes a **Suggestion** column hinting at what each device looks like
based on its manufacturer ("Ubiquiti radio", "MikroTik radio"). It is a hint, not
an automatic decision: discarding a device is always your call, because a radio
from a new brand or with an unknown manufacturer could otherwise drop out of
monitoring without you noticing.
:::

::: warning One device, several rows
A box with **two radios** — a MikroTik with its 2.4 GHz AP and its 5 GHz station,
for example — takes **one row per radio**, even though it is a single device and
a single session. Each radio has its own SSID, frequency, noise floor and
clients: averaging them would leave the traffic light meaningless. What belongs
to the box — CPU, memory, model, ports — repeats identically in both rows:
**they are not two measurements, they are one**.
:::

## How it works, broadly

1. **Activate your license** — with your email and key, or choose the 30-day
   trial.
2. **Create a project** — a `.sscope` file holding your whole network (devices,
   encrypted credentials, baselines, history). Everything autosaves.
3. **Scan** the networks you registered; whatever is found lands in **Detected**.
4. **Work through that list**: log into the radios — picking their system, and
   they classify themselves as Stations or Access points — and send whatever you
   will not manage to **References**.
5. **Monitor**: from then on the table refreshes on its own, and the traffic
   light, the diagnosis and the sentinel work on that data.
6. **Record and share**: snapshots, reports and the project file itself.

![The welcome screen: recent projects and reports with their station summaries, and the entries for What's new, License and Preferences](/signal-scope/bienvenida.jpg)

## Requirements

- **Windows 10 or 11** (64-bit).
- **Network access to the radios** from the computer running the app.
  **Recommended: a wired connection.** On a laptop over WiFi the app works,
  but everything it measures travels through that connection — if the
  laptop's WiFi falters, its drops get mistaken for problems in the network
  you are monitoring.
- **Radio credentials**: an **airOS** or **RouterOS** username and password,
  depending on the device.
- **No** administrator rights required to install, no Npcap, no other drivers.
- Internet access **only to activate the license** and to revalidate it
  periodically; day-to-day monitoring runs against your local network.

## Getting started

SignalScope is available on the
[**Microsoft Store**](https://apps.microsoft.com/store/detail/9NPZ6VTKF989).
First time? The trial gives you **full access for 30 days**, with no email and no
connection required.

Questions and licensing: **support@materis.io**
