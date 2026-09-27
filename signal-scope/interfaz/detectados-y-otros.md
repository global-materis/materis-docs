# Detectados y Referentes

Estas dos tablas tienen papeles opuestos. **Detectados** es la cola de trabajo
del escaneo y se vacía. **Referentes** es el inventario permanente de lo que no
gestionas pero miras para contrastar: el router del nodo, tu proveedor, un
dominio como Google.

## Detectados: la cola del escaneo

Todo lo que encuentra un escaneo y aún no tiene identidad cae aquí, con su IP,
MAC y fabricante. La columna **Sugerencia** adelanta qué parece cada equipo:

| Sugerencia | Qué significa |
|---|---|
| **Radio Ubiquiti** (azul) | Candidato airMAX. Se entra con el botón de sesión. |
| **Radio MikroTik** (azul) | Candidato RouterOS. Si tiene módulo inalámbrico entra igual que un airMAX; si no lo tiene, el propio inicio de sesión te lo dirá, y ese equipo va a Referentes. |
| **Equipo *fabricante* · no es airMAX** | Fabricante conocido, pero sin driver en la app. |
| **No es airMAX** | Fabricante desconocido. |
| **MAC no alcanzable** | Está detrás de un router; al iniciar sesión se identifica completo. |

En las dos filas que dicen «no es airMAX», la columna Sesión muestra **no
gestionable** en lugar del inicio de sesión.

::: warning La sugerencia dice el fabricante, no el sistema
Que un equipo sea MikroTik no dice si es un sector de torre, un switch o un
router de escritorio, porque RouterOS corre en todo su catálogo. La sugerencia
solo promete que se le puede intentar una sesión. Qué equipo es lo dice él al
entrar.
:::

Cada equipo sale de la cola de una de dos maneras:

- **Iniciando sesión.** Eliges su [sistema](../compatibilidad#elegir-el-sistema-al-iniciar-sesion),
  y el radio declara su modo y pasa solo a Estaciones o Puntos de acceso.
- **Con «Llevar a Referentes…».** El equipo baja al inventario. Se abre el
  mismo formulario del alta, donde le pones un **nombre** y decides ahí mismo si
  quieres **vigilarlo**. La decisión se guarda y un escaneo posterior no te lo
  vuelve a preguntar.

La sugerencia ayuda, pero la decisión es tuya. El botón «Llevar a Referentes…»
se resalta cuando el fabricante ya dice que no hay driver, y queda discreto en
un radio gestionable, donde apartarlo casi siempre sería un error.

**Limpiar lista** vacía la cola sin decidir nada: lo no resuelto reaparece en
el siguiente escaneo. Cuando la cola queda en cero, la tabla desaparece de la
vista.

![La tabla Detectados tras un escaneo: IP, MAC y fabricante de cada hallazgo, la Sugerencia que distingue radios gestionables de equipos que no lo son, y los botones de Iniciar sesión y Llevar a Referentes](/signal-scope/escaneo-detectados.jpg)

Al terminar, el escaneo te dice cuántos equipos respondieron y te lleva a esta
tabla. Un hallazgo con MAC se presenta aunque otro de tus equipos haya tenido
antes esa misma dirección, algo normal donde las IP se reparten solas. Cuando
es un AP el que declara sus estaciones, su aviso separa las nuevas que añadió a
Detectados de las que ya tenías.

## Referentes: lo que miras para contrastar

Aquí van un switch, una ONU o el router del nodo o del cliente, y también
**destinos fuera de tu red**: la IP pública de tu proveedor de tránsito o un
dominio como `google.com`. La app no los gestiona, pero te dicen si el problema
es tuyo o de más arriba. Cada fila es un **destino**.

La tabla Referentes está siempre visible, aunque esté vacía, y su buscador
aparece en cuanto tiene filas. En la barra lateral la reconoces por el icono de
eslabón.

| Columna | Qué muestra |
|---|---|
| **Vigilancia** | El estado del ping a ese destino. Un clic en el chip **abre sus acciones** (ver abajo). |
| **Latencia** | El tiempo de respuesta y, al lado, el **porcentaje de pings perdidos** de los últimos dos minutos: `5 ms · 20 %`. El tooltip lo detalla con *«Ping desde SignalScope»* y *«Pérdida de los últimos 2 min»*. |
| **Nombre** | **Editable en la tabla**: Enter o salir del campo guarda, Esc descarta. |
| **IP / dominio** | La dirección o el nombre del destino. |
| **MAC** | Identidad, cuando la hay. Un equipo ruteado no tiene MAC visible y la celda dice **solo IP**; un dominio muestra **—**. |
| **Fabricante (OUI)** | El fabricante que delata la MAC. Sin MAC, **—**. |

### Añadir un destino

Hay dos caminos, y los dos abren el mismo formulario, **«Añadir a Referentes»**:

- **Desde Detectados**, con **«Llevar a Referentes…»** en su fila. La dirección
  ya se sabe y se muestra fija.
- **A mano**, con **«Añadir destino»**, arriba a la derecha de la tabla. Con la
  tabla vacía, el mismo enlace aparece en su centro.

El formulario tiene tres campos:

1. **Dirección IP o dominio**, solo en el alta manual. Acepta una IPv4 o un
   nombre. No acepta IPv6 ni un puerto, porque solo se comprueba si el destino
   responde.
2. **Nombre**, obligatorio y único. Es como te lo van a nombrar los avisos a las
   tres de la mañana, y dos «Router» en un mensaje de WhatsApp no sirven de nada.
3. **Vigilar este destino**, que viene encendido. Así el destino queda en
   custodia del centinela desde que lo guardas. Apágalo si solo quieres tenerlo
   anotado.

![El formulario «Añadir a Referentes»: el campo de IP o dominio, el nombre obligatorio y el interruptor de «Vigilar este destino».](/signal-scope/escaneo-detectados.png)

### La vigilancia: «¿sigue vivo, y cómo responde?»

Con la vigilancia encendida, la app manda un **ping cada 2 segundos** desde
SignalScope y el destino queda en custodia del centinela, que te avisa ante
posibles cortes o inestabilidad. El chip de Vigilancia tiene cinco caras, y
cada una es un hecho distinto, no un grado de lo mismo:

| Chip | Qué significa |
|---|---|
| **Sin vigilar** (apagado) | Nadie comprueba si responde. Queda así si apagaste la vigilancia al añadirlo o desde sus acciones. |
| **Comprobando…** | Encendido, todavía sin el primer ping. |
| **Vigilando** (verde) | Responde, y la app verificó que quien responde es **ese** equipo. |
| **Otro equipo** / **No resuelve** (ámbar) | *Otro equipo*: esa IP la ocupa otro dispositivo; un escaneo reencuentra al tuyo en su dirección nueva. *No resuelve*: el nombre no se pudo traducir a una dirección, así que la pregunta no llegó a hacerse. No cuenta como caída ni genera aviso; lo que hay que mirar está en tu máquina. |
| **Sin respuesta · hace 5 min** (rojo) | No contesta, con el «hace cuánto» pegado. |

::: tip El porcentaje de pérdida es la mitad que importa
Un destino que **cae y vuelve** responde bien la mayor parte del tiempo, y
mirando solo el tiempo de respuesta parecería sano. Lo delata la pérdida. El
tiempo se pone en ámbar a partir de 120 ms y nunca en rojo. La pérdida se pinta
en ámbar en cuanto la hay, y en rojo a partir del 10 %.
:::

Cuando un destino vigilado deja de responder, el [centinela](../centinela) lo
avisa como **«Referentes sin respuesta»**. Sirve, por ejemplo, para el router de
un nodo, cuya caída explica la de todos los radios que cuelgan de él. Como toda
alerta, puede llegarte también por notificación de Windows o al teléfono.

### Acciones del destino

El clic en el chip de Vigilancia abre sus acciones:

- **Vigilar destino**: lo pone en custodia del centinela, o lo retira.
- **Avisar la reconexión**: la app te avisa cuando vuelva a responder, una vez
  o cada vez. Ver [Centinela](../centinela#avisar-la-reconexion).
- **Retirar del proyecto**: borra todo registro y acciones de diagnóstico.

::: warning Lo que la vigilancia NO es
- **No mide la calidad de un enlace.** Es un ping desde SignalScope, así que
  arrastra tu red local y todo el camino intermedio. La columna Latencia de
  *Estaciones* la mide el radio sobre su propio tramo aéreo, y las dos no
  comparten umbrales.
- **No abre sesión ni lee configuración.** De un referente solo se sabe si
  responde y cuánto tarda.
- **No sigue a un destino que cambia de IP** si su identidad es la IP (ruteado o
  alta manual), porque no hay sesión que lo reidentifique. Con MAC visible, el
  escaneo sí lo reengancha.
:::

### Retirar es de verdad

**Retirar del proyecto** borra el registro completo de ese destino, incluida la
decisión de haberlo apartado. Si un escaneo posterior lo reencuentra, vuelve a
**Detectados** como si fuera nuevo. Ese es también el camino para recuperar un
radio llevado a Referentes por error.

::: tip Referentes no es «lo que sobra»
Es inventario permanente y sobrevive a *Limpiar lista*; la cola que se vacía es
**Detectados**. Cada fila de Referentes la pusiste tú, así que ninguna es ruido,
y por eso los reportes las llevan todas, vigiladas o no.
:::
