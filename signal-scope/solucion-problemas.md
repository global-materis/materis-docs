# Solución de problemas

Los tropiezos más comunes, agrupados por tema. Si el tuyo no está aquí,
escríbenos a **support@materis.io**.

## Escaneo y descubrimiento

::: details El escaneo no encuentra un equipo que sé que está en línea
Tres causas frecuentes, en orden:

1. **Su red no está registrada o el chip está apagado** — el barrido solo
   recorre las máscaras encendidas del panel de escaneo.
2. **Bloquea el ping** — algunos equipos limitan o descartan ICMP. Si conoces
   su IP, regístralo a mano con **Equipo (+)** en el riel inferior.
3. **Está detrás de un router** — el escaneo lo verá solo si su IP entra en
   una máscara registrada, y llegará sin MAC ("MAC no alcanzable").

Para estaciones colgadas de un AP con sesión hay un atajo mejor: el **radar**
de la columna Estaciones le pregunta al propio AP y no depende del escaneo.
:::

::: details El escaneo falla con "Sin conexión de red"
La PC no tiene ninguna interfaz de red activa en ese momento (cable
desconectado, WiFi apagado, VPN caída). Reconecta y vuelve a escanear.
:::

::: details Un equipo dice "MAC no alcanzable"
Está en otro segmento, detrás de un router, y a esa distancia el escaneo solo
ve su IP. No es un problema: al **iniciar sesión** el equipo se identifica
completo, MAC incluida.
:::

::: details Cambió la IP de un equipo
La app lo busca sola: en la lista de estaciones de su AP, en la de los demás AP
y por ARP en la red de esta PC. Si lo encuentra, se reconecta en la IP nueva
sin perder nombre, línea base ni credenciales — la identidad de cada equipo es
su **MAC**. Un escaneo que lo vea en otra IP hace lo mismo.

Si no hay forma de encontrarlo, la app te pide la IP nueva: el chip de Sesión se
pone **violeta** y escribes la dirección en la pestaña *Conexión* de su ventana
de sesión. Ver [Cuando la app necesita que intervengas](./interfaz/estaciones#cuando-la-app-necesita-que-intervengas).
:::

## Sesiones y monitoreo

::: details La sesión de un radio sale en ámbar con un candado abierto
Ese radio solo respondió por **HTTP sin cifrar**: usuario, contraseña y
métricas viajan legibles dentro de tu red. La app lo marca en vez de
ocultarlo para que decidas — la salida de fondo es habilitar HTTPS o SSH en
el equipo.
:::

::: details Uso una laptop por WiFi y las sesiones parpadean o las lecturas son irregulares
Todo lo que la app mide viaja por la conexión de tu propia PC. Si el WiFi de
la laptop pierde paquetes o se reasocia, las sesiones caen y los vigilados
salen "Sin respuesta" — síntomas idénticos a un problema de la red que
monitoreas, pero cuyo origen es tu conexión.

**La recomendación es cablear la laptop** a la red de gestión mientras
monitoreas. Las métricas que reportan los propios radios (señal, latencia del
enlace) no se contaminan — pero llegar a leerlas depende de tu conexión.
:::

::: details Una estación aparece "Ausente" pero responde al ping
"Ausente" significa que la **sesión** se perdió, no necesariamente el equipo
— y la app hace esa distinción por ti: a los ausentes les manda un ping
periódico, y el tooltip del chip te dice cuál de los dos casos es. **"Responde
al ping pero rechaza la sesión"** es la firma de un radio **agotado** (sin CPU o
memoria para abrir la sesión, aunque siga contestando pings); **"tampoco
responde al ping"** es un equipo caído o sin ruta. La reconexión se reintenta
sola con las credenciales guardadas, y la pestaña **Log** de su ventana de
sesión cuenta cada intento. Los demás estados del chip están en
[Cuando un equipo se ausenta](./interfaz/estaciones#cuando-un-equipo-se-ausenta).
:::

::: details Varios equipos salen ausentes a la vez y el chip dice "Sin red en esta PC"
La que perdió la red es tu PC, no tus equipos. Recibes **un solo aviso**,
*"Esta PC perdió la red"*, en vez de uno por equipo, y la app no busca a nadie
hasta que la red vuelve. Al volver, los equipos se reconectan solos.
:::

::: details Un equipo cae y vuelve una y otra vez
El chip lo marca como **Posible corte** y el tooltip lo dice: *cae y vuelve una
y otra vez*. Suele ser un PPPoE que vuelve a marcar y es rechazado, como en un
corte por mora — el enlace no es el problema.
:::

::: details Cambié un radio por otro y la app me pregunta si es un reemplazo
Es lo esperado cuando el nuevo lleva el **mismo nombre** y contesta en la IP del
anterior: la app no lo asume, te los pone lado a lado y decides. Ver
[Posible reemplazo](./interfaz/estaciones#posible-reemplazo).
:::

::: details Las columnas Downlink/Uplink están vacías en algunos equipos
Es correcto: los equipos con **airOS 6** no calculan esa estimación de
capacidad, y la app prefiere una celda vacía a un número que parece capacidad
y no lo es. Lo mismo pasa con Thr. TX/RX en la **primera lectura** de cada
sesión: aún no hay contra qué comparar.
:::

::: details La latencia de la app no coincide con mi ping
Miden cosas distintas. La columna la mide **el radio sobre su tramo aéreo**;
tu ping recorre además tu red local y todo el camino intermedio, y lo
responde la CPU del radio, que atiende el ICMP al final. Ninguno está
"mal" — no tienen por qué coincidir. Si quieres ver ambos lado a lado,
enciende **"Medir también con ping propio"** (Preferencias → Sonda de red):
la celda muestra las dos mediciones, y el contraste es diagnóstico.
:::

::: details El centinela no avisó de una caída de madrugada
**Cerrar la ventana no detiene la vigilancia**: la app se queda junto al reloj
y sigue midiendo. Lo que sí la detiene es **"Salir"** en el
menú de su icono, o apagar la PC.

Si quieres que esté vigilando desde que enciendes la máquina, activa
**Preferencias → General → "Iniciar con Windows"**: la app se abre sola y
aterriza en el Monitor del proyecto que estaba vigilando.

Aun así, sigue siendo un programa en **tu** máquina, no un servicio 24/7 en el
servidor de alguien.
:::

::: details Tras actualizar veo un equipo repetido: una fila con sesión y otra ausente, con los mismos datos
Su sesión estaba guardada bajo una **MAC distinta de la que el equipo reporta**.
Cada fila se identifica por la MAC de **su propio radio**, y la diferencia queda
a la vista — con un aviso en la celda de la MAC.

El arreglo son dos gestos, y el orden importa: **retira la fila ausente** y
**vuelve a iniciar sesión** en la que queda. Se queda una sola.
:::

::: details Escribí mal la contraseña y la app dejó de intentarlo
Es lo correcto, y te protege: insistir hace que el propio equipo cierre el
acceso —**airOS lo bloquea medio minuto tras varios intentos fallidos**— y acaba
dejándote fuera también a ti, hasta con tu terminal. El aviso te repite lo que
dijo el radio, con sus palabras. Corrige el dato y vuelve a conectar.

Si la cuenta de un equipo que ya estaba registrado deja de valer, la app pausa
su sesión y te lo pide como **Cuenta rechazada**: corrígela en la pestaña
*Conexión* o pulsa **Reintentar** cuando la arregles en el equipo.
:::

::: details Las alertas aparecen en el panel pero no llegan como notificación de Windows
Dos causas conocidas: en versiones **anteriores a 1.2.3** instaladas desde la
Microsoft Store, Windows descartaba las notificaciones en silencio — la Store
actualiza sola, verifica tu versión en **Novedades**. Y si la versión está al
día, revisa que el evento esté encendido en **Preferencias → Alertas** y que
Windows no esté en "No molestar".
:::

::: details Windows pide permiso de firewall al usar la prueba de velocidad
Es normal: el servidor de prueba de velocidad **abre un puerto de escucha**
en tu PC para que el radio se conecte a medir. Solo escucha mientras lo
tengas encendido y deja de hacerlo al apagarlo o cerrar la app.
:::

## Equipos MikroTik (RouterOS)

::: details Un solo MikroTik me dejó dos filas en las tablas
Es correcto: una caja con **dos radios** —el de 2,4 GHz y el de 5 GHz— ocupa
**una fila por radio**, aunque sea un solo equipo y una sola sesión. Pueden
estar en modos distintos, así que una puede caer en Puntos de acceso y la otra
en Estaciones.

Lo que es del equipo —CPU, memoria, modelo, firmware, puertos— se repite igual
en las dos: **no son dos medidas, es una**. Y apagar, silenciar u olvidar se
lleva **la caja entera**.
:::

::: details Mi MikroTik entra, pero varias columnas salen vacías
Latencia, Aire, Distancia, Sesiones, la señal remota y Downlink/Uplink **no las
publica RouterOS 6**, así que quedan vacías. No es un fallo de lectura: una celda
vacía dice la verdad, y un número que parece una medición sin serlo, no.

La lista completa —y lo que sí llega— está en
[Equipos compatibles](./compatibilidad#que-ves-de-un-mikrotik-y-que-no).
:::

::: details No encuentro el botón de HTTP al conectar un MikroTik
Está deshabilitado a propósito. **RouterOS 6 no tiene API REST** —eso llegó en
la v7— y el `www` que se ve abierto es WebFig, una interfaz para navegador, no
algo consultable. Con RouterOS el transporte se fuerza a **SSH**.

Si cambiaste el puerto de SSH en el equipo, indícalo en el formulario: los
servicios de un RouterOS pueden estar en puertos movidos.
:::

::: details Mi MikroTik no sale en el Mapa y no encuentro dónde poner sus coordenadas
**RouterOS no permite escribirlas en el equipo**: su paquete GPS es de solo
lectura. Por eso, y solo para estos equipos, la app te deja **anotar la posición
a mano** desde el mapa — ver
[Anotar la posición de un MikroTik](./interfaz/mapa#anotar-la-posicion-de-un-mikrotik).

En airMAX ese botón no existe a propósito: ahí las coordenadas se registran en
el propio radio, que es donde valen para cualquier herramienta.
:::

::: details Inicié sesión en un MikroTik y me dijo que no tiene radio
Un router o un switch con RouterOS **sin módulo inalámbrico** no produce ninguna
fila de radio: no hay señal que medir. Llévalo a **Referentes**, donde tiene su
vigilancia de "¿sigue vivo?" y su alerta del centinela si deja de responder.
:::

## Licencia

::: details Al activar dice que el cupo de equipos está lleno
La licencia ya está activa en su máximo de máquinas. Libera el cupo desde la
PC vieja (**vista Licencia → "Liberar licencia"**) y activa en la nueva. Si
esa PC ya no existe (formateo, falla de disco), escribe a
**support@materis.io** para liberarlo.
:::

::: details La activación se rechaza por el correo
La activación exige el correo del **titular** de la licencia — el mismo con
el que se compró. Verifica cuál usaste al adquirirla; si necesitas cambiar el
correo titular, escríbenos.
:::

::: details ¿Qué pasa si me quedo sin internet un tiempo?
Nada, dentro de un margen: el día a día no necesita internet y la licencia
tolera hasta **30 días sin revalidar**. Pasado ese margen la app pedirá
conexión para continuar. Y si el servidor no responde, la app no te bloquea:
"no pude consultar" nunca se trata como "licencia rechazada".
:::

::: details Reinstalé la app y ya no aparece el botón de prueba
La prueba es **una por equipo** y su contador corre desde el primer arranque
tras la primera instalación — reinstalar o borrar los datos no la reinicia.
Si la probaste y te sirvió, el paso siguiente es la licencia Full.
:::

## Proyectos y snapshots

::: details Abrí mi proyecto en otra PC y pide un código
Es el [código de transferencia](./compartir#compartir-el-proyecto-el-codigo-de-transferencia):
las credenciales del proyecto están ancladas a la PC donde se creó.
Consúltalo en la PC original (**Compartir proyecto**), ingrésalo una vez en
la nueva y esa máquina queda vinculada.
:::

::: details Protegí un snapshot y quiero recuperar los datos recortados
No es posible: el recorte es **permanente**, en el archivo mismo — esa es
justamente la garantía de la protección. Por eso el modal de confirmación
ofrece crear antes una **copia sin proteger**, que queda en tu historial. Si
la creaste, ahí están los datos completos.
:::

::: details Quiero recuperar un equipo que mandé a Referentes por error
En la tabla **Referentes**, abre sus acciones (clic en el chip de Vigilancia) y pulsa
**Retirar del proyecto**; luego vuelve a escanear. El equipo reaparece en
**Detectados** como si fuera nuevo, listo para iniciar sesión.
:::

::: details ¿El mapa necesita una clave?
No para las calles: vienen de **OpenFreeMap**, que sirve sin clave, sin registro
y sin cuota.

La **vista satelital** es la única parte que te pide algo: tu propia clave de
Google en Preferencias — ver
[Mapa base](./interfaz/mapa#satelite-con-tu-propia-clave-de-google).
:::

## Preguntas frecuentes

**¿SignalScope puede cambiar la configuración de mis radios?**
No. Es de solo lectura por diseño: no existe en la app ninguna vía para
modificar un equipo.

**¿Funciona con radios que no sean Ubiquiti airMAX?**
Sí: la app gestiona también equipos **MikroTik con RouterOS**,
**en beta** — probado en menos modelos, no inestable. El detalle está en
[Equipos compatibles](./compatibilidad). Los demás equipos de tu red (ONUs,
switches, routers de cliente) pueden registrarse en **Referentes**, con nombre y
vigilancia de disponibilidad.

**¿Dan soporte a TP-Link?**
Todavía no; está en los planes. Mientras tanto, esos equipos pueden vivir en
**Referentes** — con nombre propio, vigilancia de disponibilidad y alerta del
centinela si dejan de responder.

**¿Y RouterOS 7?**
Sin verificar. El soporte se levantó y se probó contra **RouterOS 6**; la v7
cambia bastante —tiene API REST, campos nuevos— y no la damos por buena hasta
probarla. Si la usas, cuéntanos cómo te fue.

**¿Soporta Ubiquiti LTU?**
Todavía no — LTU usa un firmware distinto de airOS y la compatibilidad está
en evaluación.

**¿Necesito instalar Npcap o algún otro driver?**
No. El descubrimiento usa ping y la tabla ARP del sistema; la app no instala
nada adicional.

**¿Mis datos van a alguna nube?**
No. Todo vive en tu equipo — el detalle está en
[Seguridad y privacidad](./seguridad-privacidad).

**¿La versión de prueba tiene funciones recortadas?**
No: acceso completo durante 30 días. La única diferencia es la duración.

**¿Puedo usar mi licencia en más de una PC?**
Según el cupo de equipos de tu licencia (visible en la vista Licencia). Para
mudarte de máquina, libera el cupo en la vieja y activa en la nueva.

**¿Qué pasa con mis proyectos si mi licencia vence?**
Nada se borra. La app vuelve a la pantalla de licencia y, al renovar o
activar, todo sigue donde estaba.

**¿Envía notificaciones por WhatsApp o correo?**
**Por WhatsApp y Telegram, sí** — las alertas del centinela pueden llegarte
al teléfono, eligiendo qué eventos y con qué urgencia
([cómo encenderlo](./centinela#avisos-al-telefono-whatsapp-o-telegram)). El
límite honesto: vigila **mientras la app corre en tu máquina** — cerrar la
ventana no la detiene, pero apagar la PC o salir desde el icono, sí. Esa
vigilancia continua e independiente vendrá con la futura **edición para
servidores** (Linux). Correo no envía.

**¿Hay versión web?**
Para la app de escritorio no está en los planes. La futura edición para
servidores será una **aplicación web** por naturaleza — se administrará desde
el navegador.

**¿Está disponible para Mac?**
Aún no — hoy SignalScope es una app para **Windows 10/11**. La compatibilidad
con macOS está en los planes, sin fecha comprometida.

**Voy a formatear mi PC, ¿pierdo acceso a mis proyectos?**
No, si haces dos cosas **antes** de formatear:

1. **Anota el código de transferencia** de cada proyecto (**Compartir
   proyecto**). Al formatear, la llave que protege tus credenciales se pierde
   con Windows, así que tu propia PC pasa a ser "una PC nueva" para el
   proyecto: al abrirlo te pedirá ese código una vez, y con él recuperas todo.
   **Sin el código, el archivo no se abre** — ese es justamente el blindaje
   que lo protege si cae en manos ajenas.
2. **Libera la licencia** (vista Licencia → "Liberar licencia") para que el
   cupo no quede ocupado por la instalación vieja.

Y lo de siempre: el `.sscope` es un archivo — respáldalo en otro disco antes
de formatear, como harías con cualquier documento importante.
