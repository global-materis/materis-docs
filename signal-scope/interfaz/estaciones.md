# Estaciones

La tabla principal. **Una fila = una antena de cliente**, con su estado
refrescándose en vivo.

![La tabla de estaciones en vivo: semáforo por fila, señal local y remota, líneas base fijadas, latencia, CPU y RAM libre — con el tooltip de diagnóstico abierto en una fila](/signal-scope/tabla-estaciones.png)

## Las columnas

| Columna | Qué muestra |
|---|---|
| **Sesión** | El estado de conexión al radio (SSH o HTTP) —y, si está ausente, [qué le pasa](#cuando-un-equipo-se-ausenta)—, más las marcas de lo que tú decidiste sobre ese equipo: apagado, silenciado, con aviso de reconexión. Un clic abre la [ventana de sesión](#la-ventana-de-sesion). Una sesión HTTP se pinta en ámbar con un candado abierto: en esa red las credenciales y métricas viajan sin cifrar, y es mejor saberlo. |
| **Señal · local / remota** | El dato del producto. Local = lo que la estación recibe; remota (en gris) = lo que el AP recibe de ella. Barra de medición con el color del semáforo. |
| **Línea base** | El botón **"Marcar"** fija la señal actual como línea base de esa antena, y la celda pasa a mostrar ese valor (`−58 dBm`) con una **×** para quitarla. Con línea base, el eje de señal juzga cuánto bajó respecto a ella, no el valor absoluto; para actualizarla, primero se quita con la **×**. Ver [Semáforo y diagnóstico](../diagnostico#linea-base-comparar-contra-tu-propia-red). |
| **IP** | Enlace que abre la web del radio, más un botón de **ping** que abre una terminal con ping continuo. |
| **Latencia** | La latencia del enlace **medida por el propio radio hacia su AP** — no un ping desde tu PC. Ver abajo. |
| **Sesiones** | Conexiones simultáneas del cliente, contadas por el radio cuando trabaja en modo router. Informativa: distingue un cliente tranquilo de uno movido. |
| **AP** | A qué estación base está asociada. El **nombre** salta a la fila de ese AP; el **icono de antena** filtra esta tabla a sus demás clientes. |
| **Link** | Calidad de enlace airMAX (%), promediada para evitar falsos críticos. En equipos **RouterOS** esta celda muestra el **CCQ**, etiquetado y **sin color**: es otro indicador y todavía no tiene umbrales calibrados. |
| **Modulación** | **Las dos direcciones, bajada y subida** (`8x/1x`). Informativa: no cambia el semáforo, pero cuenta la historia detrás de una capacidad reducida. Ver [abajo](#modulacion-las-dos-direcciones). |
| **CPU · RAM libre** | La salud del radio: cuánta CPU usa y cuánta memoria le queda **disponible** (en RAM libre, más es mejor). Sin color a propósito — el veredicto lo da el diagnóstico, que además juzga lo sostenido, no el instante. |
| **Downlink / Uplink** | Capacidad estimada del enlace según el AP. **Vacías en equipos airOS 6**, que no la calculan: una celda vacía dice la verdad. |
| **Aire** | Eficiencia de aire del enlace (%). Un valor bajo delata al cliente que está frenando al resto de su AP. |
| **Thr. TX / RX** | Tráfico del momento de ese enlace. Vacío en la primera lectura de cada sesión (aún no hay contra qué comparar). |
| **Puertos** | **Todos** los puertos Ethernet del equipo, un conector RJ45 por puerto y en el orden en que los nombra él. Ver abajo. |
| **Nombre · Modelo · MAC · Firmware · Distancia · Conexión** | Identidad y contexto: lo que reporta el propio radio. Firmware sirve para ver qué equipos están desactualizados. |

Casi todas son ocultables desde el menú **Columnas**; la elección se recuerda.

::: tip Celdas vacías en equipos MikroTik
Latencia, Aire, Distancia, Sesiones y la señal remota **salen vacías** en
RouterOS: ese sistema no las publica. Una celda vacía dice la verdad; un número
que parece una medición y no lo es, no. La lista completa está en
[Equipos compatibles](../compatibilidad#que-ves-de-un-mikrotik-y-que-no).
:::

## La celda de Sesión y lo que decidiste

Además del estado de conexión, esta celda lleva las **marcas de lo que tú
decidiste** sobre ese equipo. Son tres, con el mismo glifo que verás en la
ventana de acciones — ahí se aprende con su texto al lado, aquí se recuerda de
un vistazo:

| Marca | Significa | Dónde se pone |
|---|---|---|
| **Sesión apagada** | La app **deja de conectarse** a ese equipo —no le gasta CPU ni te llena de avisos— pero **conserva sus credenciales y su ficha**. Sigue apagada aunque cierres la app. Un clic en la celda la vuelve a encender. | Ventana de sesión → *Acciones*, encima de Olvidar |
| **Avisos silenciados** | El equipo **se sigue midiendo**; lo que se calla es la salida (panel, Windows y mensajería) durante el plazo que elijas. | Ventana de sesión → *Acciones* |
| **Aviso de reconexión puesto** | La app te avisará cuando ese equipo vuelva a conectarse. | Ventana de sesión → *Acciones* |

Las tres se explican en [Centinela y calificación](../centinela#lo-que-decides-por-equipo).

::: warning Las acciones se llevan la caja entera
En un equipo de varios radios —dos filas, una sola sesión— apagar, silenciar u
olvidar **vale para las dos**. La app te lo avisa antes de que pulses, no
después.
:::

## La ventana de sesión

Un clic en la celda de **Sesión** de un equipo ya registrado abre su ventana,
con cuatro pestañas:

| Pestaña | Para qué |
|---|---|
| **Acciones** | Lo que decides sobre el equipo: motivo de la ausencia, silenciar avisos, avisar la reconexión, apagar la sesión y olvidar el equipo. Es la pestaña con la que abre. |
| **Puertos** | Qué puertos Ethernet vigila el centinela. Ver [abajo](#puertos-que-vigila-el-centinela). |
| **Log** | Qué intentó la app con ese equipo y cómo terminó cada intento. Ver [abajo](#el-log-de-la-sesion). |
| **Conexión** | IP, sistema, protocolo, puerto y cuenta, para corregirlos. **Actualizar** vuelve a conectar con esos datos; la contraseña guardada no se muestra, así que hay que escribirla. |

Todo esto vale igual para un [punto de acceso](./puntos-de-acceso).

### Motivo de la ausencia

Solo aparece mientras el equipo está **ausente**. Si sabes por qué no está, lo
marcas: **Suspendido**, **Técnico** o **De baja** (**Ausente** deja que lo diga
la app). La celda de Sesión muestra tu etiqueta en lugar de «Ausente».

- Es **informativa**: la app sigue intentando conectarse. Para que deje de
  intentarlo, **Apagar sesión**.
- Con un motivo puesto, la app no te pide intervenir por ese equipo: ya sabes
  lo que pasa.
- Se guarda en el proyecto y **se quita sola cuando el equipo vuelve**, con un
  aviso en la campana: *"Volvió un equipo etiquetado"*.

### Avisar la reconexión

Marcas el equipo y la app te avisa cuando vuelva a conectarse: **Una vez** o
**Siempre** (en cada caída y vuelta, hasta que lo quites). El detalle está en
[Centinela](../centinela#avisar-la-reconexion).

### Cuando la app necesita que intervengas

Hay tres casos que la app no puede resolver sola. En los tres **pausa la
sesión**, pinta el chip de Sesión en **violeta**, deja un aviso en la
[campana](../centinela#la-campana-lo-que-te-aviso-mientras-trabajabas) y
muestra en *Acciones* lo que necesita de ti: la tarjeta **"Requiere tu
intervención"** con **Reintentar**, o la comparación de un posible reemplazo.

| Caso | Qué pasa | Qué haces |
|---|---|---|
| **IP desconocida** | No responde en su IP y la app no tiene cómo encontrar la nueva (por ejemplo, su AP la ve conectada pero no sabe su IP). | Escribe la IP nueva en *Conexión*, o pulsa **Reintentar** cuando lo resuelvas. |
| **Cuenta rechazada** | En su IP rechazan la cuenta y no se encontró en otra parte. | Corrige la cuenta o la IP en *Conexión*, o **Reintentar** cuando lo resuelvas en el equipo. |
| **Posible reemplazo** | En su IP contesta **otro equipo con su mismo nombre**. | Decides en la comparación de abajo. |

**Reintentar** reanuda la sesión con los datos guardados. Si el equipo vuelve
por su cuenta, la petición se retira; el aviso se queda en la campana.

#### Posible reemplazo

Cuando cambias un radio por otro y le pones el mismo nombre, la app no lo
asume: pone **los dos lado a lado** —nombre, MAC, modelo y firmware, IP, AP y
cuándo se vio por última vez— y marca lo que no coincide.

- **"Sí, reemplaza al anterior"** — el nuevo **hereda su puesto**: nombre, línea
  base, puertos, coordenadas, silencios y avisos, y la credencial. Las capturas
  anteriores conservan al viejo con su MAC, y al compararlas verás
  *"Reemplazado por …"* / *"Reemplaza a …"*.
- **"No, son equipos distintos"** — el que contestó pasa a **Detectados** y la
  app sigue buscando al registrado. No vuelve a preguntar por esa misma pareja.

### Puertos que vigila el centinela

Una tarjeta por puerto, con su estado real (sin cable, velocidad, half duplex)
y un interruptor. **Solo de los puertos encendidos avisa el centinela.** Vale
para cualquier estación o AP, también con un solo puerto: apagar el único lo
saca de la vigilancia.

- **Por defecto viene encendido el primero.** Apagarlos todos es válido: la
  pestaña te avisa de la consecuencia, pero no te lo impide.
- El cambio se aplica al pulsar.
- **Los que no vigilas se siguen viendo** en la columna Puertos, con su estado
  en el tooltip, pero **sin color de severidad** y sin generar avisos.
- **Un aviso por equipo**, aunque caigan dos puertos vigilados.
- **La elección es del equipo, no de la fila**: en un router con dos radios vale
  para las dos.

::: tip Ponles nombre en el equipo
Cada puerto se muestra con el nombre de su interfaz. Si la renombraste en el
equipo, el aviso del centinela dice **ese nombre** y no `ether3`: *"Sector
norte quedó sin cable"* se entiende sin ir a mirar.
:::

::: warning La app no adivina cuál lleva el servicio
Deducirlo de la ruta por defecto del equipo **no funciona**: al poner un radio
en modo estación, la ruta se va por el aire y `ether1` deja de ser la salida.
Lo sabes tú, y por eso lo eliges tú.
:::

### El Log de la sesión

La pestaña **Log** es el registro de ese equipo: **qué intentó la app y cómo
terminó**, línea por línea y en orden, cada una con su fecha y hora. Sirve para
saber qué pasó sin adivinarlo mirando si la fila vuelve.

```
24/09/2026 20:14:03  Sesión perdida
24/09/2026 20:14:03  Intento (tras perder la sesión) → 10.10.1.62 · HTTPS:443 · sin respuesta, se agotó el tiempo
24/09/2026 20:14:11  Ping a 10.10.1.62 · no responde
24/09/2026 20:14:12  Su AP SP-PSA60-17 la ve en 10.10.1.88
24/09/2026 20:14:13  IP actualizada 10.10.1.62 → 10.10.1.88 (su AP)
```

- Guarda los **últimos 100 registros** por equipo, **mientras la app está
  abierta**: no se guarda en el proyecto ni viaja en una captura.
- **Copiar** lo lleva al portapapeles, para pegarlo en un reporte o en un
  correo a soporte. **Limpiar** lo vacía, para ver solo lo que pase desde ahora.

## Cuando un equipo se ausenta

Una estación o un AP que pierde la sesión queda **Ausente**, conserva su última
lectura y **la app se ocupa de recuperarlo**:

- Lo **vigila con ping** y vuelve a entrar en cuanto responde, o en cuanto su AP
  lo ve conectado.
- Si **cambió de IP**, lo busca en la lista de estaciones de su AP, en la de los
  demás AP y por ARP en la red de esta PC. Si lo encuentra —y al entrar
  confirma que es él—, se reconecta solo en la IP nueva y te lo dice. Si el que
  cambió de IP es un **AP**, además deja un aviso en la campana: en un AP no es
  lo normal.

Mientras tanto, el chip de Sesión dice qué está pasando:

| Chip | Qué te dice |
|---|---|
| **Reconectando** | Acaba de perder la sesión y la app lo está reintentando. |
| **Buscándolo** | No contesta en su IP; la app lo busca en otra. |
| **Posible corte** | Su AP la ve conectada con su Fallback IP —un probable corte administrativo, como el de PPPoE por mora—, o el equipo **cae y vuelve** una y otra vez. El enlace no es el problema. |
| **Bloqueado en el AP** | La lista de acceso de su AP no la deja conectarse. No es una avería ni un apagado. En airOS solo se detecta con una cuenta de acceso completo en el AP. |
| **Cortado en su AP** | Una regla del firewall de su AP (un MikroTik que rutea) descarta su tráfico. |
| **Sin red en esta PC** | La que perdió la red es tu PC. En ese caso llega **un solo aviso**, *"Esta PC perdió la red"*, en vez de uno por equipo, y otro cuando vuelve. |
| **Sin servicio** | Un radio de un equipo con varios desapareció de su lectura: está deshabilitado o sin servicio, y el resto del equipo sigue en línea. |
| **Ausente** | Sin más pistas: apagado o sin ruta. |

El tooltip del chip da el detalle y cuándo se vio por última vez; la pestaña
[Log](#el-log-de-la-sesion) cuenta cada paso. Si lo que la app necesita es una
IP o una cuenta que solo tú conoces, el chip se pone
[violeta](#cuando-la-app-necesita-que-intervengas).

## Modulación: las dos direcciones

La columna muestra **bajada y subida**, separadas por una barra: `8x/1x`. No es
un adorno — **se averían por separado**.

El caso que la hizo crecer: un cliente que se desconectaba a cada rato recibía
en `8x` y **transmitía en `1x`** —la modulación más lenta que existe— con la
señal en −43 dBm, las cadenas equilibradas, el ruido en −86 y el CINR en 37.
Ningún eje del diagnóstico lo vio, porque **todos describen cómo *recibe* el
equipo**, y la columna, que enseñaba solo la bajada, decía `8x`. No es que no
ayudara: **tranquilizaba**.

Cómo se lee el par:

- **Las dos bajan juntas y en proporción a la señal** (`6x/6x` a −67 dBm): feo,
  pero coherente — es una antena desalineada, y esos clientes no suelen
  reportar cortes.
- **Una asimetría con la señal impecable** (`8x/1x` a −43 dBm) es otra cosa:
  transmisión trabada. Sobrevive a cambiar de AP y se arregla **reiniciando el
  radio**.
- Si un lado falta, se pinta `—` en vez de desaparecer: media columna en blanco
  escondería justo la dirección averiada.

En los equipos que **no publican índice** —airMAX viejos y todos los
RouterOS— la columna muestra las **dos tasas en Mbps**. No son dos datos
distintos: es la misma medida en la notación que cada firmware entrega.

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

## Puertos: un conector por puerto

La columna muestra **todos los puertos Ethernet del equipo**, en el orden en que
los nombra él. Un radio de un solo puerto —media flota— muestra uno.

Cada conector RJ45 resume el estado de su puerto:

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

::: tip Cuando el problema es solo el puerto, la señal no sale en rojo
El equipo sigue marcado en crítica y la fila teñida, pero **el número de la
señal se pinta por lo que vale**. El problema lo señalan la columna Puertos y el
diagnóstico, que es donde se arregla — y no la antena, que está bien.
:::

Qué puertos vigila el centinela se elige en la pestaña
[Puertos](#puertos-que-vigila-el-centinela) de la ventana de sesión.

::: info 🖼️ Imagen pendiente — `puertos-vigilados.png`
La pestaña Puertos de la ventana de sesión: una tarjeta por puerto con su estado
real (sin cable, 1 Gbps full duplex, half duplex) y su interruptor.
:::

La columna existe también en la [tabla de AP](./puntos-de-acceso), donde la
degradación pesa aún más.
