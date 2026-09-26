# Detectados y Referentes

Dos tablas con papeles opuestos: **Detectados** es la cola de trabajo del
escaneo y se vacía; **Referentes** es el inventario permanente de lo que no
gestionas pero miras para contrastar: el router del nodo, tu proveedor, un
dominio como Google.

## Detectados: la cola del escaneo

Todo lo que encuentra un escaneo y aún no tiene identidad cae aquí, con su IP,
MAC y fabricante. La columna **Sugerencia** adelanta qué parece cada equipo:

| Sugerencia | Qué significa |
|---|---|
| **Radio Ubiquiti** (azul) | Candidato airMAX — el botón de sesión es el camino. |
| **Radio MikroTik** (azul) | Candidato RouterOS. Si tiene módulo inalámbrico entra igual que un airMAX; si no lo tiene, el propio inicio de sesión te lo dirá, y ese equipo va a Referentes. |
| **Equipo *fabricante* · no es airMAX** | Fabricante conocido, pero sin driver en la app. |
| **No es airMAX** | Fabricante desconocido. |
| **MAC no alcanzable** | Está detrás de un router; al iniciar sesión se identifica completo. |

::: warning La sugerencia dice el fabricante, no el sistema
Que un equipo sea MikroTik no dice si es un sector de torre, un switch o un
router de escritorio: **RouterOS corre en todo su catálogo**. Lo único que la
sugerencia promete es que se le puede intentar una sesión. Quién es lo dice él
al entrar.
:::

Cada equipo sale de la cola de una de dos maneras:

- **Iniciando sesión** — eliges su [sistema](../compatibilidad#elegir-el-sistema-al-iniciar-sesion),
  y el radio declara su modo y pasa solo a Estaciones o Puntos de acceso.
- **"Llevar a Referentes…"** — baja al inventario. Se abre el mismo formulario del
  alta: le pones **nombre** y decides ahí mismo si quieres **vigilarlo**. La
  decisión se guarda: un escaneo posterior no te lo vuelve a preguntar.

La sugerencia ayuda pero **la decisión es tuya**: el botón de descarte se
resalta cuando el fabricante ya dice que no hay driver, y queda discreto en un
radio gestionable, donde descartar casi siempre sería un error.

**Limpiar lista** vacía la cola sin decidir nada — lo no resuelto reaparece en
el siguiente escaneo. Cuando la cola queda en cero, la tabla desaparece de la
vista: su trabajo terminó.

![La tabla Detectados tras un escaneo: IP, MAC y fabricante de cada hallazgo, la Sugerencia que distingue radios gestionables de equipos que no lo son, y los botones de Iniciar sesión y Llevar a Referentes](/signal-scope/escaneo-detectados.jpg)

Cada hallazgo se presenta aunque otro de tus equipos haya tenido antes esa
misma dirección —normal donde las IP se reparten solas—, y el escaneo te cuenta
cuántos son nuevos y cuántos ya tenías.

## Referentes: lo que miras para contrastar

Un switch, una ONU, el router del nodo o del cliente — y también **destinos
fuera de tu red**: la IP pública de tu proveedor de tránsito, un dominio como
`google.com`. No son equipos que la app gestione, pero te dicen si el problema
es tuyo o de más arriba. Cada fila es un **destino**.

**Referentes siempre está visible**, aunque esté vacía, con su propio buscador.
En la barra lateral la reconoces por el icono de eslabón.

| Columna | Qué muestra |
|---|---|
| **Vigilancia** | El estado del ping a ese destino — y el clic **abre sus acciones**. Ver abajo. |
| **Latencia** | El tiempo de respuesta y, al lado, el **porcentaje de pings perdidos** de los últimos dos minutos: `5 ms · 20 %`. El tooltip lo detalla: *"Ping desde SignalScope"* y *"Pérdida de los últimos 2 min"*. |
| **Nombre** | **Editable en la tabla**: Enter o salir del campo guarda, Esc descarta. |
| **IP / dominio** | La dirección o el nombre del destino. |
| **MAC · Fabricante** | Identidad, cuando la hay. Un equipo ruteado no tiene MAC visible y la celda dice **solo IP**; un dominio muestra **—**. |

### Añadir un destino

Dos caminos, y los dos abren el mismo formulario, **"Añadir a Referentes"**:

- **Desde Detectados**, con **"Llevar a Referentes…"** en su fila. La dirección
  ya se sabe y se muestra fija.
- **A mano**, con **"Añadir destino"**, arriba a la derecha de la tabla.

El formulario pide dos cosas y ofrece una tercera:

1. **Dirección IP o dominio** — solo en el alta manual. Acepta IPv4 o un nombre.
   **No acepta IPv6** ni un **puerto**: solo se comprueba si el destino
   responde.
2. **Nombre** — **obligatorio y único**. Es como te lo van a nombrar los avisos
   a las tres de la mañana, y dos "Router" en un mensaje de WhatsApp no sirven
   de nada.
3. **Vigilar este destino** — encendido, el destino queda en custodia del
   centinela desde que lo guardas.

::: info 🖼️ Imagen pendiente — `anadir-destino.png`
El formulario "Añadir a Referentes": el campo de IP o dominio, el nombre
obligatorio y el interruptor de "Vigilar este destino".
:::

### La vigilancia: "¿sigue vivo, y cómo responde?"

Con la vigilancia encendida, la app manda un **ping cada 2 segundos** desde
SignalScope y el destino queda **en custodia del centinela**, que te avisa ante
posibles cortes o inestabilidad. El chip de Vigilancia tiene **cinco caras**, y
cada una es un hecho distinto — no un grado:

| Chip | Qué significa |
|---|---|
| **Sin vigilar** (apagado) | Nace así: son equipos que no gestionas, y mandarles tráfico sin que nadie lo pida no se justifica. |
| **Comprobando…** | Encendido, todavía sin el primer ping. |
| **Vigilando** (verde) | Responde — y la app verificó que quien responde es **ese** equipo. |
| **Otro equipo** / **No resuelve** (ámbar) | *Otro equipo*: esa IP la ocupa otro dispositivo; un escaneo reencuentra al tuyo en su dirección nueva. *No resuelve*: el nombre no se pudo traducir a una dirección, así que **no se llegó a preguntar** — no es una caída y no genera aviso; lo que hay que mirar está en tu máquina. |
| **Sin respuesta · hace 5 min** (rojo) | No contesta, con el "hace cuánto" pegado. |

::: tip El porcentaje de pérdida es la mitad que importa
Un destino que **cae y vuelve** responde bien la mayor parte del tiempo: mirando
solo el tiempo de respuesta parecería sano. Es la pérdida la que lo delata. El
tiempo se pone en ámbar a partir de 120 ms y **nunca en rojo**; la pérdida va a
ámbar y a rojo a partir del 10 %.
:::

Cuando un destino vigilado deja de responder, el [centinela](../centinela) lo
avisa como **"Referentes sin respuesta"** — pensado, por ejemplo, para el
router de un nodo, cuya caída explica la de todos los radios que cuelgan de él.
Como toda alerta, puede llegarte también por notificación de Windows o al
teléfono.

### Acciones del destino

El **clic en el chip de Vigilancia** abre sus acciones:

- **Vigilar destino** — lo pone en custodia del centinela, o lo retira.
- **Avisar la reconexión** — la app te avisa cuando vuelva a responder, una vez
  o cada vez. Ver [Centinela](../centinela#avisar-la-reconexion).
- **Retirar del proyecto** — borra todo registro y acciones de diagnóstico.

::: warning Lo que la vigilancia NO es
- **No mide la calidad de un enlace.** Es un ping desde SignalScope: arrastra tu
  red local y todo el camino intermedio. La columna Latencia de *Estaciones* es
  otra cosa —la mide el radio sobre su propio tramo aéreo— y no comparten
  umbrales.
- **No abre sesión ni lee configuración.** De un referente solo se sabe si
  responde y cuánto tarda.
- **No sigue a un destino que cambia de IP** si su identidad es la IP (ruteado o
  alta manual): no hay sesión que lo reidentifique. Con MAC visible, el escaneo
  sí lo reengancha.
:::

### Retirar es de verdad

**Retirar del proyecto** borra el registro completo de ese destino, incluida la
decisión de haberlo apartado. Si un escaneo posterior lo reencuentra, vuelve a
**Detectados** como si fuera nuevo — ese es también el camino para recuperar un
radio llevado a Referentes por error.

::: tip Referentes no es "lo que sobra"
Es inventario **permanente** y sobrevive a *Limpiar lista*. La cola que se vacía
es **Detectados**. Cada fila de Referentes la pusiste tú, así que ninguna es
ruido — y por eso los reportes las llevan **todas**, vigiladas o no.
:::
