# Installation and activation

SignalScope installs on **Windows 10 or 11 (64-bit)**, requires no administrator
rights and needs no drivers or additional software. Your data lives in your user
profile and **survives updates and reinstalls**.

## Install

SignalScope is distributed through the **Microsoft Store**:

**[Get SignalScope on the Microsoft Store](https://apps.microsoft.com/store/detail/9NPZ6VTKF989)**

It installs like any other Store app, and when a new version is out the app
itself tells you and installs it **from the inside** — see
[Updates](#updates).

## First launch

Open SignalScope. The first thing you will see is the splash and, right after,
the **license screen**.

App data (recent projects, preferences, cache) is stored in
`%APPDATA%\SignalScope`. If you come from an old portable version, the app
migrates that folder automatically on first launch.

## The license screen

SignalScope requires a license to run. The screen offers two paths, **both with
full access to every feature**:

| | Trial | Full license |
|---|---|---|
| Duration | 30 days | Annual |
| Needs internet | No | Only to activate and revalidate |
| Needs an email | No | Yes (the license holder's) |
| Devices | The machine it was installed on | Up to your license's device quota |

![The license screen: email and key to activate the Full license, or the amber button to continue with the trial](/signal-scope/pantalla-licencia.png)

## Trial (30 days)

Click **"Continue with the trial"** and that is it: full access, no email, no
connection.

Worth knowing:

- **The countdown starts on the first launch after installing**, not when you
  press the button.
- It is **one trial per machine**: reinstalling the app or deleting its data
  does not reset it.
- During the trial, the license screen shows up on every launch with the days
  remaining, and inside the app an amber pill — **"Trial · N days"** — takes you
  to the **License** view, where you can register the Full license at any time,
  without reinstalling or losing anything.
- When it expires, the trial option disappears and the app waits for a Full
  license. **Your projects are not deleted**: once you activate, everything is
  right where you left it.

## Full license

The Full license is annual and is purchased by writing to
**support@materis.io**. You will receive a **license key** tied to your email.

Activating requires an **internet connection** (only at that moment):

1. On the license screen — or in the **License** view if you are on the trial —
   enter the **license holder's email** and the **key**.
2. Click activate. The license is bound to that machine and the app opens.

::: warning The email matters
Activation checks that the email belongs to the license **holder**. If you
bought with one email and activate with another, the server will reject it.
:::

### After activating

- **Day-to-day use needs no internet**: monitoring runs against your local
  network. The app revalidates the license on its own whenever there is a
  connection.
- **You can go up to 30 days offline**; past that window without revalidating,
  the app will ask for a connection to continue.
- If the server cannot be reached, the app does **not** lock you out: it tells
  "could not check" apart from "the license was rejected", and in the first case
  it keeps operating on its last valid state.
- The full status — active license, email, masked key, plan and device quota —
  lives in the **License** view of the welcome screen.

### Renewing

- The license is annual and **the app warns you in advance** of the
  expiration — on the Welcome screen and in the License view, visible even
  offline.
- Next to the notice (and on the license screen, if it already expired) a
  **"Renew license"** button appears with the amount in sight. It opens in
  your browser the **payment link Materis already issued** — the same one
  that reaches you by email; the app creates no charges, it only takes you
  where to pay.
- If you already reported your payment, the button is replaced by that
  confirmation — no insisting on someone who already paid.
- Between the advance notice and the link's validity there is room to renew
  **before** any service cut.

### Moving to another machine

The license takes one slot per machine. To move:

1. On the old machine, open the **License** view and click **"Release
   license"**. That frees the slot.
2. On the new machine, activate with the same email and key.

::: warning Release before formatting or uninstalling
Uninstalling the app does **not** free the slot. If the machine is gone
(formatted, dead disk) and the slot is still taken, write to
**support@materis.io** to release it.
:::

## Updates

Your projects, preferences and license **are kept through every update**, and
each version's changelog is available inside the app, in the **What's new** view.

When a new version is available an **Update** button appears in two
places: the foot of the Welcome rail and the Monitor's top bar. **It only exists
when there is something to update** — a permanent button stops being read; one
that appears gets noticed.

When you press it, the app warns you about the one thing worth deciding: **it
will close completely and stop watching**. Windows then asks for its own
confirmation, a progress bar appears, and the app closes itself when it is done.
**It does not reopen on its own**: until you open it, your network is not being
watched — which is why you pick the moment.

The check runs every 6 hours and **installs nothing by itself**: all it does is
make the button appear.

::: info 🖼️ Image pending — `actualizar.png`
The Microsoft Store update dialog: the warning that the app will close and stop
watching, and the **Update now** button.
:::

## Startup, tray and closing

Three behaviours that changed in v1.3.0 and that you **will notice on day one**.

### Closing the window does not close the watch

With a project open, the **X** no longer kills the app: it **tucks it next to the
clock**, in the taskbar, and it **keeps measuring and alerting**. It used to
close it — and the watch with it — without saying anything.

- **The first time it explains itself**, and that same notice lets you quit for
  real: someone who genuinely wanted to close should not have to hunt for the
  menu of an icon they don't yet know exists.
- **With no project open, the X really closes.** The app stays resident only
  when it has something to do.
- The **tray icon** is a place to look, not just a shortcut: its first line says
  **which project is open and its state**, it carries a red dot with pending
  alerts, and from its menu you go back to the **Monitor** or the **Map**, or
  quit altogether.
- If you click a **Windows notification**, the app opens **on the device that
  caused it** — not on the start screen.

::: tip What if I want to stop watching without closing the app?
**File → Close project.** And that project stays closed on the next launch,
instead of reopening by itself.
:::

::: info 🖼️ Image pending — `bandeja.png`
The tray icon menu: the header with the project name and its state, the Monitor
and Map entries, and Quit.
:::

### Start with Windows

In **Preferences → General → Startup**, the **"Start with Windows"** switch makes
the app open by itself when you turn the PC on and land you **straight in the
Monitor** of the network it was watching.

Three things that do not do the obvious:

- **It skips nothing.** Its usual loading screen still appears — that is where
  the license is checked and your project is opened with its keys. All that
  changes is which screen you land on.
- **It does not reopen a project you closed by hand.** Then it leaves you on the
  Welcome screen, with the project one click away.
- **Windows can say no.** If you turned startup off from Task Manager or from
  Settings → Apps → Startup, the app can no longer turn it back on — only you
  can, from there. The checkbox tells you which case it is, instead of promising
  a startup that will not happen.

### Alerts do not depend on which screen you are looking at

With the project open, the sentinel watches **wherever you are**: in the Monitor,
in the Map, on the start screen — which now tells you whether it is watching and
how many devices — or with the window tucked away in the tray.
