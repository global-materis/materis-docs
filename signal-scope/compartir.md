# Compartir

Hay dos cosas que se comparten, y son archivos distintos: **una captura**
(`.ssnap`) para mostrarle un momento de la red a otro operador, y **el
proyecto completo** (`.sscope`) para trabajar la misma red desde otra PC.

## Compartir una captura: el `.ssnap`

Desde el strip de snapshots, cualquier captura se exporta como archivo
**`.ssnap`**. El otro operador lo abre con su SignalScope en **modo visor**:
ve las tablas de ese momento —estaciones, AP, diagnóstico, incluso el mapa si
la captura lo trae— y puede generar reportes de ella, pero nada más: sin
escaneo, sin sesiones, sin tocar tu red.

El `.ssnap` **no lleva secretos por diseño**: nunca contiene credenciales de
radios ni llaves. Por eso abrirlo no pide nada.

::: info 🖼️ Imagen pendiente — `public/signal-scope/visor-ssnap.png`
Captura del **visor de un `.ssnap`**: el banner de "Snapshot compartido · solo
lectura" sobre las tablas.

_Existente: `ss-desktop/docs/screenshots/SignalScope-Visor.png`._
:::

### Proteger los datos sensibles

Que no haya secretos no significa que no haya datos **sensibles para tu
negocio**: IPs, MACs, nombres de clientes, el tamaño de tu red. En
**Archivo → Seguridad** eliges qué campos son privados, y al proteger una
captura esos datos se recortan **en el archivo mismo** — lo que no está en el
archivo no se puede filtrar:

- Las IPs y nombres se recortan (`10.•.•.20`, `tal•••`).
- La MAC se oculta casi completa — sus primeros pares delatan al fabricante.
- Modelo, firmware y el conteo de estaciones se eliminan.

Puedes proteger una captura existente con el **candado** del strip, o activar
que **toda captura nazca protegida**. El recorte es **permanente**: el modal
de confirmación lo advierte y ofrece crear antes una copia sin proteger, que
queda en tu historial con sus datos completos.

Aparte va la **ubicación**: si marcas "No registrar ubicación", las
coordenadas no se recortan — **se eliminan**, y esa captura se comparte sin
mapa.

## Compartir el proyecto: el código de transferencia

El `.sscope` guarda las credenciales de tus radios **cifradas y ancladas a tu
PC**: copiar el archivo a otra máquina no las expone — allá el proyecto abre,
pero sin credenciales. Para que otra PC (tuya o de un colega de confianza)
trabaje el proyecto completo existe el **código de transferencia**:

1. En tu PC, abre **Compartir proyecto** y consulta el código
   (formato `XXXX-XXXX-XXXX`). Todo proyecto nace con uno.
2. Envía el archivo `.sscope` por donde quieras, y el código **por otro
   canal** (una llamada, un mensaje aparte).
3. En la PC destino, al abrir el archivo se pide el código **una sola vez**;
   desde entonces esa máquina queda vinculada y abre el proyecto normalmente.

Mover tu proyecto a una PC nueva es exactamente el mismo flujo.

::: tip Si el código se filtró
**Regenerar el código** invalida el anterior en el acto: los archivos que ya
compartiste dejan de poder desbloquearse con el código viejo.
:::

::: warning El archivo protegido no se abre a medias
Un `.sscope` que pide código **no muestra nada** hasta ingresarlo. Y las
credenciales viajan siempre cifradas: ni quien intercepte el archivo ni quien
lo reciba sin código puede leerlas.
:::

## ¿Cuál de los dos enviar?

| Quieres… | Envía |
|---|---|
| Mostrar el estado de la red, pedir una segunda opinión | **`.ssnap`** (protegido si va fuera de tu equipo de confianza) |
| Que un colega trabaje tu red: escanear, monitorear, sesiones | **`.sscope` + código** por canales separados |
| Mudarte de PC | **`.sscope` + código** (y libera la licencia en la PC vieja — ver [Instalación](./instalacion#cambiar-de-maquina)) |
