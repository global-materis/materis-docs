# Puntos de acceso

Tus estaciones base. **Una fila es un AP**, con el estado del sector completo.
En un MikroTik la fila es un radio: cada radio en modo AP tiene la suya
([cómo se reparten](./estaciones#equipos-mikrotik-una-fila-por-radio)).

![La tabla de AP: Estado por sector (Operativo, Inestable, Carga alta), SSID, frecuencia y canal, estaciones conectadas, Picos, Airtime y CPU](/signal-scope/tabla-ap.webp)

## Estado: el veredicto del sector

La columna **Estado** es un diagnóstico propio del AP que combina cuatro ejes:

- **Carga del canal**: *Operativo* (< 50 % de aire ocupado), *Carga alta*
  (del 50 al 69 %) o *Saturado* (≥ 70 %).
- **Salud del radio**: CPU y memoria, en *Atención* o *Crítico*.
- **Latencia del sector**: los picos de sus estaciones (columna Picos).
- **El puerto de subida**: un AP cuyo puerto negocia en **half duplex** pasa a
  *Atención*, y uno a **10 Mbps**, a *Crítico*. Ver abajo.

### El cable de subida condena al AP entero

Un punto de acceso cuyo puerto negocia a 10 Mbps o en half duplex
**estrangula a todas sus estaciones a la vez**. El resultado son quince
clientes lentos con la RF impecable y ninguna pista en la señal que explique
por qué.

Por eso tiñe su Estado como el de cualquier equipo, y el centinela avisa con un
evento propio, **"LAN a 10 Mbps"**, que puedes apagar en
**Preferencias → Alertas**.

**Un cable desenchufado no tiñe a nadie**, y es a propósito, porque puede ser
el router del cliente apagado y no una avería tuya. El hecho se ve en la
columna Puertos y el centinela avisa del cambio.

Dos detalles del criterio:

- **Se juzga la media sostenida y no el instante.** Abrir la web de un AP
  dispara su CPU unos segundos, y eso no lo pinta de rojo. El tooltip muestra
  los dos números, como "aire ocupado 85 % (sostenido 62 %)", para que el
  veredicto cuadre con lo que ves.
- Los picos repetidos y breves no son saturación. Esa forma tiene su propia
  etiqueta, **Inestable**.

Un AP sin lectura muestra `—` en vez de un verde, porque sin medición no hay
veredicto. El tooltip del Estado tiene el mismo formato de diagnóstico que el
de las estaciones: el hecho, su contexto y las causas.

## La celda Estaciones: tres gestos

Junto al número de clientes conectados (lo que el AP reporta de sí mismo) hay
tres controles distintos:

| Control | Qué hace |
|---|---|
| El **número** (enlace) | Filtra la tabla de estaciones a las de este AP. Responde a *"¿quiénes cuelgan de aquí?"*. |
| El **radar** | Le **pregunta al AP** qué estaciones tiene y agrega a **Detectados** las que el proyecto no conocía. No depende de las redes registradas, así que encuentra antenas en segmentos que el escaneo no alcanza, como una instalación nueva. Funciona igual en **airMAX y en MikroTik**, y al terminar te dice **cuántas son nuevas, cuántas ya tenías y cuáles ve el AP en otra dirección**. |
| El **ping** | Abre el Ping continuo con las estaciones **registradas** de este AP ya marcadas. El tooltip dice cuántas son antes de abrirlo. |

En la tabla de estaciones existe el camino inverso: la columna AP salta a esta
fila.

## Las demás columnas

| Columna | Qué muestra |
|---|---|
| **Sesión** | El estado de conexión, igual que en estaciones. Un clic abre la [ventana de sesión](./estaciones#la-ventana-de-sesion), con sus pestañas Acciones, Puertos, Log y Conexión, y desde *Acciones* puedes apagar la sesión, silenciar sus avisos o pedir el aviso de reconexión. Si el AP se ausenta, el chip dice [qué le pasa](./estaciones#cuando-un-equipo-se-ausenta). |
| **SSID** | El nombre de red que difunde el AP. |
| **Picos** | `3/14` indica cuántas de sus estaciones en línea tienen picos de latencia. Se enciende en ámbar cuando la mayoría (y al menos 3) los tienen: si un cliente tiene picos, el problema es ese cliente; si los tiene la mayoría del sector, es el aire compartido. Con menos de 3 estaciones en línea muestra `—`. |
| **Airtime** | El aire ocupado del canal (%), el dato crudo detrás del Estado. |
| **CPU · RAM libre** | La salud del radio: uso de CPU y memoria **disponible** (en RAM libre, más es mejor). No lleva color. El veredicto lo da el Estado, que juzga lo sostenido, porque abrir la web del AP dispara su CPU unos segundos y eso no es una avería. |
| **Thr. TX / RX** | El tráfico **agregado** del AP, con todas sus estaciones juntas. Ojo con la dirección: aquí **TX es lo que baja** hacia los clientes. Responde a "¿ocupado con qué?" cuando el aire sale alto. |
| **Puertos** | Todos los puertos Ethernet del AP, con los mismos conectores RJ45 de [Estaciones](./estaciones#puertos-un-conector-por-puerto). En la pestaña [Puertos](./estaciones#puertos-que-vigila-el-centinela) de su ventana de sesión eliges **cuáles vigila el centinela**. Aquí el caso importante es la **degradación**: un AP que negocia 100 Mbps donde antes daba 1000 se ve perfecto en RF y estrangula a todo su sector. El `↓` ámbar lo delata frente a su propio historial. |
| **Frecuencia / Canal** | Sirve para detectar solapamientos entre tus propios AP. |
| **Nombre · Firmware · MAC · Modelo · TX Power · Uptime** | Identidad y contexto del equipo. |

::: tip Si un AP cambia de IP
La app lo busca por la IP que declaran sus estaciones (airOS) o por ARP en la
red de esta PC, se reconecta sola y deja un aviso en la campana:
*"&lt;AP&gt; cambió de IP"*. En un AP no es lo normal, así que conviene revisar
si su dirección debería ser fija. Mientras un AP está ausente, sus estaciones
esperan a que vuelva.
:::

Como en todas las tablas, tiene buscador propio, orden por cabecera y columnas
ocultables, y el **clic en el nombre** aísla ese AP (otro clic lo deshace).

::: tip Un AP MikroTik no tiene Airtime ni Picos
RouterOS no publica la ocupación del canal, y sin latencia de enlace tampoco
hay Picos. Su **Estado** se resuelve con los ejes que sí puede medir (salud del
radio y puerto de subida), y esas dos celdas quedan vacías. El detalle está en
[Equipos compatibles](../compatibilidad#que-ves-de-un-mikrotik-y-que-no).
:::

::: tip El diagnóstico no receta
Cuando un sector muestra picos, el diagnóstico entrega el hecho y el triage
(canal, carga o enlaces flojos), pero no prescribe "cambia de frecuencia". Tres
causas distintas producen el mismo cuadro, y la decisión es tuya con el
contexto que la app te da.
:::
