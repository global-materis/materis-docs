# Troubleshooting

The most common stumbles, grouped by topic. If yours is not here, write to
**support@materis.io**.

## Scanning and discovery

::: details The scan does not find a device I know is online
There are three frequent causes. Check them in this order:

1. Its network is not registered, or its chip is off. The sweep only covers
   the enabled ranges in the scan panel.
2. The device blocks ping. Some devices limit or drop ICMP; if you know its
   IP, register it by hand with **Device (+)** on the bottom rail.
3. It sits behind a router. The scan will only see it if its IP falls inside a
   registered range, and it will arrive without a MAC ("MAC not reachable").

For the stations of an AP with a session there is a better shortcut: the
**radar** in the Stations column asks the AP itself and does not depend on the
scan.
:::

::: details The scan fails with "No network connection"
Your PC has no active network interface at that moment (cable unplugged, WiFi
off, VPN down). Reconnect and scan again.
:::

::: details A device says "MAC not reachable"
It is in another segment, behind a router, and from there the scan only sees
its IP. Nothing needs fixing: **signing in** identifies the device fully, MAC
included.
:::

::: details A device's IP changed
The app looks for it on its own in its AP's station list, in the other APs'
lists and via ARP on this PC's network. If it finds it, it reconnects at the
new IP without losing name, baseline or credentials, because each device's
identity is its **MAC**. A scan that sees it at another IP does the same. When
the device that changed its IP is an AP, you also get the notification *"An AP
changed its IP"*: for an AP that is unusual, and it is worth checking whether
its address should be fixed.

If there is no way to find it, the app pauses the session and asks you for the
new IP: the Session chip turns **violet** and you type the address in the
*Connection* tab of its session window. See
[When the app needs you to step in](./interface/stations#when-the-app-needs-you-to-step-in).
:::

## Sessions and monitoring

::: details A radio's session shows amber with an open padlock
That radio only answered over **unencrypted HTTP**, so username, password and
metrics travel readable inside your network. The app marks it instead of
hiding it so that you can decide. The underlying fix is enabling HTTPS or SSH
on the device.
:::

::: details I use a laptop over WiFi and sessions flicker or readings are irregular
Everything the app measures travels through your own PC's connection. If the
laptop's WiFi drops packets or reassociates, sessions fall and watched devices
show "No answer". Those are the same symptoms a problem in the monitored
network would give, but the origin is your connection.

While you monitor, wire the laptop to the management network. The metrics the
radios themselves report (signal, link latency) are not contaminated, although
reaching them does depend on your connection.
:::

::: details A station shows "Absent" but answers ping
"Absent" means the **session** was lost, and the device may still be there.
The app tells the two cases apart for you: absent devices get a periodic ping,
and the chip's tooltip says which case it is. *"That IP answers ping but
refuses the session"* is the signature of an **exhausted** radio, with no CPU
or memory left to open the session even though it keeps answering pings.
*"That IP does not answer ping either"* points to a device that is down or
unreachable.

Reconnection is retried on its own with the stored credentials, and the
**Log** tab of its session window records each attempt. The chip's other
states are in
[When a device goes absent](./interface/stations#when-a-device-goes-absent).
:::

::: details Several devices go absent at once and the chip says "No network on this PC"
The one that lost its network is your PC, and your devices are as they were.
You get a single notification, *"The PC lost its network"*, instead of one per
device, and the app looks for nobody until the network is back. Then the
devices reconnect on their own.
:::

::: details A device drops and comes back over and over
The chip marks it as **Possible cut**, and the tooltip explains it: it *drops
and comes back over and over*. It is usually a PPPoE that redials and is
rejected, as in a cutoff for non-payment. The problem is not in the link.
:::

::: details I swapped a radio and the app asks me whether it is a replacement
That happens when the new one carries the **same name** and answers at the old
one's IP. The app does not assume it: it puts both side by side and you
decide. See [Possible replacement](./interface/stations#possible-replacement).
:::

::: details The Downlink/Uplink columns are empty on some devices
That is correct. **airOS 6** devices do not compute that capacity estimate,
and the app prefers an empty cell to a number that looks like capacity without
being it. Thr. TX/RX behaves the same on each session's **first reading**,
because there is nothing to compare against yet.
:::

::: details The app's latency does not match my ping
They measure different things. The column is measured by **the radio over its
wireless hop**. Your ping also crosses your local network and everything in
between, and it is answered by the radio's CPU, which serves ICMP at the end
of its queue. Neither one is wrong, and they need not match.

To see both side by side, turn on **"Ping from SignalScope"** under
Preferences → General → Network probe. The cell then shows both measurements,
and the gap between them is already a diagnosis: the problem may be in the
network or in the device's CPU, outside the wireless link.
:::

::: details I mistyped the password and the app stopped trying
The app does this to protect you. **airOS 8.7.18 and later cut access for 30
seconds after several failed attempts**, and a retry every few seconds would
renew that lock before it expires: the radio would stay closed to you as well,
even from your terminal. That is why the session does not insist after a
rejection. The notice repeats what the radio said, in its own words, and names
the possible causes: the user does not exist on that device, the password is
not its password, or the account is read-only. Fix the detail and sign in
again.

If the account of an already registered device stops working, the app looks
for the device at other IPs before giving up, because another device may now
be answering at its IP. If it finds it, it reconnects on its own. If not, it
pauses the session and asks you as **Account rejected**: fix the account or
the IP in the *Connection* tab, or press **Try again** once you fix it on the
device.
:::

::: details After updating I see a duplicated device: one row with a session and another absent, with the same data
Its session was stored under a **MAC different from the one the device
reports**. Each row is identified by its own radio's MAC, so the difference
shows, with a notice on the MAC cell.

The fix takes two steps, in this order: **remove the absent row** and **sign
in again** on the one that remains. You end up with a single row.
:::

::: details Alerts show in the panel but never arrive as Windows notifications
There are two known causes. On versions **before 1.2.3** installed from the
Microsoft Store, Windows silently discarded the notifications; check your
version under **What's new** and update.

With a current version, open **Preferences → Alerts** and check that
**"Windows notifications"** is on and that the event is ticked under *What
reaches the desktop*. If Windows has SignalScope notifications blocked, that
same screen says so: you enable them in Settings → System → Notifications.
Also check that Windows is not in "Do not disturb".
:::

::: details Windows asks for firewall permission when using the speed test
That is normal. The speed test server **opens a listening port** on your PC so
the radio can connect and measure. It only listens while you keep it on, and
stops when you turn it off or close the app.
:::

## The app: tray, startup and updates

::: details I closed the window and SignalScope is still running
With a project open, the **X** hides the window and leaves the app in the
system tray, next to the clock, measuring and alerting. The first time it
explains this with the **"SignalScope in the background"** notification. If you
press **"Got it, keep it watching"**, it does not show again. **"Quit for
good"** closes the app without marking the notification as seen, so the next X
explains it again. With no project open, the X closes the app.

To close SignalScope completely you have two ways: **File → Quit
SignalScope**, or right-click its tray icon → **Quit SignalScope**. If you only
want to stop watching without closing the app, use **File → Close project**.
:::

::: details The sentinel did not warn about an outage at dawn
Closing the window does not stop the watch (see the previous entry). What does
stop it is quitting with **Quit SignalScope**, closing the project or
switching the PC off.

If you want it watching from the moment you turn the machine on, enable
**"Start with Windows"** under Preferences → General → Startup. It adds
SignalScope to the Windows startup apps, and the app starts with the last
project you left open. If you turned it off in Windows, only you can turn it
back on, under Settings → Apps → Startup, and the checkbox tells you so.

Even so, SignalScope is a program running on **your** machine, with no 24/7
service on any server.
:::

::: details I don't know how to update the app
When a new version is out, an **Update** button appears at the foot of the
Welcome screen and in the Monitor bar. If you do not see it, there is nothing
to update. What happens when you press it depends on how you installed the
app:

- **Installer downloaded from the web.** The button says **"Update to v…"**
  and opens a notification with **Download v…**: the installer downloads in your
  browser and, when you run it, reinstalls over the current version (it is
  normal for it to uninstall the previous one first). Your projects, license
  and data are kept. In the installer, leave "Remove application data"
  **unchecked**.
- **Microsoft Store.** The button says **"Update SignalScope"** and the update
  installs from inside the app with **Update now**. SignalScope closes
  completely in the meantime, so it stops monitoring and sending you
  notifications. Before starting it saves your project, and when you open the
  app again you pick up where you left off. If it fails, you can press **Try
  again** or finish it with **Open in the Microsoft Store**.
:::

## MikroTik devices (RouterOS)

::: details A single MikroTik left two rows in the tables
That is correct. A box with **two radios** (the 2.4 GHz one and the 5 GHz one)
takes **one row per radio**, even though it is a single device with a single
session. The radios can be in different modes, so one row may land in Access
points and the other in Stations.

The device's data (CPU, memory, model, firmware, ports) repeats identically in
both rows because it is a single measurement. Switching off, muting or
forgetting applies to **the whole box**.
:::

::: details My MikroTik connects, but several columns come out empty
Latency, Air, Distance, Sessions, the remote signal and Downlink/Uplink **are
not published by RouterOS 6**, so they stay empty. It is not a read failure.
The app prefers an empty cell to a number that looks like a measurement and is
not one.

The full list, with what does arrive, is in
[Supported devices](./supported-devices#what-you-see-from-a-mikrotik-and-what-you-do-not).
:::

::: details I can't find the HTTP button when connecting a MikroTik
It is disabled on purpose. **RouterOS 6 has no REST API** (it arrived in v7),
and the `www` port you see open serves WebFig, a browser interface that cannot
be queried. With RouterOS the transport is forced to **SSH**.

If you changed the SSH port on the device, say so in the form: a RouterOS
device's services may sit on moved ports.
:::

::: details My MikroTik is not on the Map and I can't find where to set its coordinates
**RouterOS does not allow writing them to the device**, because its GPS
package is read-only. That is why, and only for these devices, the app lets
you **annotate the position by hand** from the map. See
[Annotating the position of a MikroTik](./interface/map#annotating-the-position-of-a-mikrotik).

On airMAX that button does not exist on purpose: there coordinates are
registered on the radio itself, where they serve any tool.
:::

::: details I signed in to a MikroTik and it told me it has no radio
A RouterOS router or switch **with no wireless module** produces no radio row,
because there is no signal to measure. Move it to **References**, where you
can watch whether it is still answering and get the sentinel's alert if it
stops.
:::

## License

::: details Activation says the device quota is full
The license is already active on its maximum number of machines. Free the
slot from the old PC (**License** view → **"Release this machine's
license"**) and activate on the new one. If that PC no longer exists
(formatted, dead disk), write to **support@materis.io** to release it.
:::

::: details Activation is rejected because of the email
Activation requires the license **holder's** email, the same one used at
purchase. Check which one you bought with. If you need to change the holder's
email, write to us.
:::

::: details What if I have no internet for a while?
Day-to-day use needs no internet, and the app keeps working on its last stored
validation. If more than a week goes by without reaching the license server,
it asks you to reconnect soon to keep this PC's activation. And if the server
cannot be reached, the app does not lock you out: "could not check" is never
treated as "license rejected".
:::

::: details I reinstalled the app and the trial button is gone
The trial is **one per machine**, and its countdown runs from the first launch
after the first install. Reinstalling or deleting data does not reset it. If
you tried it and it worked for you, the next step is the Full license.
:::

## Projects and Snapshots

::: details I opened my project on another PC and it asks for a code
That is the [transfer code](./sharing#sharing-the-project-the-transfer-code).
The project's credentials are anchored to the PC where it was created. Read
the code on the original PC (**Share project**) and enter it once on the new
one; that machine stays linked.
:::

::: details I protected a Snapshot and want the trimmed data back
That is not possible. The trim is **permanent** and lives in the file itself,
which is exactly what the protection guarantees. That is why the confirmation
modal offers to create an **unprotected copy** first, kept in your history. If
you created it, the full data is there.
:::

::: details I want to recover a device I sent to References by mistake
In the **References** table, open its actions by clicking the Monitoring chip
and press **Remove from the project**. Then scan again: the device reappears
in **Detected** as if new, ready to sign in.
:::

::: details Does the map need a key?
The streets do not. They come from **OpenFreeMap**, which serves without a
key, without registration and without a quota.

Only the **satellite view** asks you for something: your own Google API key in
Preferences → Map. See
[Base map](./interface/map#satellite-with-your-own-google-key).
:::

## Frequently asked questions

**Can SignalScope change my radios' configuration?**
No. It is read-only by design, and the app has no way to modify a device.

**Does it work with radios other than Ubiquiti airMAX?**
Yes. The app also manages **MikroTik devices running RouterOS**, **in beta**:
it is tested on fewer models, but it is not unstable. The details are in
[Supported devices](./supported-devices). The rest of your network's devices
(ONUs, switches, customer routers) can be registered under **References**,
with a name and an availability watch.

**Do you support TP-Link?**
Not yet; it is on the roadmap. In the meantime, those devices can live under
**References**, with their own name, an availability watch and a sentinel
alert if they stop answering.

**What about RouterOS 7?**
Yes, in the same beta. It was verified on two hAPs running **RouterOS 7.23**,
and the app reads them the same way as on v6, over SSH. The exception is
devices with ax chips: they use the new `wifi` package and the app doesn't
see their radios. If you use another model, tell us how it went.

**Does it support Ubiquiti LTU?**
Not yet. LTU runs a firmware different from airOS, and compatibility is under
evaluation.

**Do I need to install Npcap or any other driver?**
No. Discovery uses ping and the system's ARP table, and the app installs
nothing extra.

**Does my data go to any cloud?**
No. Everything lives on your machine; the details are in
[Security and privacy](./security-privacy).

**Is the trial feature-limited?**
No. It gives full access for 30 days, and the only difference is the
duration.

**Can I use my license on more than one PC?**
Up to your license's device quota, shown in the License view. To move
machines, release the slot on the old one and activate on the new one.

**What happens to my projects if my license expires?**
Nothing is deleted. The app returns to the license screen and, once you renew
or activate, everything is right where it was.

**Does it send WhatsApp or email notifications?**
**WhatsApp and Telegram**, yes. The sentinel's alerts can reach your phone,
and you choose which events and with what urgency
([how to enable it](./sentinel#phone-notifications-whatsapp-or-telegram)). The limit
is that it watches **while the app runs on your machine**: closing the window
does not stop it, but switching the PC off or quitting with **Quit
SignalScope** does. A continuous, independent watch will come with the future
**server edition** (Linux). It does not send email.

**Is there a web version?**
Not planned for the desktop app. The future server edition will be a **web
application**, managed from the browser.

**Is it available for Mac?**
Not yet. Today SignalScope is a **Windows 10/11** app. macOS compatibility is
on the roadmap, with no committed date.

**I am going to format my PC. Do I lose access to my projects?**
No, as long as you do two things **before** formatting:

1. **Write down each project's transfer code** (**Share project**). When you
   format, the key protecting your credentials is lost with Windows, and your
   own PC becomes "a new PC" for the project: opening it will ask for that
   code once, and with it you recover everything. **Without the code, the file
   does not open.** That is the protection that keeps it safe if it falls into
   the wrong hands.
2. **Release the license** (License view → "Release this machine's license")
   so the slot is not left taken by the old install.

Also, the `.sscope` is a file: back it up to another drive before formatting,
as you would with any important document.
