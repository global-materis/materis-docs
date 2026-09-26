# Puntos de acceso

Tus estaciones base. **Una fila = un AP**, con el estado del sector completo.

![La tabla de AP: Estado por sector (Operativo, Inestable, Carga alta), SSID, frecuencia y canal, estaciones conectadas, Picos, Airtime y CPU](/signal-scope/tabla-ap.png)

## Estado: el veredicto del sector

La columna **Estado** es un diagnóstico propio del AP que combina cuatro ejes:

- **Carga del canal** — *Operativo* (< 50 % de aire ocupado), *Carga alta*
  (50–69 %), *Saturado* (≥ 70 %).
- **Salud del radio** — CPU y memoria: *Atención* o *Crítico*.
- **Latencia del sector** — los picos de sus estaciones (columna Picos).
- **El puerto de subida** — un AP cuyo puerto negocia **half duplex** pasa a
  *Atención* y uno a **10 Mbps**, a *Crítica*. Ver abajo.

### El cable de subida condena al AP entero

Un punto de acceso cuyo puerto negocia a 10 Mbps o en half duplex
**estrangula a todas sus estaciones a la vez** — quince clientes lentos con la
RF impecable y ninguna pista de por qué en la señal.

Por eso tiñe su Estado como el de cualquier equipo, y el centinela avisa con un
evento propio, **"LAN a 10 Mbps"**, que puedes apagar en
**Preferencias → Alertas**.

**El cable simplemente desenchufado no tiñe a nadie**, y es a propósito:
puede ser el router apagado del cliente, no una avería tuya. El hecho se ve en
la columna Puertos y el centinela avisa del cambio.

Dos detalles del criterio:

- **Se juzga la media sostenida, no el instante.** Abrir la web de un AP
  dispara su CPU unos segundos; eso no lo pinta de rojo. El tooltip muestra
  ambos números — "aire ocupado 85 % (sostenido 62 %)" — para que el veredicto
  siempre cuadre con lo que ves.
- Picos repetidos y breves no son estar saturado: esa forma tiene su propia
  etiqueta, **Inestable**.

Un AP sin lectura muestra **"—"**, no un verde: sin medición no hay veredicto.
El tooltip del Estado es el mismo formato de diagnóstico que el de las
estaciones: el hecho y su contexto, con las causas.

## La celda Estaciones: tres gestos

Junto al número de clientes conectados (lo que el AP reporta de sí mismo) hay
tres controles distintos:

| Control | Qué hace |
|---|---|
| El **número** (enlace) | Filtra la tabla de estaciones a las de este AP — *"¿quiénes cuelgan de aquí?"* |
| El **radar** | Le **pregunta al AP** cuáles estaciones tiene y agrega a **Detectados** las que el proyecto no conocía. No depende de las redes registradas, así que descubre antenas en segmentos que el escaneo no alcanza — útil para enterarte de una instalación nueva sin escanear. Funciona igual en **airMAX y en MikroTik**, y al terminar te cuenta qué encontró: **cuántas nuevas, cuántas ya tenías y cuáles el AP ve en otra dirección**. |
| El **ping** | Abre el Ping continuo con las estaciones **registradas** de este AP ya marcadas. El título dice cuántas son antes de abrir. |

En la tabla de estaciones existe el viaje inverso: la columna AP salta a esta
fila.

## Las demás columnas

| Columna | Qué muestra |
|---|---|
| **Sesión** | Estado de conexión, igual que en estaciones: un clic abre la [ventana de sesión](./estaciones#la-ventana-de-sesion), con sus pestañas Acciones, Puertos, Log y Conexión. Si el AP se ausenta, el chip dice [qué le pasa](./estaciones#cuando-un-equipo-se-ausenta). |
| **SSID** | El nombre de red que difunde el AP. |
| **Picos** | `3/14` = cuántas de sus estaciones en línea tienen picos de latencia. Se enciende en ámbar cuando la mayoría (y al menos 3) los tienen — un cliente con picos es ese cliente; la mayoría del sector es el aire compartido. Con menos de 3 estaciones en línea muestra "—". |
| **Airtime** | El aire ocupado del canal (%), el dato crudo detrás del Estado. |
| **CPU · RAM libre** | La salud del radio: uso de CPU y memoria **disponible** (en RAM libre, más es mejor). Sin color: el veredicto lo da el Estado, que juzga lo sostenido — abrir la web del AP dispara su CPU unos segundos y eso no es una avería. |
| **Thr. TX / RX** | Tráfico **agregado** del AP, todas sus estaciones juntas. Ojo con la dirección: aquí **TX es lo que baja** hacia los clientes. Responde "¿ocupado con qué?" cuando el aire sale alto. |
| **Puertos** | Todos los puertos Ethernet del AP, los mismos conectores RJ45 de [Estaciones](./estaciones#puertos-un-conector-por-puerto), y en la pestaña [Puertos](./estaciones#puertos-que-vigila-el-centinela) de su ventana de sesión eliges **cuáles vigila el centinela**. Aquí el caso fuerte es la **degradación**: un AP negociando 100 Mbps donde antes daba 1000 se ve perfecto en RF — y estrangula a todo su sector. El `↓` ámbar lo delata contra su propio historial. |
| **Frecuencia / Canal** | Para detectar solapamientos entre tus propios AP. |
| **Firmware · MAC · Modelo · TX Power · Uptime** | Identidad y contexto del equipo. |

::: tip Si un AP cambia de IP
La app lo busca por la IP que declaran sus estaciones (airOS) o por ARP en la
red de esta PC, se reconecta solo y deja un aviso en la campana:
*"&lt;AP&gt; cambió de IP"*. En un AP no es lo normal, así que conviene revisar
si su dirección debería ser fija. Mientras un AP está ausente, sus estaciones
esperan a que vuelva.
:::

Como en todas las tablas: buscador propio, orden por cabecera, columnas
ocultables, y el **clic en el nombre** aísla ese AP (otro clic lo deshace).

::: tip Un AP MikroTik no tiene Airtime ni Picos
RouterOS no publica la ocupación del canal, y sin latencia de enlace tampoco hay
columna de Picos. Su **Estado** se resuelve entonces con los ejes que sí puede
medir —salud del radio y puerto de subida—, y las dos celdas quedan vacías. El
detalle en [Equipos compatibles](../compatibilidad#que-ves-de-un-mikrotik-y-que-no).
:::

::: tip El diagnóstico no receta
Cuando un sector muestra picos, el diagnóstico entrega el hecho y el triage
—canal, carga o enlaces flojos—, pero no prescribe "cambia de frecuencia":
tres causas distintas producen el mismo cuadro, y la decisión es tuya con el
contexto que la app te acerca.
:::
