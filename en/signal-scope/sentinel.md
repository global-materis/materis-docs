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

### Three channels for the same notice

The sentinel **always watches everything**; what you choose is **what leaves
the app and through where**:

- **The panel** — every alert, always. Turning an event off in Preferences
  does not hide it from here.
- **Windows notifications** — they reach the desktop even with the app
  minimized, and clicking one takes you to the device. Which events arrive is
  chosen in **Preferences → Alerts**.
- **The phone** — WhatsApp or Telegram, with its own event selection (see
  below). Alerts and Messaging are **independent** settings: you may want
  everything on the desktop and only the serious ones on the phone.

### Phone notices (WhatsApp or Telegram)

The same alerts can reach your phone, so you learn about an outage **without
being in front of the screen**. Three ways, all through **CallMeBot**:
WhatsApp, Telegram to a user or Telegram to a group.

It is enabled in **Preferences → Messaging**:

1. Turn on **"Send alerts by messaging"** and pick the way. Each one asks
   for its own — WhatsApp: phone and key; Telegram to a user: just your
   `@username`; Telegram to a group: just the key (the key *is* the group).
   The **"How to get these details"** link takes you to CallMeBot's
   instructions: the authorization is granted from your phone, and that step
   the app cannot do for you.
2. **Send a test message** — it is not optional: CallMeBot validates nothing
   until a real send, so without the test you would find out about a bad key
   the day a link falls and no notice arrives.
3. Under **"What goes to this destination"**, choose the events.

**What arrives**: one message **per alert type** — not a digest — with the
project and, for each device, its name, IP and the AP it hangs from. The time
is that of the **first alert**, not the send: what matters is when the
customer lost service.

Each type has its wait and its tolerance. The wait is not a delay, it is the
**grouper**: a power cut takes several APs down seconds apart, and that must
be a single message — and it also discards passing failures.

| Priority | Events | Wait | Not repeated before |
|---|---|---|---|
| 1 | AP down · LAN cable unplugged · Others not answering | 20 s | 1 h |
| 2 | Session down | 1 min | 4 h |
| 3 | Radio saturated on an AP | 5 min | 6 h |
| 4 | LAN at half duplex · Radio saturated | 15 min | 12 h |
| 5 | Misaligned antenna · A watched device's IP taken by another | 30 min | 24 h |

::: warning The limits, upfront
- **It watches while the app is open** — the sentinel's same limit, and with
  notices reaching your phone it is easier to believe it is a background
  service. It is not.
- **CallMeBot is a free third-party service**: it can lag or fail. Do not use
  it as the only alert mechanism for a critical service.
- **Notices leave through your internet** — if your own link goes down, so do
  the notices. An irony worth knowing in advance.
:::

::: tip A Telegram group is an audience
The whole group reads the notice — with your customers' names and IPs inside.
Choose the group way knowing who is in it.
:::

![Preferences → Messaging: the send-notices switch, the three ways (WhatsApp, Telegram to a user, Telegram to a group), the test message and the per-destination event selection](/signal-scope/mensajeria.png)

::: warning It watches while the app runs
The sentinel is not a background service: it watches while SignalScope is
open. Whatever happens with the app closed it will not see — the app itself
says so at the bottom of the panel.
:::

![The sentinel panel: stacked Session down notices, each with its reason, and at the bottom the reminder that it watches while the app is open](/signal-scope/centinela-panel.jpg)

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

![The score card ready to share: 76 % Stable network, graded over 169 of 189 stations, with the network, link health and availability blocks](/signal-scope/calificacion-red.png)
