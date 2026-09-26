# Historial, snapshots y reportes

El monitoreo en vivo responde "¿cómo está la red **ahora**?". Los Snapshots y
los reportes responden el resto: cómo estaba antes, qué cambió y cómo
mostrárselo a otra persona.

## Guardar un snapshot

**Guardar snapshot** (`Ctrl+H`) guarda el estado completo de ese momento:
estaciones y AP con sus métricas, el veredicto del diagnóstico, las líneas
base que tenías marcadas y el estado de sesión de cada equipo. También guarda
tu tabla de **Referentes**, con el nombre que les pusiste y **cómo
respondían**: su tiempo de respuesta y su porcentaje de pérdida. El Snapshot
aparece en el **Historial de snapshots**, sobre las tablas, con su fecha y
hora.

::: tip El Snapshot dice cómo respondía cada Referente, no solo si respondía
Cada destino de Referentes se guarda con su **latencia y su pérdida**, así que
un Snapshot de hace tres días dice *cómo* respondía. Los Snapshots tomados con
una versión anterior a la 1.3 no traen ese dato, y su celda muestra un guion
apagado.
:::

- Un proyecto guarda **hasta 20 Snapshots**, y ninguno se borra solo. El
  contador del historial (`{n} de 20`) avisa cuando está lleno. A partir de
  ahí, para guardar otro hay que eliminar o exportar alguno.
- Los Snapshots viajan **dentro del archivo** `.sscope`, así que respaldar el
  proyecto respalda también el historial.

Conviene guardar uno **cuando la red está sana**, por ejemplo después de un
mantenimiento. Meses después será el mejor punto de comparación que tengas.

## Ver un snapshot

Al seleccionar un Snapshot en el historial, las tablas muestran ese momento en
modo solo lectura: la sesión de cada fila dice "Histórico" y un aviso indica
que se está comparando con los datos en vivo (**Δ vs actual**). Bajo la señal
de cada estación aparece cuánto cambió entre el Snapshot y este instante, si el
equipo tiene sesión ahora. Es la forma más rápida de responder *"¿este enlace
estaba así la semana pasada?"*. **Volver a datos en vivo** sale de la vista.

![La vista de un snapshot: el historial de snapshots, el aviso de comparación con los datos en vivo, las sesiones en Histórico y el desvío "vs actual" bajo cada señal](/signal-scope/vista-snapshot.jpg)

## Comparar dos momentos

**Herramientas → Comparar snapshots** está marcada como **beta**: funciona,
pero qué métricas compara y cómo las presenta puede cambiar en próximas
versiones. Cruza dos Snapshots, **Base (A)** y **Comparado (B)**, o un Snapshot
contra **En vivo · ahora**, y lista por equipo las altas, las bajas y los
cambios. Al abrirla ya propone el par más útil: el penúltimo contra el último,
o el único que tengas contra el estado en vivo. La lupa filtra por nombre, IP o
MAC.

Si entre los dos reemplazaste un radio, la baja y el alta lo dicen:
*"Reemplazado por …"* y *"Reemplaza a …"*, con la MAC del otro equipo.

Los cambios salen como chips, agrupados según **qué los causa**, que es lo que
importa al leerlos:

- **Alguien lo cambió**: firmware, AP, frecuencia, ancho de canal. Son cambios
  de configuración, no del aire.
- **El enlace físico cambió**: la señal se movió 5 dB o más, por ejemplo
  porque llovió o el viento movió el plato.
- **La red se usaba distinto**: calidad de enlace, modulación en las dos
  direcciones, aire ocupado, capacidad. Describen el instante de cada Snapshot
  y son los más ruidosos, así que vienen apagados y se encienden uno a uno en
  el menú **Métricas**.

También señala los cambios del **puerto Ethernet** (cable desconectado o
reconectado, cambios de dúplex y velocidad, errores de cable) y las sesiones
que se cayeron o se recuperaron de un Snapshot a otro.

Un Snapshot protegido se puede comparar. La excepción es uno con las MAC
recortadas: sin MAC no hay forma de emparejar los equipos, y la herramienta
pide elegir otro.

### Cuando los dos Snapshots son de épocas distintas

En la v1.2.0 cambió **cómo se miden** la calidad de enlace, la capacidad, el
consumo y la distancia. Al comparar un Snapshot **anterior a la v1.2.0** con
uno posterior salían diferencias que **ningún equipo tuvo**: la resta era
correcta y el resultado no significaba nada.

Ahora esas columnas (Link bajada, Link subida, Downlink y Uplink) **dejan de
compararse** entre Snapshots de distinta época. Arriba aparece una nota que
dice cuáles y por qué, y en el menú Métricas esas entradas salen apagadas con
el motivo "No comparable entre estas dos capturas". El resto (señal, modelo,
firmware, AP, puerto, configuración) se sigue comparando igual.

::: details Y la modulación en airOS 6 y RouterOS
Esos firmwares no publican un índice de modulación, así que la columna muestra
la tasa en Mbps, y esa tasa **salta entre escalones de una lectura a la
siguiente**. El Snapshot la guarda y la tabla la muestra, pero comparar dos
lecturas instantáneas no diría nada del enlace. En esos equipos el comparador
no tiene modulación que enseñar.
:::

::: details ¿Por qué no compara el tráfico ni el uptime?
El tráfico es el **consumo** del cliente en ese instante: que estuviera
descargando en un Snapshot y ocioso en el otro no dice nada del enlace. Los
reinicios y las reasociaciones ocurren todos los días en un WISP (clientes que
apagan su antena de noche, cortes de luz), y marcarlos llenaría cada fila de
avisos y taparía lo que sí importa. La capacidad del enlace sí se compara,
porque es salud y no consumo.
:::

## Reportes en PDF, Excel y CSV

El botón **Reporte** exporta lo que está en pantalla: el estado en vivo o, si
estás viendo un Snapshot, ese Snapshot con su fecha en el encabezado. Los tres
formatos salen de los mismos datos y dicen exactamente lo mismo. El **PDF**
sirve para entregar, el **Excel** para trabajar, y el **CSV** está pensado
para abrirse con doble clic en un Excel en español, sin asistente de
importación. Hay cinco tipos de reporte:

| Tipo | Qué incluye |
|---|---|
| **General (toda la red)** | Estaciones, AP y **Referentes**. |
| **Críticas** | Solo las estaciones en crítico. |
| **Críticas + Atención** | La lista de trabajo del técnico. |
| **Solo estaciones** | Todas las estaciones, sin tabla de AP. |
| **Solo AP** | Únicamente los puntos de acceso. |

### Qué llevan dentro

Hasta **tres tablas**:

- **Estaciones** y **Puntos de acceso**, con el **uso de CPU y la RAM libre**
  de cada equipo. Un equipo que la app muestra saturado sale igual en el PDF
  que le mandas al cliente.
- **Referentes**, con las mismas seis columnas de su tabla (*Vigilancia ·
  Latencia · Nombre · IP / dominio · MAC · Fabricante*) y con **todos** los
  destinos, vigilados o no. Cada fila de Referentes la añadiste tú, así que
  ninguna es ruido, y una fila "Sin vigilar" deja claro que el reporte no
  afirma nada de ese equipo. Si el reporte sale de un Snapshot, esta tabla
  dice **cómo respondían aquel día**.

La tabla de Referentes **solo sale en el tipo General**. Los otros cuatro
tipos recortan según el estado de los *radios*, y un destino de Referentes no
tiene semáforo que lo meta o lo deje fuera. Por lo mismo, **no lleva color de
semáforo** en ningún formato, tampoco en el Excel: su columna *Vigilancia* lo
dice con palabras.

::: warning Las dos latencias del reporte no son comparables
La de la tabla de Referentes **la mide SignalScope** con un ping que recorre
todo el camino. La de la tabla de estaciones **la mide el radio** sobre su
propio tramo aéreo. No comparten umbrales ni significado.
:::

Dos detalles hacen que el reporte se pueda defender:

- El **resumen siempre es del parque completo**, aunque el reporte esté
  recortado. Junto a la línea "Filtro: Críticas · 25 de 199 estaciones",
  permite verificar el recorte.
- El veredicto de cada fila es el **mismo del diagnóstico en pantalla**: el
  reporte nunca contradice lo que muestra la app.

Al terminar, el aviso trae un botón **Abrir** que abre el archivo generado.

![El menú Reporte: los cinco tipos (General, Críticas, Críticas + Atención, Solo estaciones, Solo AP) y los tres formatos PDF, Excel y CSV](/signal-scope/reporte-pdf.png)

## Y para compartir

Un Snapshot también se exporta como archivo **`.ssnap`**, que otro SignalScope
abre en modo visor. Antes de enviarlo puedes proteger los datos sensibles.
Todo eso se explica en [Compartir](./compartir).
