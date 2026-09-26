# Troubleshooting

The most common stumbles, grouped by topic. If yours is not here, write to
**support@materis.io**.

## Scanning and discovery

::: details The scan does not find a device I know is online
Three frequent causes, in order:

1. **Its network is not registered or the chip is off** — the sweep only
   covers the enabled ranges in the scan panel.
2. **It blocks ping** — some devices limit or drop ICMP. If you know its IP,
   register it by hand with **Device (+)** on the bottom rail.
3. **It sits behind a router** — the scan will only see it if its IP falls
   inside a registered range, and it will arrive without a MAC ("MAC
   unreachable").

For stations hanging off an AP with a session there is a better shortcut: the
**radar** in the Stations column asks the AP itself and does not depend on the
scan.
:::

::: details The scan fails with "No network connection"
Your PC has no active network interface at that moment (cable unplugged, WiFi
off, VPN down). Reconnect and scan again.
:::

::: details A device says "MAC unreachable"
It is in another segment, behind a router, and from that distance the scan
only sees its IP. Not a problem: **signing in** identifies the device fully,
MAC included.
:::

::: details A device's IP changed
The app looks for it on its own: in its AP's station list, in the other APs'
lists and via ARP on this PC's network. If it finds it, it reconnects at the new
IP without losing name, baseline or credentials — each device's identity is its
**MAC**. A scan that sees it at another IP does the same.

If there is no way to find it, the app asks you for the new IP: the Session chip
turns **violet** and you type the address in the *Connection* tab of its session
window. See [When the app needs you to step in](./interface/stations#when-the-app-needs-you-to-step-in).
:::

## Sessions and monitoring

::: details A radio's session shows amber with an open padlock
That radio only answered over **unencrypted HTTP**: username, password and
metrics travel readable inside your network. The app marks it instead of
hiding it so you can decide — the underlying fix is enabling HTTPS or SSH on
the device.
:::

::: details I use a laptop over WiFi and sessions flicker or readings are irregular
Everything the app measures travels through your own PC's connection. If the
laptop's WiFi drops packets or reassociates, sessions fall and watched
devices show "No answer" — symptoms identical to a problem in the network you
monitor, but whose origin is your connection.

**The recommendation is to wire the laptop** to the management network while
monitoring. The metrics the radios themselves report (signal, link latency)
are not contaminated — but reaching them depends on your connection.
:::

::: details A station shows "Absent" but answers ping
"Absent" means the **session** was lost, not necessarily the device — and the
app makes that distinction for you: absent devices get a periodic ping, and
the chip's tooltip tells you which case it is. **"Answers ping but refuses the
session"** is the signature of an **exhausted** radio (no CPU or memory left
to open the session, even though it keeps answering pings); **"does not answer
ping either"** is a device that is down or unreachable. Reconnection is retried
on its own with the stored credentials, and the **Log** tab of its session
window tells each attempt. The chip's other states are in
[When a device goes absent](./interface/stations#when-a-device-goes-absent).
:::

::: details Several devices go absent at once and the chip says "No network on this PC"
The one that lost its network is your PC, not your devices. You get **a single
notice**, *"This PC lost its network"*, instead of one per device, and the app
looks for nobody until the network is back. Then the devices reconnect on their
own.
:::

::: details A device drops and comes back over and over
The chip marks it as **Possible cut** and the tooltip says it: it *drops and
comes back over and over*. It is usually a PPPoE that redials and is rejected,
as in a cutoff for non-payment — the link is not the problem.
:::

::: details I swapped a radio and the app asks me whether it is a replacement
That is expected when the new one carries the **same name** and answers at the
old one's IP: the app does not assume it, puts them side by side and you decide.
See [Possible replacement](./interface/stations#possible-replacement).
:::

::: details The Downlink/Uplink columns are empty on some devices
That is correct: **airOS 6** devices do not compute that capacity estimate,
and the app prefers an empty cell to a number that looks like capacity and is
not. The same goes for Thr. TX/RX on each session's **first reading**: there
is nothing to compare against yet.
:::

::: details The app's latency does not match my ping
They measure different things. The column is measured by **the radio over its
wireless hop**; your ping also crosses your local network and everything in
between, and is answered by the radio's CPU, which serves ICMP last. Neither
is "wrong" — they need not match. To see both side by side, turn on **"Also
measure with our own ping"** (Preferences → Network probe): the cell shows
both measurements, and the contrast is diagnosis.
:::

::: details The sentinel did not warn about an outage at dawn
**Closing the window does not stop the watch**: the app stays
next to the clock and keeps measuring. What does stop it is **"Quit"** in its
icon menu, or switching the PC off.

If you want it watching from the moment you turn the machine on, enable
**Preferences → General → "Start with Windows"**: the app opens by itself and
lands in the Monitor of the project it was watching.

Even so, it is still a program on **your** machine, not a 24/7 service on
somebody's server.
:::

::: details After updating I see a duplicated device: one row with a session and another absent, with the same data
Its session was stored under a **MAC different from the one the device
reports**. Each row is identified by **its own radio's** MAC, and the
difference shows — with a notice on the MAC cell.

The fix is two gestures, and the order matters: **remove the absent row** and
**sign in again** on the one that remains. One row is left.
:::

::: details I mistyped the password and the app stopped trying
That is correct, and it protects you: insisting makes the device itself close
access — **airOS locks it for half a minute after several failed attempts** — and
ends up locking you out too, terminal included. The notice repeats what the radio
said, in its own words. Fix the detail and connect again.

If the account of an already registered device stops working, the app pauses
its session and asks you as **Account rejected**: correct it in the
*Connection* tab or press **Try again** once you fix it on the device.
:::

::: details Alerts show in the panel but never arrive as Windows notifications
Two known causes: on versions **before 1.2.3** installed from the Microsoft
Store, Windows silently discarded the notifications — the Store updates on
its own, check your version under **What's new**. And if the version is
current, check the event is on under **Preferences → Alerts** and that
Windows is not in "Do not disturb".
:::

::: details Windows asks for firewall permission when using the speed test
That is normal: the speed test server **opens a listening port** on your PC so
the radio can connect and measure. It only listens while you keep it on and
stops when you turn it off or close the app.
:::

## License

::: details Activation says the device quota is full
The license is already active on its maximum number of machines. Free the
slot from the old PC (**License view → "Release license"**) and activate on
the new one. If that PC no longer exists (formatted, dead disk), write to
**support@materis.io** to release it.
:::

::: details Activation is rejected because of the email
Activation requires the license **holder's** email — the same one used at
purchase. Check which one you bought with; if you need to change the holder's
email, write to us.
:::

::: details What if I have no internet for a while?
Nothing, within a margin: day-to-day use needs no internet and the license
tolerates up to **30 days without revalidating**. Past that margin the app
will ask for a connection to continue. And if the server cannot be reached,
the app does not lock you out: "could not check" is never treated as "license
rejected".
:::

::: details I reinstalled the app and the trial button is gone
The trial is **one per machine** and its countdown runs from the first launch
after the first install — reinstalling or deleting data does not reset it. If
you tried it and it worked for you, the next step is the Full license.
:::

## Projects and snapshots

::: details I opened my project on another PC and it asks for a code
That is the [transfer code](./sharing#sharing-the-project-the-transfer-code):
the project's credentials are anchored to the PC where it was created. Read
it on the original PC (**Share project**), enter it once on the new one and
that machine stays linked.
:::

::: details I protected a snapshot and want the trimmed data back
Not possible: the trim is **permanent**, in the file itself — that is
precisely the protection's guarantee. That is why the confirmation modal
offers to create an **unprotected copy** first, kept in your history. If you
created it, the full data is there.
:::

::: details I want to recover a device I sent to References by mistake
In the **References** table, open its actions (click the Monitoring chip) and press
**Remove from the project**; then scan again. The device reappears in
**Detected** as if new, ready to sign in.
:::

::: details Does the map need a key?
Not for the streets: they come from **OpenFreeMap**, which serves without a key,
without registration and without a quota.

The **satellite view** is the only part that asks you for something: your own
Google key in Preferences — see
[Base map](./interface/map#satellite-with-your-own-google-key).
:::

## MikroTik devices (RouterOS)

::: details A single MikroTik left two rows in the tables
That is correct: a box with **two radios** — the 2.4 GHz one and the 5 GHz one —
takes **one row per radio**, even though it is a single device and a single
session. They can be in different modes, so one may land in Access points and the
other in Stations.

What belongs to the device — CPU, memory, model, firmware, ports — repeats
identically in both: **they are not two measurements, they are one**. And
switching off, muting or forgetting takes **the whole box**.
:::

::: details My MikroTik connects, but several columns come out empty
Latency, Air, Distance, Sessions, the remote signal and Downlink/Uplink **are not
published by RouterOS 6**, so they stay empty. It is not a read failure: an empty
cell tells the truth, and a number that looks like a measurement without being
one does not.

The full list — and what does arrive — is in
[Supported devices](./supported-devices#what-you-see-from-a-mikrotik-and-what-you-do-not).
:::

::: details I can't find the HTTP button when connecting a MikroTik
It is disabled on purpose. **RouterOS 6 has no REST API** — that arrived in v7 —
and the `www` port you see open serves WebFig, a browser interface, not something
you can query. With RouterOS the transport is forced to **SSH**.

If you changed the SSH port on the device, say so in the form: a RouterOS
device's services may sit on moved ports.
:::

::: details My MikroTik is not on the Map and I can't find where to set its coordinates
**RouterOS does not allow writing them to the device**: its GPS package is
read-only. That is why, and only for these devices, the app lets you **annotate
the position by hand** from the map — see
[Annotating the position of a MikroTik](./interface/map#annotating-the-position-of-a-mikrotik).

On airMAX that button does not exist on purpose: there coordinates are registered
on the radio itself, where they are useful to any tool.
:::

::: details I signed in to a MikroTik and it told me it has no radio
A RouterOS router or switch **with no wireless module** produces no radio row:
there is no signal to measure. Move it to **References**, where it has its
"is it still alive?" watch and its sentinel alert if it stops answering.
:::

## Frequently asked questions

**Can SignalScope change my radios' configuration?**
No. It is read-only by design: no path exists in the app to modify a device.

**Does it work with radios other than Ubiquiti airMAX?**
Yes: the app also manages **MikroTik devices running RouterOS**, **in
beta** — tested on fewer models, not unstable. The details are in
[Supported devices](./supported-devices). The rest of your network's devices
(ONUs, switches, customer routers) can be registered under **References**, with a
name and an availability watch.

**Do you support TP-Link?**
Not yet; it is on the roadmap. In the meantime, those devices can live under
**References** — with their own name, availability watch and a sentinel alert if
they stop answering.

**What about RouterOS 7?**
Unverified. Support was built and tested against **RouterOS 6**; v7 changes quite
a lot — it has a REST API, new fields — and we do not call it good until we have
tested it. If you use it, tell us how it went.

**Does it support Ubiquiti LTU?**
Not yet — LTU runs a firmware different from airOS and compatibility is under
evaluation.

**Do I need to install Npcap or any other driver?**
No. Discovery uses ping and the system's ARP table; the app installs nothing
extra.

**Does my data go to any cloud?**
No. Everything lives on your machine — the detail is in
[Security and privacy](./security-privacy).

**Is the trial feature-limited?**
No: full access for 30 days. The only difference is the duration.

**Can I use my license on more than one PC?**
Up to your license's device quota (visible in the License view). To move
machines, release the slot on the old one and activate on the new one.

**What happens to my projects if my license expires?**
Nothing is deleted. The app returns to the license screen and, once you renew
or activate, everything is right where it was.

**Does it send WhatsApp or email notifications?**
**WhatsApp and Telegram, yes** — the sentinel's alerts can reach your phone,
choosing which events and with what urgency
([how to enable it](./sentinel#phone-notices-whatsapp-or-telegram)). The
honest limit: it watches **while the app runs on your machine** — closing the
window does not stop it, but switching the PC off or quitting from the icon
does. That continuous, independent watch will come with the future **server
edition** (Linux). Email it does not send.

**Is there a web version?**
Not planned for the desktop app. The future server edition will be a **web
application** by nature — managed from the browser.

**Is it available for Mac?**
Not yet — today SignalScope is a **Windows 10/11** app. macOS compatibility
is on the roadmap, with no committed date.

**I am going to format my PC — do I lose access to my projects?**
No, as long as you do two things **before** formatting:

1. **Write down each project's transfer code** (**Share project**). When you
   format, the key protecting your credentials is lost with Windows, so your
   own PC becomes "a new PC" for the project: opening it will ask for that
   code once, and with it you recover everything. **Without the code, the
   file does not open** — that is precisely the shielding that protects it if
   it falls into the wrong hands.
2. **Release the license** (License view → "Release license") so the slot is
   not left taken by the old install.

And the usual: the `.sscope` is a file — back it up to another drive before
formatting, as you would with any important document.
