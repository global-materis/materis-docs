# Sharing

There are two things to share, and they are different files: **one capture**
(`.ssnap`) to show another operator a moment of your network, and **the whole
project** (`.sscope`) to work the same network from another PC.

## Sharing a capture: the `.ssnap`

From the snapshot strip, any capture can be exported as an **`.ssnap`** file.
The other operator opens it with their SignalScope in **viewer mode**: they
see that moment's tables — stations, APs, diagnosis, even the map if the
capture carries it — and can generate reports from it, but nothing else: no
scanning, no sessions, no touching your network.

The `.ssnap` **carries no secrets by design**: it never contains radio
credentials or keys. That is why opening it asks for nothing.

![The .ssnap viewer: the "Shared snapshot · read-only" banner, the capture's counters and the tables in Historical mode, with the Report button available](/signal-scope/visor-ssnap.jpg)

### Protecting sensitive data

No secrets does not mean no data **sensitive to your business**: IPs, MACs,
customer names, the size of your network. In **File → Security** you choose
which fields are private, and when you protect a capture that data is trimmed
**in the file itself** — what is not in the file cannot leak:

- IPs and names are trimmed (`10.•.•.20`, `tal•••`).
- The MAC is hidden almost completely — its first pairs give away the
  manufacturer.
- Model, firmware and the station count are removed.

You can protect an existing capture with the strip's **padlock**, or make
**every capture born protected**. The trim is **permanent**: the confirmation
modal warns about it and offers to create an unprotected copy first, which
stays in your history with its full data.

Location is handled separately: if you check "Do not record location",
coordinates are not trimmed — **they are removed**, and that capture is shared
without a map.

## Sharing the project: the transfer code

The `.sscope` stores your radios' credentials **encrypted and anchored to your
PC**: copying the file to another machine does not expose them — there the
project opens, but without credentials. For another PC (yours or a trusted
colleague's) to work the full project there is the **transfer code**:

1. On your PC, open **Share project** and read the code (format
   `XXXX-XXXX-XXXX`). Every project is born with one.
2. Send the `.sscope` file however you like, and the code **through another
   channel** (a call, a separate message).
3. On the destination PC, opening the file asks for the code **once**; from
   then on that machine is linked and opens the project normally.

Moving your project to a new PC is exactly the same flow.

::: warning Formatting also counts as changing PCs
When you format, the local key is lost with Windows and your own PC becomes
"a new PC": the project will ask for the transfer code. **Write it down
before formatting** — without it, the file does not open.
:::

::: tip If the code leaked
**Regenerating the code** invalidates the previous one on the spot: files you
already shared can no longer be unlocked with the old code.
:::

::: warning The protected file does not half-open
An `.sscope` that asks for a code **shows nothing** until it is entered. And
credentials always travel encrypted: neither whoever intercepts the file nor
whoever receives it without the code can read them.
:::

## Which one to send?

| You want to… | Send |
|---|---|
| Show the network's state, ask for a second opinion | **`.ssnap`** (protected if it leaves your trusted circle) |
| Have a colleague work your network: scan, monitor, sessions | **`.sscope` + code** through separate channels |
| Move to a new PC | **`.sscope` + code** (and release the license on the old PC — see [Installation](./installation#moving-to-another-machine)) |
