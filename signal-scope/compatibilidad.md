# Equipos compatibles

SignalScope gestiona dos sistemas de radio: **airOS** (Ubiquiti airMAX) y
**RouterOS** (MikroTik). Todo lo demás de tu red —switches, ONU, routers de
cliente, incluso destinos fuera de tu red— se registra en
[**Referentes**](./interfaz/detectados-y-otros#referentes-lo-que-miras-para-contrastar),
con nombre propio y vigilancia de disponibilidad.

| Sistema | Estado | Desde |
|---|---|---|
| **Ubiquiti airOS** (airMAX M y AC) | Compatible | v1.0.0 |
| **MikroTik RouterOS 6** | **Beta** | v1.3.0 |
| **MikroTik RouterOS 7** | Sin verificar | — |
| **Ubiquiti LTU** | En evaluación | — |
| **TP-Link** | En los planes | — |

## Qué significa "beta" aquí

**Probado en menos modelos que airMAX.** No quiere decir inestable ni que vaya
a romper algo: el driver de RouterOS se levantó y se verificó **campo a campo**
contra equipo real, y lo que el equipo no publica la app lo deja **vacío** en
vez de inventarlo. Lo que falta es kilometraje en catálogo — un SXT, un LHG, un
Basebox, la v7.

Si algo no te cuadra en un equipo tuyo, **escríbenos a support@materis.io**:
esa es exactamente la información que hace falta para que la marca de beta se
retire.

::: info 🖼️ Imagen pendiente — `splash.png`
La pantalla de arranque de v1.3.0: los dos sistemas como los extremos de un
enlace —"Ubiquiti · airOS" y "MikroTik · RouterOS" con su marca **beta**—, con
SignalScope en medio y el estado de carga en el hilo que los une.
:::

## Elegir el sistema al iniciar sesión

Al abrir la sesión de un equipo hay un selector **Sistema**, con dos opciones:
**airOS** y **RouterOS**. Viene **preseleccionado según el fabricante** que
delató la MAC, y se cambia de un clic.

::: tip Por qué lo eliges tú y no lo adivina la app
La MAC dice el **fabricante**, no el sistema operativo — y MikroTik corre
RouterOS en todo su catálogo, desde un router de escritorio hasta un sector de
torre. Adivinarlo obligaría a acertar dos veces: que la tabla de fabricantes
esté al día (es una lista fija, y la IEEE entrega bloques nuevos sin avisar) y
que fabricante y sistema fueran lo mismo. No lo son.
:::

Con **RouterOS** el transporte se fuerza a **SSH** y la opción HTTP queda
deshabilitada, con el motivo en su tooltip: RouterOS 6 **no tiene API REST**
—eso llegó en la v7— y el `www` que se ve abierto es WebFig, una interfaz para
navegador, no algo consultable.

## Un equipo, una fila por radio

Una caja MikroTik con **dos radios** —el de 2,4 GHz y el de 5 GHz— produce
**dos filas**: pueden estar en modos distintos, así que una puede caer en
**Puntos de acceso** y la otra en **Estaciones**, con su propio SSID,
frecuencia, ruido, señal y clientes.

Lo que hay que saber para no leerlo mal:

- **Es una sola sesión.** Se conecta una vez a la caja y de ahí salen las dos
  filas. Apagar, silenciar u olvidar **se lleva la caja entera** — la app lo
  avisa antes de que pulses.
- **Lo que es del chasis se repite**: CPU, memoria, uptime, modelo, firmware y
  la tira de puertos salen iguales en las dos filas. **No son dos medidas, es
  una.**
- **La elección de puertos vigilados es del equipo**, no de la fila: vale para
  las dos.
- Un radio **deshabilitado no produce fila** (sacarlo sin datos lo pintaría de
  rojo para siempre). Uno encendido que todavía no conecta **sí sale**: una
  estación buscando red es justo lo que hay que ver.
- Un MikroTik **sin módulo inalámbrico** —un switch, un router de borde— no da
  ninguna fila de radio: el inicio de sesión lo dice, y su sitio es
  **Referentes**.

## Qué ves de un MikroTik, y qué no

Lo que sí llega, igual que en airMAX:

Señal · cadenas (las dos polaridades) · ruido · SNR · SSID · frecuencia y ancho
de canal real · potencia de transmisión · modelo · firmware · CPU · RAM libre ·
uptime · tráfico TX/RX · estado de **todos** los puertos Ethernet con su
velocidad, dúplex y el nombre que les hayas puesto · clientes asociados de un
AP · tiempo de conexión de una estación · y el **radar** de la columna
Estaciones, que le pregunta al AP quiénes cuelgan de él para darlos de alta sin
escanear.

Lo que **queda vacío**, porque RouterOS 6 no lo publica — y una celda vacía
dice la verdad, un número inventado no:

| Dato | Por qué |
|---|---|
| **Latencia del enlace** | RouterOS no mide la latencia del tramo aéreo. En airOS la da el propio radio. |
| **Aire ocupado (airtime)** | No publica ocupación del canal — y sin latencia tampoco hay columna de Picos en su AP. |
| **Distancia** | Lo que RouterOS llama `current-distance` es el ajuste de *ack-timeout*, no una medida: marcaba 1 sobre un enlace de metros. |
| **Sesiones** | Es el conntrack del kernel, que describe otra cosa. |
| **Señal remota** | Una estación MikroTik no sabe cómo la ve su AP. Si ese AP también está en la app, su propia fila de cliente lleva la señal que él oye. |
| **Downlink / Uplink** | RouterOS da un solo número de throughput esperado, sin dirección. |
| **Coordenadas** | Ver abajo. |

Y dos lecturas que **cambian de forma**, no de significado:

- **Calidad de enlace** — RouterOS no calcula el *linkscore* de airMAX; en su
  lugar la columna muestra el **CCQ**, etiquetado y **sin color**: no tiene
  umbrales calibrados, así que se informa pero no se juzga. Un AP sin clientes
  asociados no publica CCQ y la celda queda vacía.
- **Modulación** — RouterOS no publica índice tipo `8x` en ninguna dirección,
  así que la columna muestra las **dos tasas en Mbps**. Por lo mismo, esa
  columna **no se compara entre dos capturas** en estos equipos: la tasa PHY
  salta entre escalones de una lectura a la siguiente.

## Coordenadas: anotarlas desde el mapa

RouterOS **no permite escribir coordenadas en el equipo** — su paquete GPS es
de solo lectura. Para que un MikroTik salga en el
[Mapa de cobertura](./interfaz/mapa#estaciones-sobre-el-mapa), la app te deja
**anotar su posición a mano**: marcas el punto y lo registras como la posición
de esa estación, desde la burbuja del punto marcado o desde el botón de su
tarjeta.

Dos cosas que conviene tener claras:

- **Lo que anotas se guarda en el proyecto**, no en el equipo. La app lo dice
  con esas palabras: *"la publica SignalScope, no el equipo"*.
- **Nunca pisa lo que informe el radio.** Si algún día ese equipo reportara su
  propia posición, mandaría la del radio.

En **airMAX no existe ese botón, y es a propósito**: ahí las coordenadas se
registran en el propio radio (Location/GPS de su interfaz), que es donde valen
para cualquier herramienta, no solo para SignalScope.

## Los límites honestos de la beta

Se dicen aquí para que no los descubras en campo:

- **Verificado contra un hAP ac² con RouterOS 6.48.** Cualquier afirmación
  sobre un SXT, un LHG, un Basebox o la v7 es todavía una suposición.
- **El semáforo de un MikroTik usa hoy los umbrales de airMAX.** Están
  auditados eje por eje —señal, cadenas, CPU y memoria son física y
  porcentajes, no dependen del fabricante— pero **no están calibrados** con
  enlaces MikroTik reales. Léelo con reserva.
  - El sesgo conocido: el SNR sale de restar señal − ruido, y **los pisos de
    ruido no son comparables**. Un hAP da −103 dBm en 2,4 GHz y −107 en 5 GHz;
    un LiteBeam ronda −96. Con la misma señal, un MikroTik puntúa **7–11 dB
    mejor**. No se corrige con un número inventado: el riesgo cae del lado
    benigno (se detecta de menos, no se inventan alarmas).
- **Los servicios pueden estar en puertos movidos.** Si cambiaste el puerto de
  SSH en el equipo, indícalo al iniciar sesión.

## Y lo que no es un radio

Todo lo demás vive en **Referentes**: un switch, una ONU, el router del
cliente, el servidor de un nodo — y también **destinos fuera de tu red**, como
la IP pública de tu proveedor o un dominio. De cada uno la app sabe **si
responde y cuánto tarda**, con su porcentaje de pérdida, y el centinela te
avisa si deja de hacerlo.

De un referente **no se abre sesión ni se lee configuración**: solo el
latido. Es toda la promesa, y por eso se cumple siempre.
