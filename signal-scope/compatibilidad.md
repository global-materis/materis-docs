# Equipos compatibles

SignalScope gestiona dos sistemas de radio: **airOS** (Ubiquiti airMAX) y
**RouterOS** (MikroTik). Todo lo demás de tu red, como switches, ONU, routers de
cliente e incluso destinos fuera de tu red, se registra en
[**Referentes**](./interfaz/detectados-y-otros#referentes-lo-que-miras-para-contrastar)
con nombre propio y vigilancia de disponibilidad.

| Sistema | Estado | Desde |
|---|---|---|
| **Ubiquiti airOS** (airMAX M y AC) | Compatible | v1.0.0 |
| **MikroTik RouterOS 6 y 7** | Compatible | v1.3.0 |
| **Ubiquiti LTU** | En evaluación | — |
| **TP-Link** | En los planes | — |

:::info Nota sobre MikroTik RouterOS
El soporte de MikroTik lleva menos recorrido por el catálogo de modelos que el de
airMAX: se verificó en dos hAP (ac² y ac lite) con las versiones 6.48, 6.49 y
7.23. Cualquier afirmación sobre un SXT, un LHG o un Basebox es una suposición.
Los equipos con chips ax (paquete `wifi` nuevo de RouterOS 7) no se leen — la app
no ve sus radios. Si usas otro modelo, contáctanos en **support@materis.io**.
:::

::: info 🖼️ Imagen pendiente: `splash.png`
La pantalla de arranque de v1.3.0: los dos sistemas como los extremos de un
enlace ("Ubiquiti · airOS" y "MikroTik · RouterOS"), con SignalScope en medio y
el estado de carga en el hilo que los une.
:::

## Elegir el sistema al iniciar sesión

La ventana de inicio de sesión tiene un selector **Sistema** con dos opciones,
**airOS** y **RouterOS**. Viene preseleccionado según el fabricante que delató
la MAC, y se cambia de un clic.

::: tip Por qué lo eliges tú y no lo adivina la app
La MAC dice el **fabricante**, no el sistema operativo, y MikroTik corre
RouterOS en todo su catálogo, desde un router de escritorio hasta un sector de
torre. Para adivinarlo, la app tendría que acertar dos veces: que la tabla de
fabricantes esté al día (es una lista fija, y la IEEE entrega bloques nuevos sin
avisar) y que fabricante y sistema coincidan. No coinciden.
:::

Con **RouterOS** el transporte se fuerza a **SSH** y la opción HTTP queda
deshabilitada, con el motivo en su tooltip. RouterOS 6 **no tiene API REST**
(llegó en la v7), y lo que se ve abierto en el puerto web es WebFig, una
interfaz para navegador que no se puede consultar. La app entra por SSH en las
dos versiones.

## Un equipo, una fila por radio

Una caja MikroTik con **dos radios** (el de 2,4 GHz y el de 5 GHz) produce
**dos filas**. Los radios pueden estar en modos distintos, así que una fila
puede caer en **Puntos de acceso** y la otra en **Estaciones**, cada una con su
propio SSID, frecuencia, ruido, señal y clientes.

Para no leerlo mal:

- **Es una sola sesión.** La app se conecta una vez a la caja y de ahí salen las
  dos filas. Apagar la sesión, silenciar u olvidar afecta a la caja entera, y la
  app lo avisa antes de que pulses.
- **Lo que es del chasis se repite.** CPU, memoria, uptime, modelo, firmware y
  la tira de puertos salen iguales en las dos filas: es una sola medida mostrada
  dos veces.
- **La elección de puertos vigilados es del equipo**, no de la fila, y vale para
  las dos.
- Un radio **deshabilitado no produce fila**, porque mostrarlo sin datos lo
  pintaría de rojo para siempre. Uno encendido que todavía no conecta **sí
  sale**: una estación buscando red es justo lo que hay que ver.
- Un MikroTik **sin módulo inalámbrico** (un switch, un router de borde) no da
  ninguna fila de radio. El inicio de sesión lo dice, el equipo se queda en
  Detectados y su sitio es **Referentes**.

## Qué ves de un MikroTik, y qué no

Lo que sí llega, igual que en airMAX:

Señal · cadenas (las dos polaridades) · ruido · SNR · SSID · frecuencia y ancho
de canal real · potencia de transmisión · modelo · firmware · CPU · RAM libre ·
uptime · tráfico TX/RX · estado de **todos** los puertos Ethernet con su
velocidad, dúplex y el nombre que les hayas puesto · clientes asociados de un
AP · tiempo de conexión de una estación · y el **radar** de la columna
Estaciones, que le pregunta al AP quiénes cuelgan de él para darlos de alta sin
escanear.

Lo siguiente **queda vacío** porque RouterOS 6 no lo publica. Una celda vacía
dice la verdad; un número inventado, no.

| Dato | Por qué |
|---|---|
| **Latencia del enlace** | RouterOS no mide la latencia del tramo aéreo. En airOS la da el propio radio. |
| **Aire ocupado (airtime)** | No publica la ocupación del canal, y sin latencia su AP tampoco tiene columna de Picos. |
| **Distancia** | Lo que RouterOS llama `current-distance` es el ajuste de *ack-timeout*, no una medida: marcaba 1 sobre un enlace de metros. |
| **Sesiones** | Es el conntrack del kernel, que describe otra cosa. |
| **Señal remota** | Una estación MikroTik no sabe cómo la ve su AP. Si ese AP también está en la app, su propia fila de cliente lleva la señal que él oye. |
| **Downlink / Uplink** | RouterOS da un solo número de throughput esperado, sin dirección. |
| **Coordenadas** | Ver abajo. |

Hay dos lecturas que cambian de forma pero conservan su significado:

- **Calidad de enlace.** RouterOS no calcula el *linkscore* de airMAX, así que
  la columna muestra el **CCQ**, etiquetado y **sin color**: no tiene umbrales
  calibrados, de modo que se informa pero no se juzga. Un AP sin clientes
  asociados no publica CCQ y la celda queda vacía.
- **Modulación.** RouterOS no publica un índice tipo `8x` en ninguna dirección,
  así que la columna muestra las **dos tasas en Mbps**. Por la misma razón, en
  estos equipos esa columna **no se compara entre dos Snapshots**: la tasa PHY
  salta entre escalones de una lectura a la siguiente.

## Coordenadas: anotarlas desde el mapa

RouterOS **no permite escribir coordenadas en el equipo**, porque su paquete GPS
es de solo lectura. Para que un MikroTik salga en el
[Mapa de cobertura](./interfaz/mapa#estaciones-sobre-el-mapa), la app te deja
**anotar su posición a mano**: marcas el punto y lo registras como la posición
de esa estación, desde la burbuja del punto marcado o desde el botón de su
tarjeta.

Dos cosas que conviene tener claras:

- **Lo que anotas se guarda en el proyecto**, no en el equipo. La app lo dice
  con esas palabras: *"La publica SignalScope, no el equipo"*.
- **Nunca pisa lo que informe el radio.** Si algún día ese equipo reportara su
  propia posición, mandaría la del radio.

En **airMAX ese botón no existe, a propósito**. Ahí las coordenadas se registran
en el propio radio (Location/GPS de su interfaz), donde valen para cualquier
herramienta y no solo para SignalScope.

## Detalles técnicos

Algunos aspectos a tener en cuenta:

- **Verificado contra dos hAP (ac² y ac lite)** con RouterOS 6.48, 6.49 y
  7.23. Cualquier afirmación sobre un SXT, un LHG o un Basebox es todavía una
  suposición.
- **Los equipos con chips ax no se leen.** Usan el paquete `wifi` nuevo de
  RouterOS 7, que no tiene `/interface wireless`, y la app no ve sus radios.
- **El semáforo de un MikroTik usa hoy los umbrales de airMAX.** Se auditaron eje
  por eje (señal, cadenas, CPU y memoria son física y porcentajes, y no dependen
  del fabricante), pero **no están calibrados** con enlaces MikroTik reales.
  Léelo con reserva.
  - El sesgo conocido: el SNR sale de restar señal − ruido, y **los pisos de
    ruido no son comparables**. Un hAP da −103 dBm en 2,4 GHz y −107 en 5 GHz;
    un LiteBeam ronda −96. Con la misma señal, un MikroTik puntúa **de 7 a 11 dB
    mejor**. No se corrige con un número inventado, y el riesgo cae del lado
    benigno: se detecta de menos, pero no se inventan alarmas.
- **Los servicios pueden estar en puertos movidos.** Si cambiaste el puerto de
  SSH en el equipo, indícalo en el campo **Puerto** al iniciar sesión.

## Y lo que no es un radio

Todo lo demás vive en **Referentes**: un switch, una ONU, el router del
cliente, el servidor de un nodo, y también **destinos fuera de tu red**, como la
IP pública de tu proveedor o un dominio. De cada uno la app sabe **si responde y
cuánto tarda**, con su porcentaje de pérdida, y el centinela te avisa si deja de
responder.

A un referente la app **no le abre sesión ni le lee la configuración**: solo
comprueba que responde. Esa es toda la promesa, y por eso se cumple siempre.
