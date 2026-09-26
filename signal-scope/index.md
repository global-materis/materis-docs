# SignalScope

**Mira la señal de toda tu red WISP de un vistazo.**

SignalScope es una aplicación de escritorio para operadores de internet
inalámbrico (WISP). Escanea tu red, inicia sesión en cada radio y te muestra
la **señal en dBm en tiempo real**, con un semáforo que indica al instante qué
enlaces están sanos y cuáles piden atención.

Gestiona radios Ubiquiti airMAX y equipos MikroTik con RouterOS. Los MikroTik
están **en beta**, que aquí significa probado en menos modelos (no inestable).
El detalle está en [Equipos compatibles](./compatibilidad).

Es **estrictamente de solo lectura**: nunca modifica la configuración de tus
radios.

![El monitor en vivo: la tabla de estaciones con su señal en dBm, semáforo, latencia, modelo y AP, con los contadores del parque y el historial de snapshots arriba](/signal-scope/monitor-en-vivo.jpg)

## El problema que resuelve

Sin monitoreo, el operador se entera de un enlace degradado cuando un cliente
reclama, y el reclamo rara vez cuenta toda la historia. Los clientes exigentes
saltan primero, los demás sufren en silencio, y el enlace del que se quejan no
siempre es el que origina el problema. Vigilarlo a mano tampoco escala: con
decenas de antenas no se sostiene iniciar sesión AP por AP para revisar cada
enlace.

SignalScope pone la red entera en una pantalla y la vigila por ti:

- Te avisa antes de que el cliente llame. El semáforo y el centinela señalan el
  enlace que se degrada aunque nadie lo sienta todavía.
- Apunta al origen del problema. El diagnóstico explica si es señal, ruido o
  saturación del AP o de la frecuencia, o si el problema ni siquiera es de radio.
- Sirve para mejorar la red además de repararla: guardas líneas base por antena
  ("así se ve sana") y ves los primeros indicios de saturación antes de que se
  conviertan en reclamos.
- Sigue vigilando aunque cierres la ventana. Con un proyecto abierto, la app se
  queda en la bandeja del sistema, junto al reloj, y continúa midiendo y
  avisando.

## Para quién es

El usuario típico es el técnico de campo o el encargado de red de un WISP rural
o de barrio: alguien que necesita ver de un vistazo qué antenas de sus clientes
están degradadas, dejar registro de eso y compartirlo con un colega.

No hace falta ser especialista en radiofrecuencia. La app traduce las métricas
crudas del radio a un estado entendible y a una explicación en palabras.

## Qué hace

| | |
|---|---|
| 🛰️ **Descubre tu red** | Escanea las máscaras CIDR que registres y encuentra los equipos por ping y tabla ARP. Sin drivers ni instalaciones extra. |
| 🔑 **Abre sesión en cada radio** | Por HTTP o SSH, de uno en uno o en cascada (todos a la vez). Eliges el **Sistema** del equipo (airOS o RouterOS) y el propio equipo reporta su modo, así que se clasifica solo en Estaciones o Puntos de acceso. |
| 📡 **Monitorea en vivo** | Refresco continuo de señal, ruido, SNR, calidad de enlace, throughput, distancia y uptime. |
| 🚦 **Semáforo por enlace** | Verde, amarillo o rojo según umbrales en dBm, o según la línea base que fijaste para esa antena. |
| 🧠 **Diagnostica** | Explica el estado de cada enlace en lenguaje claro y señala dónde mirar. |
| 🛎️ **Centinela de servicio** | Avisa de fallas que la señal no delata: cable LAN suelto, half duplex, puerto a 10 Mbps, antena desalineada, radio saturado, enlace lento. |
| 🔕 **Silencia lo que ya sabes** | Un equipo con avería conocida deja de avisar durante un plazo, y se sigue midiendo. |
| 🔔 **Te avisa cuando algo vuelve** | Marcas un equipo caído y la app te avisa en cuanto responde, una vez o cada vez. |
| 🔁 **Recupera sola las sesiones** | Si un equipo cambia de IP, lo busca a través de su AP y se reconecta sola. Si el caso solo lo puedes resolver tú, te lo pide. |
| 📱 **Avisos al teléfono** | Las alertas del centinela pueden llegarte por WhatsApp o Telegram. Eliges qué eventos y con qué urgencia. |
| 🧾 **Vigila lo que no gestionas** | Un switch, una ONU, el router del cliente, y también una IP pública o un dominio fuera de tu red. Quedan en **Referentes** con nombre propio y una vigilancia de "¿sigue vivo?" que mide su latencia y su pérdida. |
| 📸 **Guarda historial** | Snapshots del estado de la red, con la diferencia (Δ) frente al momento actual. |
| 📄 **Exporta** | Reportes en PDF, Excel y CSV para el cliente o para tu propio registro. |
| 🗺️ **Mapa de cobertura** | Tus equipos y su estado sobre el mapa, con relieve del terreno y tres modos de dibujo de la cobertura. |
| 🏅 **Califica la red** | Una nota del parque completo, descargable como imagen. |
| 🤝 **Comparte sin exponer** | Un Snapshot puede recortar nombres e IP sensibles, y el otro operador lo abre en modo visor. |

![El diagnóstico de una estación crítica: señal 9 dB por debajo de la esperada a su distancia, calidad de enlace baja y downlink muy por debajo de lo esperado](/signal-scope/diagnostico.png)

## Qué **no** hace

Los límites importan tanto como las funciones:

- **No configura los radios.** SignalScope jamás envía un comando de escritura a
  un equipo, así que desde la app no hay forma de tumbar un enlace por
  accidente.
- **No manda tus datos a ningún servidor.** La información de tu red vive solo
  en tu computadora, en un archivo cifrado.
- **No reemplaza a la interfaz del radio** para tareas de configuración. Es una
  capa de observación y diagnóstico por encima de ella.
- **No vigila con la app cerrada del todo.** Cerrar la ventana la deja vigilando
  en la bandeja del sistema. Salir con Archivo → Salir de SignalScope, o desde el
  menú de su icono en la bandeja, detiene el monitoreo.

## Cómo se organizan tus equipos

La app trabaja con cuatro tablas. Conviene entender la diferencia entre ellas
desde el primer día:

| Tabla | Qué contiene | Permanencia |
|---|---|---|
| **Detectados** | Lo que acaba de encontrar el escaneo y todavía no sabes qué es. Es tu cola de trabajo. | **Temporal**: se vacía a medida que resuelves cada equipo, y desaparece de la vista cuando queda sin filas. |
| **Estaciones** | Los radios cliente (CPE), con su señal, semáforo y diagnóstico. | Permanente |
| **Puntos de acceso** | Tus antenas base, con clientes conectados, canal, frecuencia y carga. | Permanente |
| **Referentes** | Lo que no gestionas pero miras para contrastar: el router del nodo, una ONU, un switch, y también destinos fuera de tu red, como tu proveedor o un dominio como Google. Les pones nombre y, si quieres, vigilas si siguen respondiendo. | Permanente: siempre está, aunque esté vacía |

Un equipo sale de **Detectados** de dos maneras. Una es **iniciar sesión** en
él: el propio radio dice si es estación o AP y se clasifica solo. La otra es
**"Llevar a Referentes…"**, que lo pasa al inventario con su nombre y su
vigilancia ya puestos. Esa decisión se guarda en el proyecto, así que un escaneo
posterior no vuelve a preguntarte por él.

::: tip La app sugiere, tú decides
Detectados incluye una columna **Sugerencia** que adelanta qué parece cada
equipo según su fabricante ("Radio Ubiquiti", "Radio MikroTik"). Es una ayuda y
no decide nada por su cuenta. Descartar un equipo siempre lo haces tú, porque un
radio de marca nueva o de fabricante desconocido podría quedar fuera del
monitoreo sin que te enteres.
:::

::: warning Un equipo, varias filas
Una caja con dos radios (por ejemplo, un MikroTik con su AP de 2,4 GHz y su
estación de 5 GHz) ocupa **una fila por radio**, aunque sea un solo equipo y
una sola sesión. Cada radio tiene su SSID, su frecuencia, su ruido y sus
clientes, y promediarlos dejaría al semáforo sin significado. Lo que es de la
caja (CPU, memoria, modelo, puertos) se repite igual en las dos filas: es una
sola medida mostrada dos veces.
:::

## Cómo funciona, a grandes rasgos

1. **Activas la licencia** con tu correo y tu clave, o eliges la versión de
   prueba de 30 días.
2. **Creas un proyecto**: un archivo `.sscope` que guarda tu red completa
   (equipos, credenciales cifradas, líneas base, historial). Todo se autoguarda.
3. **Escaneas** las redes que registres. Lo encontrado cae en **Detectados**.
4. **Resuelves esa lista**. Inicias sesión en los radios eligiendo su sistema, y
   ellos se clasifican solos en Estaciones o Puntos de acceso. Lo que no vayas a
   gestionar lo mandas a **Referentes**.
5. **Monitoreas**. Desde ahí la tabla se refresca sola, y el semáforo, el
   diagnóstico y el centinela trabajan sobre esos datos.
6. **Registras y compartes** con Snapshots, reportes y el archivo del proyecto.

![La bienvenida: proyectos y reportes recientes con su resumen de estaciones, y los accesos a Novedades, Licencia y Preferencias](/signal-scope/bienvenida.jpg)

## Requisitos

- **Windows 10 u 11** (64 bits).
- **Acceso de red a los radios** desde la computadora donde corre la app. Se
  recomienda conexión por cable. En una laptop por WiFi la app funciona, pero
  todo lo que mide pasa por esa conexión, y si el WiFi de la laptop flaquea, sus
  caídas se confunden con problemas de la red que estás monitoreando.
- **Credenciales de los radios**: usuario y contraseña de airOS o de RouterOS,
  según el equipo.
- No requiere permisos de administrador para instalar, ni Npcap, ni ningún otro
  driver.
- **Conexión a internet** para activar la licencia y revalidarla de vez en
  cuando. La app también la usa para avisar de versiones nuevas, traer las
  imágenes del Mapa de cobertura y medir los Referentes que añadas fuera de tu
  red. El monitoreo de tus radios funciona contra tu red local.

## Empezar

SignalScope se obtiene en la
[**Microsoft Store**](https://apps.microsoft.com/store/detail/9NPZ6VTKF989).
Si es tu primera vez, la versión de prueba da acceso completo durante 30 días,
sin correo ni conexión.

Consultas y licencias: **support@materis.io**
