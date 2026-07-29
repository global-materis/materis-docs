# Installation and activation

SignalScope installs on **Windows 10 or 11 (64-bit)**, requires no administrator
rights and needs no drivers or additional software. Your data lives in your user
profile and **survives updates and reinstalls**.

## Download

Download the installer from the
[**Releases**](https://github.com/global-materis/signal-scopes-releases/releases)
page:

- `SignalScope_x.y.z_x64-setup.exe` — the recommended installer.
- An `.msi` package is also available, useful if your organization deploys
  through policies.

::: details Windows shows a SmartScreen warning — is that normal?
Yes. The direct installer does not carry a code-signing certificate yet, so the
first time Windows may show *"Windows protected your PC"*. Click **More info →
Run anyway**. Always download from the official Releases page.
:::

## Install

1. Run the installer and follow the steps. No administrator rights needed: it
   installs into your user profile.
2. When it finishes, open SignalScope. The first thing you will see is the
   splash and, right after, the **license screen**.

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

::: info 🖼️ Image pending — `public/signal-scope/pantalla-licencia.png`
Screenshot of the **license screen**: the activation form (email + key) and the
amber button "Continue with the trial · N days left".
:::

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

On startup, SignalScope checks whether a newer version exists. If so, you will
see a notification dot next to **What's new** and on the version number in the
footer. From What's new you download the new installer, which **installs on
top** of the current version: your projects, preferences and license are kept.
