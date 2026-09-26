# Semáforo y diagnóstico

El semáforo dice **cuál** enlace mirar; el diagnóstico dice **por qué**. Esta
guía explica cómo juzga cada uno.

## El semáforo

El color de cada estación es el veredicto del **diagnóstico completo** — el
peor de sus siete ejes manda (ver abajo). Su eje principal, la señal, se
juzga en dos modos, y la diferencia importa:

**Sin línea base** — se juzga el valor absoluto en dBm:

| Estado | Señal |
|---|---|
| 🟢 Buena | ≥ −55 dBm |
| 🟡 Atención | −55 a −67 dBm |
| 🔴 Crítica | < −67 dBm |

**Con línea base** — se juzga cuánto bajó respecto a la línea base que tú
fijaste (Δ dB):

| Estado | Desvío |
|---|---|
| 🟢 Estable | hasta −3 dB |
| 🟡 Bajó vs base | −3 a −8 dB |
| 🔴 Revisar enlace | más de −8 dB |

El diagnóstico lo dice con el número: *"Señal −10 dB vs su línea base
(−54 dBm)"*.

Una estación **Ausente** no es una crítica: perdió la sesión y conserva su
última lectura, con el motivo en el tooltip. Qué dice su chip mientras la app
la recupera está en [Cuando un equipo se ausenta](./interfaz/estaciones#cuando-un-equipo-se-ausenta).

## Línea base: comparar contra tu propia red

<a id="referencias-comparar-contra-tu-propia-red"></a>

Aun sin línea base, la app no juzga a ciegas: usa la **señal esperada a la
distancia** de cada enlace (la calcula el propio radio) y, solo en último
recurso, el umbral absoluto. La línea base añade lo que ningún automatismo
puede saber: **cómo quedó ese enlace cuando el instalador lo dejó bien** — su
alineación, su cable, sus obstáculos. Es tu criterio, y gana sobre los otros
dos.

Cuando un enlace está **como debe estar**, pulsa **"Marcar"**: la señal de
ese momento queda como el punto sano de **esa** antena, y desde entonces el
eje de señal juzga el desvío contra ella (Δ dB) en vez del valor absoluto.

- La línea base es **por antena** y sobrevive a reinicios y cambios de IP.
- Con línea base, la columna **Línea base** muestra el valor (`−58 dBm`) y una
  **×** (*"Quitar línea base"*). Para actualizarla (tras un realineamiento, por
  ejemplo), **quítala con la × y vuelve a pulsar "Marcar"** — son dos
  gestos: mientras hay línea base, el botón no se muestra.

::: tip Marca con el enlace estable
"Marcar" guarda la lectura **del instante del clic**, sin promediar. Si
marcas durante un desvanecimiento, fijas un punto malo como línea base.
:::

## Por qué la señal sola no basta

Una señal de −54 dBm a 1.5 km puede ser excelente — y un enlace con señal
"buena" puede estar sufriendo ruido, interferencia o capacidad hundida. Por
eso el diagnóstico no mira un número: **combina siete ejes y el peor de ellos
manda**. El resultado es el color de la fila más una **lista de causas en
palabras**, visible al pasar el puntero por la celda de señal.

## Los siete ejes

1. **Señal en contexto.** Con línea base, el desvío contra ella; si no, contra
   la señal **esperada a esa distancia** (la calcula el propio radio); en
   último término, el umbral absoluto.
2. **Calidad del canal.** El margen entre la señal y el piso de ruido (SNR) o,
   en equipos que lo reportan, el CINR — que además ve la **interferencia de
   otros transmisores en el canal**. De ahí salen causas como *"Interferencia
   en el canal: la señal se ve bien, el canal no"*.
3. **Calidad de enlace.** El indicador airMAX, promediado para no alarmar por
   ráfagas: bajo 90 % pide atención, bajo 70 % es crítico. Incluye la
   **latencia del aire** medida por el radio: alta sostenida o con picos
   recurrentes degrada el veredicto (*"canal congestionado, la señal está
   bien"*).
4. **Capacidad real vs. esperada.** Si el enlace entrega mucho menos de lo que
   su modulación promete (bajo el 65 %), algo lo frena: saturación o
   modulación degradada.
5. **Puerto Ethernet.** El tramo cableado hasta el conector del radio: el
   **half duplex** marca Atención y un puerto negociando **10 Mbps** marca
   Crítica — cable dañado, humedad en el conector o PoE flojo; ningún airMAX
   trae 10 de fábrica. Un puerto **sin cable no cambia el color**: puede ser
   el router apagado de noche o un corte por mora, no una avería del enlace —
   el hecho se ve en la columna Puertos y el centinela avisa del cambio. La
   velocidad solo se menciona cuando **limita** lo que la radio podría
   entregar.
   - **Este eje vale también para los AP**, con las mismas dos reglas y la
     misma frontera: un AP cuyo puerto de subida negocia mal estrangula a todo
     su sector.
   - **Y cuando lo único malo es el puerto, la señal no se pinta en rojo**: el
     equipo sigue en crítica y la fila teñida, pero el número de la señal se
     pinta por lo que vale. El problema lo señalan la columna Puertos y este
     eje, que es donde se arregla.
6. **Desbalance entre cadenas.** Las dos polaridades de la antena deberían
   recibir casi lo mismo; una diferencia de 5 dB o más delata **antena rotada,
   polarización cruzada o una cadena dañada** — con la señal total viéndose
   normal. Ningún otro eje lo ve.
7. **Salud del radio.** CPU saturada o memoria agotada: un radio ahogado tira
   paquetes sin tocar la señal.

::: tip Cómo leer una causa
Cada causa nombra el hecho y su contexto: *"Señal 12 dB por debajo de la
esperada a su distancia"*, *"Ruido alto: SNR 14 dB"*, *"Downlink muy por
debajo de lo esperado: 23 de 80 Mbps"*. La causa te dice **dónde mirar** — el
cable, el canal, la alineación — antes de subir al techo.
:::

![El tooltip de diagnóstico de una estación crítica: SNR, latencia, distancia y puerto en la cabecera, y debajo las causas — señal bajo la esperada, calidad de enlace baja y downlink muy por debajo de lo esperado](/signal-scope/diagnostico.png)

## El AP se juzga distinto

Un AP no tiene "un enlace" que juzgar: tiene quince. Su columna Estado combina
carga del canal, salud del radio y la latencia de su sector — el detalle está
en [Puntos de acceso](./interfaz/puntos-de-acceso).

## El punto ciego que ningún eje ve

Los siete ejes describen **cómo recibe** el equipo. Ninguno mira la dirección
contraria — y un radio puede recibir perfecto y **transmitir en la modulación
más lenta que existe**, con la señal impecable y las cadenas equilibradas.

Eso lo delata la columna **Modulación**, que enseña
[las dos direcciones](./interfaz/estaciones#modulacion-las-dos-direcciones).
Es informativa —no cambia el semáforo— pero es lo único que ve ese caso:
mirando solo la bajada, todo parecería ir bien sobre una antena que no va
bien.

## Sobre los umbrales

Los números de esta guía son los de la versión actual, calibrados con parques
reales. Algunos —los de latencia en particular— siguen en calibración de
campo y pueden ajustarse entre versiones; el tooltip siempre muestra los
valores medidos, así que puedes juzgar con tu propio criterio además del de la
app.

La propia app cuenta cómo se fijaron: **Ayuda → "Cómo se calibra"** resume el
método detrás de cada límite, con casos reales — y la invitación a reportar
los tuyos a **support@materis.io**, que es de donde salen los ajustes.

::: warning En MikroTik, el semáforo todavía no está calibrado
Los umbrales de un equipo RouterOS son **hoy los de airMAX**. Están auditados
eje por eje —señal, cadenas, CPU y memoria son física y porcentajes, no dependen
del fabricante— pero no se han contrastado contra enlaces MikroTik reales.

El sesgo conocido: el SNR sale de restar señal − ruido, y **los pisos de ruido
no son comparables entre fabricantes**. Con la misma señal, un MikroTik puntúa
**7–11 dB mejor** que un airMAX. No se corrige con un número inventado — eso
convertiría un sesgo conocido en un error escondido—, así que el riesgo cae del
lado benigno: **se detecta de menos, no se inventan alarmas**. Léelo con reserva
y cuéntanos lo que veas.
:::
