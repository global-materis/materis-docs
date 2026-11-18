# Centinela y calificación de la red

Dos herramientas trabajan sobre el mismo diagnóstico. El **centinela** avisa
de las fallas que la señal no delata mientras trabajas en otra cosa, y la
**calificación** resume el estado del parque en una nota.

## El centinela de servicio

Un enlace puede verse perfecto (señal excelente, calidad 100 %) y el cliente
estar **sin servicio**, porque un cable LAN suelto no toca la señal. La app
está centrada en la señal, y el centinela existe para vigilar justo las fallas
que **no se ven en el semáforo**.

Vive en el **latido** de la esquina derecha de la barra, en el mismo sitio en
el Monitor y en el Mapa. Su número dice **cuántos equipos están rotos ahora**.

### Qué vigila

Quince eventos con diez interruptores. Cinco eventos no tienen interruptor
propio y heredan el de su pareja, porque son la misma vigilancia contada de
otra forma:

| Notificación | Qué detecta |
|---|---|
| **Nodo caído** | Caen a la vez todos los AP de un nodo del Mapa, y son al menos dos. Se avisa **una vez por el nodo**, con cuántos equipos quedaron sin servicio, en lugar de una alerta por cada AP. *(Hereda el interruptor de "Sesión caída".)* |
| **Punto de acceso caído** | Un AP que estaba en línea deja de responder. Se avisa **una vez por el nodo**, con cuántas estaciones arrastra, en lugar de una alerta por cada cliente. *(Hereda el interruptor de "Sesión caída".)* |
| **AP sin estaciones** | El AP sigue respondiendo, pero se quedó sin ninguna de sus estaciones durante más de dos minutos. Solo avisa de un AP que tuvo al menos dos. Un cambio de canal por DFS vacía el sector un minuto y no llega a avisar. *(Hereda el interruptor de "Sesión caída".)* |
| **Referentes sin respuesta** | Un destino de [Referentes](./interfaz/detectados-y-otros#referentes-lo-que-miras-para-contrastar) con la vigilancia encendida dejó de responder al ping. Avisa tras dos comprobaciones fallidas seguidas, y nunca de uno que no haya respondido nunca. |
| **La IP de un equipo vigilado la ocupa otro** | Esa IP responde, pero detrás hay otra MAC. *(Hereda el interruptor de "Referentes sin respuesta".)* |
| **Sesión caída** | Una estación que estaba en línea deja de responder. Lo que nunca llegó a conectar no se avisa. |
| **Sesión inestable** | La sesión de una estación o de un AP se corta y vuelve **tres veces en diez minutos**. Un corte suelto no avisa; la repetición sí. |
| **Sin cable LAN** | Un puerto vigilado quedó sin cable: el enlace por aire se ve bien, pero el servicio no sale por ahí. |
| **LAN a 10 Mbps** | Un puerto vigilado negocia a 10 Mbps: cable dañado, humedad en el conector o PoE flojo. Ningún airMAX trae ese máximo de fábrica. **También en los AP**, donde el puerto de subida estrangula al sector entero. |
| **LAN en half duplex** | Un puerto vigilado negoció mal y el servicio sale degradado sin que la señal lo muestre. También en los AP. |
| **Antena desalineada** | Desbalance entre las dos polaridades desde **6 dB**, el límite que recomienda el propio Ubiquiti. Apunta a un problema de apunte o de polarización. |
| **AP desalineada** | **Todas** las estaciones conectadas de un AP (al menos tres) salen fuera de lo que su distancia o su línea base permiten. Una AP desalineada baja la señal de todos sus clientes, así que basta una estación en su sitio para descartarla. Se avisa **una vez por el AP**. |
| **Radio saturado** | CPU al 95 % o memoria disponible por debajo del 5 %: el radio tira paquetes con la señal intacta. Vale para estaciones y AP. |
| **Sector con latencia alta** | La mayoría de las estaciones en línea de un mismo AP (al menos tres, y la mitad o más) responden con retraso a la vez. Se avisa una vez por el nodo y sus estaciones no avisan una a una. *(Hereda el interruptor de "Latencia alta".)* |
| **Latencia alta** · **BETA** | Un cliente con la señal impecable que aun así responde con retraso **sostenido**. |

Las notificaciones se apilan **por gravedad**. Primero va lo que deja una celda entera
sin servicio, luego lo que afecta a un cliente, después lo que lo degrada y al
final lo que anticipa un problema.

Qué puertos vigila el centinela en cada equipo se elige en la pestaña
[Puertos](./interfaz/estaciones#puertos-que-vigila-el-centinela) de su ventana
de sesión. La app lee todos los puertos del equipo; si no eliges, vigila el
primero, que en un airMAX es el único. Aunque fallen dos puertos vigilados, la
notificación es una por equipo y nombra el puerto afectado.

### Qué NO vigila, a propósito

Señal, ruido, calidad de enlace, capacidad y tráfico quedan **fuera** porque
varían con la lluvia, el viento y lo que el cliente esté descargando. Si
entraran, el panel se llenaría todos los días y en un mes nadie lo abriría. El
centinela solo admite condiciones que fallan en binario y que una red sana no
produce. La latencia es la única excepción, medida y filtrada.

### Cómo se comporta

- **Confirma antes de avisar.** Una condición debe sostenerse 10 segundos
  (90 en la antena y la AP desalineadas y en la latencia, y dos minutos en el
  AP sin estaciones), así que un puerto que
  parpadea durante un reinicio no genera una visita.
- **Una alerta por equipo y condición** mientras dure. Al resolverse queda
  marcada como **"Resuelto"** y se retira sola a los diez minutos. Resolver
  exige **medir**: si lo que se cayó fue la sesión, la avería no se da por
  resuelta. Queda como **"Sin medir"** y vuelve a avisar en cuanto el equipo
  responde.
- **No repite lo que ya dijo.** Tras resolverse, la antena y la AP
  desalineadas no vuelven a avisar del mismo equipo en 12 horas, y la latencia en una hora,
  salvo que el valor haya empeorado.
- **Avisa de la causa y no de la consecuencia.** Si cae un AP, se avisa del AP
  y **se callan** sus estaciones, para que un nodo caído no entierre el panel
  bajo cincuenta notificaciones.
- **La ausencia de dato nunca es falla.** Si un firmware no reporta el puerto,
  ese eje no se evalúa para ese equipo. Es lo que pasa con varias métricas en
  RouterOS.
- **Congelar las tablas no lo detiene**, porque el centinela vigila el
  monitoreo de fondo y no lo que está pintado en pantalla.
- **No depende de qué pantalla mires.** Con el proyecto abierto vigila desde
  el Monitor, desde el Mapa, desde la pantalla de inicio y con la ventana
  escondida en la bandeja. La pantalla de inicio lo indica con el estado
  **"Vigilando"**.

### El panel, y lo que puedes filtrar en él

Cada tarjeta de alerta es un **botón que lleva al equipo**, y limpia el filtro
de estado para que no aterrices en una tabla vacía. Con más de seis alertas
aparece un **buscador** por nombre, IP o MAC, y con dos tipos de evento o más,
**chips por tipo** para ocultar o mostrar cada uno.

Los dos filtros son **de sesión y no se guardan**. Sirven para investigar y no
son una preferencia: si sobrevivieran al reinicio, podrías abrir el panel
mañana con un filtro puesto y creer que no hay fallas. Cuando algo queda
oculto, el propio panel lo dice: *"{n} ocultas por el filtro — mostrar
todo"*.

El **contador de la barra sigue contando todas las alertas**, porque refleja
el estado de la red y no lo que muestra el filtro. Un filtro no puede bajar el
número que dice cuántos clientes están caídos.

### Los chips de cada tabla

En el Monitor, cada tabla tiene encima una fila de chips con los avisos del
centinela que aplican a ese tipo de equipo, y cuántas filas tiene cada uno.
La tabla de Estaciones no muestra los avisos de AP, y al revés.

- **Pulsa un chip** para ver solo las filas con ese aviso. Con varios chips
  elegidos, ves las que tengan cualquiera de ellos. **Limpiar** quita la
  selección.
- Los chips están siempre a la vista, para que la tabla no salte. Uno sin
  filas queda apagado.
- Los chips solo filtran: el color de cada fila sigue siendo el del semáforo.

Al final de la fila está **Ocultar apagadas**, con el número de sesiones
apagadas de esa tabla. Esconde las filas con la [sesión
apagada](#apagar-la-sesion-de-un-equipo), y vale solo para esa tabla: puedes
ocultarlas en Estaciones y verlas en Puntos de acceso. Viene apagado, y la app
recuerda cómo lo dejaste en cada tabla.

En un Snapshot no hay chips ni interruptor, porque la captura muestra lo que
había.

## Lo que decides por equipo

Hay tres decisiones que se toman en la **ventana de sesión** de un radio
(pestaña *Acciones*) o en las **acciones** de un destino de Referentes. Están
ordenadas de la más reversible a la que no lo es, para que el dedo no llegue
al rojo por inercia.

Con el equipo ausente, la misma pestaña ofrece además el
[motivo de la ausencia](./interfaz/estaciones#motivo-de-la-ausencia)
(Suspendido, Técnico, De baja), una etiqueta informativa que se quita sola
cuando el equipo vuelve.

### Silenciar notificaciones

Un equipo con una avería **que ya conoces** (una obra de tres días, un cliente
que no paga, una antena que cambias el jueves) llena el panel de notificaciones que ya
no informan de nada y tapan los que sí.

**Silenciar no es dejar de vigilar.** El equipo se sigue conectando y el
centinela lo sigue midiendo. Lo único que se calla es la **salida**: el panel,
la notificación de Windows y tu mensajería, los tres a la vez.

- **El plazo es la decisión**, así que en lugar de un botón hay una fila de
  plazos: **1 hora · 8 horas · 1 día · 3 días · 1 semana · Sin
  vencimiento**. Una semana es el tope con fecha. Más allá, el plazo se parece
  tanto a "para siempre" que conviene decirlo con esas palabras, y por eso el
  permanente **hay que pedirlo por su nombre**.
- **Ya silenciado, los plazos desaparecen** y la tarjeta muestra el estado,
  por ejemplo *"Callado hasta el… · quedan 8 h"*, con una sola salida:
  **Reactivar**. Para cambiar de plazo, reactiva y vuelve a elegir.
- **Al vencer, lo que siga roto reaparece con su antigüedad real** ("desde
  hace tres días") y no como si acabara de empezar.
- **El panel te recuerda a quién callaste.** Al pie hay un bloque gris,
  plegado, con el número de equipos silenciados; al abrirlo con **"ver"**
  aparecen su plazo y su botón **Reactivar**. Cuenta a todos los silenciados,
  tengan o no notificaciones hoy, porque lo que hay que recordar es la decisión.
- Se guarda **en el proyecto** y no en las preferencias del puesto, porque se
  refiere a un equipo de **esta** red. Se pierde al olvidar el equipo.

![La tarjeta **Silenciar notificaciones** con la fila de plazos (1 hora, 8 horas, 1 día, 3 días, 1 semana, Sin vencimiento)](/signal-scope/silenciar.webp)

### Avisar la reconexión

Es lo contrario del silencio: aquí pides **más** atención sobre un equipo. Un
clic en la tarjeta **"Avisar la reconexión"** y la app te avisa **cada vez que
el equipo vuelva a conectarse**, por notificación de Windows y por la
mensajería que tengas activa, hasta que lo quites con otro clic.

**La vuelta la decide el centinela**: el mismo que confirma la caída es el
que da por resuelta la vuelta. Un corte de pocos segundos, que el centinela no
llega a dar por caída, no avisa. Si lo que cayó fue su AP, la estación también
avisa al volver. Y si el equipo ya estaba caído al abrir la app, avisa la
primera vez que vuelva a responder.

No se vuelve ruido gracias al **ciclo**, sin necesidad de
un tiempo mínimo entre notificaciones. Después de avisar vuelve a esperar la caída,
así que para sonar otra vez el equipo tiene que caerse otra vez de verdad.
**Avisa una vez por incidencia y no una por lectura**, y nunca dos veces por
la misma caída.

Tres detalles evitan expectativas falsas:

- **Sobre un equipo que está en línea**, la notificación espera primero a verlo
  caer. No avisa ahora, sino cuando se caiga y vuelva.
- **No se puede poner sobre lo que no se está midiendo**: un equipo
  silenciado, un destino de Referentes sin la vigilancia encendida o uno
  vigilado del que todavía no se sabe si responde. La tarjeta dice cuál de los
  tres casos es.
- **Se pierde al olvidar el radio o retirar el destino**, porque viaja con su
  ficha.

Para que avise de **todos** los equipos sin marcarlos uno por uno, enciende
**Avisar cuando vuelve un equipo caído** en **Preferencias → Red**. Avisa de la
vuelta de toda caída que tuvo su propio aviso: un AP, una estación o un
Referente. La de las estaciones que cayeron con su AP no se repite: vuelven con
él. Un equipo silenciado no avisa. Mientras está encendido, **Avisar la
reconexión** desaparece de las Acciones de cada equipo, porque ya avisa de
todos; los que marcaste siguen marcados y vuelven a verse al apagarlo.

La salida se gobierna con el interruptor **"Volvió a conectarse"**, que está
en **Preferencias → Alertas** para Windows y en **Preferencias → Mensajería**
para cada destino. Ese interruptor apaga la **salida**; las notificaciones que pusiste
en cada equipo se conservan.

### Apagar la sesión de un equipo

Apagar la sesión no es olvidar el equipo. La app **deja de conectarse** a él,
así que no le gasta CPU ni te llena de notificaciones, pero **conserva sus
credenciales y su ficha**. Se apaga desde su ventana de sesión, encima de
Olvidar, y se vuelve a encender con un clic en su celda de Sesión. **Sigue
apagado aunque cierres la app.**

La diferencia con silenciar es que aquí el equipo **deja de medirse**. Si
quieres calma sin perder de vista cómo está, silencia.

::: warning Las acciones se llevan la caja entera
En un equipo de varios radios (dos filas, una sola sesión), apagar, silenciar
u olvidar **vale para las dos filas**. La app te lo avisa antes de que pulses.
:::

## La campana: lo que te avisó mientras trabajabas

A la izquierda del latido del centinela está la **bandeja de notificaciones**, con el
icono de una campana. Guarda **todo lo que la app te avisó**, con su hora, y
al pulsar cada línea vas al equipo.

Son dos indicadores vecinos que cuentan **cosas distintas**, y por eso no se
fundieron en uno:

- El **latido** dice qué está **roto ahora**, y sus alertas **se resuelven
  solas** cuando la falla desaparece. Su contador no baja porque lo mires.
- La **campana** dice qué **pasó mientras no mirabas**, y sus notificaciones **se leen
  y no vuelven**. Su contador es de no leídos y **desaparece al abrirla**.

Una reconexión que ya ocurrió sigue habiendo ocurrido, y un cable suelto sigue
suelto aunque lo mires.

- La campana muestra **la hora** y no el "hace cuánto", porque una notificación se lee
  por **cuándo ocurrió**, que es lo que cruzas con lo que estabas haciendo. Una
  alerta del centinela se lee al revés, por cuánto tiempo lleva rota.
- **Se guarda en el proyecto.** Al cerrar la app y volver a abrir el
  proyecto, la campana conserva lo que pasó.
- **No enciende el punto rojo del icono de Windows.** Ese punto significa "tu
  red te necesita" y lo pone el centinela.

Lo que llega a la campana:

| Notificación | Cuándo |
|---|---|
| **Volvió a conectarse** | Volvió un equipo al que le pusiste [Avisar la reconexión](#avisar-la-reconexion), o cualquiera con **Avisar cuando vuelve un equipo caído** encendido. |
| **Requiere tu intervención** | La app pausó una sesión que no puede resolver sola: IP desconocida, cuenta rechazada o posible reemplazo. Ver [qué hacer](./interfaz/estaciones#cuando-la-app-necesita-que-intervengas). |
| **Volvió un equipo etiquetado** | Volvió un equipo con [motivo de la ausencia](./interfaz/estaciones#motivo-de-la-ausencia); la etiqueta se quita sola. |
| **Un AP cambió de IP** | La app encontró al AP en su IP nueva y se reconectó sola. En un AP no es lo normal: revisa si su dirección debería ser fija. |
| **Se perdió conexión** | No se puede acceder a ningún equipo: tu PC se quedó sin red, o casi todos los equipos cayeron a la vez y el router por el que se llega a ellos tampoco contesta. Es **una sola notificación** en lugar de una por cada equipo que deja de contestar. Cuando la red vuelve, los equipos se reconectan solos y no se avisa. |
| **Sin acceso a internet** | Tu red local responde, pero internet no. Puede traer resultados inesperados con las sesiones o las inspecciones fuera de tu red. Se comprueba cada minuto y avisa tras dos fallos seguidos; la vuelta no se avisa. |
| **Corte de luz** | Varios equipos se reiniciaron a la vez. Ver [abajo](#corte-de-luz). |
| **Se conectó un dispositivo nuevo** | Un equipo que no es un radio y que la red no conocía se conectó a uno de tus AP. Solo con **Vigilar otros dispositivos** encendido en Preferencias → Red. Ver [Otros dispositivos](./interfaz/estaciones#otros-dispositivos). |

Cuáles de estas notificaciones salen también a Windows o a tu mensajería se
elige en la pestaña **Notificaciones que pides tú**, en **Preferencias →
Alertas** y en **Preferencias → Mensajería**. El corte de luz es la excepción:
solo llega a la campana.

### Corte de luz

La app sabe que un equipo se reinició por su tiempo de actividad: si lleva
encendido menos tiempo del que pasó desde la última lectura, se apagó y
volvió. Por eso también detecta lo que pasó con la app cerrada, por ejemplo
durante la noche.

Agrupa los reinicios por sitio, que es el nodo del Mapa o, si el AP no tiene
nodo, el AP. Reinicios del mismo sitio con menos de tres minutos de diferencia
cuentan como un solo corte. Según quién se reinició, el título dice dónde se
fue la luz:

| Título | Qué pasó |
|---|---|
| **Corte de luz en** *sitio* | Se reiniciaron varios equipos, incluidos los de la torre. |
| **Corte de luz cerca de** *sitio* | Se reiniciaron al menos tres clientes y su AP no: la luz se fue en las casas. |
| *AP* **se reinició** | Se reinició un equipo de la torre y ningún otro. |

La notificación dice a qué hora volvió la luz y, en los dos primeros casos,
qué equipos se reiniciaron. Un solo cliente reiniciado no genera notificación:
queda en su Log.

## Tres canales para la misma notificación

El centinela **siempre vigila todo**. Lo que eliges tú es **qué sale de la app
y por dónde**:

- **El panel** muestra todas las alertas, siempre. Apagar un evento en
  Preferencias no lo esconde de aquí.
- **Las notificaciones de Windows** llegan al escritorio aunque la app esté
  minimizada o escondida en la bandeja, y el clic te lleva **al equipo dentro
  de su proyecto**, no a la pantalla de inicio. Se activan con el interruptor
  **"Notificaciones en Windows"** de **Preferencias → Alertas**, y en el mismo
  sitio, bajo *"Qué sale al escritorio"*, eliges qué eventos llegan.
- **El teléfono** recibe las notificaciones por WhatsApp o Telegram, con su propia
  selección de eventos (ver abajo). Alertas y Mensajería son ajustes
  **independientes**: puedes querer todo en el escritorio y solo lo grave en
  el teléfono.

### Notificaciones al teléfono (WhatsApp o Telegram)

Las mismas alertas pueden llegarte al teléfono, para enterarte de una caída
**sin estar delante de la pantalla**. Hay tres vías, todas mediante
**CallMeBot**: WhatsApp, Telegram a un usuario o Telegram a un grupo.

Se enciende en **Preferencias → Mensajería**:

1. Activa **"Enviar notificaciones por mensajería"** y elige la vía en *"Por
   dónde"*. Cada vía pide sus datos. WhatsApp pide el teléfono y la clave;
   Telegram a un usuario, solo tu `@usuario`; Telegram a un grupo, solo la
   clave (la clave *es* el grupo). El enlace **"Cómo obtener estos datos"**
   lleva a las instrucciones de CallMeBot. La autorización se da desde tu
   teléfono, y ese paso la app no puede hacerlo por ti.
2. **Envía el mensaje de prueba** con **"Enviar mensaje de prueba"**. No es
   opcional: CallMeBot no valida nada hasta un envío real, y sin la prueba te
   enterarías de una clave mal puesta el día que se caiga un enlace y no
   llegue la notificación.
3. En la pestaña **Qué se manda a este destino**, elige los eventos. En la
   pestaña **Notificaciones que pides tú**, eliges cuáles de las
   notificaciones de la campana salen también por este destino.

Con el destino configurado, el resumen muestra tu número y la clave
**enmascarados**, para que no viajen en una captura de pantalla ni en una
sesión compartida.

**Qué llega**: un mensaje **por tipo de alerta** (no un resumen), con el
proyecto y, por cada equipo, su nombre, su IP y el AP del que cuelga. La hora
es la de la **primera alerta** y no la del envío, porque lo que importa es
cuándo se quedó el cliente sin servicio.

Cada tipo tiene su espera y su tolerancia. La espera sirve para **agrupar**:
un corte de luz tumba varios AP con segundos de diferencia y eso debe llegar
en un solo mensaje. La misma espera descarta las fallas pasajeras. La tabla
también está en la app, en el desplegable *"Qué se envía"* de Mensajería.

| Prioridad | Eventos | Espera | No se repite del mismo equipo en |
|---|---|---|---|
| 1 | AP caído · Sin cable LAN · Referentes sin respuesta | 20 s | 1 h |
| 2 | Sesión caída | 1 min | 4 h |
| 3 | LAN a 10 Mbps **en un AP** | 1 min | 6 h |
| 3 | Radio saturado **en un AP** · Sector con latencia alta | 5 min | 6 h |
| 4 | LAN en half duplex · LAN a 10 Mbps · Radio saturado · Latencia alta | 15 min | 12 h |
| 5 | Antena desalineada · La IP de un vigilado la ocupa otro | 30 min | 24 h |

::: warning Los límites, de frente
- **Vigila mientras la app corre.** Cerrar la ventana no la detiene: la app
  sigue en la bandeja del sistema, junto al reloj, midiendo. La primera vez
  que la cierras con un proyecto abierto te lo explica la notificación **"SignalScope
  en segundo plano"**, cuyo botón **"Salir del todo"** sí la cierra. Para
  cerrarla por completo en cualquier otro momento, usa **Archivo → Salir de
  SignalScope** o haz clic derecho en su icono de la bandeja. Con las notificaciones
  llegando al teléfono es fácil creer que es un servicio que corre en el
  servidor de alguien, pero corre en tu máquina.
- **CallMeBot es un servicio gratuito de terceros**, y puede tardar o fallar.
  No lo uses como único mecanismo de alerta de un servicio crítico.
- **Las notificaciones salen por tu internet.** Si se cae tu propio enlace,
  también se caen las notificaciones.
- **No se eligen equipos, solo tipos de evento.** Una lista de estaciones
  concretas en Preferencias sacaría identificadores de tu red fuera del
  archivo cifrado. Para callar a UN equipo está
  [silenciar](#silenciar-notificaciones).
- **No manda lo que ya estaba fallando al abrir el proyecto.** Tras un fin de
  semana el centinela puede detectar cuarenta caídas de golpe, y ninguna es
  una novedad.
:::

::: tip Un grupo de Telegram es una audiencia
La notificación la lee todo el grupo, con los nombres e IPs de tus clientes dentro.
Elige la vía de grupo sabiendo quién está en él.
:::

![Preferencias → Mensajería: el interruptor de enviar notificaciones, las tres vías (WhatsApp, Telegram a usuario, Telegram a grupo), el mensaje de prueba y la selección de qué eventos se mandan a este destino](/signal-scope/mensajeria.webp)

![El panel del centinela: notificaciones de Sesión caída apiladas con el motivo de cada uno, y al pie el recordatorio de que vigila mientras la app está abierta](/signal-scope/centinela-panel.webp)

## La calificación de la red

Es una **nota de 0 a 100 del parque entero**, pensada para compartirse: se
descarga como imagen lista para enviar a un socio o a un cliente.

La nota no mira solo la señal. Corre el **diagnóstico completo** sobre cada
estación (el mismo de la tabla, así que nunca se contradicen) y promedia.

| Nota | Veredicto |
|---|---|
| ≥ 90 | Red excelente |
| ≥ 75 | Red estable |
| ≥ 50 | Requiere atención |
| < 50 | Red crítica |

Dos reglas la hacen defendible ante quien la reciba:

- **La nota siempre viaja con su cobertura**: "Calificado sobre N de M
  estaciones". Una nota que no dice cuánto se midió no se puede auditar.
- **Sin mediciones no hay nota.** Se muestra "Sin datos suficientes" y no un
  0 %. Las estaciones ausentes **no penalizan**, porque un cliente que apaga
  su antena de noche no es una falla de tu red; se informan en su propio
  bloque.

La tarjeta agrupa la información en tres bloques (la red, la salud de los
enlaces y la disponibilidad) y sale idéntica en cualquier equipo, en tema
claro u oscuro.

![La tarjeta de calificación lista para compartir: 76 % Red estable, calificado sobre 169 de 189 estaciones, con los bloques de la red, salud de los enlaces y disponibilidad](/signal-scope/calificacion-red.webp)
