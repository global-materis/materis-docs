# Instalación y activación

SignalScope se instala en **Windows 10 u 11 (64 bits)**. No pide permisos de
administrador ni necesita drivers o programas adicionales. Tus datos viven en tu
perfil de usuario y se conservan al actualizar o reinstalar la app.

## Instalar

SignalScope se distribuye por la **Microsoft Store**:

**[Obtener SignalScope en Microsoft Store](https://apps.microsoft.com/store/detail/9NPZ6VTKF989)**

Se instala como cualquier app de la tienda. Cuando hay una versión nueva, la
propia app te avisa y la instala desde dentro (ver
[Actualizaciones](#actualizaciones)).

## Primer arranque

Al abrir SignalScope verás primero la pantalla de carga y, enseguida, la
**pantalla de licencia**.

Los datos (proyectos recientes, preferencias, caché) se guardan en
`%APPDATA%\SignalScope`. Si vienes de una versión portable antigua, la app
migra esa carpeta automáticamente en el primer arranque.

## La pantalla de licencia

SignalScope requiere una licencia para funcionar. La pantalla ofrece dos vías, y
las dos dan acceso completo a todas las funciones:

| | Versión de prueba | Licencia Full |
|---|---|---|
| Duración | 30 días | Anual |
| Requiere internet | No | Solo para activar y revalidar |
| Requiere correo | No | Sí (el del titular) |
| Equipos | La máquina donde se instaló | Según el cupo de tu licencia |

Arriba están los campos **Correo electrónico** y **Clave de licencia** con el
botón **"Activar y continuar"**. Debajo, separado por una **O**, está el botón
de la prueba. El recuadro **Compatibilidad** del pie resume qué sistemas admite
la app: MikroTik aparece como **"MikroTik · beta"** y TP-Link como
**"TP-Link · pronto"**.

![La pantalla de licencia: correo y clave para activar la Full, o el botón ámbar de continuar con la versión de prueba](/signal-scope/pantalla-licencia.png)

## Versión de prueba (30 días)

Pulsa **"Continuar con la versión de prueba · quedan N días"** y entras con
acceso completo, sin correo y sin conexión. Debajo del botón la app indica hasta
qué fecha dura: "Sin clave ni tarjeta · monitoreo completo hasta el…".

Conviene saber:

- El contador corre desde el primer arranque tras instalar, no desde que pulsas
  el botón.
- Hay una sola prueba por equipo. Reinstalar la app o borrar sus datos no la
  reinicia.
- Mientras dura la prueba, la pantalla de licencia aparece en cada arranque con
  los días restantes. Dentro de la app, una píldora ámbar **"Prueba · N
  día(s)"** te lleva a la vista **Licencia**, desde donde puedes registrar la
  Full en cualquier momento sin reinstalar ni perder nada.
- Al vencer, la opción de prueba desaparece y la app queda a la espera de una
  licencia Full. **Tus proyectos no se borran**: al activar, todo sigue donde
  estaba.

## Licencia Full

La licencia Full es anual y se adquiere escribiendo a **support@materis.io**
(el enlace **"¿Necesitas una licencia?"** de la pantalla abre un correo a esa
dirección). Recibirás una **clave de licencia** asociada a tu correo.

Para activarla necesitas conexión a internet, solo en ese momento:

1. En la pantalla de licencia, o en la vista **Licencia** si estás en la
   prueba, escribe **el correo del titular** de la licencia y la **clave**.
2. Pulsa **"Activar y continuar"**. La licencia queda vinculada a esa máquina y
   la app entra directamente.

::: warning El correo importa
La activación valida que el correo sea el del **titular** de la licencia. Si
compraste con un correo y activas con otro, el servidor la rechazará.
:::

### Después de activar

- **El día a día no necesita internet.** El monitoreo trabaja contra tu red
  local, y la app revalida la licencia sola cuando hay conexión.
- Sin conexión la app sigue operando. Si pasan más de 7 días sin poder
  revalidar, sigue funcionando, pero te avisa de que reconectes pronto para
  conservar la activación de ese equipo.
- Si el servidor no responde, la app **no te bloquea**. Distingue "no pude
  consultar" de "la licencia fue rechazada", y en el primer caso sigue operando
  con su último estado válido.
- El estado completo (licencia activa, correo, clave enmascarada, plan y cupo de
  equipos) está en la vista **Licencia** de la pantalla de bienvenida.

### Renovar

- La licencia es anual y la app te avisa con anticipación del vencimiento, en la
  Bienvenida y en la vista Licencia, incluso sin conexión.
- Junto al aviso (y en la pantalla de licencia, si ya venció) aparece
  **"Renovar licencia"** con el importe a la vista. El botón abre en tu
  navegador el enlace de pago que Materis ya emitió, el mismo que te llega por
  correo. La app no crea cobros: solo te lleva adonde pagar.
- Si ya informaste tu pago, el botón se reemplaza por esa confirmación, para no
  insistirle a quien ya pagó.
- Entre el aviso anticipado y la vigencia del enlace hay margen para renovar
  **antes** de cualquier corte del servicio.

### Cambiar de máquina

La licencia ocupa un cupo por máquina. Para mudarte:

1. En la máquina vieja, abre la vista **Licencia** y pulsa **"Liberar licencia
   de este equipo"**. Eso libera el cupo y te devuelve a la pantalla de
   activación.
2. En la máquina nueva, activa con el mismo correo y la misma clave.

::: warning Libera antes de formatear o desinstalar
Desinstalar la app **no** libera el cupo. Si la máquina ya no existe (formateo,
falla de disco) y el cupo quedó ocupado, escribe a **support@materis.io** para
liberarlo.
:::

## Actualizaciones

Tus proyectos, preferencias y licencia se conservan en cada actualización. El
historial de cambios de cada versión se consulta dentro de la app, en la vista
**Novedades**.

Cuando hay una versión nueva aparece un botón de actualizar en dos sitios: el
pie del rail de la Bienvenida (**"Actualizar SignalScope"**) y la barra del
Monitor (**"Actualizar"**). El botón solo existe cuando hay algo que actualizar,
porque un botón permanente se deja de leer y uno que aparece se nota.

Al pulsarlo, la app avisa de lo único que hay que decidir: **se cerrará por
completo** y, mientras tanto, dejará de monitorear tu red y de enviarte
notificaciones. Antes de empezar guarda tu proyecto. Pulsas **"Actualizar
ahora"**, Windows pide su propia confirmación, aparece la barra de avance y la
app se cierra sola al terminar. Si algo falla, puedes **Reintentar** o terminar
con **"Abrir en la Microsoft Store"**.

La app **no vuelve a abrirse por su cuenta**. Hasta que la abras, tu red no está
vigilada, y por eso el momento lo eliges tú. Al abrirla retomas donde lo
dejaste.

La comprobación corre cada 6 horas y **no instala nada sola**: lo único que hace
es que el botón aparezca.

::: info 🖼️ Imagen pendiente: `actualizar.png`
El modal de actualización desde la Microsoft Store: el aviso de que la app se
cerrará y dejará de vigilar, y el botón **Actualizar ahora**.
:::

## Arranque, bandeja y cierre

Tres comportamientos que conviene conocer desde el primer día.

### Cerrar la ventana no cierra la vigilancia

Con un proyecto abierto, la **X** no cierra la app: la esconde en la bandeja del
sistema, junto al reloj, y la app **sigue midiendo y avisando**.

- La primera vez aparece el aviso **"SignalScope en segundo plano"**, que
  explica dónde queda la app y cómo cerrarla del todo. Tiene dos botones:
  **"Entendido, dejarla vigilando"** esconde la ventana y no vuelve a mostrar el
  aviso. **"Salir del todo"** cierra la app en ese momento, y como no das el
  aviso por visto, la próxima X te lo vuelve a mostrar.
- Para cerrar SignalScope por completo usa **Archivo → Salir de SignalScope**
  (pide confirmación) o haz clic derecho en su icono de la bandeja y elige
  **"Salir de SignalScope"**.
- **Sin proyecto abierto, la X cierra la app.** Solo se queda residente cuando
  tiene algo que vigilar.
- El clic izquierdo en el icono de la bandeja muestra u oculta la ventana. El
  clic derecho abre su menú, cuya primera línea dice qué proyecto está abierto y
  su estado (por ejemplo, cuántos equipos vigila o cuántos avisos tiene). El icono
  lleva un punto rojo mientras haya avisos pendientes; los de equipos
  silenciados no cuentan. Desde el menú puedes **"Abrir SignalScope"**, ir al
  Monitor o al Mapa (**"Ir al Monitor"**, **"Ir al Mapa"**), **"Guardar
  proyecto"** o salir.
- Si pulsas una notificación de Windows, la app se abre en el equipo que la
  causó y no en la pantalla de inicio. Las notificaciones se activan en
  **Preferencias → Alertas**, con el interruptor **"Notificaciones en
  Windows"**.

::: tip ¿Y si quiero dejar de vigilar sin cerrar la app?
Usa **Archivo → Cerrar proyecto**: deja de vigilar y vuelve a la Bienvenida,
sin borrar el proyecto. Ese proyecto se queda cerrado en el siguiente arranque en
vez de reabrirse solo.
:::

::: info 🖼️ Imagen pendiente: `bandeja.png`
El menú del icono de bandeja: la cabecera con el nombre del proyecto y su
estado, los accesos a Monitor y Mapa, y Salir.
:::

### Iniciar con Windows

En **Preferencias → General → Arranque** está el interruptor **"Iniciar con
Windows"**: "Añade SignalScope a las aplicaciones de arranque de Windows, y
arranca con el último proyecto que dejaste abierto." Al encender la PC, la app
se abre sola y te deja **directamente en el Monitor** de ese proyecto.

Hay tres detalles que no son evidentes:

- **No se salta nada.** Aparece la pantalla de carga de siempre, que es donde
  se comprueba la licencia y se abre tu proyecto con sus llaves. Solo cambia la
  pantalla en la que aterrizas.
- **No reabre un proyecto que cerraste a mano.** En ese caso te deja en la
  Bienvenida, con el proyecto a un clic.
- **Windows puede impedir el cambio.** Si apagaste el arranque desde el
  Administrador de tareas o desde Configuración → Aplicaciones → Inicio, la app
  ya no puede volver a encenderlo y el interruptor lo explica: "Lo apagaste desde
  Windows, así que solo tú puedes volver a encenderlo, en Configuración →
  Aplicaciones → Inicio." Si lo controla una directiva de tu organización,
  también lo dice, en vez de prometer un arranque que no va a ocurrir.

### Los avisos no dependen de qué pantalla mires

Con el proyecto abierto, el centinela vigila en cualquier pantalla: en el
Monitor, en el Mapa, en la Bienvenida (que además te dice si está vigilando y
cuántos equipos) o con la ventana escondida en la bandeja.
