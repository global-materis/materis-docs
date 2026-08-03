# Detected and Others

Two tables with opposite roles: **Detected** is the scan's work queue and it
empties; **Others** is the permanent inventory of devices that are not airMAX
radios but that you want in sight.

## Detected: the scan queue

Everything a scan finds that has no identity yet lands here, with its IP, MAC
and manufacturer. The **Suggestion** column hints at what each device looks
like:

| Suggestion | What it means |
|---|---|
| **Ubiquiti radio** (blue) | An airMAX candidate — the session button is the way. |
| **MikroTik / TP-Link device · not airMAX** | Known manufacturer, not manageable by the app. |
| **Not airMAX** | Unknown manufacturer. |
| **MAC unreachable** | It sits behind a router; signing in identifies it fully. |

Each device leaves the queue in one of two ways:

- **Signing in** — the radio declares its mode and moves on its own to
  Stations or Access points.
- **"Not a radio"** — it goes down to the **Others** inventory. The decision is
  stored: a later scan will not ask you again.

The suggestion helps but **the decision is yours**: the discard button is
highlighted when the manufacturer already says it is not airMAX, and stays
discreet on a Ubiquiti radio, where discarding would almost always be a
mistake.

**Clear list** empties the queue without deciding anything — whatever was left
unresolved reappears on the next scan. When the queue reaches zero, the table
disappears from view: its job is done.

![The Detected table after a scan: IP, MAC and manufacturer for each finding, the Suggestion telling Ubiquiti radios apart from unmanageable devices, and the Sign in / Not a radio buttons](/signal-scope/escaneo-detectados.jpg)

## Others: the third-party inventory

A node's MikroTik, an ONU, a switch: not airMAX radios, but part of your
network and worth keeping on record. **Others is always visible**, even when
empty, with its own search box.

| Column | What it shows |
|---|---|
| **Action** | The **Remove** chip — deliberately first, away from the end of the row, so you never remove from the wrong row. |
| **State** | The device watch, off by default. See below. |
| **Name** | **Editable**: these devices report nothing, so either you name them or the row stays a bare IP. |
| **IP · MAC · Manufacturer** | Device identity. |

### The watch: "is it still alive?"

Turning **Watch** on for a row pings it periodically from your PC. It says
exactly that — *whether it answers from here* — and does not measure link
quality:

- **Answers · N ms** — it is online (and the app verified that whoever answers
  is **that** device, not another one that inherited its IP).
- **No answer** — it does not respond.
- **Another device** (amber) — that IP is now held by a different device: you
  lost track of yours. A scan finds it again at its new address.

With the watch on, the [service sentinel](../sentinel) alerts you when the
device stops answering — meant for a node's router, whose outage explains
that of every radio hanging off it. Like any alert, it can also reach you as
a Windows notification or on your phone.

### Remove means it

**Remove** erases that device's whole record, including the decision to
discard it. If a later scan finds it again, it returns to **Detected** as if
new — which is also the way to recover a radio discarded by mistake.
