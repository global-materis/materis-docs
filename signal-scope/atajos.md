# Atajos y navegación rápida

El diagnóstico rápido sale de sumar gestos pequeños: atajos, enlaces entre
tablas y filtros de un clic. Esta guía los reúne todos.

## Atajos de teclado

Funcionan en todo el panel, y dentro de la app los lista **F1**:

| Atajo | Acción |
|---|---|
| `Ctrl+S` | Guardar (consolida el archivo del proyecto para copiarlo o respaldarlo) |
| `Ctrl+N` | Nuevo proyecto |
| `Ctrl+Espacio` | Congelar / reanudar el refresco de las tablas |
| `Ctrl+A` | Registrar un equipo a mano por su IP |
| `Ctrl+H` | Guardar un Snapshot del estado actual |
| `Ctrl+M` | Cambiar entre el Monitor y el Mapa de cobertura |
| `Ctrl+K` | **Buscador general** de equipos (ver abajo) |
| `Ctrl+F` | Búsqueda del navegador en pantalla (resalta, no filtra) |
| `Ctrl+↓` / `Ctrl+↑` | Saltar a la tabla siguiente / anterior, con el cursor en su buscador |
| `Tab` | Desde el buscador de una tabla, el camino corto de cada fila: IP, nombre y su AP |
| `← ↑ ↓ →` | Dentro de una tabla: ←→ recorren todas las acciones de la fila; ↑↓ suben y bajan entre filas, encabezados (Enter ordena), buscador y menú de columnas |
| `Esc` | Por capas (ver abajo) |
| `Ctrl+clic` | En el Mapa, sobre un AP: lo selecciona y muestra solo ese; otra vez sobre el mismo, vuelve a mostrarlo todo |
| `F1` | Ayuda y atajos |

Dos aclaraciones:

- **`Ctrl+F` y el buscador de cada tabla hacen cosas distintas.** `Ctrl+F`
  resalta texto en pantalla sin tocar nada; el buscador de la tabla **filtra**
  las filas. Para trabajar sobre un subconjunto, usa el buscador.
- **`Esc` va por capas**, de lo más reciente a lo más grande. El primer Esc
  borra lo que estabas escribiendo en un buscador, el siguiente cierra el modal
  que estabas mirando y el siguiente limpia el filtro de estado y los
  buscadores. Así, unos pocos Esc te devuelven siempre a la tabla completa. Si
  estás viendo un Snapshot, con el foco en él y nada más que limpiar, un Esc más
  sale del Snapshot.

## El buscador general (Ctrl+K)

Es el gesto más rápido cuando un cliente llama. Pulsas `Ctrl+K` (o la **lupa**
de la barra, en el Monitor y en el Mapa) y escribes su nombre, o su IP, MAC,
SSID, modelo o fabricante; las MAC e IP se pueden teclear sin separadores. Al
elegir un resultado, la app te deja la mesa puesta:

- Eliges una **estación**: su fila queda aislada y, en la tabla de AP, su AP.
  Es la pareja con la que se resuelve un reporte: ¿es este cliente o es su
  sector?
- Eliges un **AP**: su fila queda aislada y, arriba, sus estaciones.
- Eliges un destino de **Referentes**: su fila en esa tabla. En el Mapa no se
  ofrece, porque el mapa no dibuja equipos ajenos.

En el **Mapa**, el equipo elegido queda seleccionado con su tarjeta abierta, la
vista se centra en él y el resto del mapa se esconde.

El buscador encuentra los equipos **aunque un filtro los tenga escondidos**,
porque busca en el proyecto y no en lo que está pintado. Se navega con `↑↓` y
`Enter`, y también funciona dentro de un Snapshot, buscando en lo que el
Snapshot guardó.

::: tip Ctrl+K vs Ctrl+F
`Ctrl+F` busca texto en pantalla y solo resalta. `Ctrl+K` busca **equipos** del
proyecto y acciona: filtra y lleva el foco. Se complementan.
:::

## Filtros de un clic

- **Los contadores filtran.** Un clic en **Críticas** (o Buenas, Atención,
  Ausentes) y la tabla de estaciones queda en ese grupo, que es la lista de
  trabajo del día. **Limpiar filtro** aparece en el riel inferior.
- **El nombre aísla.** Un clic en el nombre de una estación o un AP y su tabla
  muestra solo esa fila; otro clic en el mismo sitio lo deshace.
- **El buscador de estaciones cruza con el AP.** Escribir el nombre de un AP
  lista todas sus estaciones.

## Los viajes entre tablas

Cada pregunta tiene su clic, sin buscar a mano:

| Estás en… | Clic | Responde |
|---|---|---|
| Estaciones, columna AP | el **nombre** del AP | «¿cómo está su estación base?» → su fila |
| Estaciones, columna AP | el **icono de antena** | «¿y sus otros clientes?» → la tabla filtrada por ese AP |
| AP, celda Estaciones | el **contador** | «¿quiénes cuelgan de aquí?» → sus estaciones |
| AP, celda Estaciones | el **icono de ping** | ping continuo a todas sus estaciones registradas, ya corriendo |
| Una **alerta del centinela** | la tarjeta | va directo al equipo (y limpia el filtro para que no quede oculto) |
| Una **notificación de la campana** | la línea | al equipo del que hablaba esa notificación |
| Una **notificación de Windows** | la notificación | abre la app **en el equipo que lo causó**, dentro de su proyecto |
| La notificación de un AP que añadió estaciones nuevas a Detectados | **«Ver en Detectados»** | a la tabla Detectados |

## Accesos directos en las filas

- **La IP es un enlace** que abre la interfaz web del radio en el navegador. A
  su lado, el **botón de ping** abre una consola con ping continuo a esa IP.
- **«Marcar»** fija la línea base sin salir de la fila, y la **×** la quita.
- El **menú Columnas** oculta lo que no uses. Con menos columnas se lee más
  rápido, y la elección se recuerda por tabla.

## En el Mapa

- El **buscador lateral lleva la vista**: con un clic en un resultado, el mapa
  lo selecciona y lo centra (acerca si hace falta, nunca aleja).
- **`Ctrl` + clic sobre un AP** lo deja **solo en pantalla**, y el mismo gesto
  sobre el mismo AP devuelve todo. Las tarjetas tienen el botón equivalente,
  «Mostrar solo este AP» o «Mostrar solo esta estación».
- **`Esc`** cierra lo que haya abierto: primero la burbuja del punto marcado,
  luego el panel abierto dentro de una tarjeta y después la tarjeta. También sale
  de los modos de marcar o colocar un nodo.
- Al reubicar un nodo con «Posición», **`Enter`** aplica y **`Esc`** lo devuelve
  a donde estaba.
- La **flecha ←** de la cabecera de una tarjeta **vuelve a la anterior**, por
  ejemplo de una estación a su AP y de vuelta, sin buscarla otra vez.
- La **diana** de cada tarjeta centra el mapa en lo seleccionado.
- **Marcar** deja un pin efímero para copiar coordenadas, medir la **distancia a
  un nodo** o **anotar la posición** de una estación MikroTik.

El detalle de cada gesto está en [Mapa de cobertura](./interfaz/mapa#buscar-y-moverse).

## Tres rutas de diagnóstico, encadenadas

**Un cliente reclama.** Su nombre en el buscador de Estaciones → el tooltip
de la celda de señal es el diagnóstico completo → si la causa huele a sector,
el icono de antena de la columna AP muestra a sus vecinos: ¿es solo él o
todos?

**Un sector bajo sospecha.** Tabla de AP → su Estado y la columna Picos →
el contador de Estaciones lista a sus clientes → el icono de ping lanza el
ping continuo a todos, de una vez.

**El cierre del día.** Clic en **Críticas** (o Críticas + Atención) → esa es
la lista de trabajo → botón Reporte con el alcance «Críticas + Atención» y
sale el PDF para el técnico de mañana.
