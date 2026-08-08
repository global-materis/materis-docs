# Historial, snapshots y reportes

El monitoreo en vivo responde "¿cómo está la red **ahora**?". Los snapshots y
los reportes responden el resto: cómo estaba antes, qué cambió, y cómo se lo
muestro a alguien más.

## Guardar un snapshot

**Guardar snapshot** (`Ctrl+H`) captura el estado completo del momento:
estaciones y AP con sus métricas, el veredicto del diagnóstico, las
referencias que tenías puestas, el estado de sesión de cada equipo — y
también tu inventario de **Otros**, con el nombre que les pusiste y si
respondían a la vigilancia. La captura queda en el **strip de snapshots**,
con su fecha.

- Un proyecto guarda **hasta 10 snapshots**: al guardar el undécimo, el más
  viejo se elimina solo.
- Viajan **dentro del archivo** `.sscope` — respaldar el proyecto respalda el
  historial.

Un buen hábito: guarda uno **cuando la red está sana** (después de un
mantenimiento, por ejemplo). Ese es el punto de comparación que vale oro
meses después.

## Ver una captura

Al abrir un snapshot, las tablas muestran ese momento en modo solo lectura —
la sesión dice "Histórico" — y cada fila añade **Δ vs actual**: cuánto cambió
la señal de esa estación entre la captura y este instante, si el equipo tiene
sesión ahora. Es la forma más rápida de responder *"¿este enlace estaba así la
semana pasada?"*.

![La vista de un snapshot: el strip de capturas, el banner de comparación con los datos en vivo, sesiones en Histórico y el desvío "vs actual" bajo cada señal](/signal-scope/vista-snapshot.jpg)

## Comparar dos momentos

La herramienta de **comparar snapshots** (marcada **beta**: funciona, pero
qué métricas compara y cómo las presenta puede cambiar en próximas versiones)
cruza dos capturas —o una captura contra el estado en vivo— y lista altas,
bajas y cambios por equipo. Los
cambios salen como chips agrupados por **qué los causa**, que es lo que
importa al leerlos:

- **Alguien lo cambió** — firmware, AP, frecuencia, ancho de canal: cambios de
  configuración, no del aire.
- **El enlace físico cambió** — la señal se movió más de unos dB: llovió, el
  viento movió el plato.
- **La red se usaba distinto** — calidad, aire ocupado, capacidad: describen
  el instante de cada captura. Se activan por métrica, porque son los más
  ruidosos.

También avisa del **puerto Ethernet** (cable desconectado o reconectado,
cambios de dúplex y velocidad, errores de cable) y de sesiones caídas o
recuperadas entre una captura y otra.

::: details ¿Por qué no compara el tráfico ni el uptime?
El tráfico es el **consumo** del cliente en ese instante — que descargara en
una captura y estuviera ocioso en la otra no dice nada del enlace. Y los
reinicios o reasociaciones pasan todos los días en un WISP real (clientes que
apagan su antena de noche, cortes de luz): marcarlos llenaría cada fila de
avisos y enterraría lo que sí importa. La capacidad del enlace sí se compara —
esa es salud, no consumo.
:::

## Reportes en PDF, Excel y CSV

El botón **Reporte** exporta lo que está en pantalla — el estado en vivo o, si
tienes un snapshot en vista, esa captura con su fecha en el encabezado. Tres
formatos que dicen exactamente lo mismo (salen de los mismos datos): **PDF**
para entregar, **Excel** para trabajar, y **CSV** pensado para abrirse con
doble clic en un Excel en español, sin asistente de importación. Cinco
alcances:

| Tipo | Qué incluye |
|---|---|
| **General** | Toda la red: estaciones + AP. |
| **Críticas** | Solo las estaciones en crítico. |
| **Críticas + Atención** | La lista de trabajo del técnico. |
| **Solo estaciones** | Todas las estaciones, sin tabla de AP. |
| **Solo AP** | Únicamente los puntos de acceso. |

Dos detalles pensados para que el reporte sea defendible:

- El **resumen siempre es del parque completo**, aunque el reporte esté
  recortado — junto a la línea "Filtro: Críticas · 25 de 199 estaciones" hace
  auditable el recorte.
- El veredicto de cada fila es el **mismo del diagnóstico en pantalla**: el
  reporte nunca contradice lo que la app muestra.

Al generarse, el aviso trae un botón **Abrir** que lanza el archivo
directamente.

![El menú Reporte: los cinco tipos —General, Críticas, Críticas + Atención, Solo estaciones, Solo AP— y los tres formatos PDF, Excel y CSV](/signal-scope/reporte-pdf.png)

## Y para compartir

Un snapshot también se exporta como archivo **`.ssnap`** que otro SignalScope
abre en modo visor, con la opción de proteger los datos sensibles antes de
enviarlo. Eso tiene su propia guía: [Compartir](./compartir).
