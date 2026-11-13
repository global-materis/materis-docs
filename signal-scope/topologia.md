# Topología

La Topología dibuja tu red tal como cuelga: cada AP con sus estaciones, los
referentes y los enlaces entre ellos. Sirve para ver de un vistazo qué
depende de qué, documentar el cableado que la app no puede leer y sacar una
imagen de la red para un informe.

Ábrela con el botón **Topología** de la barra superior o con **Ctrl+T**. Otra
vez Ctrl+T vuelve al Monitor. La Topología está incluida desde el plan
Expansion; ver [Planes](./planes).

## Qué dibuja

La app arma el dibujo con lo que ya sabe del proyecto:

- Cada **AP** y sus **estaciones**, unidos por su enlace de radio. Cuando un
  AP tiene varias estaciones, se agrupan: el contador de su esquina las
  despliega y las vuelve a plegar.
- Los **referentes** de la tabla Referentes.
- Lo que añades tú a mano: clouds, equipos no gestionables, cables y
  anotaciones. Ver [Editar el diseño](#editar-el-diseno).

La leyenda de abajo a la izquierda dice el color de cada tipo: AP, Estación,
Referente, No gestionable y Cloud.

### Los enlaces

El color de un enlace dice si está **conectado** (verde) o **ausente** (gris).
Un cable puesto a mano está ausente si lo está cualquiera de sus dos equipos,
o si el puerto de un extremo dice que no tiene cable. El trazo cambia con el
tipo de interfaz: cobre, fibra o inalámbrica.

La Topología no juzga la calidad del enlace. La señal y el diagnóstico están
en el Monitor; aquí ves si el enlace existe.

Al pasar el cursor por un enlace salen las interfaces de cada extremo. Dos
ajustes de **Preferencias → Topología** cambian esto:

- **Mostrar las interfaces de los enlaces**: las deja siempre a la vista.
- **Tráfico animado**: los enlaces conectados muestran su tráfico en
  movimiento. Viene encendido.

### Por nodo

El selector de la esquina superior derecha reduce el dibujo a los equipos de
un nodo. Ofrece **Todos los nodos**, cada nodo del [Mapa](./interfaz/mapa) y
**Sin nodo**, para los equipos que no están en ninguno. Los nodos se crean y
se les asignan los AP en el Mapa; la Topología solo los usa.

## Mirar la red (Vista)

La Topología se abre siempre en **Vista**, donde el diseño no cambia.

- **Clic en un equipo**: abre su tarjeta, con su estado, su nodo, cuántas
  estaciones tiene y sus interfaces en uso, cada una conectada o ausente.
- **Clic derecho en un equipo**: **Ver tarjeta**, **Abrir interfaz web**,
  **Ping continuo en la terminal**, **Prueba de ping** y **Ver en el
  Monitor**, que te lleva a su fila.
- **Ctrl+arrastrar un equipo**: lo aparta un momento para ver mejor lo que
  tapa. No se guarda.
- **Resumen**: el botón de la barra abre una lista de los equipos del dibujo,
  por tipo, con un buscador por nombre, IP o MAC. **Con atención** deja solo
  los que tienen algo que revisar. Un clic en uno lo elige en el lienzo.

Para moverte, usa **Alejar**, **Acercar**, **Encuadrar** y el minimapa. La app
recuerda el encuadre de cada proyecto.

## Editar el diseño

Pulsa **Editar** o **Ctrl+E**. Un marco de color rodea el lienzo mientras
estás en Edición. Para terminar, pulsa otra vez **Editar** o Ctrl+E. Todo lo
que cambias se guarda en el proyecto.

### Mover y alinear

Arrastra un equipo para colocarlo. Con **Ajustar a la rejilla al mover**
(Preferencias → Topología, encendido de fábrica), su centro salta de punto en
punto del fondo.

Para mover o alinear varios a la vez, márcalos con **Ctrl+clic**, uno a uno, o
con **Ctrl+arrastrar** sobre el fondo, que dibuja un recuadro. Con dos o más
marcados aparece una barra para alinearlos a la izquierda, al centro o a la
derecha, arriba, al medio o abajo, o para distribuirlos en horizontal o en
vertical.

### Cablear

1. Haz clic en un equipo. Se despliegan sus interfaces.
2. Elige la interfaz de salida.
3. Haz clic en el equipo de destino y elige su interfaz.

Mientras el cable está a medias, **Esc** lo suelta. Una interfaz ocupada se
ve con su cable y no se ofrece.

El mismo menú de interfaces sirve para editarlas: **Quitar enlace** en una
ocupada, **Eliminar** una interfaz que creaste y está libre, y **+ Nueva
interfaz** en un referente o un cloud.

Un clic en un cable abre sus opciones: la **forma** (Automático, Recto,
Curvo o Codo), el **lado** por el que sale de cada equipo y **Quitar cable**.
Un enlace de radio entre un AP y su estación no se quita: lo pone el radio.

### Añadir equipos y anotaciones

La barra vertical de la izquierda añade lo que necesites. Un clic lo coloca
en un hueco de lo que estás viendo; un cloud, un no gestionable o un
referente también se pueden arrastrar al sitio exacto.

| Botón | Qué es |
|---|---|
| **Cloud** | Una salida a otra red, como tu proveedor de internet. |
| **Equipo no gestionable** | Un switch, un router o cualquier equipo que la app no vigila. Solo existe en el dibujo. |
| **Referente** | Un equipo nuevo en la tabla Referentes, por su IP o su dominio. |
| **Texto**, **Rectángulo**, **Elipse** e **Imagen** | Anotaciones para marcar zonas o explicar el dibujo. La imagen puede ser PNG, JPEG, WebP, GIF o SVG. |

Un clic en el nombre de un cloud, un no gestionable o un referente lo deja
renombrar. Los AP y las estaciones toman el nombre del radio. El icono de un
referente o de un no gestionable se cambia con clic derecho → **Cambiar
icono…**.

### Copiar, borrar y deshacer

| Gesto | Qué hace |
|---|---|
| **Ctrl+C** / **Ctrl+V** | Copia y pega clouds, no gestionables y anotaciones. La copia nace al lado, hacia donde esté el cursor. |
| **Ctrl+B** | Clona lo elegido en un solo paso. |
| **Supr** | Borra lo elegido: clouds, no gestionables y anotaciones. |
| **Ctrl+Z** / **Ctrl+Y** | Deshace y rehace los cambios del lienzo. |

Un AP o una estación no se borran desde aquí, y un referente se quita desde
el Monitor.

## Descargar la imagen

El botón de descarga guarda el dibujo como **imagen PNG**, **JPEG** o **SVG**.
El marco de Edición y los controles no salen en la imagen.

## En un Snapshot

Con un Snapshot en vista, la Topología muestra la red como estaba ese día y
no se puede editar. Si el Snapshot es anterior a que el proyecto tuviera
lienzo, la app usa la disposición por defecto y lo dice arriba.

## Preferencias de la Topología

En **Preferencias → Topología** eliges cómo prefieres mirarla. Son ajustes de
tu equipo, no del proyecto:

| Ajuste | Qué cambia |
|---|---|
| **Mostrar las interfaces de los enlaces** | Las interfaces se ven siempre, no solo al pasar el cursor. |
| **Tráfico animado** | Los enlaces conectados muestran su tráfico en movimiento. |
| **Ajustar a la rejilla al mover** | Al arrastrar, el equipo salta de punto en punto. |
| **Símbolos** | **Solo el icono**, **En un círculo** o **En un cuadrado**. |
