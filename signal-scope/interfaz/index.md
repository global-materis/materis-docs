# La interfaz

El panel de monitoreo es una sola pantalla vertical. Arriba están el panel de
escaneo y las acciones, luego los contadores y, debajo, las tablas de equipos.
Cada parte tiene su página:

- [Estaciones](./estaciones): la tabla principal, con tus antenas de cliente.
- [Puntos de acceso](./puntos-de-acceso): tus estaciones base.
- [Detectados y Referentes](./detectados-y-otros): la cola del escaneo y el
  inventario de lo que no gestionas pero miras para contrastar.
- [Mapa de cobertura](./mapa): la otra vista principal, con nodos, sectores y
  estaciones sobre el mapa.

![El panel completo: redes registradas y acciones arriba, los contadores del parque, el historial de snapshots y la tabla de estaciones en vivo](/signal-scope/monitor-en-vivo.jpg)

## El panel de arriba

Además del escaneo y la sesión en cascada (vistos en
[Primeros pasos](../primeros-pasos)), ahí están:

- **Guardar snapshot** (`Ctrl+H`), que guarda el estado actual de la red en el
  historial.
- **Reporte**, que exporta a PDF, Excel o CSV. El tipo de reporte se elige
  entre General (toda la red), Críticas, Críticas + Atención, Solo estaciones y
  Solo AP; este último se desactiva cuando no hay ningún AP a la vista.
- La tira de snapshots, con los snapshots guardados y la fecha de cada uno.
  Desde ahí se comparan, se comparten y se protegen.
- **Actualizar**, a la izquierda del nombre del proyecto. Solo aparece cuando
  hay una versión nueva ([cómo funciona](../instalacion#actualizaciones)).

## Los dos indicadores de la esquina

Arriba a la derecha, en el mismo sitio en el **Monitor** y en el **Mapa**, hay
dos controles vecinos que cuentan cosas distintas:

| | Qué dice | Cuándo se vacía |
|---|---|---|
| **La campana** (bandeja de avisos) | Lo que la app te avisó mientras trabajabas, con su hora. Su contador es de avisos **no leídos**. | Al abrirla. Un aviso leído no vuelve. |
| **El latido** (centinela de servicio) | Qué está roto ahora mismo, y en cuántos equipos. | Solo, cuando la falla se resuelve. No se descarta a mano. |

Un aviso de "volvió a conectarse" describe algo que ya ocurrió, y leerlo no lo
deshace. Un cable suelto, en cambio, sigue suelto aunque lo mires. Por eso hay
dos indicadores. Los dos llevan al equipo con un clic, y ninguno aparece en el
visor de un snapshot compartido, porque un snapshot congelado no genera
eventos.

El detalle de cada uno está en [Centinela y calificación](../centinela).

## Los contadores son filtros

Un clic en la fila de contadores (**Estaciones**, **Buenas**, **Atención**,
**Críticas** y **Ausentes**) filtra la tabla de estaciones a ese grupo, sin
congelar el refresco; **Estaciones** quita el filtro. **Ausentes** filtra por
sesión perdida y no por semáforo, porque una estación ausente conserva su
última lectura.

Los contadores de **AP** y **Referentes** no filtran: un clic lleva a su tabla.

## El riel inferior

Es una barra flotante con:

- Anclas a cada tabla visible (Estaciones, AP, Referentes, Detectados) para
  saltar sin desplazarte, también con `Ctrl+↓` / `Ctrl+↑`.
- **Equipo (+)**, para registrar un radio a mano por su IP en segmentos que no
  puedes escanear.
- **Limpiar filtro**, que aparece cuando hay un filtro activo.
- **Congelar / Reanudar**, que pausa el refresco visual para leer con calma. El
  monitoreo de fondo sigue; solo se detiene el repintado.

::: info 🖼️ Imagen pendiente — `barra-indicadores.png`
La esquina derecha de la barra: la lupa del buscador, la **campana** con su
contador de avisos sin leer y el **latido** del centinela con el número de
equipos en falla.
:::

## Común a todas las tablas

- Un buscador propio por tabla (nombre, IP, MAC, modelo, AP…).
- Cabeceras clicables para ordenar.
- El menú **Columnas**, para ocultar las que no uses. La elección se recuerda.
- Un clic en el nombre de una fila (estación o AP) la aísla en su tabla, y otro
  clic en el mismo sitio deshace el filtro. Si ocultas la columna Nombre, este
  gesto se va con ella, pero el buscador sigue encontrando la fila por su
  nombre.
