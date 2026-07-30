# Herramientas de diagnóstico

El menú **Herramientas** agrupa las utilidades que se usan de a ratos: se
abren, responden una pregunta y se cierran. Las de diagnóstico son cuatro —
Planificador de frecuencias, Prueba de velocidad, Ping continuo y Traceroute.
(Comparar snapshots se explica en [Historial](./snapshots#comparar-dos-momentos)
y la Calificación de la red en [su guía](./centinela#la-calificacion-de-la-red).)

## Planificador de frecuencias

Reparte el espectro entre tus AP sin superponerlos. Trabaja con lo que el
monitoreo **ya leyó** de los AP con sesión — nunca consulta a los radios — y
se refresca solo.

Eliges la **banda** (2.4 / 3.65 / 4.9 / 5 GHz U-NII / 6 GHz, o un rango
personalizado), el **ancho de canal objetivo** (10–100 MHz) y qué AP
considerar — la lista viene **agrupada por nodo**, con casilla para marcar o
desmarcar el sitio completo, porque el espectro se planifica por torre: "a
ver qué tiene puesta esta".

El panel muestra:

- **Los carriles de ocupación**: cada AP ocupa su frecuencia central ± la
  mitad de su ancho (5630 @ 20 MHz ⇒ 5620–5640). Pasar el cursor por un
  bloque muestra la ficha del AP: modelo, frecuencia, IP, SSID, estaciones.
- **La tira del espectro**, con las zonas DFS sombreadas. Al pasar el cursor
  se resalta el ancho objetivo centrado ahí, con veredicto **Libre** (verde),
  **Parcial** (naranja) u **Ocupado** (rojo) y el desglose de MHz.
- **Los canales sugeridos**: las centrales disjuntas que caben en los huecos,
  como chips. Las flechas `‹ ›` deslizan las sugerencias dentro de cada hueco
  por si prefieres otra central.

Un clic en un chip o en una frecuencia libre **selecciona ese canal**: arriba
aparece su resumen — frecuencia, rango cubierto, ancho, si es **DFS** (con el
riesgo de radar explicado) y la banda — con botón **Copiar** para llevarla a
la configuración del radio.

Los ajustes del planificador sobreviven al cierre: la herramienta está hecha
para entrar, elegir un canal, ir a comprobarlo a la tabla y volver.

::: info 🖼️ Imagen pendiente — `public/signal-scope/planificador-frecuencias.png`
Captura del **planificador**: carriles de ocupación, la tira del espectro con
un focus activo y los chips de canales sugeridos.
:::

::: tip El plan es tan bueno como sus lecturas
Los AP sin sesión aparecen atenuados dentro de su nodo: si tres de los seis
AP de una torre no han conectado, el plan de esa torre está incompleto — y el
planificador te lo deja ver en lugar de esconderlo.
:::

## Prueba de velocidad (iperf)

Mide el throughput real entre un radio y tu PC. El modelo respeta la regla de
solo lectura: **SignalScope nunca le ordena nada al radio** — la app levanta
un servidor compatible con iperf en tu PC y te muestra el comando listo para
copiar; tú lo ejecutas desde el CLI del radio, y la app pinta el throughput
en vivo.

- Windows pedirá **permiso de firewall** la primera vez (diálogo estándar,
  sin administrador).
- **La prueba satura el enlace mientras dura** — el cliente lo va a sentir;
  mejor en horario de poco uso.

## Ping continuo

Latencia, jitter y pérdida **en continuo** contra uno o varios objetivos —
equipos del inventario o IPs sueltas. Distinto del botón de ping de cada
fila (que abre una consola): esta es una sesión de medición con estadísticas.

- El selector de objetivos viene **agrupado por sector**: marca un AP
  completo con su casilla — el caso típico es "todas las estaciones de este
  AP". El atajo directo vive en la
  [tabla de AP](./interfaz/puntos-de-acceso#la-celda-estaciones-tres-gestos).
- Por objetivo: pérdida %, media, mín/máx, **jitter** y una gráfica de las
  últimas muestras. El veredicto (Estable/Inestable) explica siempre su
  porqué — incluidos los **picos**, que se juzgan contra la base del propio
  objetivo: 60 ms estables no alarman, 2 ms con saltos a 200 sí.
- El modal se puede **minimizar y sigue midiendo**: queda una píldora de
  fondo con el resumen.
- Los resultados se exportan a **PDF/Excel**.

::: tip Este ping sí es tuyo — y por eso dice otra cosa
El ping continuo sale de tu PC y recorre todo el camino; la columna Latencia
de la tabla la mide el radio solo en el tramo aéreo. Comparar ambos es
diagnóstico puro: ping alto con latencia aérea baja significa que el cuello
**no** está en el aire.
:::

## Traceroute

La ruta hasta un objetivo, salto por salto, con latencia y pérdida en cada
uno. Dos modos: **disparo único** (tres sondeos por salto y termina) o
**continuo** (estilo MTR: sigue midiendo cada salto hasta que lo detengas —
también minimizable).

Lo distintivo: los saltos que son **radios de tu red** se resaltan con su
modelo y frecuencia — ves en qué punto de *tu* infraestructura se degrada la
ruta, no solo una lista de IPs anónimas. También exporta a PDF/Excel.
