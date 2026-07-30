# Mapa de cobertura

La otra vista principal, par del Monitor: tu red **sobre el mapa**. Se alterna
con el conmutador `Monitor | Mapa` de la barra — y al cambiar, el monitoreo en
vivo sigue corriendo de fondo.

Es un **plano de diseño**, pensado como vista de campo: dónde están tus nodos,
qué cubre cada AP y cómo están sus estaciones, de un vistazo.

::: info 🖼️ Imagen pendiente — `public/signal-scope/mapa-cobertura.png`
Captura del **Mapa de cobertura** con un nodo, 2–3 sectores pintados y
estaciones con sus enlaces.
:::

## Nodos: el sitio, no el equipo

Un **nodo** es el sitio físico donde cuelgan tus AP: la torre, el mástil en
una azotea, el poste. Se registra con **"Registrar nodo"**, colocándolo sobre
el mapa (y se reubica luego con su botón "Posición" — Enter aplica, Esc lo
devuelve a donde estaba).

## APs y sus sectores

Un AP se dibuja **cuando lo asignas a un nodo** — sin nodo no tiene posición
real. Desde el panel **"Asignar APs"** eliges cuáles AP viven en cada nodo
(con buscador y filtro de libres), y a cada uno le ajustas su **sector de
cobertura**:

- **Azimut** — hacia dónde apunta.
- **Apertura** — el ancho del haz.
- **Alcance** — hasta dónde pinta su cobertura.

Los sectores se colorean **por banda de frecuencia**, así los solapamientos
entre tus propios AP saltan a la vista.

::: warning Es un plano, no una predicción de RF
El sector pinta lo que tú declaras (azimut, apertura, alcance). No calcula
terreno ni línea de vista — la app no promete cobertura que no puede
verificar.
:::

## Estaciones sobre el mapa

Las estaciones se ubican con **sus propias coordenadas** — las que el radio
tiene registradas (Location/GPS en su interfaz). Sin coordenadas, la estación
**no se dibuja**: la tarjeta lo avisa y el buscador la marca "Sin
coordenadas". Es deliberado — obliga a registrar la ubicación real en la
antena, no a inventarla.

Tres cosas que el mapa dice con el dibujo:

- **El color de cada punto es el diagnóstico completo** — el mismo veredicto
  del Monitor, no la señal sola. El punto del mapa y la tabla nunca se
  contradicen.
- **El enlace se traza al AP real** — la línea va de la estación al AP al que
  está asociada de verdad, no al nodo más cercano. Si ese AP no está en el
  mapa, la estación se dibuja sin línea.
- **Una estación ausente se pinta hueca** — conserva el color en que quedó su
  enlace (aro a trazos, relleno tenue) y su tarjeta dice "Ausente · visto
  hace N". Que se cayera estando crítica no es lo mismo que estando bien, y
  el hueco te avisa de que ese color es un recuerdo.

## Buscar y moverse

El buscador lateral lleva la vista: un clic en un resultado —estación, AP o
nodo— lo selecciona **y centra el mapa** en él (acercando si hace falta,
nunca alejando). La estación seleccionada se resalta con un halo y su enlace
pasa a línea sólida: "esta, y cuelga de aquel AP".

Las tarjetas llevan además un botón de **diana ("Centrar")** para volver a
encuadrar lo seleccionado.

## Herramientas de apoyo

- **Marcar** — coloca un pin efímero para **copiar coordenadas** (latitud y
  longitud, juntas o por separado): útil para pegarlas en la interfaz de una
  antena recién instalada. No se guarda en el proyecto.
- **Mapa base** — Automático (sigue el tema de la app), Claro u Oscuro. Las
  imágenes del mapa se descargan de proveedores públicos — el detalle de
  privacidad está en [Seguridad y privacidad](../seguridad-privacidad).

## El mapa viaja en los snapshots

Cada snapshot congela el plano de ese momento: al abrir la captura —o un
`.ssnap` compartido— el Mapa se dibuja **tal como estaba entonces**, en solo
lectura. Si al compartir activaste "No registrar ubicación", la captura va
sin mapa — ver [Compartir](../compartir#proteger-los-datos-sensibles).
