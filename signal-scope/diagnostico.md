# Semáforo y diagnóstico

El semáforo dice **cuál** enlace mirar y el diagnóstico dice **por qué**.
Los dos se juzgan como se explica a continuación.

## El semáforo

El color de cada estación es el veredicto del **diagnóstico completo**: manda
el peor de sus siete ejes (ver abajo). El eje principal, la señal, se juzga de
dos maneras según haya o no línea base.

**Sin línea base** se juzga el valor absoluto en dBm:

| Estado | Señal |
|---|---|
| 🟢 Buena | ≥ −55 dBm |
| 🟡 Atención | −55 a −67 dBm |
| 🔴 Crítica | < −67 dBm |

**Con línea base** se juzga cuánto bajó la señal respecto a la línea base que
tú fijaste (Δ dB):

| Estado | Desvío |
|---|---|
| 🟢 Estable | hasta −3 dB |
| 🟡 Bajó vs base | −3 a −8 dB |
| 🔴 Revisar enlace | más de −8 dB |

El diagnóstico lo dice con el número: *"Señal −10 dB vs su línea base
(−54 dBm)"*.

Una estación **Ausente** no cuenta como crítica. Perdió la sesión y conserva
su última lectura, con el motivo en el tooltip. Qué dice su chip mientras la
app la recupera está en [Cuando un equipo se ausenta](./interfaz/estaciones#cuando-un-equipo-se-ausenta).

## Línea base: comparar contra tu propia red

<a id="referencias-comparar-contra-tu-propia-red"></a>

Sin línea base, la app compara la señal con la **señal esperada a la
distancia** de cada enlace, que calcula el propio radio, y solo si el radio no
la da recurre al umbral absoluto. La línea base aporta lo que la app no puede
calcular: **cómo quedó ese enlace cuando el instalador lo dejó bien**, con su
alineación, su cable y sus obstáculos. Es tu criterio, y tiene prioridad sobre
los otros dos.

Cuando un enlace está **como debe estar**, pulsa **"Marcar"**. La señal de
ese momento queda como el punto sano de **esa** antena, y desde entonces el
eje de señal juzga el desvío contra ella (Δ dB) en lugar del valor absoluto.

- La línea base es **por antena** y sobrevive a reinicios y cambios de IP.
- Con línea base, la columna **Línea base** muestra el valor (`−58 dBm`) y una
  **×** (*"Quitar línea base"*). Mientras hay línea base el botón "Marcar" no
  aparece, así que actualizarla (tras un realineamiento, por ejemplo) lleva
  dos gestos: **quitarla con la × y volver a pulsar "Marcar"**.

::: tip Marca con el enlace estable
"Marcar" guarda la lectura **del instante del clic**, sin promediar. Si
marcas durante un desvanecimiento, la línea base queda en un punto malo.
:::

## Por qué la señal sola no basta

Una señal de −54 dBm a 1.5 km puede ser excelente, y un enlace con señal
"buena" puede tener ruido, interferencia o la capacidad hundida. Por eso el
diagnóstico **combina siete ejes y manda el peor**. El resultado es el color
de la fila más una **lista de causas en palabras**, que aparece al pasar el
puntero por la celda de señal.

## Los siete ejes

1. **Señal en contexto.** Con línea base, el desvío contra ella. Sin línea
   base, la diferencia con la señal **esperada a esa distancia** (atención a
   más de 3 dB por debajo, crítica a más de 7 dB). Si el radio no da la
   esperada, el umbral absoluto de la tabla de arriba.
2. **Calidad del canal.** El margen entre la señal y el piso de ruido (SNR)
   o, en los equipos que lo reportan, el CINR, que además ve la
   **interferencia de otros transmisores en el canal**. Atención por debajo de
   24 dB y crítica por debajo de 15 dB. De aquí salen causas como
   *"Interferencia en el canal: CINR … dB (la señal se ve bien, el canal no)"*.
3. **Calidad de enlace.** El indicador airMAX, promediado para no alarmar por
   ráfagas: por debajo del 90 % pide atención y por debajo del 70 % es
   crítico. Incluye la **latencia del aire** que mide el radio. Una media
   sostenida por encima de 12 ms pide atención y por encima de 24 ms es
   crítica, y los picos recurrentes también degradan el veredicto
   (*"canal congestionado, la señal está bien"*).
4. **Capacidad real contra la esperada.** Si el enlace entrega menos del 65 %
   de lo que promete su modulación, en bajada o en subida, algo lo frena:
   saturación o modulación degradada. Por debajo del 40 % es crítico.
5. **Puerto Ethernet.** El tramo cableado hasta el conector del radio. El
   **half duplex** marca Atención y un puerto que negocia **10 Mbps** marca
   Crítica: cable dañado, humedad en el conector o PoE flojo. Ningún airMAX
   trae 10 Mbps como máximo de fábrica. Un puerto **sin cable no cambia el
   color**, porque puede ser el router apagado de noche o un corte por mora y
   no una avería del enlace. Ese hecho se ve en la columna Puertos y el
   centinela avisa del cambio. La velocidad del puerto solo aparece en el
   diagnóstico cuando **limita** lo que la radio podría entregar.
   - La app lee **todos los puertos** del equipo. El diagnóstico juzga el
     puerto que vigila el centinela (el primero de ellos, si vigilas varios),
     y cuáles se vigilan lo eliges en la pestaña
     [Puertos](./interfaz/estaciones#puertos-que-vigila-el-centinela) de la
     ventana de sesión. Sin elección, se vigila el primero.
   - **Este eje vale también para los AP**, con las mismas dos reglas y la
     misma frontera. Un AP cuyo puerto de subida negocia a 10 Mbps o en half
     duplex estrangula a todo su sector.
   - **Cuando lo único malo es el puerto, el número de la señal no se pinta
     en rojo.** El equipo sigue en Crítica y la fila sigue teñida, pero la
     señal se pinta por lo que vale. El problema lo señalan la columna Puertos
     y este eje, que es donde se arregla.
6. **Desbalance entre cadenas.** Las dos polaridades de la antena deberían
   recibir casi lo mismo. Una diferencia de 5 dB o más (crítica desde 10 dB)
   delata una **antena rotada, polarización cruzada o una cadena dañada**,
   aunque la señal total se vea normal. Ningún otro eje lo detecta.
7. **Salud del radio.** CPU saturada o memoria agotada: atención desde el
   80 % de CPU o con el 10 % o menos de memoria libre, crítica desde el 95 %
   de CPU o con el 5 % o menos de memoria. Un radio ahogado tira paquetes sin que cambie la señal.

::: tip Cómo leer una causa
Cada causa nombra el hecho y su contexto: *"Señal 12 dB por debajo de la
esperada a su distancia"*, *"Ruido alto: SNR 14 dB"*, *"Downlink muy por
debajo de lo esperado: 23 de 80 Mbps"*. Así sabes **dónde mirar** (el cable,
el canal o la alineación) antes de subir al techo.
:::

![El tooltip de diagnóstico de una estación crítica: SNR, latencia, distancia y puerto en la cabecera, y debajo las causas (señal bajo la esperada, calidad de enlace baja y downlink muy por debajo de lo esperado)](/signal-scope/diagnostico.png)

## El AP se juzga distinto

Un AP no tiene "un enlace" que juzgar, tiene quince. Su columna Estado combina
la carga del canal, la salud del radio, la latencia de su sector y su puerto
de subida. El detalle está en [Puntos de acceso](./interfaz/puntos-de-acceso).

## El punto ciego que ningún eje ve

Los siete ejes describen **cómo recibe** el equipo y ninguno mira la dirección
contraria. Un radio puede recibir perfecto y **transmitir en la modulación más
lenta que existe**, con la señal impecable y las cadenas equilibradas.

Ese caso lo delata la columna **Modulación**, que enseña
[las dos direcciones](./interfaz/estaciones#modulacion-las-dos-direcciones).
Es informativa y no cambia el semáforo, pero es lo único que lo ve: mirando
solo la bajada, esa antena parecería estar bien.

## Sobre los umbrales

Los números de esta guía son los de la versión actual, calibrados con parques
reales. Algunos, en particular los de latencia, siguen en calibración de campo
y pueden cambiar entre versiones. El tooltip siempre muestra los valores
medidos, así que puedes juzgar con tu propio criterio además del de la app.

**Ayuda → "Cómo se calibra"** resume el método detrás de cada límite, con
casos reales, e invita a reportar los tuyos a **support@materis.io**. De esos
reportes salen los ajustes.

::: warning En MikroTik, el semáforo todavía no está calibrado
Los umbrales de un equipo RouterOS son **hoy los de airMAX**. Se revisaron eje
por eje (señal, cadenas, CPU y memoria son física y porcentajes, y no dependen
del fabricante), pero no se han contrastado contra enlaces MikroTik reales.

Hay un sesgo conocido. El SNR sale de restar el ruido a la señal, y **los
pisos de ruido no son comparables entre fabricantes**: con la misma señal, un
MikroTik puntúa **entre 7 y 11 dB mejor** que un airMAX. No se corrige con un
número inventado, porque eso convertiría un sesgo conocido en un error
escondido. El riesgo queda del lado benigno: **se detecta de menos, pero no se
inventan alarmas**. Léelo con reserva y cuéntanos lo que veas.
:::
