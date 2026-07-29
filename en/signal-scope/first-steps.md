# First steps

From a freshly installed app to your network monitored live. Four steps: create
the project, register your networks, scan, and sign in to the radios.

## 1. Create your first project

On the welcome screen, create a project: you choose its **name and where to
save it**, and it is created as a **`.sscope`** file.

That file is your whole network — devices, encrypted credentials, references,
snapshots and history — and it **autosaves** as you work. Next time, the
welcome screen offers it under **Recents** with a summary of its state.

::: info 🖼️ Image pending — `public/signal-scope/crear-proyecto.png`
Screenshot of the **create project** dialog (name + location), or the Projects
view with a project under Recents.
:::

## 2. Register your networks

In the scan panel, networks are registered as **CIDR ranges** (for example
`192.168.1.0/24`) and shown as chips you can toggle on and off: the scan only
sweeps the ones that are on.

A new project starts with none: add your network segment — or any others you
manage — by typing it into the field. The widest range accepted is `/16`.

## 3. Scan

Press **Scan** (or **Scan all**). The app sweeps the active networks with ping,
shows per-network progress and can be cancelled at any time.

Everything that responds shows up in the **Detected** table with its IP, MAC
and manufacturer, plus a **Suggestion** column hinting at what each device
looks like: "Ubiquiti radio", "MikroTik device · not airMAX", and so on.

::: info 🖼️ Image pending — `public/signal-scope/escaneo-detectados.png`
Screenshot of the **scan panel** with the network chips and the **Detected**
table with findings and their Suggestion column.
:::

::: details A device says "MAC unreachable" — what does that mean?
It sits behind a router (outside your local network), and from that distance
the scan only sees its IP. Not a problem: when you sign in, the device
identifies itself fully, MAC included.
:::

## 4. Sign in to the radios

Radios need a session to report their metrics. Use the airOS credentials (the
same ones as their web interface); the app picks the connection method on its
own (HTTP or SSH).

Two ways:

- **Individually** — the **Sign in** button on the device's row.
- **Cascade session** — the time-saver for the first run: it applies the **same
  credentials to every device without a session**, all at once. Those that fail
  are marked to retry individually with their own credentials.

Upon connecting, **each radio reports its mode and classifies itself** as a
**Station** or an **Access point** — there is nothing to classify by hand.
Credentials are stored (encrypted inside the project) and the app uses them to
reconnect automatically in future sessions.

Anything that is not one of your radios — a MikroTik, an ONU — gets marked
**"Not a radio"** and moves to the **Others** inventory, as explained in the
[introduction](./#how-your-devices-are-organized).

::: info 🖼️ Image pending — `public/signal-scope/sesion-cascada.png`
Screenshot of the **Cascade session** modal: credentials, the queue of pending
radios and the "Connecting… N of M" progress.
:::

## You are now monitoring

With sessions open, the tables refresh on their own: signal in dBm (local and
remote), traffic light, throughput, distance, uptime. From here on:

- **Set references**: when a link is healthy, **"Mark OK"** pins its current
  signal as that antenna's reference; the traffic light will then tell you how
  far it has drifted from that point.
- **Save a snapshot** of the network's initial state — it will serve as a point
  of comparison.

The next guides cover the interface in detail and how to read the traffic light
and the diagnosis.

::: details A radio the scan cannot find?
If a radio lives in a segment you cannot scan, register it by hand:
**Device (+)** on the bottom rail opens the sign-in dialog with an editable IP.
:::
