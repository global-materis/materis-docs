# Semáforo y diagnóstico

El semáforo dice **cuál** enlace mirar; el diagnóstico dice **por qué**. Esta
guía explica cómo juzga cada uno.

## El semáforo

El color de cada estación es el veredicto del **diagnóstico completo** — el
peor de sus siete ejes manda (ver abajo). Su eje principal, la señal, se
juzga en dos modos, y la diferencia importa:

**Sin referencia** — se juzga el valor absoluto en dBm:

| Estado | Señal |
|---|---|
| 🟢 Buena | ≥ −55 dBm |
| 🟡 Atención | −55 a −67 dBm |
| 🔴 Crítica | < −67 dBm |

**Con referencia** — se juzga cuánto se desvió de la referencia que tú
fijaste (Δ dB):

| Estado | Desvío |
|---|---|
| 🟢 En referencia | hasta −3 dB |
| 🟡 Bajó vs ref | −3 a −8 dB |
| 🔴 Revisar enlace | más de −8 dB |

Una estación **Ausente** no es una crítica: perdió la sesión y conserva su
última lectura, con el motivo en el tooltip.

## Referencias: comparar contra tu propia red

Aun sin referencia, la app no juzga a ciegas: usa la **señal esperada a la
distancia** de cada enlace (la calcula el propio radio) y, solo en último
recurso, el umbral absoluto. La referencia añade lo que ningún automatismo
puede saber: **cómo quedó ese enlace cuando el instalador lo dejó bien** — su
alineación, su cable, sus obstáculos. Es tu criterio, y gana sobre los otros
dos.

Cuando un enlace está **como debe estar**, pulsa **"Marcar OK"**: la señal de
ese momento queda como el punto sano de **esa** antena, y desde entonces el
eje de señal juzga el desvío contra ella (Δ dB) en vez del valor absoluto.

- La referencia es **por antena** y sobrevive a reinicios y cambios de IP.
- Con referencia, la celda muestra `ref −58 dBm` y una **×**. Para
  actualizarla (tras un realineamiento, por ejemplo), **quítala con la × y
  vuelve a pulsar "Marcar OK"** — son dos gestos: mientras hay referencia, el
  botón no se muestra.

::: tip Marca con el enlace estable
"Marcar OK" guarda la lectura **del instante del clic**, sin promediar. Si
marcas durante un desvanecimiento, fijas un punto malo como referencia.
:::

## Por qué la señal sola no basta

Una señal de −54 dBm a 1.5 km puede ser excelente — y un enlace con señal
"buena" puede estar sufriendo ruido, interferencia o capacidad hundida. Por
eso el diagnóstico no mira un número: **combina siete ejes y el peor de ellos
manda**. El resultado es el color de la fila más una **lista de causas en
palabras**, visible al pasar el puntero por la celda de señal.

## Los siete ejes

1. **Señal en contexto.** Con referencia, el desvío contra ella; si no, contra
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
5. **Puerto Ethernet.** Sin cable o en half duplex, el problema está en el
   tramo cableado — no en el aire. La velocidad solo se menciona cuando
   **limita** lo que la radio podría entregar.
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

::: info 🖼️ Imagen pendiente — `public/signal-scope/diagnostico-tooltip.png`
Captura del **tooltip de diagnóstico** de una estación con 2–3 causas
visibles.

_Existente: `ss-desktop/docs/screenshots/SignalScope-Station-Diagnostic.png`._
:::

## El AP se juzga distinto

Un AP no tiene "un enlace" que juzgar: tiene quince. Su columna Estado combina
carga del canal, salud del radio y la latencia de su sector — el detalle está
en [Puntos de acceso](./interfaz/puntos-de-acceso).

## Sobre los umbrales

Los números de esta guía son los de la versión actual, calibrados con parques
reales. Algunos —los de latencia en particular— siguen en calibración de
campo y pueden ajustarse entre versiones; el tooltip siempre muestra los
valores medidos, así que puedes juzgar con tu propio criterio además del de la
app.

La propia app cuenta cómo se fijaron: **Ayuda → "Cómo se calibran los
umbrales"** resume el método detrás de cada límite, con casos reales — y la
invitación a reportar los tuyos a **support@materis.io**, que es de donde
salen los ajustes.
