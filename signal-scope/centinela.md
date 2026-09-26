# Centinela y calificación de la red

Dos herramientas que trabajan sobre el mismo diagnóstico: el **centinela**
avisa de las fallas que la señal no delata mientras trabajas en otra cosa, y
la **calificación** resume el estado del parque en una nota.

## El centinela de servicio

Un enlace puede verse perfecto —señal excelente, calidad 100 %— y aun así el
cliente estar **sin servicio**: un cable LAN suelto no toca la señal. La app
está centrada en la señal, y justo por eso existe el centinela: vigila las
fallas que **no se ven en el semáforo**.

Vive en el **latido** de la esquina derecha de la barra, en el mismo sitio en el
Monitor y en el Mapa. Su número dice **cuántos equipos están rotos ahora**.

### Qué vigila

Once eventos, ocho interruptores — tres heredan el de su pareja, porque son dos
caras de la misma vigilancia:

| Aviso | Qué detecta |
|---|---|
| **Punto de acceso caído** | Un AP que estaba en línea deja de responder — se avisa **una vez por el nodo**, indicando cuántas estaciones arrastra, en vez de una alerta por cada cliente. *(Hereda el interruptor de "Sesión caída": es la misma vigilancia con otra presentación.)* |
| **Referentes sin respuesta** | Un destino de [Referentes](./interfaz/detectados-y-otros#referentes-lo-que-miras-para-contrastar) con la vigilancia encendida dejó de responder al ping. |
| **La IP de un equipo vigilado la ocupa otro** | Esa IP responde, pero detrás hay otra MAC. *(Hereda el interruptor de "Referentes sin respuesta".)* |
| **Sesión caída** | Una estación que estaba en línea deja de responder. |
| **Sin cable LAN** | El puerto del radio quedó sin cable: el enlace se ve bien, el cliente no navega. |
| **LAN a 10 Mbps** | El puerto negocia 10 Mbps — cable dañado, humedad en el conector o PoE flojo. Ningún airMAX trae ese máximo de fábrica. **También en los AP**, donde estrangula al sector entero. |
| **LAN en half duplex** | El puerto negoció mal: el servicio sale degradado sin que la señal lo muestre. |
| **Antena desalineada** | Desbalance entre las dos polaridades desde **6 dB** — el límite que recomienda el propio Ubiquiti: apunte o polarización. |
| **Radio saturado** | CPU o memoria del radio al límite: tira paquetes con la señal intacta. |
| **Sector con latencia alta** | La mayoría de las estaciones en línea de un mismo AP responden con retraso a la vez. *(Hereda el interruptor de "Latencia alta".)* |
| **Latencia alta** · **BETA** | Un cliente con la señal impecable que aun así responde con retraso **sostenido**. Ver abajo. |

Los avisos se apilan **por gravedad**: primero lo que deja una celda entera
sin servicio, luego lo que afecta a un cliente, después lo que lo degrada y al
final lo que anticipa un problema.

::: tip "Latencia alta", y por qué va marcado beta
Un cliente con el enlace impecable al que **ninguna métrica de radio le
encuentra nada** y que aun así responde lento: ese es exactamente el caso para
el que existe el centinela.

Es también el evento con **más riesgo de volverse ruido**, porque la latencia es
la única magnitud del catálogo que sube sola en hora punta. Por eso lleva encima
tres filtros que ningún otro necesita:

- Juzga la **media sostenida** durante 90 s, no los picos.
- **Se calla cuando ya te avisó de la causa** — antena desalineada o radio
  saturado, que son las dos averías que producen este mismo síntoma.
- **Si son varias estaciones del mismo AP, avisa una vez por el nodo**: entonces
  no es un cliente, es el aire de esa celda, y el AP te da el triage.

Va marcado **BETA** mientras se calibra. Si te resulta ruidoso, se apaga en
**Preferencias → Alertas**.
:::

### Qué NO vigila, a propósito

Señal, ruido, calidad de enlace, capacidad y tráfico quedan **fuera**: varían
con la lluvia, el viento y lo que el cliente esté descargando. Si entraran, el
panel se llenaría todos los días y en un mes nadie lo abriría. El centinela
solo admite condiciones que fallan en binario y que una red sana no produce
—con la excepción, medida y filtrada, de la latencia.

### Cómo se comporta

- **Confirma antes de avisar**: una condición debe sostenerse unos segundos —
  un puerto que parpadea durante un reinicio no amerita una visita.
- **Una alerta por equipo y condición** mientras dure; al resolverse se marca
  y se retira sola a los minutos. Y resolver exige **medir**: si lo que se
  cayó fue la sesión, la avería no se da por resuelta — queda **"Sin medir"**
  y vuelve a avisar en cuanto el equipo responde.
- **Causa, no consecuencia**: si cae un AP, se avisa del AP y **se callan**
  sus estaciones — un nodo caído no debe enterrar el panel bajo cincuenta
  avisos.
- **La ausencia de dato nunca es falla**: si un firmware no reporta el puerto,
  ese eje simplemente no se evalúa para ese equipo. Es lo que pasa con varias
  métricas en RouterOS.
- **Congelar las tablas no lo detiene**: el centinela vigila el monitoreo de
  fondo, no lo que está pintado.
- **Y no depende de qué pantalla mires**: con el proyecto abierto vigila desde
  el Monitor, desde el Mapa, desde la pantalla de inicio y con la ventana
  escondida en la bandeja.

### El panel, y lo que puedes filtrar en él

Cada tarjeta de alerta es un **botón que lleva al equipo** — y limpia el filtro
de estado, para que no aterrices en una tabla vacía. A partir de seis alertas
aparecen además **chips por tipo de evento** y un **buscador** por nombre, IP o
MAC.

Los dos son **de sesión y no se guardan**: son una lente para investigar, no
una preferencia. Si sobrevivieran al reinicio podrías abrir el panel mañana con
un filtro puesto y creer que no hay fallas. Con algo oculto, el propio panel lo
dice: *"{n} ocultas por el filtro — mostrar todo"*.

Y el **contador de la barra sigue contando todas**: es el estado de la red, no
de la lente. Un filtro no puede bajar el número que dice cuántos clientes están
caídos.

## Lo que decides por equipo

Tres decisiones que se toman en la **ventana de sesión** de un radio (pestaña
*Acciones*) o en las **acciones** de un destino de Referentes. Van en orden de
lo reversible a lo que no, para que el dedo no llegue al rojo por inercia.

Con el equipo ausente, la misma pestaña ofrece además el
[motivo de la ausencia](./interfaz/estaciones#motivo-de-la-ausencia)
(Suspendido, Técnico, De baja): una etiqueta informativa que se quita sola
cuando vuelve.

### Silenciar avisos

Un equipo con una avería **que ya conoces** —una obra de tres días, un cliente
que no paga, una antena que cambias el jueves— llenaba el panel de avisos que ya
no informan de nada y enterraban los que sí.

**Silenciar no es dejar de vigilar.** El equipo se sigue conectando y el
centinela lo sigue midiendo: lo único que se calla es la **salida** —el panel,
la notificación de Windows y tu mensajería, los tres a la vez—.

- **El plazo es la decisión**, así que no hay un botón sino una fila de plazos:
  **1 hora · 8 horas · 1 día · 1 semana · Sin vencimiento**. Una semana es el
  tope con fecha: más allá se parece tanto a "para siempre" que conviene que lo
  diga con esas palabras, y por eso el permanente **hay que pedirlo por su
  nombre**.
- **Ya silenciado, los plazos desaparecen** y la tarjeta pasa a decir un estado
  —*"Callado hasta el… · quedan 8 h"*— con una sola salida: **Reactivar**.
  Cambiar de plazo es reactivar y volver a elegir.
- **Al vencer, lo que siga roto reaparece con su antigüedad real** ("desde hace
  tres días"), no nace de cero.
- **El panel te recuerda a quién callaste**: al pie, un bloque gris con los
  equipos silenciados, su plazo y su **Reactivar**. Cuenta siempre, tengan o no
  avisos hoy — lo que hay que recordar es la decisión, no sus consecuencias de
  esta tarde.
- Se guarda **en el proyecto**, no en las preferencias del puesto: señala a un
  equipo de **esta** red. Muere al olvidar el equipo.

::: info 🖼️ Imagen pendiente — `silenciar.png`
La tarjeta **Silenciar avisos** con la fila de plazos (1 hora, 8 horas, 1 día,
1 semana, Sin vencimiento) y, al lado, su estado ya puesto: "Callado hasta el… ·
quedan 8 h" con el botón Reactivar.
:::

### Avisar la reconexión

Lo contrario del silencio: aquí pides **más** atención sobre un equipo. En la
tarjeta **"Avisar la reconexión"** eliges un modo y la app te avisa **cuando
vuelva a conectarse** — por notificación de Windows y por tu mensajería.

Ninguno de los dos modos viene preseleccionado: **elegir es la acción**. Puesto,
la tarjeta dice el modo y un clic en ella lo **quita**.

| Modo | Para qué |
|---|---|
| **Una vez** | Se cayó un cliente, sales a atender otra cosa y quieres enterarte de que volvió. Avisa y **se retira solo**. |
| **Siempre** | Para el equipo que quieres vigilar de continuo: avisa **en cada caída y vuelta** hasta que tú lo quites. |

Lo que impide que el permanente sea ruido **no es un tiempo mínimo entre avisos,
es el ciclo**: después de avisar vuelve a esperar la caída, así que para sonar
otra vez el equipo tiene que caerse otra vez de verdad. **Avisa una vez por
incidencia, no una por lectura** — y ninguno de los dos modos avisa dos veces
por la misma caída.

Tres detalles que evitan una expectativa falsa:

- **Sobre un equipo que está en línea**, el aviso espera primero a verlo caer:
  no te avisa ahora, sino cuando se caiga y vuelva.
- **No se puede poner sobre lo que no se está midiendo**: un equipo silenciado,
  un destino de Referentes sin vigilancia encendida, o uno vigilado del que
  todavía no se sabe si responde. La tarjeta dice cuál de los tres es.
- **Se pierde al olvidar el radio o retirar el destino**, porque viaja con su
  ficha.

Se apaga entero en **Preferencias → Alertas** ("Volvió a conectarse"). Ese
interruptor apaga la **salida**, no los recados puestos.

### Apagar la sesión de un equipo

Sin olvidarlo: la app **deja de conectarse** a él —no le gasta CPU ni te llena
de avisos— pero **conserva sus credenciales y su ficha**. Se apaga desde su
ventana de sesión, encima de Olvidar, y se vuelve a encender con un clic en su
celda de Sesión. **Sigue apagado aunque cierres la app.**

La diferencia con silenciar: aquí el equipo **deja de medirse**. Si lo que
quieres es paz sin perder de vista cómo está, silencia.

::: warning Las acciones se llevan la caja entera
En un equipo de varios radios —dos filas, una sola sesión— apagar, silenciar u
olvidar **vale para las dos**. La app te lo avisa antes de que pulses.
:::

## La campana: lo que te avisó mientras trabajabas

Junto al latido del centinela, a su izquierda, vive la **bandeja de avisos**.
Guarda **todo lo que la app te avisó**, con su hora, y pulsando cada línea vas
al equipo.

Son dos indicadores vecinos y cuentan **cosas distintas** — por eso no se
fundieron en uno:

- El **latido** dice qué está **roto ahora**, y sus ítems **se resuelven solos**
  cuando la falla desaparece. Su contador no baja porque lo mires.
- La **campana** dice qué **pasó mientras no mirabas**, y sus ítems **se leen y
  no vuelven**. Su contador es de no leídos y **desaparece al abrirla**.

Una reconexión que ya ocurrió no deja de haber ocurrido; un cable suelto sigue
suelto aunque lo mires.

- La campana muestra **la hora**, no el "hace cuánto": un aviso se lee por
  **cuándo ocurrió**, que es lo que cruzas con lo que estabas haciendo. Una
  alerta del centinela se lee al revés, por cuánto lleva rota.
- **Se guarda mientras la app esté abierta**, y el panel vacío lo dice. No
  sobrevive a cerrarla.
- **No enciende el punto rojo del icono de Windows**: ese significa "tu red te
  necesita", y lo pone el centinela.

Lo que llega a la campana:

| Aviso | Cuándo |
|---|---|
| **Volvió a conectarse** | Un equipo al que le pusiste [Avisar la reconexión](#avisar-la-reconexion) volvió. |
| **Requiere tu intervención** | La app pausó una sesión que no puede resolver sola: IP desconocida, cuenta rechazada o posible reemplazo. Ver [qué hacer](./interfaz/estaciones#cuando-la-app-necesita-que-intervengas). |
| **Volvió un equipo etiquetado** | Volvió un equipo con [motivo de la ausencia](./interfaz/estaciones#motivo-de-la-ausencia); la etiqueta se quita sola. |
| **Un AP cambió de IP** | La app encontró al AP en su IP nueva y se reconectó sola. En un AP no es lo normal: revisa si su dirección debería ser fija. |
| **Esta PC perdió la red** | Tu PC se quedó sin ninguna red activa. Es **un solo aviso** en vez de uno por cada equipo que deja de contestar, y llega otro cuando la red vuelve. |

Cuáles salen también como notificación de Windows o a tu mensajería se elige en
**Preferencias**, en *"Avisos que pides tú"*.

::: info 🖼️ Imagen pendiente — `bandeja-avisos.png`
La campana abierta junto al latido del centinela: la lista de avisos con su hora
—"volvió a conectarse"— y el punto de los no leídos.
:::

## Tres canales para el mismo aviso

El centinela **siempre vigila todo**; lo que tú eliges es **qué sale de la
app y por dónde**:

- **El panel** — todas las alertas, siempre. Apagar un evento en Preferencias
  no lo esconde de aquí.
- **Notificaciones de Windows** — llegan al escritorio aunque la app esté
  minimizada o escondida en la bandeja, y el clic te lleva **al equipo dentro de
  su proyecto**, no a la pantalla de inicio. Qué eventos llegan se elige en
  **Preferencias → Alertas**.
- **El teléfono** — WhatsApp o Telegram, con su propia selección de eventos
  (ver abajo). Alertas y Mensajería son ajustes **independientes**: puedes
  querer todo en el escritorio y solo lo grave en el teléfono.

### Avisos al teléfono (WhatsApp o Telegram)

Las mismas alertas pueden llegarte al teléfono, para enterarte de una caída
**sin estar delante de la pantalla**. Tres vías, todas mediante **CallMeBot**:
WhatsApp, Telegram a un usuario o Telegram a un grupo.

Se enciende en **Preferencias → Mensajería**:

1. Activa **"Enviar avisos por mensajería"** y elige la vía. Cada una pide lo
   suyo — WhatsApp: teléfono y clave; Telegram a usuario: solo tu `@usuario`;
   Telegram a grupo: solo la clave (la clave *es* el grupo). El enlace **"Cómo
   obtener estos datos"** lleva a las instrucciones de CallMeBot: la
   autorización se da desde tu teléfono, y ese paso la app no puede hacerlo
   por ti.
2. **Envía el mensaje de prueba** — no es opcional: CallMeBot no valida nada
   hasta un envío real, así que sin la prueba te enterarías de una clave mal
   puesta el día que se caiga un enlace y no llegue el aviso.
3. En **"Qué se manda a este destino"**, elige los eventos.

Con el destino configurado, el resumen muestra tu número y la clave
**enmascarados** — no viajan en una captura de pantalla ni en una sesión
compartida.

**Qué llega**: un mensaje **por tipo de alerta** —no un resumen—, con el
proyecto y, por cada equipo, su nombre, su IP y el AP del que cuelga. La hora
es la de la **primera alerta**, no la del envío: lo que importa es cuándo se
quedó el cliente sin servicio.

Cada tipo tiene su espera y su tolerancia. La espera no es un retraso, es el
**agrupador**: un corte de luz tumba varios AP con segundos de diferencia, y
eso debe ser un solo mensaje — y de paso descarta las fallas pasajeras.

| Prioridad | Eventos | Espera | No se repite antes de |
|---|---|---|---|
| 1 | AP caído · Sin cable LAN · Referentes sin respuesta | 20 s | 1 h |
| 2 | Sesión caída | 1 min | 4 h |
| 3 | LAN a 10 Mbps **en un AP** | 1 min | 6 h |
| 3 | Radio saturado **en un AP** · Sector con latencia alta | 5 min | 6 h |
| 4 | LAN en half duplex · LAN a 10 Mbps · Radio saturado · Latencia alta | 15 min | 12 h |
| 5 | Antena desalineada · La IP de un vigilado la ocupa otro | 30 min | 24 h |

::: warning Los límites, de frente
- **Vigila mientras la app corre.** Cerrar la ventana no la detiene —queda
  junto al reloj, midiendo—, pero **salir desde el menú de su icono sí**. Con
  los avisos llegando al teléfono es fácil creer que es un servicio de fondo en
  el servidor de alguien. No lo es: corre en tu máquina.
- **CallMeBot es un servicio gratuito de terceros**: puede tardar o fallar. No
  lo uses como único mecanismo de alerta de un servicio crítico.
- **Los avisos salen por tu internet** — si se cae tu propio enlace, también
  se caen los avisos. Es la ironía que conviene saber de antemano.
- **No se eligen equipos, solo tipos de evento.** Una lista de estaciones
  concretas en Preferencias sacaría identificadores de tu red fuera del archivo
  cifrado. Para callar a UN equipo está [silenciar](#silenciar-avisos).
- **No manda lo que ya estaba fallando al abrir el proyecto.** Tras un fin de
  semana el centinela detecta cuarenta caídas de golpe, y ninguna es una
  novedad.
:::

::: tip Un grupo de Telegram es una audiencia
El aviso lo lee todo el grupo — con los nombres e IPs de tus clientes dentro.
Elige la vía de grupo sabiendo quién está en él.
:::

![Preferencias → Mensajería: el interruptor de enviar avisos, las tres vías (WhatsApp, Telegram a usuario, Telegram a grupo), el mensaje de prueba y la selección de qué eventos se mandan a este destino](/signal-scope/mensajeria.png)

![El panel del centinela: avisos de Sesión caída apilados con el motivo de cada uno, y al pie el recordatorio de que vigila mientras la app está abierta](/signal-scope/centinela-panel.jpg)

## La calificación de la red

Una **nota de 0 a 100 del parque entero**, pensada para compartirse: se
descarga como imagen lista para enviar a un socio o un cliente.

La nota no mira solo la señal: corre el **diagnóstico completo** sobre cada
estación —el mismo de la tabla, así nunca se contradicen— y promedia.

| Nota | Veredicto |
|---|---|
| ≥ 90 | Red excelente |
| ≥ 75 | Red estable |
| ≥ 50 | Requiere atención |
| < 50 | Red crítica |

Dos reglas que la hacen defendible frente a quien la reciba:

- **La nota siempre viaja con su cobertura**: "Calificado sobre N de M
  estaciones". Una nota sin decir cuánto se midió no es auditable.
- **Sin mediciones no hay nota** — se muestra "Sin datos suficientes", no un
  0 %. Y las estaciones ausentes **no penalizan**: un cliente que apaga su
  antena de noche no es una falla de tu red; se informan en su propio bloque.

La tarjeta agrupa en tres bloques — la red, la salud de los enlaces y la
disponibilidad — y sale idéntica en cualquier equipo, en tema claro u oscuro.

![La tarjeta de calificación lista para compartir: 76 % Red estable, calificado sobre 169 de 189 estaciones, con los bloques de la red, salud de los enlaces y disponibilidad](/signal-scope/calificacion-red.png)
