# Installation and activation

SignalScope installs on **Windows 10 or 11 (64-bit)**. It requires no
administrator rights and needs no drivers or additional software. Your data
lives in your user profile and is kept when you update or reinstall the app.

## Install

SignalScope is distributed through the **Microsoft Store**:

**[Get SignalScope on the Microsoft Store](https://apps.microsoft.com/store/detail/9NPZ6VTKF989)**

It installs like any other Store app. When a new version is out, the app itself
tells you and installs it from the inside (see [Updates](#updates)).

## First launch

When you open SignalScope you first see the loading screen and, right after,
the **license screen**.

App data (recent projects, preferences, cache) is stored in
`%APPDATA%\SignalScope`. If you come from an old portable version, the app
migrates that folder automatically on first launch.

## The license screen

SignalScope requires a license to run. The screen offers two paths, and both
give full access to every feature:

| | Trial | Full license |
|---|---|---|
| Duration | 30 days | Annual |
| Needs internet | No | Only to activate and revalidate |
| Needs an email | No | Yes (the license holder's) |
| Devices | The machine it was installed on | Up to your license's device quota |

At the top are the **Email** and **License key** fields with the **"Activate
and continue"** button. Below them, separated by an **OR**, is the trial button.
The **Compatibility** box at the bottom sums up which systems the app supports:
MikroTik shows as **"MikroTik · beta"** and TP-Link as **"TP-Link · soon"**.

![The license screen: email and key to activate the Full license, or the amber button to continue with the trial](/signal-scope/pantalla-licencia.png)

## Trial (30 days)

Click **"Continue with the trial · N days left"** and you are in with full
access, no email and no connection. Under the button the app shows the end
date: "No key or card needed · full monitoring until…".

Worth knowing:

- The countdown starts on the first launch after installing, not when you press
  the button.
- There is one trial per machine. Reinstalling the app or deleting its data does
  not reset it.
- During the trial, the license screen shows up on every launch with the days
  remaining. Inside the app, an amber pill, **"Trial · N day(s)"**, takes you to
  the **License** view, where you can register the Full license at any time
  without reinstalling or losing anything.
- When it expires, the trial option disappears and the app waits for a Full
  license. **Your projects are not deleted**: once you activate, everything is
  right where you left it.

## Full license

The Full license is annual and is purchased by writing to
**support@materis.io** (the **"Need a license?"** link on the screen opens an
email to that address). You will receive a **license key** tied to your email.

Activating requires an internet connection, only at that moment:

1. On the license screen, or in the **License** view if you are on the trial,
   enter the **license holder's email** and the **key**.
2. Click **"Activate and continue"**. The license is bound to that machine and
   the app opens.

::: warning The email matters
Activation checks that the email belongs to the license **holder**. If you
bought with one email and activate with another, the server will reject it.
:::

### After activating

- **Day-to-day use needs no internet.** Monitoring runs against your local
  network, and the app revalidates the license on its own whenever there is a
  connection.
- Offline, the app keeps working. If more than 7 days go by without being able
  to revalidate, it still works, but it warns you to reconnect soon to keep this
  machine's activation.
- If the server cannot be reached, the app does **not** lock you out. It tells
  "could not check" apart from "the license was rejected", and in the first case
  it keeps operating on its last valid state.
- The full status (active license, email, masked key, plan and device quota) is
  in the **License** view of the welcome screen.

### Renewing

- The license is annual and the app warns you ahead of the expiration, on the
  Welcome screen and in the License view, even offline.
- Next to the notice (and on the license screen, if it already expired) a
  **"Renew license"** button appears with the amount shown. It opens in your
  browser the payment link Materis already issued, the same one that reaches
  you by email. The app creates no charges: it only takes you where to pay.
- If you already reported your payment, the button is replaced by that
  confirmation, so someone who already paid is not asked again.
- Between the advance notice and the link's validity there is room to renew
  **before** any service cut.

### Moving to another machine

The license takes one slot per machine. To move:

1. On the old machine, open the **License** view and click **"Release this
   machine's license"**. That frees the slot and takes you back to the
   activation screen.
2. On the new machine, activate with the same email and key.

::: warning Release before formatting or uninstalling
Uninstalling the app does **not** free the slot. If the machine is gone
(formatted, dead disk) and the slot is still taken, write to
**support@materis.io** to release it.
:::

## Updates

Your projects, preferences and license are kept through every update. Each
version's changelog is available inside the app, in the **What's new** view.

When a new version is available, an update button appears in two places: the
foot of the Welcome rail (**"Update SignalScope"**) and the Monitor's top bar
(**"Update"**). The button only exists when there is something to update,
because a permanent button stops being read and one that appears gets noticed.

When you press it, the app warns you about the one thing worth deciding: **it
will close completely**, and in the meantime it will stop monitoring your network
and sending you notifications. It saves your project before it starts. You click
**"Update now"**, Windows asks for its own confirmation, a progress bar appears
and the app closes itself when it is done. If something fails, you can **Try
again** or finish with **"Open in the Microsoft Store"**.

The app **does not reopen on its own**. Until you open it, your network is not
being watched, which is why you pick the moment. When you open it again you pick
up where you left off.

The check runs every 6 hours and **installs nothing by itself**: all it does is
make the button appear.

::: info 🖼️ Image pending: `actualizar.png`
The Microsoft Store update dialog: the warning that the app will close and stop
watching, and the **Update now** button.
:::

## Startup, tray and closing

Three behaviours worth knowing from day one.

### Closing the window does not close the watch

With a project open, the **X** does not close the app: it hides it in the system
tray, next to the clock, and the app **keeps measuring and alerting**.

- The first time, the **"SignalScope in the background"** notice appears. It
  explains where the app went and how to close it for real, and it has two
  buttons. **"Got it, keep it watching"** hides the window and the notice does
  not come back. **"Quit for good"** closes the app right away, and since that
  does not mark the notice as seen, the next X shows it again.
- To close SignalScope completely, use **File → Quit SignalScope** (it asks for
  confirmation) or right-click its tray icon and choose **"Quit SignalScope"**.
- **With no project open, the X closes the app.** It only stays resident when it
  has something to watch.
- Left-clicking the tray icon shows or hides the window. Right-clicking opens
  its menu, whose first line says which project is open and its state (for
  example, how many devices it is watching or how many alerts it has). The icon
  carries a red dot while there are pending alerts; alerts from muted devices do
  not count. From the menu you can **"Open SignalScope"**, go to the Monitor or
  the Map (**"Go to Monitor"**, **"Go to Map"**), **"Save project"** or quit.
- If you click a Windows notification, the app opens on the device that caused
  it instead of the start screen. Notifications are turned on in **Preferences →
  Alerts**, with the **"Windows notifications"** switch.

::: tip What if I want to stop watching without closing the app?
Use **File → Close project**: it stops watching and returns to the Welcome
screen without deleting the project. That project stays closed on the next
launch instead of reopening by itself.
:::

::: info 🖼️ Image pending: `bandeja.png`
The tray icon menu: the header with the project name and its state, the Monitor
and Map entries, and Quit.
:::

### Start with Windows

**Preferences → General → Startup** has the **"Start with Windows"** switch:
"Adds SignalScope to the Windows startup apps, and it starts with the last
project you left open." When you turn the PC on, the app opens by itself and
lands you **straight in the Monitor** of that project.

Three details that are not obvious:

- **It skips nothing.** The usual loading screen still appears, and that is
  where the license is checked and your project is opened with its keys. Only
  the screen you land on changes.
- **It does not reopen a project you closed by hand.** In that case it leaves
  you on the Welcome screen, with the project one click away.
- **Windows can block the change.** If you turned startup off from Task Manager
  or from Settings → Apps → Startup, the app can no longer turn it back on, and
  the switch says so: "You turned it off in Windows, so only you can turn it back
  on, under Settings → Apps → Startup." If your organization's policy controls
  it, it says that too, instead of promising a startup that will not happen.

### Alerts do not depend on which screen you are looking at

With the project open, the sentinel watches on any screen: in the Monitor, in
the Map, on the Welcome screen (which also tells you whether it is watching and
how many devices) or with the window hidden in the tray.
