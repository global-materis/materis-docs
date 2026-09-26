# Herramientas de diagnóstico

El menú **Herramientas** reúne utilidades de uso puntual: se abren para
responder una pregunta y se cierran. El grupo **Diagnóstico** tiene cuatro:
**Planificador de frecuencias**, **Prueba de velocidad (iperf)**, **Ping
continuo / latencia** y **Traceroute**. Las otras dos entradas del menú tienen
su propia guía: **Comparar snapshots** (grupo *Enlaces*) se explica en
[Historial](./snapshots#comparar-dos-momentos), y la **Calificación de la red**
(grupo *Reportes*) en [su guía](./centinela#la-calificacion-de-la-red).

## Planificador de frecuencias

Muestra qué parte del espectro ocupan ya tus AP y dónde cabe un canal nuevo
sin superponerse con ellos. Trabaja con lo que el monitoreo **ya leyó** de los
AP con sesión, sin consultar a los radios, y se actualiza solo.

En la columna izquierda eliges tres cosas:

- El **rango del espectro**: 2.4 GHz ISM, 3.65 o 4.9 GHz, 5 GHz U-NII
  completo o por sub-banda (U-NII-1 a U-NII-4), 6 GHz (U-NII-5 a U-NII-8) o
  **Personalizado…**, con inicio y fin en MHz.
- El **ancho de canal a planificar**, de 10 a 100 MHz.
- Los **AP a mostrar**. La lista va **agrupada por nodo**, con una casilla que
  marca o desmarca el sitio completo, porque el espectro se planifica por
  torre ("a ver qué tiene puesto esta").

El panel muestra:

- **Los carriles de ocupación.** Cada AP ocupa su frecuencia central ± la
  mitad de su ancho (5630 @ 20 MHz ⇒ 5620–5640). Al pasar el cursor por un
  bloque aparece la ficha del AP: modelo, frecuencia, IP, SSID y estaciones.
- **La tira del espectro**, con las zonas DFS sombreadas. Al pasar el cursor
  se resalta el ancho elegido centrado en ese punto, con su veredicto
  (**Libre** en verde, **Parcial** en naranja u **Ocupado** en rojo) y el
  desglose en MHz.
- **Los canales sugeridos**, como chips: las frecuencias centrales que caben
  en los huecos sin pisarse. Las flechas `‹ ›` desplazan las sugerencias
  dentro de cada hueco por si prefieres otra central.

Un clic en un chip o en una frecuencia libre **selecciona ese canal**. Arriba
aparece su resumen: frecuencia, rango cubierto, ancho, si cae en **DFS** (el
radio puede cambiar de canal si detecta radar) y la banda. El botón
**Copiar** lleva la frecuencia al portapapeles para pegarla en la
configuración del radio.

Los ajustes del planificador se conservan al cerrarlo, porque el uso habitual
es entrar, elegir un canal, ir a comprobarlo en la tabla y volver.

![El planificador de frecuencias en la banda de 5 GHz: el espectro ocupado por AP con un canal de 40 MHz escogido, la tira libre/ocupado, los canales sugeridos y la lista de AP agrupada por nodo](/signal-scope/planificador-frecuencias.png)

::: tip El plan es tan bueno como sus lecturas
Un AP sin sesión todavía no reporta frecuencia: aparece atenuado dentro de su
nodo y no entra en el plan. Si tres de los seis AP de una torre no han
conectado, el plan de esa torre está incompleto, y el planificador lo deja a
la vista en lugar de esconderlo.
:::

## Prueba de velocidad (iperf)

Mide el caudal real **de máquina a máquina**, sin mandar ninguna orden a los
radios: todo es tráfico entre dos extremos compatibles con iperf3. El modal
tiene dos roles:

- **Servidor.** SignalScope expone un destino en la IP local y el puerto que
  elijas (5201 por defecto) y espera. Tras pulsar **Levantar servidor**, el
  destino queda listo para copiar, junto con el comando `iperf3` que debe
  ejecutar el otro extremo. Las pruebas que llegan se listan en **Sesiones
  entrantes**.
- **Cliente.** SignalScope se conecta a otro servidor iperf3 (otro SignalScope
  o cualquier `iperf3 -s`) y ejecuta la prueba. Eliges la **Dirección**
  (Subida, Bajada o Duplex), la duración y los streams, y al terminar ves la
  **Subida promedio** y la **Bajada promedio**.

El otro extremo no necesita SignalScope: sirve cualquier `iperf3`, y el modal
incluye el comando para instalarlo en Windows. Por ahora la prueba usa solo
TCP; UDP llegará más adelante.

- Windows pedirá **permiso del firewall** la primera vez que levantes el
  servidor (diálogo estándar, sin administrador). El modal lo avisa antes.
- El servidor sigue escuchando aunque cierres el modal, hasta que pulses
  **Detener servidor** o cierres la app.
- **La prueba satura el enlace mientras dura** y el cliente lo nota. Conviene
  hacerla en horario de poco uso.

## Ping continuo

Mide latencia, jitter y pérdida **sin parar** contra uno o varios objetivos. Es
una sesión de medición con estadísticas, distinta del botón de ping de cada
fila, que abre una consola.

- Los objetivos se eligen por ámbito (**Estaciones**, **AP** o
  **Referentes**), con buscador y **Agregar IP…** para escribir una dirección
  a mano. En Estaciones las filas van **agrupadas por su AP**, y **Elegir todo
  el sector** marca de una vez todas las estaciones de ese AP. La
  [tabla de AP](./interfaz/puntos-de-acceso#la-celda-estaciones-tres-gestos)
  tiene un atajo directo para lo mismo.
- Eliges el intervalo (500 ms, 1 s o 2 s) y si la medición es **Continuo** o
  termina tras un **Tiempo final** en segundos.
- Por objetivo ves la pérdida en %, la media, el mínimo y el máximo, el
  **jitter** y una gráfica de las últimas muestras. El veredicto (**Estable** o
  **Inestable**) siempre explica el motivo, incluidos los **picos**, que se
  juzgan contra la base del propio objetivo: 60 ms estables no alarman, pero
  2 ms con saltos a 200 sí.
- El modal se puede **minimizar sin dejar de medir**. Queda una píldora en la
  esquina con el resumen.
- Los resultados se exportan a **PDF**, **Excel** y **CSV**.

::: tip Este ping sale de tu PC, por eso mide otra cosa
El ping continuo sale de tu PC y recorre todo el camino. La columna Latencia
de la tabla la mide el radio, y solo en el tramo aéreo. Comparar las dos
ayuda al diagnóstico: un ping alto con latencia aérea baja indica que el
cuello de botella **no** está en el aire.
:::

## Traceroute

Muestra la ruta hasta un objetivo, salto por salto, con la latencia y la
pérdida de cada uno. El objetivo se elige de la lista o se escribe como IP o
nombre de host, y **Resolver nombres (DNS)** es opcional. Hay dos modos:

- **Disparo único**: tres sondeos por salto y termina. Sirve para documentar
  el camino.
- **Continuo**: sondea cada salto hasta que lo detengas, al estilo de MTR.
  También se puede minimizar.

Los saltos que son **radios de tu red** se resaltan con su modelo y
frecuencia, así que ves en qué punto de *tu* infraestructura se degrada la
ruta en lugar de una lista de IPs anónimas.

Si un salto pierde paquetes y los siguientes no, esa pérdida es del plano de
control: el router limita las respuestas ICMP (es típico de MikroTik) y el
tráfico pasa. La pantalla lo indica como pérdida de control, y solo la pérdida
que llega hasta el final cuenta en el veredicto.

Los resultados también se exportan a **PDF**, **Excel** y **CSV**.
