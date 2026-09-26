# Detected and References

Two tables with opposite roles: **Detected** is the scan's work queue and it
empties; **References** is the permanent inventory of what you do not manage
but look at for contrast: the node's router, your provider, a domain like
Google.

## Detected: the scan queue

Everything a scan finds that has no identity yet lands here, with its IP, MAC and
manufacturer. The **Suggestion** column hints at what each device looks like:

| Suggestion | What it means |
|---|---|
| **Ubiquiti radio** (blue) | An airMAX candidate — the session button is the way in. |
| **MikroTik radio** (blue) | A RouterOS candidate. If it has a wireless module it comes in like an airMAX; if it does not, the login itself will tell you, and that device belongs in References. |
| ***Manufacturer* device · not airMAX** | Known manufacturer, but no driver in the app. |
| **Not airMAX** | Unknown manufacturer. |
| **MAC unreachable** | It sits behind a router; when you sign in it identifies itself fully. |

::: warning The suggestion tells you the manufacturer, not the system
A device being a MikroTik does not say whether it is a tower sector, a switch or
a desktop router: **RouterOS runs on the whole catalog**. All the suggestion
promises is that a session can be attempted. Who it is, it says on the way in.
:::

Each device leaves the queue in one of two ways:

- **By signing in** — you pick its
  [system](../supported-devices#choosing-the-system-when-logging-in), and the
  radio declares its mode and moves on its own to Stations or Access points.
- **With "Move to References…"** — it goes down to the inventory. The same
  registration form opens: you give it a **name** and decide right there whether
  to **watch** it. The decision is stored: a later scan will not ask again.

The suggestion helps but **the decision is yours**: the discard button is
highlighted when the manufacturer already says there is no driver, and stays
discreet on a manageable radio, where discarding would almost always be a
mistake.

**Clear list** empties the queue without deciding anything — whatever is
unresolved comes back on the next scan. Once the queue hits zero, the table
disappears from view: its job is done.

![The Detected table after a scan: each finding with its IP, MAC and manufacturer, the Suggestion that tells manageable radios from the rest, and the Sign in and Move to References buttons](/signal-scope/escaneo-detectados.jpg)

Every finding is presented even if another of your devices held that same
address before — normal where IPs are handed out automatically — and the scan
tells you how many are new and how many you already had.

## References: what you look at for contrast

A switch, an ONU, the node's or the customer's router — and also **targets
outside your network**: your transit provider's public IP, a domain like
`google.com`. They are not devices the app manages, but they tell you whether
the problem is yours or further up. Each row is a **target**.

**References is always visible**, even when empty, with its own search box. In
the sidebar you recognize it by its chain-link icon.

| Column | What it shows |
|---|---|
| **Monitoring** | The state of the ping to that target — and clicking it **opens its actions**. See below. |
| **Latency** | The response time and, beside it, the **percentage of pings lost** over the last two minutes: `5 ms · 20 %`. The tooltip spells it out: *"Ping from SignalScope"* and *"Loss over the last 2 min"*. |
| **Name** | **Editable in the table**: Enter or leaving the field saves, Esc discards. |
| **IP / domain** | The target's address or name. |
| **MAC · Manufacturer** | Identity, where there is one. A routed device has no visible MAC and the cell says **IP only**; a domain shows **—**. |

### Adding a target

Two routes, both opening the same form, **"Add to References"**:

- **From Detected**, with **"Move to References…"** on its row. The address is
  already known and is shown fixed.
- **By hand**, with **"Add target"**, top right of the table.

The form asks for two things and offers a third:

1. **IP address or domain** — only in the manual route. It accepts IPv4 or a
   name. It does **not** accept IPv6 nor a **port**: it only checks whether the
   target answers.
2. **Name** — **mandatory and unique**. It is how the alerts will name it at
   three in the morning, and two "Router"s in a WhatsApp message are no use to
   anybody.
3. **Monitor this target** — turned on, the target is in the sentinel's custody
   from the moment you save.

::: info 🖼️ Image pending — `anadir-destino.png`
The "Add to References" form: the IP or domain field, the mandatory name and
the "Monitor this target" switch.
:::

### Monitoring: "is it still alive, and how does it answer?"

With monitoring on, the app sends a **ping every 2 seconds** from SignalScope
and the target is **in the sentinel's custody**, which notifies you of possible
outages or instability. The Monitoring chip has **five faces**, and each is a
distinct fact — not a degree:

| Chip | What it means |
|---|---|
| **Not monitored** (off) | It is born this way: these are devices you do not manage, and sending them traffic unasked is not justified. |
| **Checking…** | On, but without the first ping yet. |
| **Monitoring** (green) | It answers — and the app verified that whoever answers is **that** device. |
| **Another device** / **Does not resolve** (amber) | *Another device*: that IP is now held by a different box; a scan finds yours again at its new address. *Does not resolve*: the name could not be translated into an address, so **the question was never asked** — this is not an outage and raises no alert; what to look at is on your machine. |
| **No answer · 5 min ago** (red) | It does not reply, with the "how long ago" attached. |

::: tip The loss percentage is the half that matters
A target that **drops and comes back** answers fine most of the time: looking
only at the response time it would seem healthy. It is the loss that betrays it.
The time turns amber from 120 ms and **never red**; the loss turns amber and
then red from 10 %.
:::

When a monitored target stops answering, the [sentinel](../sentinel) reports
it as **"References not answering"** — designed, for example, for a node's
router, whose outage explains that of every radio hanging off it. Like any
alert, it can also reach you as a Windows notification or on your phone.

### Target actions

Clicking the **Monitoring chip** opens its actions:

- **Monitor target** — puts it in the sentinel's custody, or takes it out.
- **Notify on reconnection** — the app tells you when it answers again, once or
  every time. See [Sentinel](../sentinel#notify-on-reconnection).
- **Remove from the project** — deletes every record and diagnostic action.

::: warning What monitoring is NOT
- **It does not measure link quality.** It is a ping from SignalScope: it drags
  in your local network and the whole path in between. The Latency column in
  *Stations* is a different thing — measured by the radio over its own air
  segment — and they share no thresholds.
- **It opens no session and reads no configuration.** About a reference the
  app only knows whether it answers and how long it takes.
- **It does not follow a target that changes IP** when its identity is the IP
  (routed or manually registered): there is no session to re-identify it. With a
  visible MAC, the scan does re-link it.
:::

### Removing is for real

**Remove from the project** deletes that target's whole record, including the
decision to have set it aside. If a later scan finds it again, it comes back to
**Detected** as if it were new — which is also the way to recover a radio moved
to References by mistake.

::: tip References is not "the leftovers"
It is **permanent** inventory and survives *Clear list*. The queue that empties
is **Detected**. Every row in References was put there by you, so none of them
is noise — which is why reports carry them **all**, monitored or not.
:::
