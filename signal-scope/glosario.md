# Glosario

Los términos que usa esta documentación, en lenguaje llano. Van agrupados por
tema y no por orden alfabético, para que los relacionados queden juntos.

## La red inalámbrica

**WISP** (*Wireless Internet Service Provider*): proveedor de internet
inalámbrico. Es el tipo de operador para el que existe SignalScope.

**AP (Punto de acceso)**: la antena **base**, normalmente en una torre o nodo,
que da servicio a varios clientes a la vez. En la documentación también se le
llama "estación base".

**Estación (CPE)**: el radio del lado del **cliente**, que apunta hacia un AP
y se conecta a él. Cada cliente tiene la suya.

**Enlace**: la conexión inalámbrica entre una estación y su AP. Cuando la
documentación dice "el enlace se degradó", habla de ese tramo aéreo.

**Sector**: un AP y todas las estaciones que cuelgan de él. Un problema "del
sector" afecta a todos esos clientes a la vez.

**SSID**: el nombre de red que difunde un AP y con el que las estaciones lo
encuentran.

**Frecuencia / canal**: la porción del espectro en la que transmite un AP. Dos
AP cercanos en canales solapados se interfieren entre sí.

**Modulación**: la "velocidad de habla" que negocian radio y AP (`6x`, `8x`…).
Una modulación más alta da más capacidad, pero exige mejor señal. Un enlace
con señal pobre baja la modulación, y por eso entrega menos de lo esperado.
**Se negocia por separado en cada dirección** y la app muestra las dos
(`8x/1x`), porque un radio puede recibir perfecto y transmitir muy mal.

**Airtime (aire ocupado)**: el porcentaje del tiempo que el canal está en uso.
Con el aire al 70 % o más, el canal está saturado y los clientes esperan turno
para transmitir.

## La señal

**dBm**: la unidad de potencia de la señal. Es **negativa**, y cuanto más
cerca de cero, más fuerte: −55 dBm es mejor señal que −70 dBm. Es el dato
central de SignalScope.

**Ruido (piso de ruido)**: la energía de fondo que hay en el canal aunque
nadie transmita. Se mide en dBm, y un piso alto "tapa" la señal útil.

**SNR** (*Signal-to-Noise Ratio*): el margen entre tu señal y el piso de
ruido, en dB. Más alto es mejor. Con poco margen, el radio no distingue la
señal del ruido.

**CINR**: como el SNR, pero descuenta además la **interferencia de otros
transmisores** en el canal. Por eso puede detectar un canal sucio aunque la
señal "se vea bien".

**Cadenas (polaridades)**: las dos vías de una antena moderna (horizontal y
vertical), que deberían recibir casi lo mismo. Un desbalance grande delata una
antena rotada o dañada.

**Calidad de enlace (linkscore)**: el indicador de airMAX, de 0 a 100 %, de qué tan
sano está el enlace, más allá de la señal.

**CCQ**: el indicador equivalente de RouterOS, también de 0 a 100 %. **No es el mismo
número** que el linkscore de airMAX porque se calcula distinto, así que la app
lo etiqueta y **no lo colorea** hasta tener umbrales medidos en campo.

**Latencia**: el tiempo de ida y vuelta de los datos, en milisegundos (ms).
Con latencia alta el servicio se siente "lento" aunque la velocidad contratada
esté ahí.

**Throughput**: el tráfico que cursa el enlace **en este momento**, es decir,
lo que el cliente está consumiendo. La capacidad, en cambio, es lo que el
enlace podría cursar.

## La red y los protocolos

**IP**: la dirección de un equipo en la red. **Puede cambiar**, y por eso
SignalScope no identifica los equipos por su IP.

**MAC**: la identidad física de fábrica de cada equipo de red, que **no
cambia**. SignalScope reconoce a cada equipo por su MAC aunque cambie su IP.

**OUI (fabricante)**: los primeros pares de la MAC, asignados por fabricante.
Con ellos la app sugiere qué es un equipo recién detectado.

**CIDR (máscara)**: la notación de un rango de red. `192.168.1.0/24` son las
256 direcciones de esa red. Así se registran las redes a escanear.

**ARP**: la tabla del sistema que asocia cada IP con su MAC dentro de la red
local. No cruza routers, y por eso un equipo "ruteado" llega sin MAC.

**Ping (ICMP)**: la pregunta más simple de la red, "¿estás ahí?". Mide si un
equipo responde y en cuánto tiempo.

**SSH / HTTPS / HTTP**: los medios por los que la app abre sesión en un radio.
SSH y HTTPS van **cifrados**. HTTP no, y la app lo marca en ámbar. Con RouterOS
solo está disponible SSH.

**SNMP**: un protocolo de consulta de identidad y estado. La app lo usa solo
si tú lo configuras, y únicamente en modo lectura.

**Half duplex**: un puerto Ethernet que solo puede hablar en un sentido a la
vez (lo normal es full duplex). Casi siempre delata un problema de cable o de
conectores.

**Firmware**: el software interno del radio. Versiones distintas reportan
datos distintos, y mantenerlo al día evita sorpresas.

**airOS**: el sistema de los radios Ubiquiti airMAX. La app lee el sistema, y
es el firmware, más que el fabricante de la caja, lo que decide qué datos
llegan.

**RouterOS**: el sistema de MikroTik, que corre en **todo** su catálogo, desde
un router de escritorio hasta un sector de torre. Saber que un equipo es
MikroTik no dice qué es: eso lo dice el propio equipo al iniciar sesión.

**WebFig**: la interfaz web de MikroTik, pensada para usarse desde el
navegador. Es lo que responde en el puerto web de un RouterOS, y la app no la
usa para leer el equipo.

**Wi-Fi 6 (ax) y el paquete `wifi`**: los MikroTik Wi-Fi 6 usan el paquete
`wifi` de RouterOS 7, distinto del inalámbrico clásico. La app **todavía no lee
sus radios**. El detalle está en [Equipos compatibles](./compatibilidad).

**Chasis**: la caja física, cuando lleva más de un radio dentro. La app abre
**una sesión por chasis** y dibuja **una fila por radio**. Los datos del
chasis (CPU, memoria, puertos, modelo) se repiten iguales en todas sus filas.

**Uptime**: cuánto tiempo lleva un equipo encendido desde su último reinicio.

## De SignalScope

**Proyecto (`.sscope`)**: el archivo que contiene tu red completa: equipos,
credenciales cifradas, líneas base y Snapshots. Se guarda solo.

**Snapshot**: el estado de toda la red guardado en un momento dado, para
consultarlo o compararlo después. Caben hasta 20 por proyecto.

**`.ssnap`**: un Snapshot exportado para compartir. Otro SignalScope lo abre
en modo visor, de solo lectura, y nunca lleva credenciales.

**Línea base**: la señal "sana" que fijas por antena con **Marcar**. Con línea
base, el eje de señal juzga cuánto bajó respecto a ella en lugar del valor
absoluto, y el chip dice *Estable*, *Bajó vs base* o *Revisar enlace*.

**Detectados**: la cola de lo que encontró el escaneo y todavía no has
resuelto. Se vacía a medida que inicias sesión en cada equipo, lo llevas a
Referentes o lo retiras.

**Referentes**: la tabla de lo que no gestionas pero miras para contrastar,
como el router del nodo, tu proveedor o un dominio web. Cada fila es
un **destino**, y puedes vigilar si responde. El detalle está en
[Detectados y Referentes](./interfaz/detectados-y-otros).

**Ausente**: un equipo que perdió la sesión. Conserva su última lectura, y la
app lo sigue buscando y lo reconecta sola cuando vuelve o cuando lo encuentra
en otra IP. Su chip dice qué está pasando (*Buscándolo*, *Posible corte*,
*Bloqueado en el AP*…). Ver
[Cuando un equipo se ausenta](./interfaz/estaciones#cuando-un-equipo-se-ausenta).

**Motivo de la ausencia**: la etiqueta que pones a un equipo ausente cuando
sabes por qué no está: *Suspendido*, *Técnico* o *De baja*. Es informativa y
se quita sola cuando el equipo vuelve.

**Requiere tu intervención**: el estado de una sesión que la app no puede
resolver sola (IP desconocida, cuenta rechazada o posible reemplazo). La app
la pausa, pinta el chip de Sesión en violeta y te pide lo que necesita. Ver
[Cuando la app necesita que intervengas](./interfaz/estaciones#cuando-la-app-necesita-que-intervengas).

**Posible reemplazo**: el caso en que, en la IP de un equipo registrado,
contesta otro equipo con su mismo nombre. La app pone los dos lado a lado y
decides si el nuevo hereda el puesto del anterior.

**Log de sesión**: el registro, equipo por equipo, de lo que intentó la app y
de cómo terminó cada intento, con fecha y hora. Está en la pestaña **Log** de
la ventana de sesión.

**Semáforo**: el color de cada estación (verde, ámbar o rojo). Es el peor eje
de su diagnóstico, con la señal como eje principal. El detalle está en
[Semáforo y diagnóstico](./diagnostico).

**Centinela**: el sistema de alertas para las fallas que la señal no delata,
como un cable suelto, un puerto en half duplex o un AP caído. El detalle está
en [Centinela y calificación](./centinela).

**Bandeja de avisos (la campana)**: la lista de lo que la app te avisó
**mientras trabajabas**, con su hora. Se diferencia del centinela en que el
centinela dice qué está roto ahora y se resuelve solo, mientras que la
campana dice qué pasó y se lee una vez.

**Avisar la reconexión**: la marca que pones a un equipo para que la app te
avise cuando vuelva a conectarse, **Una vez** o **Siempre**.

**Silenciar**: callar los avisos de **un** equipo durante un plazo sin dejar
de medirlo.

**Apagar sesión**: dejar de conectarse a un equipo. Conserva su registro y lo
excluye del diagnóstico hasta que vuelvas a encender la sesión.

**Segundo plano**: el modo en que queda SignalScope cuando cierras la ventana
con un proyecto abierto. La app sigue en la bandeja del sistema, midiendo y
avisando. Para cerrarla del todo se usa **Archivo → Salir de SignalScope** o
el clic derecho en su icono de la bandeja.

**Ping desde SignalScope**: la medición opcional de latencia que hace la
propia app contra cada estación, además de la que reporta el radio. Se
enciende en Preferencias → General → Sonda de red y sirve para detectar
problemas que están en la red o en la CPU del equipo, fuera del enlace
inalámbrico.

**Modos de cobertura**: las tres formas de dibujar los sectores en el Mapa.
**Huella** funde todos en una sola superficie, **Foco** pinta entero solo el
AP que miras y **Detalle** muestra cada sector con su banda.

**Código de transferencia**: la llave (`XXXX-XXXX-XXXX`) que desbloquea un
proyecto en otra computadora. El detalle está en [Compartir](./compartir).

## La licencia

**Versión de prueba**: 30 días con todas las funciones, sin correo ni
registro. Hay una por equipo, y reinstalar no la reinicia.

**Licencia Full**: la licencia anual de pago, con tu correo y tu clave. Se
compra en [sscope.materis.io](https://sscope.materis.io/es#licencia) y ocupa un
cupo por máquina.

**Panel de cliente**: [panel.materis.io](https://panel.materis.io/), donde ves
tus compras y vencimientos, renuevas y añades máquinas a tu licencia.

**HWID**: el identificador de tu equipo que usa la licencia para saber en qué
máquina está activa.
