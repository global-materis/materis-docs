# Traffic light and diagnostics

The traffic light tells you **which** link to look at; the diagnosis tells you
**why**. This guide explains how each one judges.

## The traffic light

Each station is painted a color according to its signal. There are two modes,
and the difference matters:

**Without a reference** — the absolute dBm value is judged:

| State | Signal |
|---|---|
| 🟢 Good | ≥ −55 dBm |
| 🟡 Attention | −55 to −67 dBm |
| 🔴 Critical | < −67 dBm |

**With a reference** — what is judged is how far it drifted from the reference
you set (Δ dB):

| State | Drift |
|---|---|
| 🟢 On reference | up to −3 dB |
| 🟡 Dropped vs ref | −3 to −8 dB |
| 🔴 Check link | more than −8 dB |

An **Absent** station is not a critical one: it lost its session and keeps its
last reading, with the reason in the tooltip.

## References: compare against your own network

An absolute threshold treats a 400 m link and a 3 km link the same. The
reference fixes that: when a link is **the way it should be**, click
**"Mark OK"** — that moment's signal becomes **that** antenna's healthy point,
and from then on the traffic light tells you how far it has drifted.

- The reference is **per antenna** and survives reboots and IP changes.
- The cell shows `ref −58 dBm`; the **×** removes it, and clicking "Mark OK"
  again updates it (after a realignment, for example).

## Why signal alone is not enough

A −54 dBm signal at 1.5 km can be excellent — and a link with a "good" signal
can be suffering noise, interference or sunken capacity. That is why the
diagnosis does not look at one number: **it combines seven axes and the worst
one rules**. The result is the row's color plus a **list of causes in plain
words**, shown when hovering the signal cell.

## The seven axes

1. **Signal in context.** With a reference, the drift against it; otherwise,
   against the signal **expected at that distance** (computed by the radio
   itself); as a last resort, the absolute threshold.
2. **Channel quality.** The margin between signal and noise floor (SNR) or, on
   devices that report it, CINR — which also sees **interference from other
   transmitters on the channel**. This is where causes like *"Channel
   interference: signal looks fine, the channel doesn't"* come from.
3. **Link quality.** The airMAX indicator, averaged so bursts don't raise
   alarms: below 90 % asks for attention, below 70 % is critical. It includes
   the **air latency** measured by the radio: sustained highs or recurring
   spikes degrade the verdict (*"congested channel, signal is fine"*).
4. **Real vs. expected capacity.** If the link delivers much less than its
   modulation promises (under 65 %), something is holding it back: saturation
   or degraded modulation.
5. **Ethernet port.** No cable or half duplex means the problem is in the
   wired stretch — not in the air. Speed is only mentioned when it **limits**
   what the radio could deliver.
6. **Chain imbalance.** The antenna's two polarities should receive almost the
   same; a difference of 5 dB or more betrays a **rotated antenna, crossed
   polarization or a damaged chain** — with the total signal looking normal.
   No other axis sees this.
7. **Radio health.** Saturated CPU or exhausted memory: a choking radio drops
   packets without touching the signal.

::: tip How to read a cause
Each cause names the fact and its context: *"Signal 12 dB below expected at
its distance"*, *"High noise: SNR 14 dB"*, *"Downlink well below expected: 23
of 80 Mbps"*. The cause tells you **where to look** — the cable, the channel,
the alignment — before climbing to the roof.
:::

::: info 🖼️ Image pending — `public/signal-scope/diagnostico-tooltip.png`
Screenshot of a station's **diagnosis tooltip** with 2–3 causes visible.

_Existing: `ss-desktop/docs/screenshots/SignalScope-Station-Diagnostic.png`._
:::

## The AP is judged differently

An AP does not have "one link" to judge: it has fifteen. Its State column
combines channel load, radio health and its sector's latency — the detail is
in [Access points](./interface/access-points).

## About the thresholds

The numbers in this guide are the current version's, calibrated against real
networks. Some — latency's in particular — are still being field-calibrated
and may be adjusted between versions; the tooltip always shows the measured
values, so you can judge with your own criteria alongside the app's.
