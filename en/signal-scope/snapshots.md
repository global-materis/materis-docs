# History, snapshots and reports

Live monitoring answers "how is the network **now**?". Snapshots and reports
answer the rest: how it was before, what changed, and how do I show it to
someone else.

## Saving a snapshot

**Save snapshot** (`Ctrl+H`) captures the complete state of the moment:
stations and APs with their metrics, the diagnosis verdict, the references you
had set and each device's session state. The capture lands on the **snapshot
strip**, with its date.

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

::: info 🖼️ Image pending — `public/signal-scope/vista-snapshot.png`
Screenshot of the **snapshot view**: the capture banner, sessions showing
"Historical" and the Δ vs current column with some visible drift.
:::

## Comparing two moments

The **snapshot compare** tool crosses two captures — or one capture against
the live state — and lists additions, removals and changes per device. Changes
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

::: details Why doesn't it compare traffic or uptime?
Traffic is the customer's **consumption** at that instant — that they were
downloading in one capture and idle in the other says nothing about the link.
And reboots or reassociations happen every day on a real WISP (customers who
turn their antenna off at night, power cuts): flagging them would fill every
row with notices and bury what does matter. Link capacity is compared — that
is health, not consumption.
:::

## PDF and Excel reports

The **Report** button exports what is on screen — the live state or, if you
have a snapshot in view, that capture with its date in the header. Five
scopes:

| Type | What it includes |
|---|---|
| **General** | The whole network: stations + APs. |
| **Critical** | Only stations in critical state. |
| **Critical + Attention** | The technician's work list. |
| **Stations only** | Every station, without the AP table. |
| **APs only** | Access points alone. |

Two details meant to make the report defensible:

- The **summary is always of the whole network**, even when the report is
  trimmed — next to the "Filter: Critical · 25 of 199 stations" line, it makes
  the cut auditable.
- Each row's verdict is the **same as the on-screen diagnosis**: the report
  never contradicts what the app shows.

When it is generated, the notice carries an **Open** button that launches the
file directly.

::: info 🖼️ Image pending — `public/signal-scope/reporte-pdf.png`
A **generated PDF report** (first page): header, network summary and the top
of the stations table.
:::

## And for sharing

A snapshot can also be exported as a **`.ssnap`** file that another
SignalScope opens in viewer mode, with the option to protect sensitive data
before sending it. That has its own guide: [Sharing](./sharing).
