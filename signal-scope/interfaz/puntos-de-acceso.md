# Puntos de acceso

Tus estaciones base. **Una fila = un AP**, con el estado del sector completo.

::: info 🖼️ Imagen pendiente — `public/signal-scope/tabla-ap.png`
Captura de la **tabla de AP**: Estado, SSID, estaciones conectadas, frecuencia
y canal.

_Existente: `ss-desktop/docs/screenshots/SignalScope-Visor-AP.png`._
:::

## Estado: el veredicto del sector

La columna **Estado** es un diagnóstico propio del AP que combina tres ejes:

- **Carga del canal** — *Operativo* (< 50 % de aire ocupado), *Carga alta*
  (50–69 %), *Saturado* (≥ 70 %).
- **Salud del radio** — CPU y memoria: *Atención* o *Crítico*.
- **Latencia del sector** — los picos de sus estaciones (columna Picos).

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
| El **radar** | Le **pregunta al AP** cuáles estaciones tiene y agrega a **Otros** las que el proyecto no conocía. No depende de las redes registradas, así que descubre antenas en segmentos que el escaneo no alcanza — útil para enterarte de una instalación nueva sin escanear. |
| El **ping** | Abre el Ping continuo con las estaciones **registradas** de este AP ya marcadas. El título dice cuántas son antes de abrir. |

En la tabla de estaciones existe el viaje inverso: la columna AP salta a esta
fila.

## Las demás columnas

| Columna | Qué muestra |
|---|---|
| **Sesión** | Estado de conexión, igual que en estaciones. |
| **SSID** | El nombre de red que difunde el AP. |
| **Picos** | `3/14` = cuántas de sus estaciones en línea tienen picos de latencia. Se enciende en ámbar cuando la mayoría (y al menos 3) los tienen — un cliente con picos es ese cliente; la mayoría del sector es el aire compartido. Con menos de 3 estaciones en línea muestra "—". |
| **Airtime** | El aire ocupado del canal (%), el dato crudo detrás del Estado. |
| **CPU · RAM libre** | La salud del radio: uso de CPU y memoria **disponible** (en RAM libre, más es mejor). Sin color: el veredicto lo da el Estado, que juzga lo sostenido — abrir la web del AP dispara su CPU unos segundos y eso no es una avería. |
| **Thr. TX / RX** | Tráfico **agregado** del AP, todas sus estaciones juntas. Ojo con la dirección: aquí **TX es lo que baja** hacia los clientes. Responde "¿ocupado con qué?" cuando el aire sale alto. |
| **Frecuencia / Canal** | Para detectar solapamientos entre tus propios AP. |
| **Firmware · MAC · Modelo · TX Power · Uptime** | Identidad y contexto del equipo. |

Como en todas las tablas: buscador propio, orden por cabecera, columnas
ocultables, y el **clic en el nombre** aísla ese AP (otro clic lo deshace).

::: tip El diagnóstico no receta
Cuando un sector muestra picos, el diagnóstico entrega el hecho y el triage
—canal, carga o enlaces flojos—, pero no prescribe "cambia de frecuencia":
tres causas distintas producen el mismo cuadro, y la decisión es tuya con el
contexto que la app te acerca.
:::
