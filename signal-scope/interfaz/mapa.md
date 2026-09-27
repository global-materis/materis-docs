# Mapa de cobertura

El Mapa es la otra vista principal, par del Monitor: tu red sobre el mapa. Se
alterna con el conmutador `Monitor | Mapa` de la barra o con `Ctrl+M`, y al
cambiar, el monitoreo en vivo sigue corriendo de fondo.

Es un **plano de diseño** pensado como vista de campo. De un vistazo muestra
dónde están tus nodos, qué cubre cada AP y cómo están sus estaciones.

![El Mapa de cobertura](/signal-scope/mapa-cobertura.png)

## Nodos: el sitio, no el equipo

Un **nodo** es el sitio físico donde cuelgan tus AP: la torre, el mástil en
una azotea, el poste. Se registra con **«Registrar nodo»**, colocándolo sobre
el mapa, y se reubica luego con su botón «Posición». En ese modo, Enter aplica
y Esc lo devuelve a donde estaba.

Su **tarjeta** reúne lo del sitio: las coordenadas, renombrar, reubicar y la
lista de **sus AP**, cada uno con su color de sector y su frecuencia, para leer
de un vistazo qué tiene puesta esa torre. Desde ahí también se
[planifica un AP que aún no existe](#planificar-un-ap-que-aun-no-existe).

::: warning Borrar un nodo borra su planificación
Los AP reales sobreviven sin nodo (quedan sin dibujar). Los **AP planificados
no existen fuera de su nodo**: al borrarlo se borran con él, y el diálogo lo
avisa.
:::

## APs y sus sectores

Un AP se dibuja **cuando lo asignas a un nodo**; sin nodo no tiene posición
real. Desde el panel **«Asignar APs»** eliges qué AP viven en cada nodo, con
buscador y filtro de libres, y a cada uno le ajustas su **sector de
cobertura**:

- **Azimut**: hacia dónde apunta.
- **Apertura**: el ancho del haz.
- **Alcance**: hasta dónde pinta su cobertura.

::: warning Es un plano, no una predicción de RF
El sector pinta lo que tú declaras (azimut, apertura, alcance). No calcula
terreno ni línea de vista, porque la app no promete una cobertura que no puede
verificar.
:::

## Tres modos de dibujar la cobertura

Con decenas de sectores sobre el mismo barrio, las cuñas semitransparentes se
suman unas con otras y, donde se cruzan cuatro, el color ya no es el de
ninguna. Además, el relleno habla de **banda** mientras los puntos y enlaces
hablan de **estado**, dos preguntas con el mismo idioma de color.

Por eso eliges **cómo se dibuja** con el selector **«Cobertura»** de la barra
superior, junto a «Mapa base». El botón muestra el modo en curso sin
necesidad de abrirlo:

| Modo | Qué contesta |
|---|---|
| **Huella** (el de entrada) | *«¿Hasta dónde llego?»* Todos los sectores se funden en **una sola superficie de un solo tono**. Dos cuñas superpuestas ya no se oscurecen entre sí, y el color queda solo para el semáforo. El arco del alcance sigue nítido, para leer dónde acaba cada sector dentro de la masa. |
| **Foco** | *«¿Qué cubre este?»* El AP que miras se pinta entero y el resto queda en silueta de un trazo. |
| **Detalle** | **Cada sector con su banda**, el dibujo completo. |

Cuatro detalles de estos modos:

- **El AP en foco se pinta entero en los tres modos.** El foco lo da tanto el AP
  que elijas como la estación que elijas (en ese caso, se pinta el suyo).
- **Fuera de Detalle, los enlaces se apagan.** El color de estado se reserva
  para lo enfocado y el resto pasa a gris de contexto. El punto de cada estación
  sigue diciendo su estado, y ese no se apaga nunca.
- **La Huella tiene un coste**: la banda de frecuencia deja de leerse en el
  mapa. Sigue estando en el punto de color de la lista lateral, en la tarjeta
  del AP y en el
  [planificador de frecuencias](../herramientas#planificador-de-frecuencias).
- **Un AP planificado no entra en la huella**, porque la huella afirma *«hasta
  aquí llego»* y ahí todavía no hay equipo. Se queda en contorno discontinuo.

Si apagas la capa «Cobertura AP» en el panel **Capas**, el selector se
deshabilita en su sitio (no desaparece) y el tooltip dice por qué.

## Planificar un AP que aún no existe

En la tarjeta del nodo, **«Añadir AP planificado»** dibuja el sector de un
equipo que todavía no está instalado. Eliges su azimut, apertura y alcance, y el
sector se pinta sobre el mapa **igual que uno real**, con la misma geometría y
la misma lectura. Sirve para responder, antes de comprar o subir al techo,
*¿qué cubriría un AP aquí apuntando allá? ¿se solapa con lo que ya tengo?* Es
solo dibujo: **no cuenta como equipo ni se diagnostica**, y la propia tarjeta
lo recuerda.

Cuando llega la instalación, el botón **«Pasar los ajustes a un AP…»** vuelca
el plan sobre el equipo real: le copia la geometría, lo asigna al nodo y
elimina el planificado, todo en una sola operación. Como sobrescribe los
ajustes de un equipo real y no hay deshacer, pide confirmación mostrando
exactamente qué se va a pisar.

![La tarjeta de un AP planificado: azimut, alcance de diseño y apertura del haz con sus atajos, el color del sector, y los botones de pasar los ajustes a un AP o eliminarlo, con el aviso de que aún no existe y no se diagnostica](/signal-scope/ap-planificado.png)

## Estaciones sobre el mapa

Las estaciones se ubican con **sus propias coordenadas**, las que el radio
tiene registradas (Location/GPS en su interfaz). Sin coordenadas, la estación
**no se dibuja**: la tarjeta lo avisa y el buscador la marca «Sin
coordenadas». Es deliberado, para que la ubicación real se registre en la
antena, donde vale para cualquier herramienta y no solo para SignalScope.

### Anotar la posición de un MikroTik

**RouterOS no permite escribir coordenadas en el equipo**, porque su paquete GPS
es de solo lectura. Para estos equipos, y **solo para estos**, la app te deja
anotar la posición a mano:

1. **Marca el punto** en el mapa donde está la estación.
2. En la burbuja del punto, elígela en «Anotar la posición de» y pulsa **«Anotar
   aquí»**. También puedes empezar desde su tarjeta, con **«Anotar la posición
   en el mapa»**.

La app respeta dos reglas:

- **Lo que anotas se guarda en el proyecto, no en el equipo.** La app lo dice
  con esas palabras: *«La publica SignalScope, no el equipo»*.
- **Nunca pisa lo que informe el radio.** Si algún día ese equipo reportara su
  propia posición, mandaría la del radio.

En airMAX esa opción **no existe, y es a propósito**: ahí las coordenadas se
registran en el propio radio.

### Qué dice el mapa con el dibujo

- **El color de cada punto es el diagnóstico completo**, el mismo veredicto del
  Monitor y no la señal sola. El punto del mapa y la tabla nunca se contradicen.
- **El enlace se traza al AP real.** La línea va de la estación al AP al que
  está asociada de verdad, no al nodo más cercano. Si ese AP no está en el mapa,
  la estación se dibuja sin línea.
- **Una estación ausente se pinta hueca.** Conserva el color en que quedó su
  enlace (aro a trazos, relleno tenue) y su tarjeta dice «Ausente · visto
  hace N». Que se cayera estando crítica no es lo mismo que estando bien, y el
  hueco te avisa de que ese color es un recuerdo.

## Buscar y moverse

El buscador lateral lleva la vista: un clic en un resultado (estación, AP o
nodo) lo selecciona **y centra el mapa** en él, acercando si hace falta y nunca
alejando. La estación seleccionada se resalta con un halo y su enlace pasa a
línea sólida, que se lee como «esta, y cuelga de aquel AP». El
[buscador general](../atajos#el-buscador-general-ctrl-k) (`Ctrl+K`) también
funciona aquí: abre la tarjeta del equipo, centra la vista y deja solo lo
elegido en pantalla.

Para moverte por el plano:

| Gesto | Qué hace |
|---|---|
| **Ctrl + clic** sobre un AP | Lo selecciona y lo deja **solo en pantalla**, con su sector y sus estaciones. El mismo gesto sobre el mismo AP vuelve a mostrarlo todo. Funciona sobre el sector y sobre la lista lateral. |
| **«Mostrar solo este AP»** / **«Mostrar solo esta estación»** | El mismo aislamiento, desde el botón de la tarjeta. |
| **Esc** | Cierra lo que haya abierto, de lo más reciente a lo más grande: primero la burbuja del punto marcado, luego el panel abierto dentro de una tarjeta y por último la tarjeta. También sale de los modos de marcar o colocar un nodo. |
| **Flecha ←** en la cabecera de una tarjeta | **Vuelve a la tarjeta anterior**, por ejemplo de una estación a su AP y de vuelta, sin buscarla otra vez en el mapa. |
| **Diana** | Centra el mapa en lo seleccionado. Nunca *reubica*: mover el nodo es el botón «Posición». |

::: tip Los sectores pequeños quedan encima
Los sectores se dibujan de mayor a menor superficie, así que **el más pequeño
siempre queda encima** y se puede pulsar aunque un sector grande lo cubra. La
clave es el **área**, no el alcance: un omni de 360° a 1 km tapa más que una
cuña de 30° a 3 km.
:::

## Herramientas de apoyo

### Marcar un punto

**Marcar** coloca un pin efímero para **copiar coordenadas** (latitud y
longitud, juntas o por separado), útil para pegarlas en la interfaz de una
antena recién instalada. **No se guarda en el proyecto**, y su botón «Cerrar»
lo quita de la vista.

La burbuja del punto trae además dos herramientas:

- **«Distancia a un nodo»**, un desplegable con **todos tus nodos ordenados por
  cercanía, cada uno con su distancia**, así que contesta la pregunta sin elegir
  nada. Al elegir uno se traza la línea hasta él con la medida encima. La línea
  es **discontinua** a propósito: en este mapa la línea continua ya significa un
  enlace real entre dos equipos, y aquí solo hay una regla sobre un punto que
  estás considerando.
- **«Anotar la posición de»**, que registra ese punto como la posición de una
  estación MikroTik (ver arriba).

La distancia es una línea recta sobre el globo y **no es una predicción de RF**:
no tiene en cuenta terreno, Fresnel ni altura de mástil.

### Mapa base

El menú **«Mapa base»** tiene hasta cuatro opciones. El detalle de privacidad
está en [Seguridad y privacidad](../seguridad-privacidad).

| Opción | Qué es |
|---|---|
| **Automático** | Sigue el tema de la app. |
| **Claro** / **Oscuro** | Los dos planos de calles, servidos por **OpenFreeMap**, sin clave, sin registro y sin cuota. |
| **Satélite** | Imágenes de **Google Maps**. Solo aparece si pusiste tu propia clave (ver abajo). |

Debajo, separada por una línea, hay una casilla aparte:

- **Relieve del terreno**: sombreado de cerros y quebradas, **apagado de
  fábrica**. Enseña el cerro que corta un enlace, que es lo que se busca al
  mirar el plano. **No sustituye al satélite, y la app lo dice**: es terreno
  desnudo (~30 m) y no muestra árboles, casas ni tejados. Se calcula en tu
  equipo a partir de datos abiertos de elevación. Sobre el mapa satélite la
  casilla sale deshabilitada.

#### Satélite con tu propia clave de Google

La opción Satélite **solo existe si configuras una clave de Google** con la Map
Tiles API habilitada, en **Preferencias → Mapa**. La clave es tuya y va a tu
cuenta de Google, que es la que asume su consumo. SignalScope la comprueba
antes de aceptarla y la guarda en el almacén de credenciales de Windows; **no
se guarda ni viaja con el proyecto**.

Con una clave activa, el campo para escribirla no aparece: para cambiarla,
primero pulsa **«Quitar»**.

![El menú **Mapa base** desplegado: Automático, Claro, Oscuro, Satélite.](/signal-scope/mapa-base.png)

## El mapa viaja en los Snapshots

Cada Snapshot congela el plano de ese momento. Al abrirlo, o al abrir un
`.ssnap` compartido, el Mapa se dibuja **tal como estaba entonces** y en solo
lectura. Si en la privacidad de los Snapshots marcaste «No registrar
ubicación», el Snapshot va sin mapa; ver
[Compartir](../compartir#proteger-los-datos-sensibles).
