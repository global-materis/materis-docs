# Estaciones

La tabla principal. **Una fila = una antena de cliente**, con su estado
refrescándose en vivo.

::: info 🖼️ Imagen pendiente — `public/signal-scope/tabla-estaciones.png`
Captura de la **tabla de estaciones** con varias filas: semáforo, señal,
referencia y latencia visibles.
:::

## Las columnas

| Columna | Qué muestra |
|---|---|
| **Sesión** | El estado de conexión al radio (SSH o HTTP). Una sesión HTTP se pinta en ámbar con un candado abierto: en esa red las credenciales y métricas viajan sin cifrar, y es mejor saberlo. |
| **Señal · local / remota** | El dato del producto. Local = lo que la estación recibe; remota (en gris) = lo que el AP recibe de ella. Barra de medición con el color del semáforo. |
| **Referencia** | El botón **"Marcar OK"** fija la señal actual como referencia de esa antena. Con referencia, el semáforo evalúa cuánto se desvió (Δ dB), no el valor absoluto. |
| **IP** | Enlace que abre la web del radio, más un botón de **ping** que abre una terminal con ping continuo. |
| **Latencia** | La latencia del enlace **medida por el propio radio hacia su AP** — no un ping desde tu PC. Ver abajo. |
| **Sesiones** | Conexiones simultáneas del cliente, contadas por el radio cuando trabaja en modo router. Informativa: distingue un cliente tranquilo de uno movido. |
| **AP** | A qué estación base está asociada. El **nombre** salta a la fila de ese AP; el **icono de antena** filtra esta tabla a sus demás clientes. |
| **Link** | Calidad de enlace airMAX (%), promediada para evitar falsos críticos. |
| **Modulación** | La tasa a la que la estación recibe (`6x`, `8x`… o Mbps según el firmware). Informativa: cuenta la historia detrás de una capacidad reducida. |
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
distancia. La guía de semáforo y diagnóstico (próximamente) explica cómo leer
cada causa.

## Latencia: la media y el pico

La celda muestra **dos números**:

- El **grande** es la media sostenida: responde *"¿suele estar alta?"*.
- El **`▲` pequeño** es el pico de los últimos 2 minutos, y solo aparece
  cuando el enlace está realmente mal y los saltos son persistentes: responde
  *"¿pega saltos seguido?"*.

El tooltip trae el detalle: media, pico con su antigüedad y el porcentaje del
tiempo sobre el umbral.

::: tip El ping de tu PC no mide lo mismo
Esta columna la mide el radio sobre su tramo aéreo. Un ping desde tu
computadora recorre además tu red local y todo el camino intermedio — por eso
ambos números no tienen por qué coincidir.
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
si un día negocia menos, el icono lo señala. Si el cambio fue legítimo (se
cambió el cable), un clic acepta la nueva velocidad como normal.
