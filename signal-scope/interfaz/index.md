# La interfaz

El panel de monitoreo es una sola pantalla vertical: arriba el panel de
escaneo y las acciones, luego los contadores, y debajo las tablas de equipos.
Esta sección la recorre por partes:

- [Estaciones](./estaciones) — la tabla principal: tus antenas de cliente.
- [Puntos de acceso](./puntos-de-acceso) — tus estaciones base.
- [Detectados y Referentes](./detectados-y-otros) — la cola del escaneo y el
  inventario de lo que no gestionas pero miras para contrastar.
- [Mapa de cobertura](./mapa) — la otra vista principal: nodos, sectores y
  estaciones sobre el mapa.

![El panel completo: redes registradas y acciones arriba, los contadores del parque, el historial de snapshots y la tabla de estaciones en vivo](/signal-scope/monitor-en-vivo.jpg)

## El panel de arriba

Además del escaneo y la sesión en cascada (vistos en
[Primeros pasos](../primeros-pasos)), ahí viven:

- **Guardar snapshot** (`Ctrl+H`) — captura el estado actual de la red al
  historial.
- **Reporte** — exporta a PDF, Excel o CSV, con un selector de alcance: General,
  Críticas, Críticas + Atención, Solo estaciones o Solo AP.
- **El strip de snapshots** — las capturas guardadas, cada una con su fecha;
  desde ahí se comparan, se comparten y se protegen.
- **Actualizar** — a la izquierda del nombre del proyecto, y **solo cuando hay
  una versión nueva** ([cómo funciona](../instalacion#actualizaciones)).

## Los dos indicadores de la esquina

Arriba a la derecha, siempre en el mismo sitio en el **Monitor** y en el
**Mapa**, viven dos controles vecinos que cuentan **cosas distintas**. Vale la
pena no confundirlos:

| | Qué dice | Cuándo se vacía |
|---|---|---|
| 🔔 **La campana** (bandeja de avisos) | Lo que la app te avisó **mientras trabajabas**, con su hora. Su contador es de **no leídos**. | Al abrirla. Un aviso se lee y no vuelve. |
| 💓 **El latido** (centinela de servicio) | Qué está **roto ahora mismo**, y cuántos equipos. | Sola, cuando la falla se resuelve. No se descarta a mano. |

Un aviso de "volvió a conectarse" ya ocurrió y no deja de haber ocurrido; un
cable suelto sigue suelto aunque lo mires. Por eso son dos y no uno. Ambos
llevan al equipo con un clic, y **ninguno aparece dentro del visor de una
captura** compartida: una captura congelada no genera eventos.

Los detalles de cada uno están en
[Centinela y calificación](../centinela).

## Los contadores son filtros

La fila de contadores —**Estaciones / Buenas / Atención / Críticas /
Ausentes**— no es solo un resumen: **un clic filtra la tabla de estaciones** a
ese grupo, sin congelar el refresco. **Ausentes** filtra por sesión perdida,
no por semáforo: una estación ausente conserva su última lectura.

Los contadores de **AP** y **Referentes** son informativos.

## El riel inferior

Una barra flotante con:

- **Anclas** a cada tabla visible (Estaciones, AP, Referentes, Detectados) para saltar sin
  hacer scroll — también con `Ctrl+↓` / `Ctrl+↑`.
- **Equipo (+)** — registrar un radio a mano por IP (para segmentos que no
  puedes escanear).
- **Limpiar filtro** — aparece cuando hay un filtro activo.
- **Congelar / Reanudar** — pausa el refresco visual para leer con calma;
  **el monitoreo de fondo sigue**, solo se detiene el repintado.

::: info 🖼️ Imagen pendiente — `barra-indicadores.png`
La esquina derecha de la barra: la lupa del buscador, la **campana** con su
contador de avisos sin leer y el **latido** del centinela con el número de
equipos en falla.
:::

## Común a todas las tablas

- **Buscador propio** por tabla (nombre, IP, MAC, modelo, AP…).
- **Cabeceras clicables** para ordenar.
- **Menú "Columnas"** para ocultar las que no uses — la elección se recuerda.
- **Clic en el nombre de una fila** (estación o AP) la aísla en su propia
  tabla; otro clic en el mismo sitio deshace el filtro.
