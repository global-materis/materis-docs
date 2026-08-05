# Estaciones

La tabla principal. **Una fila = una antena de cliente**, con su estado
refrescándose en vivo.

![La tabla de estaciones en vivo: semáforo por fila, señal local y remota, referencias fijadas, latencia, CPU y RAM libre — con el tooltip de diagnóstico abierto en una fila](/signal-scope/tabla-estaciones.png)

## Las columnas

| Columna | Qué muestra |
|---|---|
| **Sesión** | El estado de conexión al radio (SSH o HTTP). Una sesión HTTP se pinta en ámbar con un candado abierto: en esa red las credenciales y métricas viajan sin cifrar, y es mejor saberlo. |
| **Señal · local / remota** | El dato del producto. Local = lo que la estación recibe; remota (en gris) = lo que el AP recibe de ella. Barra de medición con el color del semáforo. |
| **Referencia** | El botón **"Marcar OK"** fija la señal actual como referencia de esa antena. Con referencia, el eje de señal juzga el desvío (Δ dB), no el valor absoluto; para actualizarla, primero se quita con la **×**. |
| **IP** | Enlace que abre la web del radio, más un botón de **ping** que abre una terminal con ping continuo. |
| **Latencia** | La latencia del enlace **medida por el propio radio hacia su AP** — no un ping desde tu PC. Ver abajo. |
| **Sesiones** | Conexiones simultáneas del cliente, contadas por el radio cuando trabaja en modo router. Informativa: distingue un cliente tranquilo de uno movido. |
| **AP** | A qué estación base está asociada. El **nombre** salta a la fila de ese AP; el **icono de antena** filtra esta tabla a sus demás clientes. |
| **Link** | Calidad de enlace airMAX (%), promediada para evitar falsos críticos. |
| **Modulación** | La tasa a la que la estación recibe (`6x`, `8x`… o Mbps según el firmware). Informativa: cuenta la historia detrás de una capacidad reducida. |
| **CPU · RAM libre** | La salud del radio: cuánta CPU usa y cuánta memoria le queda **disponible** (en RAM libre, más es mejor). Sin color a propósito — el veredicto lo da el diagnóstico, que además juzga lo sostenido, no el instante. |
| **Downlink / Uplink** | Capacidad estimada del enlace según el AP. **Vacías en equipos airOS 6**, que no la calculan: una celda vacía dice la verdad. |
| **Aire** | Eficiencia de aire del enlace (%). Un valor bajo delata al cliente que está frenando al resto de su AP. |
| **Thr. TX / RX** | Tráfico del momento de ese enlace. Vacío en la primera lectura de cada sesión (aún no hay contra qué comparar). |
| **Puertos** | El puerto Ethernet de la estación, como icono de conector RJ45. Ver abajo. |
| **Nombre · Modelo · MAC · Firmware · Distancia · Conexión** | Identidad y contexto: lo que reporta el propio radio. Firmware sirve para ver qué equipos están desactualizados. |

Casi todas son ocultables desde el menú **Columnas**; la elección se recuerda.

## El tooltip de la señal es el diagnóstico

Al pasar el puntero por la celda de señal aparece el **diagnóstico
multi-variable completo**: estado, causas en palabras (señal bajo lo esperado a
su distancia, ruido, interferencia del canal, latencia, capacidad), SNR/CINR y
distancia. La guía de [semáforo y diagnóstico](../diagnostico) explica cómo
leer cada causa.

## Latencia: la media y el pico

La celda muestra **dos números**:

- El **grande** es la media sostenida: responde *"¿suele estar alta?"*.
- El **`▲` pequeño** es el pico de los últimos 2 minutos, y solo aparece
  cuando el enlace está realmente mal y los saltos son persistentes: responde
  *"¿pega saltos seguido?"*.

El tooltip trae el detalle: media, pico con su antigüedad y el porcentaje del
tiempo sobre el umbral.

Y hay un tercer número opcional: con **"Medir también con ping propio"**
(Preferencias → *Sonda de red*, apagado de fábrica), la celda suma el ping
**desde SignalScope** hasta cada estación en línea, con su pérdida — la celda
pasa a leerse `2 ms / 57 ms`.

::: tip Dos mediciones que no tienen por qué coincidir — y ese es el punto
La latencia del radio mide solo el tramo aéreo; el ping desde SignalScope
recorre el camino completo (PC → switch → AP → aire → radio). Contrastarlas
es diagnóstico puro: **si se separan mucho, el cuello no está en el aire de
esa estación**. Un detalle al leer el ping: su media promedia solo los
paquetes que volvieron — por eso siempre va acompañada de la pérdida.
:::

## Puertos: el conector RJ45

El icono resume el estado del puerto Ethernet de la estación:

| Aspecto | Significado |
|---|---|
| Gris | Sin dato (no es una avería) |
| Conector tachado, ámbar | Sin cable |
| Ámbar | Half duplex |
| Rojo | ≤ 10 Mbps — cable dañado o par partido |
| Azul | Fast Ethernet (100 Mbps) — informativo, no un problema |
| Verde | Gigabit |

Los 100 Mbps no se marcan como problema a propósito: muchas instalaciones usan
Cat5 deliberadamente. Lo que sí avisa es la **degradación contra su propio
historial**: la app aprende la velocidad máxima que ese equipo ha negociado y,
si un día negocia menos, aparece un **`↓` ámbar**. Si el cambio fue legítimo
(se cambió el cable), el clic sobre el `↓` acepta esa velocidad como la nueva
normal — salvo a 10 Mbps, que nunca es una decisión de instalación y no se
puede firmar como normal.

Dos matices de lectura: el estado **sin cable** se ve aquí y lo avisa el
centinela, pero **no cambia el color de la fila** — un router apagado de
noche o un corte por mora no son averías del enlace. Y los **10 Mbps** sí
ponen la fila en Crítica: ningún airMAX trae ese máximo de fábrica.

La columna existe también en la [tabla de AP](./puntos-de-acceso), donde la
degradación pesa aún más.
