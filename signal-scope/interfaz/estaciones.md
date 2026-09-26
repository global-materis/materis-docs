# Estaciones

La tabla principal. **Una fila es una antena de cliente**, con su estado
refrescándose en vivo. En un MikroTik la fila es un radio, como se explica
[más abajo](#equipos-mikrotik-una-fila-por-radio).

![La tabla de estaciones en vivo: semáforo por fila, señal local y remota, líneas base fijadas, latencia, CPU y RAM libre, con el tooltip de diagnóstico abierto en una fila](/signal-scope/tabla-estaciones.png)

## Las columnas

| Columna | Qué muestra |
|---|---|
| **Sesión** | El estado de la conexión al radio (SSH, HTTPS o HTTP) y, si está ausente, [qué le pasa](#cuando-un-equipo-se-ausenta). Lleva además las marcas de lo que decidiste sobre ese equipo: sesión apagada, avisos silenciados, aviso de reconexión. Un clic abre la [ventana de sesión](#la-ventana-de-sesion). Una sesión HTTP se pinta en ámbar con un candado abierto, porque en esa red el usuario, la contraseña y las métricas viajan en texto plano. |
| **Señal · local / remota** | El dato principal. Local es lo que la estación recibe; remota (en gris) es lo que el AP recibe de ella. La barra de medición lleva el color del semáforo. |
| **Línea base** | El botón **Marcar** fija la señal actual como línea base de esa antena, y la celda pasa a mostrar ese valor (`−58 dBm`) con una **×** para quitarla. Con línea base, el eje de señal juzga cuánto bajó respecto a ella y no el valor absoluto, y el estado se lee **Estable**, **Bajó vs base** o **Revisar enlace**. Para actualizarla, primero se quita con la **×**. Ver [Semáforo y diagnóstico](../diagnostico#linea-base-comparar-contra-tu-propia-red). |
| **IP** | Un enlace que abre la web del radio, y un botón de **ping** que abre una terminal con ping continuo. |
| **Latencia** | La latencia del enlace medida por el propio radio hacia su AP. No es un ping desde tu PC; ver [abajo](#latencia-la-media-y-el-pico). |
| **Sesiones** | Conexiones simultáneas del cliente, contadas por el radio cuando trabaja en modo router. Solo llega por SSH. Es informativa: distingue a un cliente tranquilo de uno con mucho movimiento. |
| **AP** | La estación base a la que está asociada. El **nombre** salta a la fila de ese AP; el **icono de antena** filtra esta tabla a sus demás clientes. |
| **Link** | La calidad del enlace airMAX de bajada (%), promediada para evitar falsos críticos. Si el equipo no publica ese dato, la celda muestra la medida que sí tiene, con su sigla y sin color: **CCQ** en RouterOS y en airOS 6 por SSH, **AMQ** (airMAX Quality) en airOS 6 por HTTP. Ninguna de las dos tiene umbrales calibrados, así que se muestran pero no deciden el diagnóstico. |
| **Link sub.** | La misma calidad airMAX en la subida (%). Solo tiene valor en los equipos que dan el linkscore de airMAX; el CCQ no tiene dirección y no se repite aquí. |
| **Modulación** | Las dos direcciones, bajada y subida (`8x/1x`). Es informativa: no cambia el semáforo, pero explica una capacidad reducida. Ver [abajo](#modulacion-las-dos-direcciones). |
| **CPU · RAM libre** | La salud del radio: cuánta CPU usa y cuánta memoria le queda **disponible** (en RAM libre, más es mejor). No lleva color a propósito. El veredicto lo da el diagnóstico, que juzga lo sostenido y no el instante. |
| **Downlink / Uplink** | La capacidad estimada del enlace según el AP. Salen vacías en los equipos airOS 6, que no la calculan, y una celda vacía ahí es el dato correcto. |
| **Thr. TX / RX** | El tráfico del momento en ese enlace. Sale vacío en la primera lectura de cada sesión, cuando aún no hay contra qué comparar. |
| **Puertos** | **Todos** los puertos Ethernet del equipo, un conector RJ45 por puerto y en el orden en que el equipo los nombra. Ver [abajo](#puertos-un-conector-por-puerto). |
| **Nombre · Modelo · MAC · Firmware · Distancia · Conexión** | Identidad y contexto, tal como los reporta el propio radio. Firmware sirve para ver qué equipos están desactualizados. |

Casi todas se pueden ocultar desde el menú **Columnas**, y la elección se
recuerda. Sesión, Señal, Línea base, IP y Link quedan siempre visibles.

## Equipos MikroTik: una fila por radio

Los equipos con RouterOS están en beta: funcionan igual que los airMAX, pero se
han probado en menos modelos. Un MikroTik con varios radios ocupa **una fila
por radio**, y cada fila se llama como el equipo seguido de su interfaz. El
modo es de cada radio, así que una misma caja puede tener una fila aquí y otra
en [Puntos de acceso](./puntos-de-acceso). Un radio deshabilitado no ocupa
fila.

Lo que pertenece a la caja se repite en todas sus filas: CPU, memoria,
modelo, firmware, uptime y puertos. Son una sola medida vista dos veces.

::: tip Celdas vacías en equipos MikroTik
Latencia, Distancia, Sesiones y la señal remota **salen vacías** en RouterOS,
porque ese sistema no las publica. Una celda vacía dice la verdad, y un número
que parece una medición sin serlo no la diría. La lista completa está en
[Equipos compatibles](../compatibilidad#que-ves-de-un-mikrotik-y-que-no).
:::

## La celda de Sesión y lo que decidiste

Además del estado de conexión, esta celda lleva las **marcas de lo que
decidiste** sobre ese equipo. Son tres, con el mismo glifo que en la ventana de
acciones: allí aparecen con su texto al lado y aquí sirven para recordarlas de
un vistazo.

| Marca | Significa | Dónde se pone |
|---|---|---|
| **Sesión apagada** | La app **deja de conectarse** a ese equipo, así que no le gasta CPU ni te llena de avisos, pero **conserva sus credenciales y su ficha**. Sigue apagada aunque cierres la app. Un clic en la celda la vuelve a encender. | Ventana de sesión → *Acciones*, encima de Olvidar equipo |
| **Avisos silenciados** | El equipo **se sigue midiendo**. Lo que se calla es la salida (panel, Windows y mensajería) durante el plazo que elijas: 1 hora, 8 horas, 1 día, 3 días, 1 semana o Sin vencimiento. Al vencer el plazo vuelve a avisar solo; antes, lo reactivas con **Reactivar**. | Ventana de sesión → *Acciones* |
| **Aviso de reconexión puesto** | La app te avisará cuando ese equipo vuelva a conectarse. | Ventana de sesión → *Acciones* |

Las tres se explican en [Centinela y calificación](../centinela#lo-que-decides-por-equipo).

::: warning Las acciones se llevan la caja entera
En un equipo de varios radios (dos filas, una sola sesión), apagar, silenciar u
olvidar **vale para las dos filas**. La app te lo avisa antes de que pulses.
:::

## La ventana de sesión

Un clic en la celda de **Sesión** de un equipo ya registrado abre su ventana,
con cuatro pestañas:

| Pestaña | Para qué |
|---|---|
| **Acciones** | Lo que decides sobre el equipo: motivo de la ausencia, silenciar avisos, avisar la reconexión, apagar la sesión y olvidar el equipo. La ventana se abre en esta pestaña. |
| **Puertos** | Qué puertos Ethernet vigila el centinela. Ver [abajo](#puertos-que-vigila-el-centinela). |
| **Log** | Qué intentó la app con ese equipo y cómo terminó cada intento. Ver [abajo](#el-log-de-la-sesion). |
| **Conexión** | IP, sistema, protocolo, puerto y cuenta, para corregirlos. **Actualizar** vuelve a conectar con esos datos. La contraseña guardada no se muestra, así que hay que escribirla. |

Todo esto vale igual para un [punto de acceso](./puntos-de-acceso).

### Motivo de la ausencia

Solo aparece mientras el equipo está **ausente**. Si sabes por qué no está, lo
marcas como **Suspendido**, **Técnico** o **De baja** (con **Ausente** lo dice
la app). La celda de Sesión muestra tu etiqueta en lugar de «Ausente».

- La etiqueta es **informativa**: la app sigue intentando conectarse. Para que
  deje de intentarlo, usa **Apagar sesión**.
- Con un motivo puesto, la app no te pide intervenir por ese equipo, porque ya
  sabes lo que pasa.
- Se guarda en el proyecto y **se quita sola cuando el equipo vuelve**, con un
  aviso en la campana: *"Volvió un equipo etiquetado"*.

### Avisar la reconexión

Marcas el equipo y la app te avisa cuando vuelva a conectarse, en uno de dos
modos: **Una vez**, que avisa y se quita solo, o **Siempre**, que avisa en cada
caída y vuelta hasta que lo quites. Si el equipo está silenciado, el aviso
espera a que reactives sus avisos. El detalle está en
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
| **Cuenta rechazada** | En su IP rechazan la cuenta y el equipo no aparece en otra parte. | Corrige la cuenta o la IP en *Conexión*, o pulsa **Reintentar** cuando lo resuelvas en el equipo. |
| **Posible reemplazo** | En su IP contesta **otro equipo con su mismo nombre**. | Decides en la comparación de abajo. |

**Reintentar** reanuda la sesión con los datos guardados. Si el equipo vuelve
por su cuenta, la petición se retira y el aviso se queda en la campana.

#### Posible reemplazo

Cuando cambias un radio por otro y le pones el mismo nombre, la app no lo da
por hecho. Pone **los dos lado a lado** (nombre, MAC, modelo y firmware, IP, AP
y cuándo se vio por última vez) y marca lo que no coincide.

- Con **"Sí, reemplaza al anterior"**, el nuevo **hereda su puesto**: nombre,
  línea base, puertos, coordenadas, silencios y avisos, y la credencial. Los
  snapshots anteriores conservan al viejo con su MAC, y al compararlos verás
  *"Reemplazado por …"* / *"Reemplaza a …"*.
- Con **"No, son equipos distintos"**, el que contestó pasa a **Detectados** y
  la app sigue buscando al registrado. No vuelve a preguntar por esa misma
  pareja.

### Puertos que vigila el centinela

La pestaña muestra una tarjeta por puerto, con su estado real (sin cable,
velocidad, half duplex) y un interruptor. **El centinela solo avisa de los
puertos encendidos.** Vale para cualquier estación o AP, también con un solo
puerto: apagar el único lo saca de la vigilancia.

- **Por defecto viene encendido el primero.** Apagarlos todos está permitido;
  la pestaña te advierte de la consecuencia, pero no te lo impide.
- El cambio se aplica al pulsar.
- **Los que no vigilas se siguen viendo** en la columna Puertos, con su estado
  en el tooltip, pero **sin color de severidad** y sin generar avisos.
- **Un aviso por equipo**, aunque caigan dos puertos vigilados.
- **La elección es del equipo y no de la fila**: en un router con dos radios
  vale para las dos filas.

::: tip Ponles nombre en el equipo
Cada puerto se muestra con el nombre de su interfaz. Si la renombraste en el
equipo, el aviso del centinela usa **ese nombre** en vez de `ether3`, y
*"Sector norte quedó sin cable"* se entiende sin ir a mirar.
:::

::: warning La app no adivina cuál lleva el servicio
Deducirlo de la ruta por defecto del equipo **no funciona**: al poner un radio
en modo estación, la ruta se va por el aire y `ether1` deja de ser la salida.
Tú sabes cuál es, y por eso lo eliges tú.
:::

### El Log de la sesión

La pestaña **Log** es el registro de ese equipo: **qué intentó la app y cómo
terminó**, línea por línea y en orden, cada una con su fecha y hora. Con él
sabes qué pasó sin tener que esperar a ver si la fila vuelve.

```
24/09/2026 20:14:03  Sesión perdida
24/09/2026 20:14:03  Intento (tras perder la sesión) → 10.10.1.62 · HTTPS:443 · sin respuesta, se agotó el tiempo
24/09/2026 20:14:11  Ping a 10.10.1.62 · no responde
24/09/2026 20:14:12  Su AP SP-PSA60-17 la ve en 10.10.1.88
24/09/2026 20:14:13  IP actualizada 10.10.1.62 → 10.10.1.88 (su AP)
```

- Guarda los **últimos 100 registros** por equipo **mientras la app está
  abierta**. No se guarda en el proyecto ni viaja en un snapshot.
- **Copiar** lo lleva al portapapeles, para pegarlo en un reporte o en un
  correo a soporte. **Limpiar** lo vacía, para ver solo lo que pase desde ese
  momento.

## Cuando un equipo se ausenta

Una estación o un AP que pierde la sesión queda **Ausente**, conserva su última
lectura y **la app se encarga de recuperarlo**:

- Lo **vigila con ping** y vuelve a entrar en cuanto responde, o en cuanto su
  AP lo ve conectado.
- Si **cambió de IP**, lo busca en la lista de estaciones de su AP, en la de los
  demás AP y por ARP en la red de esta PC. Si lo encuentra, y al entrar
  confirma que es el mismo equipo, se reconecta solo en la IP nueva y te lo
  dice. Si el que cambió de IP es un **AP**, además deja un aviso en la
  campana, porque en un AP no es lo normal. Una etiqueta de ausencia puesta a
  mano no impide la búsqueda, y se quita sola cuando el equipo vuelve.

Mientras tanto, el chip de Sesión dice qué está pasando:

| Chip | Qué te dice |
|---|---|
| **Reconectando** | Acaba de perder la sesión y la app lo está reintentando. |
| **Buscándolo** | No contesta en su IP y la app lo busca en otra. |
| **Posible corte** | Su AP la ve conectada con su Fallback IP (un probable corte administrativo, como el de PPPoE por mora), o el equipo **cae y vuelve** una y otra vez. El problema no es el enlace. |
| **Bloqueado en el AP** | La lista de acceso de su AP no la deja conectarse. No es una avería ni un apagado. En airOS solo se detecta con una cuenta de acceso completo en el AP. |
| **Cortado en su AP** | Una regla del firewall de su AP (un MikroTik que rutea) descarta su tráfico. |
| **Sin red en esta PC** | La que perdió la red es tu PC. En ese caso llega **un solo aviso**, *"Esta PC perdió la red"*, en vez de uno por equipo, y otro cuando vuelve. |
| **Sin servicio** | Un radio de un equipo con varios desapareció de su lectura: está deshabilitado o sin servicio, y el resto del equipo sigue en línea. |
| **Ausente** | No hay más pistas: está apagado o sin ruta. |

El tooltip del chip da el detalle y cuándo se vio por última vez, y la pestaña
[Log](#el-log-de-la-sesion) cuenta cada paso. Si lo que la app necesita es una
IP o una cuenta que solo tú conoces, el chip se pone
[violeta](#cuando-la-app-necesita-que-intervengas).

## Modulación: las dos direcciones

La columna muestra **bajada y subida** separadas por una barra, `8x/1x`,
porque **cada dirección se avería por separado**.

La columna mostraba antes solo la bajada, y un caso de campo la hizo crecer. Un
cliente que se desconectaba a cada rato recibía en `8x` y **transmitía en
`1x`**, la modulación más lenta que existe, con la señal en −43 dBm, las
cadenas equilibradas, el ruido en −86 y el CINR en 37. Ningún eje del
diagnóstico lo detectó, porque **todos describen cómo *recibe* el equipo**. La
columna decía `8x`, y ese número tranquilizaba sobre un equipo averiado.

Cómo se lee el par:

- Si **las dos bajan juntas y en proporción a la señal** (`6x/6x` a −67 dBm), el
  cuadro es malo pero coherente. Es una antena desalineada, y esos clientes no
  suelen reportar cortes.
- **Una asimetría con la señal impecable** (`8x/1x` a −43 dBm) es otra cosa: la
  transmisión está trabada. Sobrevive a cambiar de AP y se arregla
  **reiniciando el radio**.
- Si falta un lado, se pinta `—` en su lugar. Media columna en blanco
  escondería justo la dirección averiada.

En los equipos que **no publican índice** (airMAX con airOS 6 y todos los RouterOS),
la columna muestra las **dos tasas en Mbps**. Es la misma medida en la notación
que entrega cada firmware: la tasa del último paquete, que no es la capacidad
del enlace.

## El tooltip de la señal es el diagnóstico

Al pasar el puntero por la celda de señal aparece el **diagnóstico
multi-variable completo**: estado, causas en palabras (señal bajo lo esperado a
su distancia, ruido, interferencia del canal, latencia, capacidad), SNR/CINR y
distancia. La guía de [semáforo y diagnóstico](../diagnostico) explica cómo
leer cada causa.

## Latencia: la media y el pico

La celda muestra **dos números**:

- El **grande** es la media sostenida, y responde a *"¿suele estar alta?"*.
- El **`▲` pequeño** es el pico de los últimos 2 minutos. Solo aparece cuando el
  enlace está mal de verdad y los saltos son persistentes, y responde a *"¿pega
  saltos seguido?"*.

El tooltip trae el detalle: media, pico con su antigüedad y el porcentaje del
tiempo por encima del umbral.

Hay un tercer número opcional. Con **Ping desde SignalScope** encendido
(Preferencias → *General*, apartado *Sonda de red*; viene apagado), la celda
suma el ping **desde SignalScope** hasta cada estación en línea, con su
pérdida, y pasa a leerse `2 ms / 57 ms`.

::: tip Dos mediciones que no tienen por qué coincidir
La latencia del radio mide solo el tramo aéreo. El ping desde SignalScope
recorre el camino completo (PC → switch → AP → aire → radio). Por eso
contrastarlas ayuda al diagnóstico: **si se separan mucho, el cuello de botella
no está en el aire de esa estación**. Al leer el ping, ten en cuenta que su
media promedia solo los paquetes que volvieron, y por eso siempre va
acompañada de la pérdida.
:::

## Puertos: un conector por puerto

La columna muestra **todos los puertos Ethernet del equipo**, en el orden en que
el equipo los nombra. Un radio de un solo puerto, como la mitad de la flota,
muestra uno.

Cada conector RJ45 resume el estado de su puerto:

| Aspecto | Significado |
|---|---|
| Gris | Sin dato (no es una avería) |
| Conector tachado, ámbar | Sin cable |
| Ámbar | Half duplex |
| Rojo | ≤ 10 Mbps: cable dañado o par partido |
| Azul | Fast Ethernet (100 Mbps), informativo y no un problema |
| Verde | Gigabit |

Los 100 Mbps no se marcan como problema a propósito, porque muchas
instalaciones usan Cat5 de forma deliberada. Lo que sí avisa es la
**degradación frente a su propio historial**. La app aprende la velocidad
máxima que ese equipo ha negociado y, si un día negocia menos, aparece un
**`↓` ámbar**. Si el cambio fue legítimo (se cambió el cable), un clic sobre el
`↓` acepta esa velocidad como la nueva normal. La excepción son los 10 Mbps:
nunca son una decisión de instalación y no se pueden aceptar como normales.

Hay dos matices de lectura. El estado **sin cable** se ve aquí y lo avisa el
centinela, pero **no cambia el color de la fila**, porque un router apagado de
noche o un corte por mora no son averías del enlace. Los **10 Mbps**, en
cambio, sí ponen la fila en Crítica: ningún airMAX trae ese máximo de fábrica.

::: tip Cuando el problema es solo el puerto, la señal no sale en rojo
El equipo sigue marcado en crítica y la fila teñida, pero **el número de la
señal se pinta según su propio valor**. El problema lo señalan la columna
Puertos y el diagnóstico, que apuntan a donde hay que arreglarlo. La antena
está bien.
:::

Qué puertos vigila el centinela se elige en la pestaña
[Puertos](#puertos-que-vigila-el-centinela) de la ventana de sesión.

::: info 🖼️ Imagen pendiente — `puertos-vigilados.png`
La pestaña Puertos de la ventana de sesión: una tarjeta por puerto con su estado
real (sin cable, 1 Gbps full duplex, half duplex) y su interruptor.
:::

La columna existe también en la [tabla de AP](./puntos-de-acceso), donde la
degradación pesa aún más.
