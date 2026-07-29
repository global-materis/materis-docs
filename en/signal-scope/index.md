# SignalScope

**See the signal across your whole WISP network at a glance.**

SignalScope is a desktop application for **wireless internet service providers
(WISPs)** running **Ubiquiti airMAX** radios. It scans your network, logs into
each radio and shows you the **signal in dBm in real time**, with a traffic light
that tells you instantly which links are healthy and which need attention.

It is **strictly read-only**: it never changes your radios' configuration.

::: info 🖼️ Image pending — `public/signal-scope/monitor-en-vivo.png`
Wide screenshot of the **live monitor**: the stations table with signal in dBm,
traffic light, throughput and distance. This is the image that sells the product
at a glance.

_A usable screenshot already exists at `ss-desktop/docs/screenshots/SignalScope-Monitor.png`._
:::

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
- **It helps you improve, not just repair**: per-antenna references ("this is
  what healthy looks like") and the first hints of saturation, before they turn
  into complaints.

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
| 🔑 **Logs into each radio** | Over HTTP or SSH, one by one or in a cascade (all at once). Each radio reports its own mode and is classified automatically as a **Station** or an **Access Point**. |
| 📡 **Monitors live** | Continuous refresh of signal, noise, SNR, link quality, throughput, distance and uptime. |
| 🚦 **Traffic light per link** | Green / amber / red by dBm thresholds, or relative to the **reference you set** for that antenna. |
| 🧠 **Diagnoses** | Explains each link's state in plain language and points at where to look. |
| 🛎️ **Service sentinel** | Warns about faults the signal does not reveal: a loose LAN cable, half duplex, a misaligned antenna, a saturated radio. |
| 🧾 **Keeps track of non-airMAX gear** | Devices the app does not manage — a MikroTik, an ONU, a switch — can stay in your inventory with their own name and a basic "is it still alive?" watch. |
| 📸 **Keeps history** | Snapshots of the network state, with the difference (Δ) against the present moment. |
| 📄 **Exports** | PDF and Excel reports for the customer or for your own records. |
| 🗺️ **Coverage map** | Your devices and their state placed on a map. |
| 🏅 **Scores the network** | A grade for the whole fleet, downloadable as an image. |
| 🤝 **Shares without exposing** | A snapshot strips sensitive names and IPs; the other operator opens it in viewer mode. |

::: info 🖼️ Image pending — `public/signal-scope/diagnostico.png`
Screenshot of a **station diagnosis**: the panel explaining expected vs. actual
signal, noise/SNR, link quality and throughput.

_Existing: `ss-desktop/docs/screenshots/SignalScope-Station-Diagnostic.png`._
:::

## What it does **not** do

Just as important as the above:

- **It does not configure radios.** SignalScope never sends a write command to a
  device. There is no way to accidentally drop a link from the app.
- **It does not send your data anywhere.** Your network information lives only on
  your computer, in an encrypted file.
- **It does not replace the radio's own interface** for configuration work: it is
  the observation and diagnostics layer above it.

## How your devices are organized

The app works with four tables, and understanding the difference between them
saves confusion from day one:

| Table | What it holds | Persistence |
|---|---|---|
| **Detected** | What the scan just found and you have not identified yet. This is your **work queue**. | **Temporary**: it empties as you resolve each device, and disappears from view once no rows are left. |
| **Stations** | Customer radios (CPEs), with their signal, traffic light and diagnosis. | Permanent |
| **Access points** | Your base antennas, with connected clients, channel, frequency and load. | Permanent |
| **Others** | Devices that are **not airMAX** but that you want on record: a MikroTik, an ONU, a switch. You name them and, optionally, watch whether they still respond. | Permanent: always present, even when empty |

A device leaves **Detected** in one of two ways: by **logging into it** — the
radio itself declares whether it is a station or an AP, and the classification is
automatic — or by marking it **"Not a radio"**, which moves it down to **Others**.
That decision is stored in the project, so a later scan will not ask you about it
again.

::: tip The app suggests, you decide
Detected includes a **Suggestion** column hinting at what each device looks like
based on its manufacturer ("Ubiquiti radio", "MikroTik device · not airMAX").
It is a hint, not an automatic decision: discarding a device is always your call,
because a radio from a new brand or with an unknown manufacturer could otherwise
drop out of monitoring without you noticing.
:::

## How it works, broadly

1. **Activate your license** — with your email and key, or choose the 30-day
   trial.
2. **Create a project** — a `.sscope` file holding your whole network (devices,
   encrypted credentials, references, history). Everything autosaves.
3. **Scan** the networks you registered; whatever is found lands in **Detected**.
4. **Work through that list**: log into the radios — they classify themselves as
   Stations or Access points — and send everything that is not airMAX to
   **Others**.
5. **Monitor**: from then on the table refreshes on its own, and the traffic
   light, the diagnosis and the sentinel work on that data.
6. **Record and share**: snapshots, reports and the project file itself.

::: info 🖼️ Image pending — `public/signal-scope/bienvenida.png`
Screenshot of the **welcome screen**: recent projects, create/open project. It
illustrates step 2.

_Existing: `ss-desktop/docs/screenshots/SignalScope-Welcome.png`._
:::

## Requirements

- **Windows 10 or 11** (64-bit).
- **Network access to the radios** from the computer running the app.
- **Radio credentials** (airOS username and password).
- **No** administrator rights required to install, no Npcap, no other drivers.
- Internet access **only to activate the license** and to revalidate it
  periodically; day-to-day monitoring runs against your local network.

## Getting started

First time? The trial gives you **full access for 30 days**, with no email and no
connection required.

<!-- These pages will be added; links go live once they exist.
- Installation and activation
- First steps: your first project
- Interface reference
-->

Questions and licensing: **support@materis.io**
