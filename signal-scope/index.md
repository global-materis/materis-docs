# SignalScope

**Mira la señal de toda tu red WISP de un vistazo.**

SignalScope es una aplicación de escritorio para **operadores de internet
inalámbrico (WISP)** que administran radios **Ubiquiti airMAX**. Escanea tu red,
inicia sesión en cada radio y te muestra la **señal en dBm en tiempo real**, con
un semáforo que indica al instante qué enlaces están sanos y cuáles piden
atención.

Es **estrictamente de solo lectura**: nunca modifica la configuración de tus
radios.

![El monitor en vivo: la tabla de estaciones con su señal en dBm, semáforo, latencia, modelo y AP, con los contadores del parque y el historial de snapshots arriba](/signal-scope/monitor-en-vivo.jpg)

## El problema que resuelve

Sin monitoreo, el operador se entera de un enlace degradado cuando un cliente
reclama — y el reclamo rara vez cuenta toda la historia: los clientes exigentes
saltan primero, los demás sufren en silencio, y el enlace del que se quejan no
siempre es el que origina el problema. Vigilarlo a mano tampoco escala: iniciar
sesión AP por AP para revisar cada enlace no se sostiene con decenas de antenas.

SignalScope pone la red entera en una pantalla y vigila por ti:

- **Te avisa antes de que el cliente llame**: el semáforo y el centinela señalan
  el enlace que se degrada, aunque nadie lo sienta todavía.
- **Apunta al origen, no al síntoma**: el diagnóstico explica si es señal, ruido,
  saturación del AP o de la frecuencia — o si el problema ni siquiera es de
  radio.
- **Te ayuda a mejorar, no solo a reparar**: referencias por antena ("así se ve
  sana") y los primeros indicios de saturación, antes de que se vuelvan
  reclamos.

## Para quién es

El usuario típico es el **técnico de campo o el encargado de red** de un WISP
rural o de barrio: alguien que necesita ver de un vistazo qué antenas de sus
clientes están degradadas, dejar registro de eso y compartirlo con un colega.

No hace falta ser especialista en radiofrecuencia. La app traduce las métricas
crudas del radio a un estado entendible y a una explicación en palabras.

## Qué hace

| | |
|---|---|
| 🛰️ **Descubre tu red** | Escanea las máscaras CIDR que registres y encuentra los equipos por ping + tabla ARP. Sin drivers ni instalaciones extra. |
| 🔑 **Abre sesión en cada radio** | Por HTTP o SSH, individualmente o en cascada (todos a la vez). Cada radio reporta su modo y se clasifica solo en **Estaciones** o **Puntos de acceso**. |
| 📡 **Monitorea en vivo** | Refresco continuo de señal, ruido, SNR, calidad de enlace, throughput, distancia y uptime. |
| 🚦 **Semáforo por enlace** | Verde / amarillo / rojo por umbrales en dBm, o relativo a la **referencia que fijaste** para esa antena. |
| 🧠 **Diagnostica** | Explica el estado de cada enlace en lenguaje claro y señala dónde mirar. |
| 🛎️ **Centinela de servicio** | Avisa de fallas que la señal no delata: cable LAN suelto, half duplex, antena desalineada, radio saturado. |
| 📱 **Avisos al teléfono** | Las alertas del centinela pueden llegarte por WhatsApp o Telegram, eligiendo qué eventos y con qué urgencia. |
| 🧾 **Registra lo que no es airMAX** | Los equipos que la app no gestiona —un MikroTik, una ONU, un switch— pueden quedar en tu inventario con nombre propio y vigilancia básica de "¿sigue vivo?". |
| 📸 **Guarda historial** | Snapshots del estado de la red, con la diferencia (Δ) frente al momento actual. |
| 📄 **Exporta** | Reportes en PDF y Excel para el cliente o para tu propio registro. |
| 🗺️ **Mapa de cobertura** | Ubicación de tus equipos y su estado sobre el mapa. |
| 🏅 **Califica la red** | Una nota del parque completo, descargable como imagen. |
| 🤝 **Comparte sin exponer** | Un snapshot recorta nombres e IPs sensibles; el otro operador lo abre en modo visor. |

![El diagnóstico de una estación crítica: señal 9 dB por debajo de la esperada a su distancia, calidad de enlace baja y downlink muy por debajo de lo esperado](/signal-scope/diagnostico.png)

## Qué **no** hace

Es tan importante como lo anterior:

- **No configura los radios.** SignalScope jamás envía un comando de escritura a
  un equipo. No hay forma de tumbar un enlace por accidente desde la app.
- **No manda tus datos a ningún servidor.** La información de tu red vive solo en
  tu computadora, en un archivo cifrado.
- **No reemplaza a la interfaz del radio** para tareas de configuración: es la
  capa de observación y diagnóstico por encima de ellas.

## Cómo se organizan tus equipos

La app trabaja con cuatro tablas, y entender la diferencia entre ellas ahorra
confusión desde el primer día:

| Tabla | Qué contiene | Permanencia |
|---|---|---|
| **Detectados** | Lo que acaba de encontrar el escaneo y todavía no sabes qué es. Es tu **cola de trabajo**. | **Temporal**: se vacía a medida que resuelves cada equipo, y desaparece de la vista cuando queda sin filas. |
| **Estaciones** | Los radios cliente (CPE), con su señal, semáforo y diagnóstico. | Permanente |
| **Puntos de acceso** | Tus antenas base, con clientes conectados, canal, frecuencia y carga. | Permanente |
| **Otros** | Equipos que **no son airMAX** pero quieres tener en tu registro: un MikroTik, una ONU, un switch. Les pones nombre y, si quieres, vigilas si siguen respondiendo. | Permanente: siempre está, aunque esté vacía |

Un equipo sale de **Detectados** de dos maneras: **iniciando sesión** en él —ahí
el propio radio dice si es estación o AP y se clasifica solo— o marcándolo como
**"No es un radio"**, con lo que baja a **Otros**. Esa decisión se guarda en el
proyecto, así que un escaneo posterior no vuelve a preguntarte por él.

::: tip La app sugiere, tú decides
Detectados incluye una columna de **Sugerencia** que adelanta qué parece cada
equipo según su fabricante ("Radio Ubiquiti", "Equipo MikroTik · no es airMAX").
Es una ayuda, no una decisión automática: descartar un equipo siempre es un acto
tuyo, porque un radio de marca nueva o con fabricante desconocido podría quedar
fuera del monitoreo sin que te enteres.
:::

## Cómo funciona, a grandes rasgos

1. **Activas la licencia** — con tu correo y tu clave, o eliges la versión de
   prueba de 30 días.
2. **Creas un proyecto** — un archivo `.sscope` que guarda tu red completa
   (equipos, credenciales cifradas, referencias, historial). Todo se autoguarda.
3. **Escaneas** las redes que registres; lo encontrado cae en **Detectados**.
4. **Resuelves esa lista**: inicias sesión en los radios —que se clasifican solos
   en Estaciones o Puntos de acceso— y mandas a **Otros** lo que no sea airMAX.
5. **Monitoreas**: de ahí en adelante la tabla se refresca sola y el semáforo,
   el diagnóstico y el centinela trabajan sobre esos datos.
6. **Registras y compartes**: snapshots, reportes y el archivo del proyecto.

![La bienvenida: proyectos y reportes recientes con su resumen de estaciones, y los accesos a Novedades, Licencia y Preferencias](/signal-scope/bienvenida.jpg)

## Requisitos

- **Windows 10 u 11** (64 bits).
- **Acceso de red a los radios** desde la computadora donde corre la app.
  **Recomendado: conexión por cable.** En una laptop por WiFi la app
  funciona, pero todo lo que mide pasa por esa conexión — si el WiFi de la
  laptop flaquea, sus caídas se confunden con problemas de la red que estás
  monitoreando.
- **Credenciales de los radios** (usuario y contraseña de airOS).
- **No requiere** permisos de administrador para instalar, ni Npcap, ni ningún
  otro driver.
- Conexión a internet **solo para activar la licencia** y para revalidarla
  periódicamente; el monitoreo del día a día funciona contra tu red local.

## Empezar

SignalScope se obtiene en la
[**Microsoft Store**](https://apps.microsoft.com/store/detail/9NPZ6VTKF989).
¿Primera vez? La versión de prueba da **acceso completo por 30 días**, sin correo
ni conexión.

<!-- Estas páginas se irán agregando; los enlaces se activan cuando existan.
- Instalación y activación
- Primeros pasos: tu primer proyecto
- Referencia de la interfaz
-->

Consultas y licencias: **support@materis.io**
