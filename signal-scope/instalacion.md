# Instalación y activación

SignalScope se instala en **Windows 10 u 11 (64 bits)**, no pide permisos de
administrador y no necesita drivers ni programas adicionales. Tus datos viven en
tu perfil de usuario y **sobreviven a actualizaciones y reinstalaciones**.

## Instalar

SignalScope se distribuye por la **Microsoft Store**:

**[Obtener SignalScope en Microsoft Store](https://apps.microsoft.com/store/detail/9NPZ6VTKF989)**

Se instala como cualquier app de la tienda, y cuando hay una versión nueva la
propia app te avisa y la instala **desde dentro** — ver
[Actualizaciones](#actualizaciones).

## Primer arranque

Abre SignalScope. Lo primero que verás es el splash y, enseguida, la
**pantalla de licencia**.

Los datos (proyectos recientes, preferencias, caché) se guardan en
`%APPDATA%\SignalScope`. Si vienes de una versión portable antigua, la app
migra esa carpeta automáticamente en el primer arranque.

## La pantalla de licencia

SignalScope requiere una licencia para funcionar. La pantalla ofrece dos vías,
**ambas con acceso completo a todas las funciones**:

| | Versión de prueba | Licencia Full |
|---|---|---|
| Duración | 30 días | Anual |
| Requiere internet | No | Solo para activar y revalidar |
| Requiere correo | No | Sí (el del titular) |
| Equipos | La máquina donde se instaló | Según el cupo de tu licencia |

![La pantalla de licencia: correo y clave para activar la Full, o el botón ámbar de continuar con la versión de prueba](/signal-scope/pantalla-licencia.png)

## Versión de prueba (30 días)

Pulsa **"Continuar con la versión de prueba"** y listo: acceso completo, sin
correo y sin conexión.

Cosas útiles de saber:

- **El contador corre desde el primer arranque tras instalar**, no desde que
  pulsas el botón.
- Es **una prueba por equipo**: reinstalar la app o borrar sus datos no la
  reinicia.
- Durante la prueba, la pantalla de licencia aparece en cada arranque mostrando
  los días restantes, y dentro de la app una píldora ámbar **"Prueba · N días"**
  te lleva a la vista **Licencia**, desde donde puedes registrar la Full en
  cualquier momento — sin reinstalar ni perder nada.
- Al vencer, la opción de prueba desaparece y la app queda a la espera de una
  licencia Full. **Tus proyectos no se borran**: al activar, todo sigue donde
  estaba.

## Licencia Full

La licencia Full es anual y se adquiere escribiendo a **support@materis.io**.
Recibirás una **clave de licencia** asociada a tu correo.

Para activarla necesitas **conexión a internet** (solo en ese momento):

1. En la pantalla de licencia —o en la vista **Licencia** si estás en la
   prueba—, escribe **el correo del titular** de la licencia y la **clave**.
2. Pulsa activar. La licencia queda vinculada a esa máquina y la app entra
   directo.

::: warning El correo importa
La activación valida que el correo sea el del **titular** de la licencia. Si
compraste con un correo y activas con otro, el servidor la rechazará.
:::

### Después de activar

- **El día a día no necesita internet**: el monitoreo trabaja contra tu red
  local. La app revalida la licencia sola cuando hay conexión.
- **Puede pasar hasta 30 días sin internet**; pasada esa ventana sin poder
  revalidar, la app pedirá conexión para continuar.
- Si el servidor no responde, la app **no te bloquea**: distingue "no pude
  consultar" de "la licencia fue rechazada", y en el primer caso sigue operando
  con su último estado válido.
- El estado completo —licencia activa, correo, clave enmascarada, plan y cupo de
  equipos— vive en la vista **Licencia** de la pantalla de bienvenida.

### Renovar

- La licencia es anual y **la app te avisa con anticipación** del
  vencimiento — en la Bienvenida y en la vista Licencia, visible incluso sin
  conexión.
- Junto al aviso (y en la pantalla de licencia, si ya venció) aparece
  **"Renovar licencia"** con el importe a la vista. El botón abre en tu
  navegador el **enlace de pago que Materis ya emitió** — el mismo que te
  llega por correo; la app no crea cobros, solo te lleva adonde pagar.
- Si ya informaste tu pago, el botón se reemplaza por esa confirmación — no
  se le insiste a quien ya pagó.
- Entre el aviso anticipado y la vigencia del enlace hay margen para renovar
  **antes** de cualquier corte del servicio.

### Cambiar de máquina

La licencia ocupa un cupo por máquina. Para mudarte:

1. En la máquina vieja, abre la vista **Licencia** y pulsa **"Liberar
   licencia"**. Eso libera el cupo.
2. En la máquina nueva, activa con el mismo correo y la misma clave.

::: warning Libera antes de formatear o desinstalar
Desinstalar la app **no** libera el cupo. Si la máquina ya no existe (formateo,
falla de disco) y el cupo quedó ocupado, escribe a **support@materis.io** para
liberarlo.
:::

## Actualizaciones

Tus proyectos, preferencias y licencia **se conservan en cada actualización**, y
el historial de cambios de cada versión se consulta dentro de la app, en la
vista **Novedades**.

Cuando hay una versión nueva aparece un botón **Actualizar** en dos
sitios: el pie del rail de la Bienvenida y la barra del Monitor. **Solo
existe cuando hay algo que actualizar** — un botón permanente se deja de leer;
uno que aparece se nota.

Al pulsarlo, la app avisa de lo único que importa decidir: **se cerrará por
completo y dejará de vigilar**. Luego Windows pide su propia confirmación,
aparece la barra de avance y la app se cierra sola al terminar. **No vuelve a
abrirse por su cuenta**: hasta que la abras, tu red no está vigilada — por eso
el momento lo eliges tú.

La comprobación corre cada 6 horas y **no instala nada sola**: lo único que hace
es que el botón aparezca.

::: info 🖼️ Imagen pendiente — `actualizar.png`
El modal de actualización desde la Microsoft Store: el aviso de que la app se
cerrará y dejará de vigilar, y el botón **Actualizar ahora**.
:::

## Arranque, bandeja y cierre

Tres comportamientos que cambiaron en la v1.3.0 y que **notarás el primer día**.

### Cerrar la ventana no cierra la vigilancia

Con un proyecto abierto, la **X** ya no mata la app: la **esconde junto al reloj**,
en la barra de tareas, y **sigue midiendo y avisando**. Antes la cerraba —y con
ella la vigilancia— sin decir nada.

- **La primera vez te lo explica**, y en ese mismo aviso puedes salir del todo:
  quien de verdad quería cerrar no tiene que ir a buscar el menú de un icono
  que todavía no sabe que existe.
- **Sin proyecto abierto, la X cierra de verdad.** La app se queda residente
  solo cuando tiene algo que hacer.
- El **icono de la bandeja** es un sitio donde mirar, no solo un atajo: su
  primera línea dice **qué proyecto está abierto y su estado**, lleva un punto
  rojo con los avisos pendientes, y desde su menú vuelves al **Monitor** o al
  **Mapa**, o sales del todo.
- Si pulsas una **notificación de Windows**, la app se abre **en el equipo que
  la causó** — no en la pantalla de inicio.

::: tip ¿Y si quiero dejar de vigilar sin cerrar la app?
**Archivo → Cerrar proyecto.** Y ese proyecto se queda cerrado en el siguiente
arranque, en vez de reabrirse solo.
:::

::: info 🖼️ Imagen pendiente — `bandeja.png`
El menú del icono de bandeja: la cabecera con el nombre del proyecto y su
estado, los accesos a Monitor y Mapa, y Salir.
:::

### Iniciar con Windows

En **Preferencias → General → Arranque**, el interruptor **"Iniciar con
Windows"** hace que la app se abra sola al encender la PC y te deje
**directamente en el Monitor** de la red que estaba vigilando.

Tres cosas que no hace lo obvio:

- **No se salta nada.** Sale su pantalla de carga de siempre, que es donde se
  comprueba la licencia y se abre tu proyecto con sus llaves. Lo único que
  cambia es en qué pantalla aterrizas.
- **No reabre un proyecto que cerraste a mano.** Entonces te deja en la
  Bienvenida, con el proyecto a un clic.
- **Windows puede decir que no.** Si apagaste el arranque desde el
  Administrador de tareas o desde Configuración → Aplicaciones → Inicio, la app
  ya no puede volver a encenderlo — solo tú, desde ahí. La casilla te dice cuál
  de los casos es, en vez de prometer un arranque que no va a ocurrir.

### Los avisos no dependen de qué pantalla mires

Con el proyecto abierto, el centinela vigila **estés donde estés**: en el
Monitor, en el Mapa, en la pantalla de inicio — que además te dice si está
vigilando y cuántos equipos— o con la ventana escondida en la bandeja.
