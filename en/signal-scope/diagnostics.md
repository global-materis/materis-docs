# Traffic light and diagnostics

The traffic light tells you **which** link to look at; the diagnosis tells you
**why**. This guide explains how each one judges.

## The traffic light

Each station's color is the verdict of the **full diagnosis** — the worst of
its seven axes rules (see below). Its main axis, signal, is judged in two
modes, and the difference matters:

**Without a baseline** — the absolute dBm value is judged:

| State | Signal |
|---|---|
| 🟢 Good | ≥ −55 dBm |
| 🟡 Attention | −55 to −67 dBm |
| 🔴 Critical | < −67 dBm |

**With a baseline** — what is judged is how far it dropped from the baseline
you set (Δ dB):

| State | Drift |
|---|---|
| 🟢 Stable | up to −3 dB |
| 🟡 Dropped vs baseline | −3 to −8 dB |
| 🔴 Check link | more than −8 dB |

The diagnosis says it with the number: *"Signal −10 dB vs its baseline
(−54 dBm)"*.

An **Absent** station is not a critical one: it lost its session and keeps its
last reading, with the reason in the tooltip. What its chip says while the app
gets it back is in [When a device goes absent](./interface/stations#when-a-device-goes-absent).

## Baseline: compare against your own network

<a id="references-compare-against-your-own-network"></a>

Even without a baseline, the app does not judge blindly: it uses the
**signal expected at each link's distance** (computed by the radio itself)
and, only as a last resort, the absolute threshold. The baseline adds what
no automatism can know: **how that link was when the installer left it
right** — its alignment, its cable, its obstacles. It is your criterion, and
it wins over the other two.

When a link is **the way it should be**, click **"Mark"**: that moment's
signal becomes **that** antenna's healthy point, and from then on the signal
axis judges the drift against it (Δ dB) instead of the absolute value.

- The baseline is **per antenna** and survives reboots and IP changes.
- With a baseline, the **Baseline** column shows the value (`−58 dBm`) and an
  **×** (*"Remove baseline"*). To update it (after a realignment, for example),
  **remove it with the × and click "Mark" again** — it is two gestures:
  while a baseline is set, the button is not shown.

::: tip Mark while the link is stable
"Mark" stores the reading **at the instant of the click**, without
averaging. Marking during a fade pins a bad point as the baseline.
:::

## Why signal alone is not enough

A −54 dBm signal at 1.5 km can be excellent — and a link with a "good" signal
can be suffering noise, interference or sunken capacity. That is why the
diagnosis does not look at one number: **it combines seven axes and the worst
one rules**. The result is the row's color plus a **list of causes in plain
words**, shown when hovering the signal cell.

## The seven axes

1. **Signal in context.** With a baseline, the drift against it; otherwise,
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
5. **Ethernet port.** The wired stretch up to the radio's connector: **half
   duplex** marks Attention and a port negotiating **10 Mbps** marks
   Critical — damaged cable, moisture in the connector or loose PoE; no
   airMAX ships with 10 as its maximum. A port **with no cable does not
   change the color**: it can be the router turned off at night or a cutoff
   for non-payment, not a link fault — the fact shows in the Ports column and
   the sentinel notifies the change. Speed is only mentioned when it
   **limits** what the radio could deliver.
   - **This axis applies to APs too**, with the same two rules and the same
     boundary: an AP whose uplink port negotiates badly strangles its whole
     sector.
   - **And when the port is the only thing wrong, the signal is not painted
     red**: the device stays critical and the row stays tinted, but the signal
     number is painted for what it is worth. The problem is pointed at by the
     Ports column and this axis, which is where it gets fixed.
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

![A critical station's diagnosis tooltip: SNR, latency, distance and port in the header, and below the causes — signal below expected, low link quality and downlink well below expected](/signal-scope/diagnostico.png)

## The blind spot no axis sees

The seven axes describe **how the device receives**. None of them looks the other
way — and a radio can receive perfectly and **transmit at the slowest modulation
there is**, with a pristine signal and balanced chains.

That is what the **Modulation** column betrays, showing
[both directions](./interface/stations#modulation-both-directions). It is
informational — it does not change the traffic light — but it is the only thing
that sees that case: looking only at the downstream, everything would seem fine
about an antenna that is not.

## The AP is judged differently

An AP does not have "one link" to judge: it has fifteen. Its State column
combines channel load, radio health, its sector's latency and its
uplink port — the detail is in [Access points](./interface/access-points).

## About the thresholds

The numbers in this guide are the current version's, calibrated against real
networks. Some — latency's in particular — are still being field-calibrated
and may be adjusted between versions; the tooltip always shows the measured
values, so you can judge with your own criteria alongside the app's.

The app itself tells how they were set: **Help → "How calibration works"**
sums up the method behind each limit, with real cases — and the invitation to
report yours to **support@materis.io**, which is where the adjustments come
from.

::: warning On MikroTik, the traffic light is not calibrated yet
A RouterOS device's thresholds are **currently airMAX's**. They were audited axis
by axis — signal, chains, CPU and memory are physics and percentages, not
vendor-dependent — but they have not been contrasted against real MikroTik links.

The known bias: SNR comes from subtracting signal − noise, and **noise floors are
not comparable between manufacturers**. With the same signal, a MikroTik scores
**7–11 dB better** than an airMAX. It is not corrected with an invented number —
that would turn a known bias into a hidden error — so the risk falls on the
benign side: **less detection, not invented alarms**. Read it with reservation,
and tell us what you see.
:::
