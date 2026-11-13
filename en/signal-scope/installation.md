# Installation and activation

SignalScope runs on **Windows 10 or 11 (64-bit)**. It requires no
administrator rights and needs no drivers or additional software. Your data
lives in your user profile and is kept when you update or reinstall the app.

## Install

SignalScope is distributed through the **Microsoft Store**:

**[Get SignalScope on the Microsoft Store](https://apps.microsoft.com/store/detail/9NPZ6VTKF989?cid=DevShareMCLPCS)**

When a new version is out, the app itself tells you (see [Updates](#updates)).

## First launch

When you open SignalScope you first see the loading screen and, right after,
the **Welcome** screen, where you create or open a project. You don't need to
activate anything to start: without a license, the app runs on the
**Starter** plan. What each plan includes is in [Plans](./plans).

App data (recent projects, preferences, cache) is stored in
`%APPDATA%\SignalScope`.

## Activating a license

The Expansion and Advanced plans, and the Expansion trial, are activated with
a key. They are bought at
[sscope.materis.io](https://sscope.materis.io/en#licencia).

1. On the Welcome screen, open the **License** view.
2. Type the **email** you bought with and the **license key**.
3. Click **"Activate license"**.

Activation and its periodic revalidation use the internet. Day-to-day work
doesn't need it.

### Renewing

The app warns you ahead of the expiration and offers renewal from the
**License** view. You can also renew from your
[Panel](https://panel.materis.io/).

### Moving to another machine

The license takes one slot per machine. To move:

1. On the old machine, open the **License** view and click **"Release this
   machine's license"**. That frees the slot, and that PC stays on the Starter
   plan.
2. On the new machine, activate with the same email and key.

::: warning Release before formatting or uninstalling
Uninstalling the app does **not** free the slot. If the machine is gone
(formatted, dead disk) and the slot is still taken, write to
**support@materis.io** to release it.
:::

## Updates

The license covers future updates. Your projects and preferences are
protected, and projects from earlier versions stay compatible.

## Startup, tray and closing

Three behaviors worth knowing from day one.

### Diagnostics in the background

- The first time, the **"SignalScope in the background"** notification appears. It
  explains where the app went and how to close it for real.
- To close SignalScope completely, use **File → Quit SignalScope** or
  right-click its tray icon and choose **"Quit SignalScope"**.
- Left-clicking the tray icon shows or hides the window. Right-clicking opens
  its menu, whose first line says which project is open and its state (for
  example, how many devices it is watching or how many notifications it has). The icon
  carries a red dot while there are pending notifications; notifications from muted devices do
  not count. From the menu you can **"Open SignalScope"**, go to the Monitor or
  the Map (**"Go to Monitor"**, **"Go to Map"**), **"Save project"** or quit.
- If you click a Windows notification, the app opens on the device that caused
  it. Notifications are turned on in **Preferences → Alerts**, with the
  **"Windows notifications"** switch.

::: tip What if I want to stop watching without closing the app?
Use **File → Close project**: it stops watching and returns to the Welcome
screen.
:::

![The tray icon menu: the header with the project name and its state, the Monitor and Map entries, and Quit](/signal-scope/bandeja.webp)

### Start with Windows

**Preferences → General → Startup** has the **"Start with Windows"** switch:
"Adds SignalScope to the Windows startup apps, and it starts with the last
project you left open." When you turn the PC on, the app opens by itself and
lands you **straight in the Monitor** of that project.

::: warning Windows can block startup
If you turned startup off from Task Manager or from Settings → Apps → Startup,
the app can no longer turn it back on.
:::
