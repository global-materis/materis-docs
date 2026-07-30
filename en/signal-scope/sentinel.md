# Sentinel and network score

Two tools working on the same diagnosis: the **sentinel** warns about the
failures the signal does not betray while you work on something else, and the
**score** sums up the whole network's state in one grade.

## The service sentinel

A link can look perfect — excellent signal, 100 % quality — and the customer
still be **without service**: a loose LAN cable does not touch the signal. The
app is centered on signal, and that is exactly why the sentinel exists: it
watches the failures that **do not show on the traffic light**.

### What it watches

| Notice | What it detects |
|---|---|
| **Access point down** | An AP that was online stops responding — you get **one notice per node**, saying how many stations it drags down, instead of one alert per client. |
| **Session down** | A station that was online stops responding. |
| **LAN cable unplugged** | The radio's port lost its cable: the link looks fine, the customer cannot browse. |
| **LAN at half duplex** | The port negotiated badly: service goes out degraded without the signal showing it. |
| **Misaligned antenna** | A strong imbalance between the two polarities: aim or polarization. |
| **Radio saturated** | The radio's CPU or memory at the limit: it drops packets with the signal intact. |
| **Watched device not answering** | A device from [Others](./interface/detected-and-others) with the watch enabled stopped responding — meant for a node's router. |

Notices stack **by severity**: first what leaves a whole cell without service,
then what affects one client, then what degrades it, and last what anticipates
a problem.

### What it does NOT watch, on purpose

Signal, noise, link quality, capacity and traffic stay **out**: they vary with
rain, wind and whatever the customer is downloading. If they were in, the
panel would fill up every day and within a month nobody would open it. The
sentinel only admits conditions that fail in binary and that a healthy network
does not produce.

### How it behaves

- **It confirms before warning**: a condition must hold for a few seconds — a
  port that blinks during a reboot does not deserve a house call.
- **One alert per device and condition** while it lasts; once resolved it is
  marked and retires itself minutes later.
- **Cause, not consequence**: if an AP falls, the AP is alerted and its
  stations are **silenced** — a fallen node must not bury the panel under
  fifty notices.
- **Absence of data is never a failure**: if a firmware does not report the
  port, that axis is simply not evaluated for that device.
- **Freezing the tables does not stop it**: the sentinel watches the
  background monitoring, not what is painted.

### Switches and notifications

In **Preferences → Alerts** every notice has its own switch (off = that
condition is not even evaluated). With **system notifications** on, notices
reach the Windows desktop even with the app minimized, and clicking one takes
you to the device.

::: warning It watches while the app runs
The sentinel is not a background service: it watches while SignalScope is
open. Whatever happens with the app closed it will not see — the app itself
says so at the bottom of the panel.
:::

::: info 🖼️ Image pending — `public/signal-scope/centinela-panel.png`
Screenshot of the **sentinel panel** with 2–3 stacked notices (ideally a
fallen AP on top with its stations grouped).
:::

## The network score

A **0-to-100 grade for the whole network**, meant to be shared: it downloads
as an image ready to send to a partner or a customer.

The grade does not look at signal alone: it runs the **full diagnosis** on
every station — the same one as the table, so they can never contradict each
other — and averages.

| Grade | Verdict |
|---|---|
| ≥ 90 | Excellent network |
| ≥ 75 | Stable network |
| ≥ 50 | Needs attention |
| < 50 | Critical network |

Two rules that make it defensible in front of whoever receives it:

- **The grade always travels with its coverage**: "Graded over N of M
  stations". A grade that does not say how much was measured is not
  auditable.
- **No measurements, no grade** — it shows "Not enough data", not a 0 %. And
  absent stations **do not penalize**: a customer who turns their antenna off
  at night is not a failure of your network; they are reported in their own
  block.

The card groups into three blocks — the network, link health and
availability — and comes out identical on any machine, in light or dark
theme.

::: info 🖼️ Image pending — `public/signal-scope/calificacion-red.png`
The exported **score card** (the PNG a customer sees): grade, verdict,
coverage and the three blocks.
:::
