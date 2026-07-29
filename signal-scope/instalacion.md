# Instalación y activación

SignalScope se instala en **Windows 10 u 11 (64 bits)**, no pide permisos de
administrador y no necesita drivers ni programas adicionales. Tus datos viven en
tu perfil de usuario y **sobreviven a actualizaciones y reinstalaciones**.

## Instalar

SignalScope se distribuye por la **Microsoft Store**:

**[Obtener SignalScope en Microsoft Store](https://apps.microsoft.com/store/detail/9NPZ6VTKF989)**

Se instala como cualquier app de la tienda y las **actualizaciones llegan
solas**.

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

::: info 🖼️ Imagen pendiente — `public/signal-scope/pantalla-licencia.png`
Captura de la **pantalla de licencia**: el formulario de activación (correo +
clave) y el botón ámbar "Continuar con la versión de prueba · quedan N días".
:::

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

No tienes que hacer nada: la **Microsoft Store actualiza la app sola**. Tus
proyectos, preferencias y licencia se conservan en cada actualización. El
historial de cambios de cada versión se puede consultar dentro de la app, en la
vista **Novedades**.
