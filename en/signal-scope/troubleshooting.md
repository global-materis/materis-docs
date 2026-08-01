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

::: details A device's IP changed and the app shows the old one
Scan again: each device's identity is its **MAC**, so the re-scan updates the
IP without losing name, references or credentials. On **routed** devices (no
visible MAC) the automatic match is not possible — sign in at the new IP and
the app recognizes it as it identifies itself.
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
"Absent" means the **session** was lost, not necessarily the device: a web
session expired by the radio produces exactly that. The app retries the
reconnection on its own with the stored credentials; the "Absent" chip's
tooltip shows the reason and when it was last seen.
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
is "wrong" — they need not match. To see both side by side, turn on **"Medir
también con ping propio"** (Preferences → Sonda de red): the cell shows both
measurements, and the contrast is diagnosis.
:::

::: details The sentinel did not warn about an outage at dawn
The sentinel watches **while the app is open** — it is not a background
service. Whatever happens with the app closed it will not see; the app itself
says so at the bottom of the alerts panel.
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

::: details I want to recover a device I discarded with "Not a radio"
In the **Others** table, click **Remove** on its row and scan again: the
device reappears in **Detected** as if new, ready to sign in.
:::

## Frequently asked questions

**Can SignalScope change my radios' configuration?**
No. It is read-only by design: no path exists in the app to modify a device.

**Does it work with radios other than Ubiquiti airMAX?**
Today the app manages **Ubiquiti airMAX** radios. The rest of your network's
devices (ONUs, switches, routers) can be registered under **Others**, with a
name and basic availability watch.

**Do you support MikroTik?**
Not yet, but **yes in future versions**: it is on the roadmap. In the
meantime, your MikroTiks can live under **Others** — with their own name,
availability watch and a sentinel alert if they stop answering.

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
The desktop app does not, on purpose: it is built for **local monitoring** —
the sentinel's notices reach the Windows desktop, where you are working.
Sending you a WhatsApp while you sit in front of the PC adds nothing, and a
PC is not always on, so it would promise a watch it cannot keep. That kind
of notice is planned for a future **server edition** (Linux), which does
watch 24/7 — there, alerting your phone makes sense.

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
