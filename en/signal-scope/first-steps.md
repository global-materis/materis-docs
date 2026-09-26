# First steps

From a freshly installed app to your network monitored live. Four steps: create
the project, register your networks, scan, and sign in to the radios.

## 1. Create your first project

On the welcome screen, create a project: you choose its **name and where to
save it**, and it is created as a **`.sscope`** file.

That file is your whole network — devices, encrypted credentials, baselines,
snapshots and history — and it **autosaves** as you work. Next time, the
welcome screen offers it under **Recents** with a summary of its state.

![The create project dialog: name, location and the path of the .sscope file to be created](/signal-scope/crear-proyecto.png)

## 2. Register your networks

In the scan panel, networks are registered as **CIDR ranges** (for example
`192.168.1.0/24`) and shown as chips you can toggle on and off: the scan only
sweeps the ones that are on.

A new project starts with none, and the app **offers your own PC's networks**
as chips with a `+` and a dotted border: one click registers the one you
want — nothing is added without your click. Other segments you manage are
typed by hand into the field. The widest range accepted is `/16`.

## 3. Scan

Press **Scan** (or **Scan all**). The app sweeps the active networks with ping,
shows per-network progress and can be cancelled at any time.

Everything that responds shows up in the **Detected** table with its IP, MAC
and manufacturer, plus a **Suggestion** column hinting at what each device
looks like: "Ubiquiti radio", "MikroTik radio", and so on.

When it finishes, the app **tells you what it found**: how many devices are new
and how many were already in your project. A scan that says nothing leaves you
wondering whether it worked.

![The Detected table after a scan: each finding with its IP, MAC, manufacturer and the Suggestion hinting what it is — with the Sign in button on Ubiquiti radios](/signal-scope/escaneo-detectados.jpg)

::: details A device says "MAC unreachable" — what does that mean?
It sits behind a router (outside your local network), and from that distance
the scan only sees its IP. Not a problem: when you sign in, the device
identifies itself fully, MAC included.
:::

## 4. Sign in to the radios

Radios need a session to report their metrics. Use the credentials of their own
interface — **airOS** or **RouterOS**, depending on the device — and pick its
**System** in the login selector: it comes preselected from the manufacturer the
MAC revealed, and changes with one click.

- With **airOS**, the app picks the connection method on its own (HTTP or SSH).
- With **RouterOS**, the transport is forced to **SSH**: v6 has no REST API. See
  [Supported devices](./supported-devices).

Two ways:

- **Individually** — the **Sign in** button on the device's row.
- **Cascade session** — the time-saver for the first run: it applies the **same
  credentials to every device without a session**, all at once. Those that fail
  are marked to retry individually with their own credentials.

Upon connecting, **each radio reports its mode and classifies itself** as a
**Station** or an **Access point** — there is nothing to classify by hand.
Credentials are stored (encrypted inside the project) and the app uses them to
reconnect automatically in future sessions.

Anything you will not manage — an ONU, a switch, the customer's router — goes
down with **"Move to Others…"**, which asks for its name and whether you want to
watch it, as explained in the
[introduction](./#how-your-devices-are-organized).

::: warning If a device rejects your credentials, the app stops trying
And that is the right thing: insisting makes the device itself close access —
**airOS locks it for half a minute after several failed attempts** — and ends up
locking **you** out too, terminal included. The notice repeats what the radio
said, in its own words, so you can fix the right detail.
:::

![The cascade session: protocol, one set of credentials and the queue of radios connecting one by one](/signal-scope/sesion-cascada.png)

::: info 🖼️ Image pending — `login-sistema.png`
The login dialog with the **System** selector (airOS / RouterOS) visible, and the
HTTP button disabled when RouterOS is picked, with its reason in the tooltip.
:::

::: details A MikroTik with two radios leaves two rows
And that is correct: a box with its 2.4 GHz AP and its 5 GHz station takes **one
row per radio**, even though it is a single session. What belongs to the device —
CPU, memory, ports — repeats identically in both. The details are in
[Supported devices](./supported-devices#one-device-one-row-per-radio).
:::

## You are now monitoring

With sessions open, the tables refresh on their own: signal in dBm (local and
remote), traffic light, throughput, distance, uptime. From here on:

- **Set baselines**: when a link is healthy and stable, **"Mark"** pins
  its signal at that instant as the antenna's baseline; the app will then
  judge how far it has dropped from that point.
- **Save a snapshot** of the network's initial state — it will serve as a point
  of comparison.

The next guides cover the interface in detail and how to read the traffic light
and the diagnosis.

::: details A radio the scan cannot find?
If a radio lives in a segment you cannot scan, register it by hand:
**Device (+)** on the bottom rail opens the sign-in dialog with an editable IP.
:::
