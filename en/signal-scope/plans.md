# Plans

Your plan sets how many devices your project can register and whether you get
the Topology and Snapshots. Everything else—the Monitor, diagnostics, the
sentinel, the Map and the tools—works the same on every plan.

## What each plan includes

| | Starter | Expansion | Advanced |
|---|---|---|---|
| Records | 45 | 200 | 500 |
| Map nodes | 1 | Unlimited | Unlimited |
| Topology | No | Yes | Yes |
| Snapshots | No | Yes | Yes |
| License | Not needed | With a key | With a key |
| Expiry | Never expires | Per your purchase | Per your purchase |

**Starter** is free and needs no license: it is the plan the app runs on when
no license is activated. **Expansion** has a trial, activated with its own
key. Prices and purchase are at
[sscope.materis.io](https://sscope.materis.io/en#licencia).

**Full Access** is the license of those who bought SignalScope before these
plans. It has no limits and includes everything Advanced does.

## What counts as a record

Each row in the **Access points**, **Stations** and **Referents** tables
takes one record. A device with two radios takes two, because it has one row
per radio.

These take no record:

- Devices in **Detected**, which you haven't sorted yet.
- [Assisted Stations](./interface/stations#assisted-stations), which their AP
  provides and which have no session of their own.

## Checking your plan

Open the **License** view on the Welcome screen. The plan's name is at the
top, and below it what the plan allows: **Records** (how many you use out of
how many), **Map nodes**, **Topology** and **Snapshots**. With an activated
license you also see its key, the email, the machines it is active on and the
expiry date.

A feature your plan doesn't include stays visible, with a lock and the name of
the plan that unlocks it. On Starter you'll see it on the **Topology** button
and the **Snapshots** selector in the top bar, and on **Snapshots** and
**Compare** in the Tools menu.

## Reaching the limit

When the project fills its records, the app won't add another. The sign-in
window for a new radio says so before you try: **"You've reached your plan's
limit of 45 records."** (with your plan's number). If you try anyway, or move
a device to Referents, the **"Your plan's limit"** notice appears, with a
**See plans** link. On Starter you can't register a second Map node either,
and the app tells you your plan allows one node.

The limit only stops new additions. A project that already has more records,
nodes or Snapshots than your plan allows opens in full and keeps being
watched. Saved Snapshots stay in the file, even though you can't open them on
Starter.

## Activating a key

In the **License** view, type the **email** you bought with and the
**license key**, and click **"Activate license"**. The Expansion trial key is
activated the same way. If you're on the trial and buy a plan, activate the
new key in the same place: **"Bought a plan? Activate its key"**.

Activation takes one device slot of your license. To move it to another PC,
see [Moving to another machine](./installation#moving-to-another-machine).

## If your license expires

The app moves to Starter and deletes nothing. The License view shows
**"Expired"** and offers renewal. When you renew or activate another key, you
get your plan back with the project as you left it.
