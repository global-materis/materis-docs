# Glosario

Los términos que esta documentación usa, en lenguaje llano. Agrupados por
tema, no alfabéticamente, para que los relacionados queden juntos.

## La red inalámbrica

**WISP** — *Wireless Internet Service Provider*: proveedor de internet
inalámbrico. El tipo de operador para el que existe SignalScope.

**AP (Punto de acceso)** — la antena **base**, normalmente en una torre o
nodo, que da servicio a varios clientes a la vez. En la doc: "estación base".

**Estación (CPE)** — el radio del lado del **cliente**, que apunta hacia un
AP y se conecta a él. Cada cliente tiene la suya.

**Enlace** — la conexión inalámbrica entre una estación y su AP. Cuando la
doc dice "el enlace se degradó", habla de ese tramo aéreo.

**Sector** — un AP y todas las estaciones que cuelgan de él. Un problema "del
sector" afecta a todos esos clientes a la vez.

**SSID** — el nombre de red que difunde un AP, con el que las estaciones lo
encuentran.

**Frecuencia / canal** — la porción del espectro en la que transmite un AP.
Dos AP cercanos en canales solapados se interfieren entre sí.

**Modulación** — la "velocidad de habla" que negocian radio y AP (`6x`,
`8x`…). Más alta = más capacidad, pero exige mejor señal; un enlace con señal
pobre baja la modulación y por eso entrega menos de lo esperado. **Se negocia
por separado en cada dirección**, y por eso la app enseña las dos (`8x/1x`): un
radio puede recibir perfecto y transmitir muy mal.

**Airtime (aire ocupado)** — el porcentaje del tiempo que el canal está en
uso. Un aire al 70 % o más significa canal saturado: los clientes esperan
turno para transmitir.

## La señal

**dBm** — la unidad de potencia de la señal. Es **negativa** y más cerca de
cero es más fuerte: −55 dBm es mejor señal que −70 dBm. Es el dato central de
SignalScope.

**Ruido (piso de ruido)** — la energía de fondo presente en el canal aunque
nadie transmita. Se mide en dBm; un piso alto "tapa" la señal útil.

**SNR** — *Signal-to-Noise Ratio*: el margen entre tu señal y el piso de
ruido, en dB. Más alto es mejor; con poco margen, el radio no distingue la
señal del ruido.

**CINR** — como el SNR, pero descuenta además la **interferencia de otros
transmisores** en el canal. Por eso puede detectar un canal sucio aunque la
señal "se vea bien".

**Cadenas (polaridades)** — las dos vías de una antena moderna (horizontal y
vertical), que deberían recibir casi lo mismo. Un desbalance grande delata
antena rotada o dañada.

**Calidad de enlace (linkscore)** — el indicador de airMAX (0–100 %) de qué
tan sano está el enlace, más allá de la señal.

**CCQ** — el indicador equivalente de RouterOS (0–100 %). **No es el mismo
número** que el linkscore de airMAX: se calcula distinto, así que la app lo
etiqueta y **no lo colorea** hasta tener umbrales medidos en campo.

**Latencia** — el tiempo de ida y vuelta de los datos, en milisegundos (ms).
Alta latencia = servicio "lento" aunque la velocidad contratada esté ahí.

**Throughput** — el tráfico que cursa el enlace **en este momento** (lo que
el cliente está consumiendo), a diferencia de la capacidad (lo que el enlace
podría cursar).

## La red y los protocolos

**IP** — la dirección de un equipo en la red. **Puede cambiar** (por eso
SignalScope no identifica equipos por IP).

**MAC** — la identidad física de fábrica de cada equipo de red, que **no
cambia**. Es la identidad con la que SignalScope reconoce a cada equipo
aunque su IP cambie.

**OUI (fabricante)** — los primeros pares de la MAC, asignados por
fabricante. Con ellos la app sugiere qué es un equipo recién detectado.

**CIDR (máscara)** — la notación de un rango de red: `192.168.1.0/24` son las
256 direcciones de esa red. Es como se registran las redes a escanear.

**ARP** — la tabla del sistema que asocia cada IP con su MAC dentro de la red
local. No cruza routers — por eso un equipo "ruteado" llega sin MAC.

**Ping (ICMP)** — la pregunta más simple de la red: "¿estás ahí?". Mide si un
equipo responde y en cuánto tiempo.

**SSH / HTTPS / HTTP** — los medios por los que la app abre sesión en un
radio. SSH y HTTPS van **cifrados**; HTTP no, y la app lo marca en ámbar.

**SNMP** — un protocolo de consulta de identidad y estado. La app lo usa solo
si tú lo configuras, y únicamente en modo lectura.

**Half duplex** — un puerto Ethernet que solo puede hablar en un sentido a la
vez (lo normal es full duplex). Casi siempre delata un problema de cable o
conectores.

**Firmware** — el software interno del radio. Versiones distintas reportan
datos distintos; mantenerlo al día evita sorpresas.

**airOS** — el sistema de los radios Ubiquiti airMAX. Es lo que la app lee, no
la marca: lo que decide qué datos llegan es el firmware, no quién fabricó la
caja.

**RouterOS** — el sistema de MikroTik, que corre en **todo** su catálogo: desde
un router de escritorio hasta un sector de torre. Por eso saber que un equipo es
MikroTik no dice qué es — solo lo dice él al iniciar sesión.

**Chasis** — la caja física, cuando lleva más de un radio dentro. La app abre
**una sesión por chasis** y dibuja **una fila por radio**; lo que es del chasis
—CPU, memoria, puertos, modelo— se repite igual en todas sus filas.

**Uptime** — cuánto tiempo lleva un equipo encendido desde su último
reinicio.

## De SignalScope

**Proyecto (`.sscope`)** — el archivo que contiene tu red completa: equipos,
credenciales cifradas, líneas base, snapshots. Se autoguarda.

**Snapshot** — una captura del estado de toda la red en un momento dado.
Hasta 10 por proyecto.

**`.ssnap`** — un snapshot exportado para compartir: otro SignalScope lo abre
en modo visor, de solo lectura. Nunca lleva credenciales.

**Línea base** — la señal "sana" que tú fijas por antena con **Marcar**.
Con línea base, el eje de señal juzga cuánto bajó respecto a ella en vez del
valor absoluto: *Estable*, *Bajó vs base* o *Revisar enlace*.

**Detectados** — la cola de lo que encontró el escaneo y todavía no has
resuelto. Se vacía a medida que inicias sesión en cada equipo o lo llevas a
Referentes.

**Referentes** — la tabla de lo que no gestionas pero miras para contrastar:
el router del nodo, tu proveedor, un dominio como Google. Cada fila es un
**destino**, y puedes vigilar si responde. El detalle en
[Detectados y Referentes](./interfaz/detectados-y-otros).

**Ausente** — un equipo que perdió la sesión. Conserva su última lectura, y la
app lo sigue buscando y lo reconecta sola cuando vuelve o cuando lo encuentra
en otra IP. Su chip dice qué está pasando (*Buscándolo*, *Posible corte*,
*Bloqueado en el AP*…): ver
[Cuando un equipo se ausenta](./interfaz/estaciones#cuando-un-equipo-se-ausenta).

**Motivo de la ausencia** — la etiqueta que pones a un equipo ausente cuando
sabes por qué no está: *Suspendido*, *Técnico* o *De baja*. Es informativa y se
quita sola cuando el equipo vuelve.

**Log de sesión** — el registro, equipo por equipo, de qué intentó la app y
cómo terminó cada intento, con fecha y hora. Vive en la pestaña **Log** de la
ventana de sesión.

**Semáforo** — el color de cada estación (verde / ámbar / rojo): el peor eje
de su diagnóstico, con la señal como eje principal. El detalle en
[Semáforo y diagnóstico](./diagnostico).

**Centinela** — el sistema de alertas de las fallas que la señal no delata:
cable suelto, half duplex, AP caído. El detalle en
[Centinela y calificación](./centinela).

**Bandeja de avisos (la campana)** — la lista de lo que la app te avisó
**mientras trabajabas**, con su hora. Es lo contrario del centinela: aquello dice
qué está roto ahora y se resuelve solo; esto dice qué pasó y se lee una vez.

**Silenciar** — callar los avisos de **un** equipo por un plazo, sin dejar de
medirlo. Distinto de **apagar la sesión**, que sí deja de conectarse a él.

**Código de transferencia** — la llave (`XXXX-XXXX-XXXX`) que desbloquea un
proyecto en otra PC. El detalle en [Compartir](./compartir).

**HWID** — el identificador de tu equipo que usa la licencia para saber en
qué máquina está activa.
