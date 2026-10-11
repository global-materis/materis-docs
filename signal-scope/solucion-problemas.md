# Solución de problemas

Los tropiezos más comunes, agrupados por tema. Si el tuyo no está aquí,
escríbenos a **support@materis.io**.

## Escaneo y descubrimiento

::: details El escaneo no encuentra un equipo que sé que está en línea
Hay tres causas frecuentes. Revísalas en este orden:

1. Su red no está registrada, o su chip está apagado. El barrido solo recorre
   las máscaras encendidas del panel de escaneo.
2. El equipo bloquea el ping. Algunos equipos limitan o descartan ICMP; si
   conoces su IP, regístralo a mano con **Equipo (+)** en el riel inferior.
3. Está detrás de un router. El escaneo lo verá solo si su IP entra en una
   máscara registrada, y llegará sin MAC ("MAC no alcanzable").

Para las estaciones de un AP con sesión hay un atajo mejor: el **radar** de la
columna Estaciones le pregunta al propio AP y no depende del escaneo.
:::

::: details El escaneo falla con "Sin conexión de red"
La PC no tiene ninguna interfaz de red activa en ese momento (cable
desconectado, WiFi apagado, VPN caída). Reconecta y vuelve a escanear.
:::

::: details Un equipo dice "MAC no alcanzable"
Está en otro segmento, detrás de un router, y desde ahí el escaneo solo ve su
IP. No hace falta arreglar nada: al **iniciar sesión** el equipo se identifica
completo, MAC incluida.
:::

::: details Cambió la IP de un equipo
La app lo busca sola en la lista de estaciones de su AP, en la de los demás AP
y por ARP en la red de esta PC. Si lo encuentra, se reconecta en la IP nueva
sin perder nombre, línea base ni credenciales, porque la identidad de cada
equipo es su **MAC**. Un escaneo que lo vea en otra IP hace lo mismo. Cuando el
que cambió de IP es un AP, además te llega la notificación *"Un AP cambió de IP"*: en
un AP no es lo normal, y conviene revisar si su dirección debería ser fija.

Si no hay forma de encontrarlo, la app pausa la sesión y te pide la IP nueva:
el chip de Sesión se pone **violeta** y escribes la dirección en la pestaña
*Conexión* de su ventana de sesión. Ver
[Cuando la app necesita que intervengas](./interfaz/estaciones#cuando-la-app-necesita-que-intervengas).
:::

## Sesiones y monitoreo

::: details La sesión de un radio sale en ámbar con un candado abierto
Ese radio solo respondió por **HTTP sin cifrar**, así que usuario, contraseña
y métricas viajan legibles dentro de tu red. La app lo marca en vez de
ocultarlo para que decidas tú. La solución de fondo es habilitar HTTPS o SSH
en el equipo.
:::

::: details Uso una laptop por WiFi y las sesiones parpadean o las lecturas son irregulares
Todo lo que la app mide viaja por la conexión de tu propia PC. Si el WiFi de
la laptop pierde paquetes o se reasocia, las sesiones caen y los vigilados
salen "Sin respuesta". Son los mismos síntomas que daría un problema en la red
que monitoreas, pero el origen es tu conexión.

Mientras monitoreas, cablea la laptop a la red de gestión. Las métricas que
reportan los propios radios (señal, latencia del enlace) no se contaminan,
aunque llegar a leerlas sí depende de tu conexión.
:::

::: details Una estación aparece "Ausente" pero responde al ping
"Ausente" significa que se perdió la **sesión**, y el equipo puede seguir
ahí. La app distingue los dos casos por ti: a los ausentes les manda un ping
periódico, y el tooltip del chip dice cuál es. *"Esa IP responde al ping pero
rechaza la sesión"* es la firma de un radio **agotado**, sin CPU ni memoria
para abrir la sesión aunque siga contestando pings. *"Esa IP tampoco responde
al ping"* indica un equipo caído o sin ruta.

La reconexión se reintenta sola con las credenciales guardadas, y la pestaña
**Log** de su ventana de sesión registra cada intento. Los demás estados del
chip están en
[Cuando un equipo se ausenta](./interfaz/estaciones#cuando-un-equipo-se-ausenta).
:::

::: details Varios equipos salen ausentes a la vez y el chip dice "Sin red en esta PC"
La que perdió la red es tu PC, y tus equipos siguen como estaban. Recibes una
sola notificación, *"La PC perdió la red"*, en lugar de una por equipo, y la app no
busca a nadie hasta que la red vuelve. Al volver, los equipos se reconectan
solos.
:::

::: details Un equipo cae y vuelve una y otra vez
El chip lo marca como **Posible corte**, y el tooltip lo explica: *cae y vuelve
una y otra vez*. Suele ser un PPPoE que vuelve a marcar y es rechazado, como en
un corte por mora. El problema no está en el enlace.
:::

::: details Cambié un radio por otro y la app me pregunta si es un reemplazo
Pasa cuando el nuevo lleva el **mismo nombre** y contesta en la IP del
anterior. La app no lo da por hecho: pone los dos lado a lado y decides tú. Ver
[Posible reemplazo](./interfaz/estaciones#posible-reemplazo).
:::

::: details Las columnas Downlink/Uplink están vacías en algunos equipos
Es correcto. Los equipos con **airOS 6** no calculan esa estimación de
capacidad, y la app prefiere una celda vacía a un número que parece capacidad
sin serlo. Con Thr. TX/RX pasa lo mismo en la **primera lectura** de cada
sesión, porque todavía no hay contra qué comparar.
:::

::: details La latencia de la app no coincide con mi ping
Miden cosas distintas. La columna la mide **el radio sobre su tramo aéreo**.
Tu ping recorre además tu red local y todo el camino intermedio, y lo responde
la CPU del radio, que atiende el ICMP al final de su cola. Ninguno de los dos
está mal y no tienen por qué coincidir.

Para ver ambos lado a lado, enciende **"Ping desde SignalScope"** en
Preferencias → General → Sonda de red. La celda muestra entonces las dos
mediciones, y la diferencia entre ellas ya es un diagnóstico: el problema
puede estar en la red o en la CPU del equipo, fuera del enlace inalámbrico.
:::

::: details Escribí mal la contraseña y la app dejó de intentarlo
La app lo hace así para protegerte. **airOS 8.7.18 y posteriores cortan el
acceso 30 segundos tras varios intentos fallidos**, y un reintento cada pocos
segundos renovaría ese bloqueo antes de que venza: el radio quedaría cerrado
también para ti, incluso desde tu terminal. Por eso, ante un rechazo, la
sesión no insiste. El aviso repite lo que dijo el radio, con sus palabras, y
nombra las causas posibles: el usuario no existe en ese equipo, la contraseña
no es la suya o la cuenta es de solo lectura. Corrige el dato y vuelve a
iniciar sesión.

Si deja de valer la cuenta de un equipo que ya estaba registrado, la app busca
el equipo en otras IP antes de rendirse, porque puede que en su IP conteste
ahora otro equipo. Si lo encuentra, se reconecta solo. Si no, pausa la sesión
y te lo pide como **Cuenta rechazada**: corrige la cuenta o la IP en la
pestaña *Conexión*, o pulsa **Reintentar** cuando lo arregles en el equipo.
:::

::: details Tras actualizar veo un equipo repetido: una fila con sesión y otra ausente, con los mismos datos
Su sesión estaba guardada bajo una **MAC distinta de la que reporta el
equipo**. Cada fila se identifica por la MAC de su propio radio, así que la
diferencia queda a la vista, con un aviso en la celda de la MAC.

El arreglo son dos pasos, en este orden: **retira la fila ausente** y **vuelve
a iniciar sesión** en la que queda. Al final queda una sola fila.
:::

::: details Las alertas aparecen en el panel pero no llegan como notificación de Windows
Hay dos causas conocidas. En las versiones **anteriores a 1.2.3** instaladas
desde la Microsoft Store, Windows descartaba las notificaciones en silencio;
comprueba tu versión en **Novedades** y actualiza.

Con la versión al día, abre **Preferencias → Alertas** y revisa que
**"Notificaciones en Windows"** esté encendido y que el evento esté marcado en
*Qué sale al escritorio*. Si Windows tiene bloqueadas las notificaciones de
SignalScope, esa misma pantalla lo indica: se activan en Configuración →
Sistema → Notificaciones. Revisa también que Windows no esté en "No molestar".
:::

::: details Windows pide permiso de firewall al usar la prueba de velocidad
Es normal. El servidor de prueba de velocidad **abre un puerto de escucha** en
tu PC para que el radio se conecte a medir. Solo escucha mientras lo tengas
encendido, y deja de hacerlo al apagarlo o al cerrar la app.
:::

## La app: bandeja, arranque y actualizaciones

::: details Cerré la ventana y SignalScope sigue abierto
Con un proyecto abierto, la **X** esconde la ventana y deja la app en la
bandeja del sistema, junto al reloj, midiendo y avisando. La primera vez te lo
explica con la notificación **"SignalScope en segundo plano"**. Si pulsas
**"Entendido, dejarla vigilando"**, no vuelve a salir. **"Salir del todo"**
cierra la app sin dar la notificación por vista, así que la próxima X te lo vuelve a
explicar. Sin proyecto abierto, la X cierra la app.

Para cerrar SignalScope por completo tienes dos caminos: **Archivo → Salir de
SignalScope**, o clic derecho en su icono de la bandeja → **Salir de
SignalScope**. Si solo quieres dejar de vigilar sin cerrar la app, usa
**Archivo → Cerrar proyecto**.
:::

::: details El centinela no avisó de una caída de madrugada
Cerrar la ventana no detiene la vigilancia (ver la entrada anterior). Lo que sí
la detiene es salir con **Salir de SignalScope**, cerrar el proyecto o apagar
la PC.

Si quieres que vigile desde que enciendes la máquina, activa **"Iniciar con
Windows"** en Preferencias → General → Arranque. Añade SignalScope a las
aplicaciones de arranque de Windows, y la app arranca con el último proyecto
que dejaste abierto. Si lo apagaste desde Windows, solo puedes volver a
encenderlo desde Configuración → Aplicaciones → Inicio, y la casilla te lo
indica.

Aun así, SignalScope es un programa que corre en **tu** máquina, sin un
servicio 24/7 en ningún servidor.
:::

::: details No sé cómo actualizar la app
Cuando hay una versión nueva aparece un botón **Actualizar** en el pie de la
Bienvenida y en la barra del Monitor. Si no lo ves, no hay nada que
actualizar. Lo que pasa al pulsarlo depende de cómo instalaste la app:

- **Instalador descargado de la web.** El botón dice **"Actualizar a v…"** y
  abre una notificación con **Descargar v…**: el instalador se descarga en tu navegador y,
  al ejecutarlo, se reinstala sobre la versión actual (es normal que primero
  desinstale la anterior). Tus proyectos, tu licencia y tus datos se conservan.
  En el instalador, deja **sin marcar** "Eliminar los datos de aplicación".
- **Microsoft Store.** El botón dice **"Actualizar SignalScope"** y la
  actualización se instala desde la propia app con **Actualizar ahora**.
  SignalScope se cierra por completo mientras tanto, así que deja de monitorear
  y de enviarte notificaciones. Antes de empezar guarda el proyecto, y al
  volver a abrir la app retomas donde lo dejaste. Si falla, puedes pulsar
  **Reintentar** o terminarla con **Abrir en la Microsoft Store**.
:::

## Equipos MikroTik (RouterOS)

::: details Un solo MikroTik me dejó dos filas en las tablas
Es correcto. Una caja con **dos radios** (el de 2,4 GHz y el de 5 GHz) ocupa
**una fila por radio**, aunque sea un solo equipo con una sola sesión. Los
radios pueden estar en modos distintos, así que una fila puede caer en Puntos
de acceso y la otra en Estaciones.

Los datos del equipo (CPU, memoria, modelo, firmware, puertos) se repiten
iguales en las dos filas porque son una sola medida. Apagar, silenciar u
olvidar se aplica a **la caja entera**.
:::

::: details Mi MikroTik entra, pero varias columnas salen vacías
Latencia, Aire, Distancia, Sesiones, la señal remota y Downlink/Uplink **no
las publica RouterOS 6**, así que quedan vacías. No es un fallo de lectura. La
app prefiere una celda vacía a un número que parece una medición y no lo es.

La lista completa, con lo que sí llega, está en
[Equipos compatibles](./compatibilidad#que-ves-de-un-mikrotik-y-que-no).
:::

::: details No encuentro el botón de HTTP al conectar un MikroTik
Está deshabilitado a propósito. **RouterOS 6 no tiene API REST** (llegó en la
v7), y el `www` que ves abierto es WebFig, una interfaz para navegador que no
se puede consultar. Con RouterOS el transporte se fuerza a **SSH**.

Si cambiaste el puerto de SSH en el equipo, indícalo en el formulario: los
servicios de un RouterOS pueden estar en puertos movidos.
:::

::: details Mi MikroTik no sale en el Mapa y no encuentro dónde poner sus coordenadas
**RouterOS no permite escribirlas en el equipo**, porque su paquete GPS es de
solo lectura. Por eso, y solo para estos equipos, la app te deja **anotar la
posición a mano** desde el mapa. Ver
[Anotar la posición de un MikroTik](./interfaz/mapa#anotar-la-posicion-de-un-mikrotik).

En airMAX ese botón no existe a propósito: ahí las coordenadas se registran en
el propio radio, que es donde sirven a cualquier herramienta.
:::

::: details Inicié sesión en un MikroTik y me dijo que no tiene radio
Un router o un switch con RouterOS **sin módulo inalámbrico** no produce
ninguna fila de radio, porque no hay señal que medir. Llévalo a
**Referentes**, donde puedes vigilar si sigue respondiendo y recibir la alerta
del centinela si deja de hacerlo.
:::

## Licencia

::: details Al activar dice que el cupo de equipos está lleno
La licencia ya está activa en su máximo de máquinas. Libera el cupo desde la
PC vieja (vista **Licencia** → **"Liberar licencia de este equipo"**) y activa
en la nueva. Si esa PC ya no existe (formateo, falla de disco), escribe a
**support@materis.io** para liberarlo.
:::

::: details La activación se rechaza por el correo
La activación exige el correo del **titular** de la licencia, el mismo con el
que se compró. Verifica cuál usaste al adquirirla. Si necesitas cambiar el
correo titular, escríbenos.
:::

::: details ¿Qué pasa si me quedo sin internet un tiempo?
El día a día no necesita internet, y la app sigue funcionando con la última
validación guardada. Si pasa más de una semana sin poder consultar el servidor
de licencias, te avisa de que reconectes pronto para conservar la activación
de esta PC. Y si el servidor no responde, la app no te bloquea: "no pude
consultar" nunca se trata como "licencia rechazada".
:::

::: details Reinstalé la app y ya no aparece el botón de prueba
La prueba es **una por equipo**, y su contador corre desde el primer arranque
tras la primera instalación. Reinstalar o borrar los datos no la reinicia. Si
la probaste y te sirvió, el paso siguiente es la licencia Full.
:::

## Proyectos y Snapshots

::: details Abrí mi proyecto en otra PC y pide un código
Es el [código de transferencia](./compartir#compartir-el-proyecto-el-codigo-de-transferencia).
Las credenciales del proyecto están ancladas a la PC donde se creó. Consulta
el código en la PC original (**Compartir proyecto**) e ingrésalo una vez en la
nueva; esa máquina queda vinculada.
:::

::: details Protegí un Snapshot y quiero recuperar los datos recortados
No se puede. El recorte es **permanente** y está en el archivo mismo, que es
justamente lo que garantiza la protección. Por eso el modal de confirmación
ofrece crear antes una **copia sin proteger**, que queda en tu historial. Si
la creaste, ahí están los datos completos.
:::

::: details Quiero recuperar un equipo que mandé a Referentes por error
En la tabla **Referentes**, abre sus acciones con un clic en el chip de
Vigilancia y pulsa **Retirar del proyecto**. Luego vuelve a escanear: el
equipo reaparece en **Detectados** como si fuera nuevo, listo para iniciar
sesión.
:::

::: details ¿El mapa necesita una clave?
Las calles no la necesitan. Vienen de **OpenFreeMap**, que sirve sin clave,
sin registro y sin cuota.

Solo la **vista satelital** te pide algo: tu propia clave de Google en
Preferencias → Mapa. Ver
[Mapa base](./interfaz/mapa#satelite-con-tu-propia-clave-de-google).
:::

## Preguntas frecuentes

**¿SignalScope puede cambiar la configuración de mis radios?**
No. Es de solo lectura por diseño, y la app no tiene ninguna vía para
modificar un equipo.

**¿Funciona con radios que no sean Ubiquiti airMAX?**
Sí. La app gestiona también equipos **MikroTik con RouterOS**, **en beta**:
está probado en menos modelos, pero no es inestable. El detalle está en
[Equipos compatibles](./compatibilidad). Los demás equipos de tu red (ONUs,
switches, routers de cliente) pueden registrarse en **Referentes**, con nombre
y vigilancia de disponibilidad.

**¿Dan soporte a TP-Link?**
Todavía no; está en los planes. Mientras tanto, esos equipos pueden vivir en
**Referentes**, con nombre propio, vigilancia de disponibilidad y alerta del
centinela si dejan de responder.

**¿Y RouterOS 7?**
Sí, en la misma beta. Se verificó en dos hAP con **RouterOS 7.23** y la app
los lee igual que en la v6, por SSH. La excepción son los equipos con chips
ax: usan el paquete `wifi` nuevo y la app no ve sus radios. Si usas otro
modelo, cuéntanos cómo te fue.

**¿Soporta Ubiquiti LTU?**
Todavía no. LTU usa un firmware distinto de airOS, y la compatibilidad está en
evaluación.

**¿Necesito instalar Npcap o algún otro driver?**
No. El descubrimiento usa ping y la tabla ARP del sistema, y la app no instala
nada adicional.

**¿Mis datos van a alguna nube?**
No. Todo vive en tu equipo; el detalle está en
[Seguridad y privacidad](./seguridad-privacidad).

**¿La versión de prueba tiene funciones recortadas?**
No. Da acceso completo durante 30 días, y la única diferencia es la duración.

**¿Puedo usar mi licencia en más de una PC?**
Según el cupo de equipos de tu licencia, que ves en la vista Licencia. Para
mudarte de máquina, libera el cupo en la vieja y activa en la nueva.

**¿Qué pasa con mis proyectos si mi licencia vence?**
No se borra nada. La app vuelve a la pantalla de licencia y, al renovar o
activar, todo sigue donde estaba.

**¿Envía notificaciones por WhatsApp o correo?**
Por **WhatsApp y Telegram**, sí. Las alertas del centinela pueden llegarte al
teléfono, y eliges qué eventos y con qué urgencia
([cómo encenderlo](./centinela#notificaciones-al-telefono-whatsapp-o-telegram)). El
límite es que vigila **mientras la app corre en tu máquina**: cerrar la
ventana no la detiene, pero apagar la PC o salir con **Salir de SignalScope**
sí. Una vigilancia continua e independiente llegará con la futura **edición
para servidores** (Linux). Por correo no envía.

**¿Hay versión web?**
Para la app de escritorio no está en los planes. La futura edición para
servidores será una **aplicación web** y se administrará desde el navegador.

**¿Está disponible para Mac?**
Aún no. Hoy SignalScope es una app para **Windows 10/11**. La compatibilidad
con macOS está en los planes, sin fecha comprometida.

**Voy a formatear mi PC, ¿pierdo acceso a mis proyectos?**
No, si haces dos cosas **antes** de formatear:

1. **Anota el código de transferencia** de cada proyecto (**Compartir
   proyecto**). Al formatear, la llave que protege tus credenciales se pierde
   con Windows, y tu propia PC pasa a ser "una PC nueva" para el proyecto: al
   abrirlo te pedirá ese código una vez, y con él recuperas todo. **Sin el
   código, el archivo no se abre.** Esa es la protección que lo mantiene a
   salvo si cae en manos ajenas.
2. **Libera la licencia** (vista Licencia → "Liberar licencia de este equipo")
   para que el cupo no quede ocupado por la instalación vieja.

Además, el `.sscope` es un archivo: respáldalo en otro disco antes de
formatear, como harías con cualquier documento importante.
