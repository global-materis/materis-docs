# History, snapshots and reports

Live monitoring answers "how is the network **now**?". Snapshots and reports
answer the rest: how it was before, what changed, and how do I show it to
someone else.

## Saving a snapshot

**Save snapshot** (`Ctrl+H`) captures the complete state of the moment:
stations and APs with their metrics, the diagnosis verdict, the baselines you
had set, each device's session state — and also your **References** inventory,
with the names you gave them and **how they were answering**: their response
time and their packet loss. The capture lands on the **snapshot strip**, with
its date.

::: tip The capture says how it answered, not only whether it did
Each References target is stored with its **latency and its loss**, so a
three-day-old picture answers *how* it was answering. Captures taken with a
version older than 1.3 do not carry that data, and their cell shows a dimmed
dash.
:::

- A project keeps **up to 10 snapshots**: saving the eleventh silently removes
  the oldest.
- They travel **inside the** `.sscope` **file** — backing up the project backs
  up the history.

A good habit: save one **while the network is healthy** (after maintenance,
for example). That is the comparison point worth gold months later.

## Viewing a capture

When you open a snapshot, the tables show that moment in read-only mode — the
session says "Historical" — and each row adds **Δ vs current**: how much that
station's signal changed between the capture and this instant, if the device
has a session now. It is the fastest way to answer *"was this link like this
last week?"*.

![The snapshot view: the capture strip, the banner comparing against live data, sessions showing Historical and the "vs current" drift under each signal](/signal-scope/vista-snapshot.jpg)

## Comparing two moments

The **snapshot compare** tool (marked **beta**: it works, but which metrics
it compares and how it presents them may change in future versions) crosses
two captures — or one capture against the live state — and lists additions,
removals and changes per device. If you replaced a radio in between, the removal
and the addition say so: *"Replaced by …"* and *"Replaces …"*, with the other
one's MAC. Changes
come out as chips grouped by **what causes them**, which is what matters when
reading:

- **Someone changed it** — firmware, AP, frequency, channel width:
  configuration changes, not the air.
- **The physical link changed** — the signal moved more than a few dB: it
  rained, the wind moved the dish.
- **The network was being used differently** — quality, air time, capacity:
  they describe each capture's instant. These are enabled per metric, because
  they are the noisiest.

It also flags the **Ethernet port** (cable unplugged or reconnected, duplex
and speed changes, cable errors) and sessions dropped or recovered between one
capture and the other.

### When the two captures come from different eras

Comparing a capture from **before v1.2.0** with a current one no longer misleads
you. In that version **how** link quality, capacity, consumption and distance are
measured changed, so crossing them produced differences **no device ever had**:
the number was correctly subtracted and meant nothing.

Those columns — Link down, Link up, Downlink and Uplink — **stop being compared**
between captures from different eras: a note at the top says which ones and why,
and in the Metrics menu those entries appear disabled. **It is not a block**:
everything else — signal, model, firmware, AP, port, configuration — is still
compared as usual.

::: details And Modulation on MikroTik devices
It is not compared either, for a different reason: RouterOS publishes no
modulation index, so the column shows the rate in Mbps — and that **jumps between
steps from one reading to the next**. It is captured and painted; comparing two
instantaneous readings would say nothing about the link.
:::

::: details Why doesn't it compare traffic or uptime?
Traffic is the customer's **consumption** at that instant — that they were
downloading in one capture and idle in the other says nothing about the link.
And reboots or reassociations happen every day on a real WISP (customers who
turn their antenna off at night, power cuts): flagging them would fill every
row with notices and bury what does matter. Link capacity is compared — that
is health, not consumption.
:::

## PDF, Excel and CSV reports

The **Report** button exports what is on screen — the live state or, if you
have a snapshot in view, that capture with its date in the header. Three
formats that say exactly the same thing (they come from the same data):
**PDF** to hand over, **Excel** to work with, and **CSV** meant to open with
a double click in a Spanish-locale Excel, no import wizard. Five scopes:

| Type | What it includes |
|---|---|
| **General** | The whole network: stations + APs + **References**. |
| **Critical** | Only stations in critical state. |
| **Critical + Attention** | The technician's work list. |
| **Stations only** | Every station, without the AP table. |
| **APs only** | Access points alone. |

### What they carry inside

Up to **three tables**:

- **Stations and APs**, with their **CPU and free RAM**: a device the app paints
  as saturated reads the same in the PDF you send the customer.
- **References**, with its same six columns — *Monitoring · Latency · Name ·
  IP / domain · MAC · Manufacturer* — and with **every** target, monitored or
  not: every row in References was put there by you, so none of them is noise,
  and a "Not monitored" row states clearly that the report claims nothing about
  that device.
- **If the report comes from a capture**, the References table says **how they
  were answering that day**.

Two clarifications about that third table: **it only appears in the General
type** — the other four are cuts by the state of the *radios*, and a target in
References has no traffic light to enter or fall outside of — and it **carries no
traffic-light color** in any format, not even in Excel. Its *Monitoring* column
says it in words.

::: warning The report's two latencies are not comparable
The one in the References table **is measured by SignalScope** (it is a ping, and it
crosses the whole path). The one in the stations table **is measured by the
radio** over its own air segment. They share no thresholds and no meaning.
:::

Two details meant to make the report defensible:

- The **summary is always of the whole network**, even when the report is
  trimmed — next to the "Filter: Critical · 25 of 199 stations" line, it makes
  the cut auditable.
- Each row's verdict is the **same as the on-screen diagnosis**: the report
  never contradicts what the app shows.

When it is generated, the notice carries an **Open** button that launches the
file directly.

![The Report menu: the five types — General, Critical, Critical + Attention, Stations only, APs only — and the three formats PDF, Excel and CSV](/signal-scope/reporte-pdf.png)

## And for sharing

A snapshot can also be exported as a **`.ssnap`** file that another
SignalScope opens in viewer mode, with the option to protect sensitive data
before sending it. That has its own guide: [Sharing](./sharing).
