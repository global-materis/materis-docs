# La interfaz

El panel de monitoreo es una sola pantalla vertical: arriba el panel de
escaneo y las acciones, luego los contadores, y debajo las tablas de equipos.
Esta sección la recorre por partes:

- [Estaciones](./estaciones) — la tabla principal: tus antenas de cliente.
- [Puntos de acceso](./puntos-de-acceso) — tus estaciones base.
- [Detectados y Otros](./detectados-y-otros) — la cola del escaneo y el
  inventario de equipos ajenos.
- [Mapa de cobertura](./mapa) — la otra vista principal: nodos, sectores y
  estaciones sobre el mapa.

![El panel completo: redes registradas y acciones arriba, los contadores del parque, el historial de snapshots y la tabla de estaciones en vivo](/signal-scope/monitor-en-vivo.jpg)

## El panel de arriba

Además del escaneo y la sesión en cascada (vistos en
[Primeros pasos](../primeros-pasos)), ahí viven:

- **Guardar snapshot** (`Ctrl+H`) — captura el estado actual de la red al
  historial.
- **Reporte** — exporta a PDF o Excel, con un selector de alcance: General,
  Críticas, Críticas + Atención, Solo estaciones o Solo AP.
- **El strip de snapshots** — las capturas guardadas, cada una con su fecha;
  desde ahí se comparan, se comparten y se protegen.

## Los contadores son filtros

La fila de contadores —**Estaciones / Buenas / Atención / Críticas /
Ausentes**— no es solo un resumen: **un clic filtra la tabla de estaciones** a
ese grupo, sin congelar el refresco. **Ausentes** filtra por sesión perdida,
no por semáforo: una estación ausente conserva su última lectura.

Los contadores de **AP** y **Otros** son informativos.

## El riel inferior

Una barra flotante con:

- **Anclas** a cada tabla visible (Estaciones, AP, Otros) para saltar sin
  hacer scroll — también con `Ctrl+↓` / `Ctrl+↑`.
- **Equipo (+)** — registrar un radio a mano por IP (para segmentos que no
  puedes escanear).
- **Limpiar filtro** — aparece cuando hay un filtro activo.
- **Congelar / Reanudar** — pausa el refresco visual para leer con calma;
  **el monitoreo de fondo sigue**, solo se detiene el repintado.

## Común a todas las tablas

- **Buscador propio** por tabla (nombre, IP, MAC, modelo, AP…).
- **Cabeceras clicables** para ordenar.
- **Menú "Columnas"** para ocultar las que no uses — la elección se recuerda.
- **Clic en el nombre de una fila** (estación o AP) la aísla en su propia
  tabla; otro clic en el mismo sitio deshace el filtro.
