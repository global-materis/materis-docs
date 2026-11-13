# Topology

The Topology draws your network the way it hangs together: each AP with its
stations, the references and the links between them. Use it to see at a
glance what depends on what, to document the cabling the app can't read, and
to get an image of the network for a report.

Open it with the **Topology** button in the top bar or with **Ctrl+T**.
Ctrl+T again takes you back to the Monitor. The Topology is included from the
Expansion plan; see [Plans](./plans).

## What it draws

The app builds the drawing from what it already knows about the project:

- Each **AP** and its **stations**, joined by their radio link. When an AP
  has several stations, they are grouped: the counter in its corner expands
  and collapses them.
- The **references** in the References table.
- What you add by hand: clouds, unmanaged devices, cables and annotations.
  See [Editing the layout](#editing-the-layout).

The legend at the bottom left gives each type's color: AP, Station,
Reference, Unmanaged and Cloud.

### The links

A link's color says whether it is **connected** (green) or **absent** (gray).
A cable drawn by hand is absent if either of its two devices is, or if the
port at one end reports no cable. The line style changes with the interface
type: copper, fiber or wireless.

The Topology doesn't judge link quality. Signal and diagnostics are in the
Monitor; here you see whether the link exists.

Hovering over a link shows the interface at each end. Two settings in
**Preferences → Topology** change this:

- **Show link interfaces**: keeps them always visible.
- **Animated traffic**: connected links show their traffic in motion. It
  starts on.

### By node

The selector at the top right narrows the drawing to one node's devices. It
offers **All nodes**, each node of the [Map](./interface/map) and **No node**,
for devices that aren't in any. Nodes are created, and APs assigned to them,
in the Map; the Topology only uses them.

## Looking at the network (View)

The Topology always opens in **View**, where the layout doesn't change.

- **Click a device**: opens its card, with its status, its node, how many
  stations it has and its interfaces in use, each connected or absent.
- **Right-click a device**: **Show card**, **Open web interface**,
  **Continuous ping in the terminal**, **Ping test** and **Show in Monitor**,
  which takes you to its row.
- **Ctrl+drag a device**: moves it aside for a moment to see what it covers.
  It isn't saved.
- **Summary**: this toolbar button opens a list of the devices in the
  drawing, by type, with a search by name, IP or MAC. **Needs attention**
  keeps only the ones with something to check. Clicking one selects it on the
  canvas.

To move around, use **Zoom out**, **Zoom in**, **Fit** and the minimap. The
app remembers the framing of each project.

## Editing the layout

Click **Edit** or press **Ctrl+E**. A colored frame surrounds the canvas while
you're editing. To finish, click **Edit** again or press Ctrl+E. Everything
you change is saved in the project.

### Moving and aligning

Drag a device to place it. With **Snap to grid while moving** (Preferences →
Topology, on by default), its center jumps from dot to dot of the background.

To move or align several at once, mark them with **Ctrl+click**, one by one,
or with **Ctrl+drag** on the background, which draws a box. With two or more
marked, a bar appears to align them left, center or right, top, middle or
bottom, or to distribute them horizontally or vertically.

### Cabling

1. Click a device. Its interfaces drop down.
2. Pick the outgoing interface.
3. Click the destination device and pick its interface.

While a cable is half drawn, **Esc** lets it go. An interface in use shows
its cable and isn't offered.

The same interface menu is where you edit them: **Remove link** on one in use,
**Delete** an interface you created that is free, and **+ New interface** on a
reference or a cloud.

Clicking a cable opens its options: the **shape** (Automatic, Straight, Curved
or Elbow), the **side** it leaves each device from, and **Remove cable**. A
radio link between an AP and its station can't be removed: the radio puts it
there.

### Adding devices and annotations

The vertical bar on the left adds what you need. A click places it in a free
spot of what you're looking at; a cloud, an unmanaged device or a reference
can also be dragged to the exact spot.

| Button | What it is |
|---|---|
| **Cloud** | A way out to another network, such as your internet provider. |
| **Unmanaged device** | A switch, a router or any device the app doesn't watch. It exists only in the drawing. |
| **Reference** | A new device in the References table, by its IP or domain. |
| **Text**, **Rectangle**, **Ellipse** and **Image** | Annotations to mark areas or explain the drawing. The image can be PNG, JPEG, WebP, GIF or SVG. |

Clicking the name of a cloud, an unmanaged device or a reference lets you
rename it. APs and stations take the radio's name. The icon of a reference or
an unmanaged device is changed with right-click → **Change icon…**.

### Copying, deleting and undoing

| Gesture | What it does |
|---|---|
| **Ctrl+C** / **Ctrl+V** | Copies and pastes clouds, unmanaged devices and annotations. The copy appears next to the original, toward the cursor. |
| **Ctrl+B** | Clones the selection in one step. |
| **Del** | Deletes the selection: clouds, unmanaged devices and annotations. |
| **Ctrl+Z** / **Ctrl+Y** | Undoes and redoes canvas changes. |

An AP or a station can't be deleted here, and a reference is removed from the
Monitor.

## Downloading the image

The download button saves the drawing as a **PNG**, **JPEG** or **SVG
image**. The editing frame and the controls don't appear in the image.

## In a Snapshot

With a Snapshot in view, the Topology shows the network as it was that day
and can't be edited. If the Snapshot predates the project having a canvas,
the app uses the default layout and says so at the top.

## Topology preferences

In **Preferences → Topology** you choose how you like to look at it. These
are settings of your machine, not of the project:

| Setting | What it changes |
|---|---|
| **Show link interfaces** | Interfaces are always visible, not only on hover. |
| **Animated traffic** | Connected links show their traffic in motion. |
| **Snap to grid while moving** | When dragging, the device jumps from dot to dot. |
| **Symbols** | **Icon only**, **In a circle** or **In a square**. |
