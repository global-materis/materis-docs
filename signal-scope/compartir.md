# Compartir

Se comparten dos cosas distintas, cada una en su propio archivo: **un
Snapshot** (`.ssnap`) para mostrarle un momento de la red a otro operador, y
**el proyecto completo** (`.sscope`) para trabajar la misma red desde otra PC.

## Compartir un Snapshot: el `.ssnap` {#compartir-una-captura-el-ssnap}

Cualquier Snapshot del historial se exporta como archivo **`.ssnap`** con el
botón **Compartir snapshot (.ssnap)** de su tarjeta. El otro operador lo abre
con su SignalScope, con doble clic o desde la Bienvenida, y entra en **modo
visor**: ve las tablas de ese momento (estaciones, AP, diagnóstico, incluso el
mapa si el Snapshot lo trae) y puede generar reportes. No puede hacer nada
más: el visor no escanea, no abre sesiones ni toca tu red.

El `.ssnap` **no lleva secretos**: nunca contiene credenciales de radios ni
llaves. Por eso abrirlo no pide nada.

![El visor de un .ssnap: el banner "Snapshot compartido del proyecto · solo lectura", los contadores del Snapshot y las tablas en modo Histórico, con el botón Reporte disponible](/signal-scope/visor-ssnap.webp)

### Proteger los datos sensibles

Que no haya secretos no significa que no haya datos **sensibles para tu
negocio**: IPs, MACs, nombres de clientes, el tamaño de tu red. En
**Archivo → Seguridad**, pestaña **Snapshots** (**Privacidad de los
Snapshots**), marcas qué campos son privados, por separado para
**Estaciones** y para **Puntos de acceso · AP**. Al proteger un Snapshot, esos
datos se recortan **en el archivo mismo**, y lo que no está en el archivo no se
puede filtrar:

- Las IPs y los nombres se recortan (`10.•.•.20`, `tal•••`).
- La MAC se oculta casi entera, porque sus primeros pares delatan al
  fabricante.
- El modelo, el firmware y el número de estaciones se eliminan.

Los equipos de Referentes siguen los mismos interruptores que las estaciones.
Si recortas la MAC o eliminas el modelo, su fabricante también desaparece.

Hay dos formas de proteger. El **candado** de la tarjeta protege un Snapshot
que ya existe (está deshabilitado mientras no marques al menos un campo
privado). El interruptor **Aplicar al crear nuevos Snapshots** hace que cada
Snapshot nuevo nazca protegido. El recorte es **permanente**: el aviso de
confirmación lo advierte y ofrece **Crear antes una copia sin proteger**, que
queda en tu historial con los datos completos. Si el historial está lleno, esa
copia no cabe y el interruptor aparece deshabilitado.

La **ubicación** va aparte. Si marcas **No registrar ubicación**, las
coordenadas no se recortan sino que **se eliminan**, y ese Snapshot se comparte
sin Mapa de cobertura.

## Compartir el proyecto: el código de transferencia

El `.sscope` guarda las credenciales de tus radios **cifradas y ancladas a tu
PC**. Copiar el archivo a otra máquina no las expone: allí el proyecto se abre,
pero sin credenciales. Para que otra PC (tuya o de un colega de confianza)
trabaje el proyecto completo existe el **código de transferencia**:

1. En tu PC, abre **Archivo → Compartir proyecto…** y consulta el código
   (formato `XXXX-XXXX-XXXX`). Todo proyecto nace con uno, y el modal guarda
   el proyecto antes de mostrarlo para que el archivo esté al día.
2. Envía el archivo `.sscope` por donde quieras, y el código **por otro
   canal** (una llamada, un mensaje aparte).
3. En la PC destino, al abrir el archivo se pide el código **una sola vez**.
   Desde entonces esa máquina queda vinculada y abre el proyecto normalmente.

Mudar tu proyecto a una PC nueva sigue exactamente el mismo proceso.

::: warning Formatear también cuenta como cambiar de PC
Al formatear, la llave local se pierde junto con Windows y tu propia PC pasa a
ser "una PC nueva": el proyecto pedirá el código de transferencia. **Anótalo
antes de formatear**, porque sin él el archivo no se abre.
:::

::: tip Si el código se filtró
**Regenerar código** invalida el anterior en el acto: los archivos que ya
compartiste dejan de poder desbloquearse con el código viejo. Quien ya abrió el
proyecto en su máquina con el código anterior no pierde ese acceso.
:::

::: warning El archivo protegido no se abre a medias
Un `.sscope` que pide código **no muestra nada** hasta que lo ingresas. Las
credenciales viajan siempre cifradas: ni quien intercepte el archivo ni quien
lo reciba sin el código puede leerlas.
:::

## ¿Cuál de los dos enviar?

| Quieres… | Envía |
|---|---|
| Mostrar el estado de la red, pedir una segunda opinión | **`.ssnap`** (protegido si sale de tu equipo de confianza) |
| Que un colega trabaje tu red: escanear, monitorear, sesiones | **`.sscope` + código** por canales separados |
| Mudarte de PC | **`.sscope` + código** (y libera la licencia en la PC vieja; ver [Instalación](./instalacion#cambiar-de-maquina)) |
