# Mapa de cobertura

La otra vista principal, par del Monitor: tu red **sobre el mapa**. Se alterna
con el conmutador `Monitor | Mapa` de la barra — y al cambiar, el monitoreo en
vivo sigue corriendo de fondo.

Es un **plano de diseño**, pensado como vista de campo: dónde están tus nodos,
qué cubre cada AP y cómo están sus estaciones, de un vistazo.

![El Mapa de cobertura: un nodo con sus sectores pintados por banda, las estaciones con su color de diagnóstico, la tarjeta de una estación con sus métricas y el panel de capas](/signal-scope/mapa-cobertura.jpg)

## Nodos: el sitio, no el equipo

Un **nodo** es el sitio físico donde cuelgan tus AP: la torre, el mástil en
una azotea, el poste. Se registra con **"Registrar nodo"**, colocándolo sobre
el mapa (y se reubica luego con su botón "Posición" — Enter aplica, Esc lo
devuelve a donde estaba).

Su **tarjeta** es la central del sitio: las coordenadas, renombrar,
reubicar, y la lista de **sus AP** — cada uno con su color de sector y su
frecuencia, para leer de un vistazo qué tiene puesta esa torre. Desde ahí
también se [planifica un AP que aún no existe](#planificar-un-ap-que-aun-no-existe).

::: warning Borrar un nodo borra su planificación
Los AP reales sobreviven sin nodo (quedan sin dibujar); los **AP
planificados no existen fuera de su nodo** — al borrarlo, se borran con él,
y el diálogo lo avisa.
:::

## APs y sus sectores

Un AP se dibuja **cuando lo asignas a un nodo** — sin nodo no tiene posición
real. Desde el panel **"Asignar APs"** eliges cuáles AP viven en cada nodo
(con buscador y filtro de libres), y a cada uno le ajustas su **sector de
cobertura**:

- **Azimut** — hacia dónde apunta.
- **Apertura** — el ancho del haz.
- **Alcance** — hasta dónde pinta su cobertura.

::: warning Es un plano, no una predicción de RF
El sector pinta lo que tú declaras (azimut, apertura, alcance). No calcula
terreno ni línea de vista — la app no promete cobertura que no puede
verificar.
:::

## Tres modos de dibujar la cobertura

Con decenas de sectores sobre el mismo barrio, el plano dejaba de leerse: las
cuñas semitransparentes **se sumaban** unas con otras y, donde se cruzaban
cuatro, el color no era el de ninguna. Peor: el mapa contestaba dos preguntas
con el mismo idioma —el relleno decía **banda**, los puntos y enlaces decían
**estado**—.

Eliges **cómo se dibuja**, con un selector en la barra superior,
junto a "Mapa base":

| Modo | Qué contesta |
|---|---|
| **Huella** (el de entrada) | *"¿Hasta dónde llego?"* — todos los sectores fundidos en **una sola superficie de un solo tono**. Dos cuñas superpuestas ya no se oscurecen entre sí, y el color vuelve a ser del semáforo, su único dueño. El arco del alcance sigue nítido, para leer dónde acaba cada sector dentro de la masa. |
| **Foco** | *"¿Qué cubre este?"* — el AP que miras se pinta entero; el resto queda en silueta de un trazo. |
| **Detalle** | El dibujo de siempre, **cada sector con su banda**. No se retiró nada: dejó de ser lo primero que aparece. |

Tres cosas que conviene saber:

- **El AP en foco se pinta entero en los tres modos**, y el foco lo da tanto el
  AP que elijas como la estación que elijas (se pinta el suyo).
- **Fuera de Detalle, los enlaces se apagan**: el color de estado se reserva
  para lo enfocado y el resto pasa a gris de contexto. No se pierde
  información — **el punto de cada estación sigue diciendo su estado, y ese no
  se apaga nunca**.
- **La Huella cuesta algo, y se dice**: desaparece la banda de frecuencia como
  lectura del mapa. Sigue estando en el punto de color de la lista lateral, en
  la tarjeta del AP y en el
  [planificador de frecuencias](../herramientas#planificador-de-frecuencias),
  que es su casa.
- Un **AP planificado no entra en la huella**: la huella afirma *"hasta aquí
  llego"* y ahí todavía no hay equipo. Se queda en contorno discontinuo.

Si apagas la capa "Cobertura AP" en el panel **Capas**, el selector **se
deshabilita en su sitio** (no desaparece) y el tooltip dice por qué.

::: info 🖼️ Imagen pendiente — `cobertura-modos.png`
El mismo nodo con muchos sectores, en **Huella** y en **Detalle**, lado a lado —
y el selector de la barra superior abierto con las tres opciones.
:::

## Planificar un AP que aún no existe

En la tarjeta del nodo, **"Añadir AP planificado"** dibuja el sector de un
equipo **que todavía no está instalado**: eliges su azimut, apertura y
alcance, y el sector se pinta sobre el mapa **igual que uno real** — misma
geometría, misma lectura. Sirve para responder, antes de comprar o subir al
techo, *¿qué cubriría un AP aquí apuntando allá? ¿se solapa con lo que ya
tengo?* Es solo dibujo: **no cuenta como equipo ni se diagnostica**, y la
propia tarjeta lo recuerda.

El momento para el que existe llega con la instalación: el botón **"Pasar los
ajustes a un AP…"** vuelca el plan sobre el equipo **real** — le copia la
geometría, lo asigna al nodo y elimina el planificado, en una sola operación.
Como sobrescribe los ajustes de un equipo real y no hay deshacer, pide
confirmación mostrando exactamente qué se va a pisar.

![La tarjeta de un AP planificado: azimut, alcance de diseño y apertura del haz con sus atajos, el color del sector, y los botones de pasar los ajustes a un AP o eliminarlo — con el aviso de que aún no existe y no se diagnostica](/signal-scope/ap-planificado.png)

## Estaciones sobre el mapa

Las estaciones se ubican con **sus propias coordenadas** — las que el radio
tiene registradas (Location/GPS en su interfaz). Sin coordenadas, la estación
**no se dibuja**: la tarjeta lo avisa y el buscador la marca "Sin
coordenadas". Es deliberado — obliga a registrar la ubicación real en la
antena, donde vale para cualquier herramienta y no solo para SignalScope.

### Anotar la posición de un MikroTik

**RouterOS no permite escribir coordenadas en el equipo**: su paquete GPS es de
solo lectura. Así que para estos equipos —y **solo para estos**— la app te deja
anotar la posición a mano:

1. **Marca el punto** en el mapa donde está la estación.
2. Pulsa **"Anotar aquí"** en la burbuja del punto — o usa **"Anotar la posición
   en el mapa"** desde el botón de la tarjeta de esa estación.

Dos reglas que la app respeta y conviene conocer:

- **Lo que anotas se guarda en el proyecto, no en el equipo.** La app lo dice
  con esas palabras: *"la publica SignalScope, no el equipo"*.
- **Nunca pisa lo que informe el radio.** Si algún día ese equipo reportara su
  propia posición, mandaría la del radio.

En airMAX ese botón **no existe, y es a propósito**: ahí las coordenadas se
registran en el propio radio.

::: info 🖼️ Imagen pendiente — `anotar-posicion.png`
La burbuja del punto marcado con el desplegable "Anotar la posición de" y el
botón **Anotar aquí**, sobre un MikroTik sin coordenadas.
:::

### Qué dice el mapa con el dibujo

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

Para moverte por el plano:

| Gesto | Qué hace |
|---|---|
| **Ctrl + clic** sobre un AP | Lo deja **solo en pantalla** — el resto de sectores desaparece. |
| **Esc** | Cierra la tarjeta abierta (y sale de los modos de marcar o colocar). |
| **Flecha ←** en la cabecera de una tarjeta | **Vuelve a la anterior**: de una estación a su AP y de vuelta, sin buscarla otra vez en el mapa. |
| **Diana ("Centrar")** | Reencuadra lo seleccionado. Nunca *reubica* — eso es mover el nodo, y es otro botón. |

::: tip Los sectores pequeños dejaron de quedar sepultados
Antes, un sector grande dibujado encima hacía **inalcanzables** a los pequeños
que cubría: se veían en pantalla y había que abrirlos desde el buscador. Ahora
los sectores se dibujan de mayor a menor superficie, así que **el más pequeño
siempre queda encima** y se puede pulsar. La clave es el **área**, no el
alcance: un omni de 360° a 1 km tapa más que una cuña de 30° a 3 km.
:::

## Herramientas de apoyo

### Marcar un punto

**Marcar** coloca un pin efímero para **copiar coordenadas** (latitud y
longitud, juntas o por separado): útil para pegarlas en la interfaz de una
antena recién instalada. **No se guarda en el proyecto.**

Desde su burbuja, además:

- **"Distancia a un nodo"** — un desplegable con **todos tus nodos ordenados por
  cercanía, cada uno con su distancia**: contesta la pregunta sin elegir nada.
  Al elegir uno se traza la línea hasta él con la medida encima. Va
  **discontinua** a propósito: en este mapa la línea continua ya significa un
  enlace real entre dos equipos, y aquí no hay enlace — hay una regla sobre un
  punto que estás considerando.
- **"Anotar aquí"** — registra ese punto como la posición de una estación
  MikroTik (ver arriba).

Es una línea recta sobre el globo: **no es una predicción de RF** — sin
terreno, sin Fresnel y sin altura de mástil.

### Mapa base

Cuatro opciones, y el detalle de privacidad está en
[Seguridad y privacidad](../seguridad-privacidad):

| Opción | Qué es |
|---|---|
| **Automático** | Sigue el tema de la app. |
| **Claro** / **Oscuro** | Los dos planos de calles, servidos por **OpenFreeMap** — sin clave, sin registro y sin cuota. |
| **Satélite** | Imágenes de **Google Maps**, y **solo aparece si pusiste tu propia clave** (ver abajo). |

Y una casilla aparte, debajo:

- **Relieve del terreno** — sombreado de cerros y quebradas, **apagado de
  fábrica**. Enseña el cerro que corta un enlace, que es la pregunta real al
  mirar el plano. **No sustituye al satélite, y la app lo dice**: es terreno
  desnudo (~30 m), no muestra árboles, casas ni el tejado de la antena. Se
  calcula en tu equipo a partir de datos abiertos de elevación. Sobre el mapa
  satélite la casilla sale deshabilitada.

#### Satélite con tu propia clave de Google

La opción de satélite **solo existe si configuras una clave de la Map Tiles API
de Google** en **Preferencias**. Es tuya y de tu cuenta: la app **la guarda en
el llavero de Windows y nunca sale de tu equipo**.

::: details ¿Por qué no viene puesta?
Porque no hay ninguna imagen de satélite libre con resolución de tejado a escala
mundial. El proveedor anterior se cortaba fuera de las ciudades y devolvía —con
respuesta correcta, sin error que capturar— un cartel de *"Map data not yet
available"* justo donde el operador necesitaba mirar, lo que se leía como una
falla de SignalScope. Preferimos no prometerlo a prometerlo a medias.
:::

::: info 🖼️ Imagen pendiente — `mapa-base.png`
El menú **Mapa base** desplegado: Automático, Claro, Oscuro, Satélite (cuando
hay clave) y, separada por una línea, la casilla **Relieve del terreno**.
:::

## El mapa viaja en los snapshots

Cada snapshot congela el plano de ese momento: al abrir la captura —o un
`.ssnap` compartido— el Mapa se dibuja **tal como estaba entonces**, en solo
lectura. Si al compartir activaste "No registrar ubicación", la captura va
sin mapa — ver [Compartir](../compartir#proteger-los-datos-sensibles).
