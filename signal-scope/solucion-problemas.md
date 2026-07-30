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

::: details Cambió la IP de un equipo y la app muestra la vieja
Vuelve a escanear: la identidad de cada equipo es su **MAC**, así que el
re-escaneo actualiza la IP sin perder nombre, referencias ni credenciales. En
equipos **ruteados** (sin MAC visible) el cruce automático no es posible —
inicia sesión en la IP nueva y la app lo reconoce al identificarse.
:::

## Sesiones y monitoreo

::: details La sesión de un radio sale en ámbar con un candado abierto
Ese radio solo respondió por **HTTP sin cifrar**: usuario, contraseña y
métricas viajan legibles dentro de tu red. La app lo marca en vez de
ocultarlo para que decidas — la salida de fondo es habilitar HTTPS o SSH en
el equipo.
:::

::: details Una estación aparece "Ausente" pero responde al ping
"Ausente" significa que la **sesión** se perdió, no necesariamente el equipo:
una sesión web caducada por el radio produce exactamente eso. La app
reintenta la reconexión sola con las credenciales guardadas; el tooltip del
chip "Ausente" muestra el motivo y cuándo se le vio por última vez.
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
"mal" — no tienen por qué coincidir.
:::

::: details El centinela no avisó de una caída de madrugada
El centinela vigila **mientras la app está abierta** — no es un servicio en
segundo plano. Lo que pase con la app cerrada no lo verá; la propia app lo
recuerda al pie del panel de alertas.
:::

::: details Windows pide permiso de firewall al usar la prueba de velocidad
Es normal: el servidor de prueba de velocidad **abre un puerto de escucha**
en tu PC para que el radio se conecte a medir. Solo escucha mientras lo
tengas encendido y deja de hacerlo al apagarlo o cerrar la app.
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

::: details Quiero recuperar un equipo que descarté con "No es un radio"
En la tabla **Otros**, pulsa **Retirar** en su fila y vuelve a escanear: el
equipo reaparece en **Detectados** como si fuera nuevo, listo para iniciar
sesión.
:::

## Preguntas frecuentes

**¿SignalScope puede cambiar la configuración de mis radios?**
No. Es de solo lectura por diseño: no existe en la app ninguna vía para
modificar un equipo.

**¿Funciona con radios que no sean Ubiquiti airMAX?**
Hoy la app gestiona radios **Ubiquiti airMAX**. Los demás equipos de tu red
(MikroTik, ONUs, switches) pueden registrarse en **Otros**, con nombre y
vigilancia básica de disponibilidad. El soporte para **MikroTik** está en los
planes de próximas versiones.

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
