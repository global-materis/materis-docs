# Diagnostic tools

The **Tools** menu groups the utilities you use in bursts: open, answer a
question, close. The diagnostic ones are four — Frequency planner, Speed
test, Continuous ping and Traceroute. (Snapshot compare is explained in
[History](./snapshots#comparing-two-moments) and the Network score in
[its guide](./sentinel#the-network-score).)

## Frequency planner

Distributes the spectrum among your APs without overlaps. It works with what
monitoring **already read** from the APs with sessions — it never queries the
radios — and refreshes on its own.

You choose the **band** (2.4 / 3.65 / 4.9 / 5 GHz U-NII / 6 GHz, or a custom
range), the **target channel width** (10–100 MHz) and which APs to consider —
the list comes **grouped by node**, with a checkbox to select or clear the
whole site, because spectrum is planned per tower: "let's see what this one
has on".

The panel shows:

- **The occupation lanes**: each AP occupies its center frequency ± half its
  width (5630 @ 20 MHz ⇒ 5620–5640). Hovering a block shows the AP's card:
  model, frequency, IP, SSID, stations.
- **The spectrum strip**, with DFS zones shaded. Hovering highlights the
  target width centered there, with a verdict — **Free** (green), **Partial**
  (orange) or **Occupied** (red) — and the MHz breakdown.
- **The suggested channels**: the disjoint centers that fit in the gaps, as
  chips. The `‹ ›` arrows slide the suggestions within each gap in case you
  prefer another center.

Clicking a chip or a free frequency **selects that channel**: its summary
appears on top — frequency, covered range, width, whether it is **DFS** (with
the radar risk explained) and the band — with a **Copy** button to take it to
the radio's configuration.

The planner's settings survive closing: the tool is made for going in,
picking a channel, checking it against the table and coming back.

![The frequency planner on the 5 GHz band: the spectrum occupied per AP with a 40 MHz channel selected, the free/occupied strip, the suggested channels and the AP list grouped by node](/signal-scope/planificador-frecuencias.png)

::: tip The plan is only as good as its readings
APs without a session appear dimmed inside their node: if three of a tower's
six APs have not connected, that tower's plan is incomplete — and the planner
lets you see it instead of hiding it.
:::

## Speed test (iperf)

Measures real throughput between a radio and your PC. The model respects the
read-only rule: **SignalScope never orders the radio to do anything** — the
app starts an iperf-compatible server on your PC and shows you the command
ready to copy; you run it from the radio's CLI, and the app paints the
throughput live.

- Windows will ask for **firewall permission** the first time (standard
  dialog, no administrator).
- **The test saturates the link while it lasts** — the customer will feel
  it; better at low-usage hours.

## Continuous ping

Latency, jitter and loss **continuously** against one or several targets —
inventory devices or loose IPs. Different from each row's ping button (which
opens a console): this is a measuring session with statistics.

- The target picker comes **grouped by sector**: check a whole AP with its
  box — the typical case is "every station on this AP". The direct shortcut
  lives in the
  [AP table](./interface/access-points#the-stations-cell-three-gestures).
- Per target: loss %, average, min/max, **jitter** and a chart of the latest
  samples. The verdict (Stable/Unstable) always explains its why — including
  **spikes**, judged against each target's own baseline: a steady 60 ms does
  not alarm, 2 ms jumping to 200 does.
- The modal can be **minimized and keeps measuring**: a background pill stays
  with the summary.
- Results export to **PDF/Excel**.

::: tip This ping is yours — and that is why it says something else
Continuous ping leaves your PC and crosses the whole path; the table's
Latency column is measured by the radio over the air hop alone. Comparing
both is pure diagnosis: high ping with low air latency means the bottleneck
is **not** in the air.
:::

## Traceroute

The route to a target, hop by hop, with latency and loss at each one. Two
modes: **single shot** (three probes per hop and done) or **continuous**
(MTR-style: keeps measuring every hop until you stop it — also minimizable).

The distinctive part: hops that are **your network's radios** are highlighted
with their model and frequency — you see at which point of *your*
infrastructure the route degrades, not just a list of anonymous IPs. It also
exports to PDF/Excel.
