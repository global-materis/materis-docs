# Sentinel and network score

Two tools working on the same diagnosis: the **sentinel** warns about the faults
the signal does not reveal while you are busy with something else, and the
**score** sums up the fleet's state in one grade.

## The service sentinel

A link can look perfect — excellent signal, 100 % quality — and the customer can
still be **without service**: a loose LAN cable does not touch the signal. The
app is centred on the signal, and that is exactly why the sentinel exists: it
watches the faults that **do not show in the traffic light**.

It lives in the **pulse** at the right-hand end of the bar, in the same spot in
the Monitor and in the Map. Its number says **how many devices are broken right
now**.

### What it watches

Eleven events, eight switches — three inherit their partner's, because they are
two faces of the same watch:

| Notice | What it detects |
|---|---|
| **Access point down** | An AP that was online stops answering — reported **once for the node**, stating how many stations it drags with it, instead of one alert per client. *(Inherits the "Session lost" switch: it is the same watch with a different presentation.)* |
| **References not answering** | A target in [References](./interface/detected-and-others#references-what-you-look-at-for-contrast) with monitoring on stopped answering the ping. |
| **A monitored device's IP is taken by another** | That IP answers, but there is a different MAC behind it. *(Inherits the "References not answering" switch.)* |
| **Session lost** | A station that was online stops answering. |
| **No LAN cable** | The radio's port lost its cable: the link looks fine, the customer is not browsing. |
| **LAN at 10 Mbps** | The port negotiates 10 Mbps — damaged cable, moisture in the connector or weak PoE. No airMAX ships with that maximum. **Also on APs**, where it strangles the whole sector. |
| **LAN in half duplex** | The port negotiated badly: service comes out degraded without the signal showing it. |
| **Misaligned antenna** | Imbalance between the two polarities from **6 dB** — the limit Ubiquiti itself recommends: aim or polarization. |
| **Saturated radio** | The radio's CPU or memory at the limit: it drops packets with the signal intact. |
| **Sector with high latency** | Most of one AP's online stations answer slowly at the same time. *(Inherits the "High latency" switch.)* |
| **High latency** · **BETA** | A client with a pristine signal that still answers with **sustained** delay. See below. |

Notices stack **by severity**: first what leaves a whole cell without service,
then what affects one client, then what degrades it and last what anticipates a
problem.

::: tip "High latency", and why it is marked beta
A client with a pristine link that **no radio metric can find anything wrong
with** and that still answers slowly: that is exactly the case the sentinel
exists for.

It is also the event with **the most potential to become noise**, because latency
is the only magnitude in the catalog that rises on its own at peak hour. That is
why it carries three filters no other event needs:

- It judges the **sustained average** over 90 s, not the spikes.
- **It goes quiet once it has already warned you about the cause** — misaligned
  antenna or saturated radio, the two faults that produce this very symptom.
- **If several stations of the same AP are affected, it warns once for the
  node**: then it is not a client, it is that cell's air, and the AP gives you
  the triage.

It is marked **BETA** while it is calibrated. If you find it noisy, switch it off
in **Preferences → Alerts**.
:::

### What it does NOT watch, on purpose

Signal, noise, link quality, capacity and traffic stay **out**: they vary with
rain, wind and whatever the customer is downloading. If they were in, the panel
would fill up every day and within a month nobody would open it. The sentinel
only admits conditions that fail in binary and that a healthy network does not
produce — with the measured, filtered exception of latency.

### How it behaves

- **It confirms before warning**: a condition must hold for a few seconds — a
  port blinking during a reboot does not deserve a site visit.
- **One alert per device and condition** while it lasts; when it clears it is
  marked and retires itself minutes later. And clearing requires **measuring**:
  if what fell was the session, the fault is not declared resolved — it stays
  **"Not measured"** and warns again as soon as the device answers.
- **Cause, not consequence**: if an AP falls, the AP is reported and its stations
  **go quiet** — a downed node must not bury the panel under fifty notices.
- **Missing data is never a fault**: if a firmware does not report the port, that
  axis is simply not evaluated for that device. That is what happens with several
  metrics on RouterOS.
- **Freezing the tables does not stop it**: the sentinel watches the background
  monitoring, not what is painted.
- **And it does not depend on which screen you are looking at**: with the project
  open it watches from the Monitor, from the Map, from the start screen and with
  the window tucked away in the tray.

### The panel, and what you can filter in it

Every alert card is a **button that takes you to the device** — and it clears the
state filter, so you do not land on an empty table. From six alerts onwards you
also get **chips per event type** and a **search box** by name, IP or MAC.

Both are **per session and are not saved**: they are a lens for investigating,
not a preference. If they survived a restart you could open the panel tomorrow
with a filter on and believe there were no faults. When something is hidden, the
panel itself says so: *"{n} hidden by the filter — show all"*.

And the **bar counter still counts them all**: that is the network's state, not
the lens's. A filter cannot lower the number that says how many customers are
down.

## What you decide per device

Three decisions taken in a radio's **session window** (*Actions* tab) or in a
target's **actions** in References. They are ordered from the reversible to the
irreversible, so your finger does not reach the red one out of momentum.

With the device absent, the same tab also offers the
[reason for absence](./interface/stations#reason-for-absence) (Suspended,
Technical, Retired): an informational label that clears itself when it comes
back.

### Mute alerts

A device with a fault **you already know about** — three days of roadworks, a
customer who has not paid, an antenna you are swapping on Thursday — used to fill
the panel with notices that inform nothing and bury the ones that do.

**Muting is not ceasing to watch.** The device keeps connecting and the sentinel
keeps measuring it: the only thing that goes quiet is the **output** — the panel,
the Windows notification and your messaging, all three at once.

- **The period is the decision**, so there is no single button but a row of
  periods: **1 hour · 8 hours · 1 day · 1 week · No end date**. One week is the
  cap with a date: beyond that it resembles "forever" so closely that it had
  better say so in those words, which is why the permanent one **must be asked
  for by name**.
- **Once muted, the periods disappear** and the card turns into a state —
  *"Muted until… · 8 h left"* — with a single way out: **Unmute**. Changing the
  period is unmuting and choosing again.
- **When it expires, whatever is still broken comes back with its real age**
  ("for three days now"), rather than starting from scratch.
- **The panel reminds you whom you silenced**: at its foot, a grey block with the
  muted devices, their period and their **Unmute**. It counts always, whether or
  not they have alerts today — what must be remembered is the decision, not its
  consequences this afternoon.
- It is stored **in the project**, not in the workstation's preferences: it points
  at a device on **this** network. It dies when you forget the device.

::: info 🖼️ Image pending — `silenciar.png`
The **Mute alerts** card with its row of periods (1 hour, 8 hours, 1 day, 1 week,
No end date) and, beside it, its state once set: "Muted until… · 8 h left" with
the Unmute button.
:::

### Notify on reconnection

The opposite of muting: here you ask for **more** attention on a device. On the
**"Notify on reconnection"** card you pick a mode and the app tells you **when it
reconnects** — by Windows notification and through your messaging.

Neither mode comes preselected: **choosing is the action**. Once set, the card
states the mode and one click on it **removes** it.

| Mode | What for |
|---|---|
| **Once** | A customer went down, you leave to deal with something else and want to know it came back. It notifies and **retires itself**. |
| **Always** | For the device you want to watch continuously: it notifies **on every fall and return** until you remove it. |

What keeps the permanent one from being noise **is not a minimum time between
notices, it is the cycle**: after notifying it goes back to waiting for a fall,
so to sound again the device has to genuinely fall again. **It notifies once per
incident, not once per reading** — and neither mode notifies twice for the same
fall.

Three details that prevent a false expectation:

- **On a device that is online**, the notice first waits to see it fall: it
  does not notify you now, but when it drops and comes back.
- **It cannot be set on something that is not being measured**: a muted device,
  a target in References without monitoring on, or a monitored one whose first
  ping has not arrived. The card says which of the three it is.
- **It is lost when you forget the radio or remove the target**, because it
  travels with its record.

It is switched off entirely in **Preferences → Alerts** ("Came back online").
That switch turns off the **output**, not the notices you set.

### Switch a device's session off

Without forgetting it: the app **stops connecting** to it — no CPU cost, no flood
of alerts — but **keeps its credentials and its record**. You switch it off from
its session window, above Forget, and back on with one click on its Session cell.
**It stays off even after you close the app.**

The difference from muting: here the device **stops being measured**. If what you
want is quiet without losing sight of how it is doing, mute it.

::: warning Actions take the whole box
On a device with several radios — two rows, one session — switching off, muting
or forgetting **applies to both**. The app warns you before you press.
:::

## The bell: what it told you while you were working

Next to the sentinel's pulse, on its left, sits the **notice tray**. It keeps
**everything the app told you**, with the time, and clicking each line takes you
to the device.

They are two neighbouring indicators counting **different things** — which is why
they were not merged into one:

- The **pulse** says what is **broken now**, and its items **resolve themselves**
  when the fault goes away. Its counter does not drop because you looked.
- The **bell** says what **happened while you were not looking**, and its items
  **are read and do not come back**. Its counter is of unread items and
  **disappears when you open it**.

A reconnection that already happened does not stop having happened; a loose cable
is still loose no matter how long you look at it.

- The bell shows **the time**, not "how long ago": a notice is read by **when it
  happened**, which is what you cross-check against what you were doing. A
  sentinel alert is read the other way round, by how long it has been broken.
- **It is kept while the app is open**, and the empty panel says so. It does not
  survive closing it.
- **It does not light the red dot on the Windows icon**: that one means "your
  network needs you", and the sentinel puts it there.

What reaches the bell:

| Notice | When |
|---|---|
| **Came back online** | A device you set [Notify on reconnection](#notify-on-reconnection) on came back. |
| **Needs your attention** | The app paused a session it cannot solve on its own: unknown IP, account rejected or possible replacement. See [what to do](./interface/stations#when-the-app-needs-you-to-step-in). |
| **A labeled device came back** | A device with a [reason for absence](./interface/stations#reason-for-absence) came back; the label clears itself. |
| **An AP changed its IP** | The app found the AP at its new IP and reconnected on its own. For an AP that is not normal: check whether its address should be fixed. |
| **This PC lost its network** | Your PC has no active network. It is **a single notice** instead of one per device that stops answering, and another arrives when the network is back. |

Which of them also go out as Windows notifications or to your messaging is
chosen in **Preferences**, under *"Notices you ask for"*.

::: info 🖼️ Image pending — `bandeja-avisos.png`
The bell open next to the sentinel's pulse: the list of notices with their time —
"came back online" — and the unread dot.
:::

## Three channels for the same notice

The sentinel **always watches everything**; what you choose is **what leaves the
app and through which channel**:

- **The panel** — every alert, always. Switching an event off in Preferences does
  not hide it from here.
- **Windows notifications** — they reach the desktop even with the app minimized
  or tucked away in the tray, and clicking takes you **to the device inside its
  project**, not to the start screen. Which events arrive is chosen in
  **Preferences → Alerts**.
- **The phone** — WhatsApp or Telegram, with its own event selection (see below).
  Alerts and Messaging are **independent** settings: you may want everything on
  the desktop and only the serious ones on the phone.

### Phone notices (WhatsApp or Telegram)

The same alerts can reach your phone, so you learn about an outage **without
being in front of the screen**. Three routes, all through **CallMeBot**:
WhatsApp, Telegram to a user, or Telegram to a group.

You enable it in **Preferences → Messaging**:

1. Turn on **"Send notices by messaging"** and choose the route. Each asks for
   its own — WhatsApp: phone and key; Telegram to a user: just your `@username`;
   Telegram to a group: just the key (the key *is* the group). The **"How to get
   these details"** link leads to CallMeBot's instructions: authorization is
   granted from your phone, and that step the app cannot do for you.
2. **Send the test message** — not optional: CallMeBot validates nothing until a
   real send, so without the test you would find out about a mistyped key on the
   day a link goes down and no notice arrives.
3. In **"What is sent to this destination"**, pick the events.

With the destination configured, the summary shows your number and key
**masked** — they do not travel in a screenshot or in a shared session.

**What arrives**: one message **per alert type** — not a summary — with the
project and, for each device, its name, its IP and the AP it hangs off. The time
is that of the **first alert**, not of the send: what matters is when the
customer lost service.

Each type has its wait and its tolerance. The wait is not a delay, it is the
**grouper**: a power cut takes down several APs seconds apart, and that should be
a single message — and it discards transient faults along the way.

| Priority | Events | Wait | Not repeated before |
|---|---|---|---|
| 1 | AP down · No LAN cable · References not answering | 20 s | 1 h |
| 2 | Session lost | 1 min | 4 h |
| 3 | LAN at 10 Mbps **on an AP** | 1 min | 6 h |
| 3 | Saturated radio **on an AP** · Sector with high latency | 5 min | 6 h |
| 4 | LAN in half duplex · LAN at 10 Mbps · Saturated radio · High latency | 15 min | 12 h |
| 5 | Misaligned antenna · A monitored device's IP taken by another | 30 min | 24 h |

::: warning The limits, plainly
- **It watches while the app runs.** Closing the window does not stop it — it
  stays next to the clock, measuring — but **quitting from its icon menu does**.
  With notices arriving on your phone it is easy to believe this is a background
  service on somebody's server. It is not: it runs on your machine.
- **CallMeBot is a free third-party service**: it may be slow or fail. Do not use
  it as the only alerting mechanism for a critical service.
- **Notices go out over your own internet** — if your own link goes down, so do
  the notices. That is the irony worth knowing in advance.
- **You do not pick devices, only event types.** A list of specific stations in
  Preferences would take your network's identifiers outside the encrypted file.
  To silence ONE device there is [muting](#mute-alerts).
- **It does not send what was already failing when you opened the project.** After
  a weekend the sentinel detects forty outages at once, and none of them is news.
:::

::: tip A Telegram group is an audience
The notice is read by the whole group — with your customers' names and IPs in it.
Choose the group route knowing who is in it.
:::

![Preferences → Messaging: the switch to send notices, the three routes (WhatsApp, Telegram to a user, Telegram to a group), the test message and the selection of which events are sent to this destination](/signal-scope/mensajeria.png)

![The sentinel panel: Session lost notices stacked with each one's reason, and at the foot the reminder that it watches while the app is open](/signal-scope/centinela-panel.jpg)

## The network score

A **0–100 grade for the whole fleet**, meant to be shared: it downloads as an
image ready to send to a partner or a customer.

The score does not look at the signal alone: it runs the **full diagnosis** on
every station — the same one as the table, so they never contradict each other —
and averages it.

| Score | Verdict |
|---|---|
| ≥ 90 | Excellent network |
| ≥ 75 | Stable network |
| ≥ 50 | Needs attention |
| < 50 | Critical network |

Two rules that make it defensible in front of whoever receives it:

- **The score always travels with its coverage**: "Scored over N of M stations".
  A score that does not say how much was measured is not auditable.
- **No measurements, no score** — it shows "Not enough data", not a 0 %. And
  absent stations **do not penalize**: a customer who switches their antenna off
  at night is not a fault of your network; they are reported in their own block.

The card groups into three blocks — the network, link health and availability —
and comes out identical on any machine, in light or dark theme.

![The share-ready score card: 76 % Stable network, scored over 169 of 189 stations, with the blocks for the network, link health and availability](/signal-scope/calificacion-red.png)
