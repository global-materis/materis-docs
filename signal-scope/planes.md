# Planes

El plan decide cuántos equipos registra tu proyecto y si tienes la Topología
y los Snapshots. Todo lo demás —el Monitor, el diagnóstico, el centinela, el
Mapa y las herramientas— funciona igual en todos los planes.

## Qué permite cada plan

| | Starter | Expansion | Advanced |
|---|---|---|---|
| Registros | 45 | 200 | 500 |
| Nodos del Mapa | 1 | Sin límite | Sin límite |
| Topología | No | Sí | Sí |
| Snapshots | No | Sí | Sí |
| Licencia | No hace falta | Con clave | Con clave |
| Vencimiento | No vence | Según tu compra | Según tu compra |

**Starter** es gratis y no necesita licencia: es el plan con el que abre la
app cuando no hay ninguna activada. **Expansion** tiene una versión de prueba,
que se activa con su propia clave. Los precios y la compra están en
[sscope.materis.io](https://sscope.materis.io/es#licencia).

**Full Access** es la licencia de quien compró SignalScope antes de estos
planes. No tiene topes y da todo lo que da Advanced.

## Qué cuenta como registro

Cada fila de las tablas **Puntos de acceso**, **Estaciones** y **Referentes**
ocupa un registro. Un equipo con dos radios ocupa dos, porque tiene una fila
por radio.

No ocupan registro:

- Los equipos de **Detectados**, que todavía no has clasificado.
- Las [Estaciones Asistidas](./interfaz/estaciones#estaciones-asistidas), que
  aporta su AP y no tienen sesión propia.

## Ver tu plan

Abre la vista **Licencia** en la Bienvenida. Arriba está el nombre del plan,
y debajo lo que permite: **Registros** (cuántos usas de cuántos), **Nodos del Mapa**, **Topología** y
**Snapshots**. Con una licencia activada también ves su clave, el correo, los
equipos en que está activa y la fecha de vencimiento.

Una función que tu plan no incluye sigue a la vista con un candado y el nombre
del plan que la abre. En Starter lo verás en el botón **Topología** y en el
selector de **Snapshots** de la barra superior, y en **Snapshots** y
**Comparar** del menú Herramientas.

## Al llegar al tope

Cuando el proyecto llena sus registros, la app no deja añadir otro. La
ventana de inicio de sesión de un radio nuevo lo dice antes de que lo
intentes: **"Llegaste al tope de 45 registros de tu plan."** (con el número de
tu plan). Si aun así lo intentas, o pasas un equipo a Referentes, aparece el
aviso **"Límite de tu plan"**, con un enlace a **Ver planes**. Con Starter,
registrar un segundo nodo en el Mapa tampoco se puede, y la app avisa de que
tu plan permite un nodo.

El tope solo frena lo nuevo. Un proyecto que ya tiene más registros, nodos o
Snapshots de los que permite tu plan se abre entero y sigue vigilándose. Los
Snapshots guardados se conservan en el archivo, aunque con Starter no puedas
abrirlos.

## Activar una clave

En la vista **Licencia**, escribe el **correo** con que compraste y la
**clave de licencia**, y pulsa **"Activar licencia"**. La clave de la prueba
de Expansion se activa igual. Si estás en la prueba y compras un plan, activa
la clave nueva en el mismo sitio: **"¿Compraste un plan? Activa su clave"**.

La activación ocupa un cupo de equipos de tu licencia. Para pasarla a otra
PC, mira [Cambiar de máquina](./instalacion#cambiar-de-maquina).

## Si la licencia vence

La app pasa a Starter y no borra nada. La vista Licencia dice **"Vencida"** y
ofrece renovar. Al renovar o activar otra clave, vuelves a tu plan con el
proyecto tal como estaba.
