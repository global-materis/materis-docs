# Instalación y activación

SignalScope es compatible con **Windows 10 u 11 (64 bits)**. No pide permisos de
administrador ni necesita drivers o programas adicionales. Tus datos viven en tu
perfil de usuario y se conservan al actualizar o reinstalar la app.

## Instalar

SignalScope se distribuye por la **Microsoft Store**:

**[Obtener SignalScope en Microsoft Store](https://apps.microsoft.com/store/detail/9NPZ6VTKF989?cid=DevShareMCLPCS)**

Cuando hay una versión nueva, la propia app te avisa (ver [Actualizaciones](#actualizaciones)).

## Primer arranque

Al abrir SignalScope verás primero la pantalla de carga y, enseguida, la **pantalla de licencia**.

Los datos (proyectos recientes, preferencias, caché) se guardan en `%APPDATA%\SignalScope`.

## La pantalla de licencia

SignalScope requiere una licencia para funcionar. La pantalla ofrece dos vías, y
las dos dan acceso completo a todas las funciones:

| | Versión de prueba | Licencia Full |
|---|---|---|
| Duración | 30 días | Anual |
| Requiere internet | No | Solo para activar y revalidar |
| Requiere correo | No | Sí (el del titular) |
| Equipos | La máquina donde se instaló | Según el cupo de tu licencia |

![La pantalla de licencia: correo y clave para activar la Full, o el botón ámbar de continuar con la versión de prueba](/signal-scope/pantalla-licencia.png)

## Versión de prueba (30 días)

Pulsa **"Continuar con la versión de prueba"** y entras con
acceso completo, sin correo y sin conexión.

El contador corre desde el primer arranque tras instalar.

## Adquirir Licencia

Obten tu licencia desde la web oficial [sscope.materis.io](https://sscope.materis.io/es#licencia)

### Renovar

La licencia es anual y la app te avisa con anticipación del vencimiento y si deseas renovar.
Podrás ir tambien a tu [Panel](https://panel.materis.io/) para poder renovar.


### Cambiar de máquina

La licencia ocupa un cupo por máquina. Para mudarte:

1. En la máquina vieja, abre la vista **Licencia** y pulsa **"Liberar licencia
   de este equipo"**. Eso libera el cupo y te devuelve a la pantalla de activación.
2. En la máquina nueva, activa con el mismo correo y la misma clave.

::: warning Libera antes de formatear o desinstalar
Desinstalar la app **no** libera el cupo. Si la máquina ya no existe (formateo,
falla de disco) y el cupo quedó ocupado, escribe a **support@materis.io** para liberarlo.
:::

## Actualizaciones

La licencia cubre futuras actualizaciones. Garantizamos la protección de tus proyectos, 
preferencias y la compatibilidad para proyectos de versiones anteriores.

## Arranque, bandeja y cierre

Tres comportamientos que conviene conocer desde el primer día.

### Diagnostico en segundo plano

- La primera vez aparece el aviso **"SignalScope en segundo plano"**, que
  explica dónde queda la app y cómo cerrarla del todo.
- Para cerrar SignalScope por completo usa **Archivo → Salir de SignalScope**
  o haz clic derecho en su icono de la bandeja y elige **"Salir de SignalScope"**.
- El clic izquierdo en el icono de la bandeja muestra u oculta la ventana. El
  clic derecho abre su menú, cuya primera línea dice qué proyecto está abierto y
  su estado (por ejemplo, cuántos equipos vigila o cuántos avisos tiene). El icono
  lleva un punto rojo mientras haya avisos pendientes; los de equipos
  silenciados no cuentan. Desde el menú puedes **"Abrir SignalScope"**, ir al
  Monitor o al Mapa (**"Ir al Monitor"**, **"Ir al Mapa"**), **"Guardar
  proyecto"** o salir.
- Si pulsas una notificación de Windows, la app se abre en el equipo que la causó. Las 
  notificaciones se activan en **Preferencias → Alertas**, con el interruptor **"Notificaciones en
  Windows"**.

::: tip ¿Y si quiero dejar de vigilar sin cerrar la app?
Usa **Archivo → Cerrar proyecto**: deja de vigilar y vuelve a la Bienvenida.
:::

![El menú del icono de bandeja: la cabecera con el nombre del proyecto y su estado, los accesos a Monitor y Mapa, y Salir](/signal-scope/bandeja.png)

### Iniciar con Windows

En **Preferencias → General → Arranque** está el interruptor **"Iniciar con
Windows"**: "Añade SignalScope a las aplicaciones de arranque de Windows, y
arranca con el último proyecto que dejaste abierto." Al encender la PC, la app
se abre sola y te deja **directamente en el Monitor** de ese proyecto.

::: warning Windows puede impedir arranque
  Si apagaste el arranque desde el Administrador de tareas o desde Configuración → Aplicaciones → Inicio, 
  desde app ya no puede volver a encenderlo.
:::