# Seguridad y privacidad

El principio que ordena todo lo demás: **los datos de tu red viven en tu
equipo**. IPs, MACs, nombres, métricas, ubicaciones, proyectos, Snapshots y
credenciales se guardan únicamente en tu computadora. No hay nube, ni
analítica de uso, ni rastreo.

## Cuándo usa internet la app

En cinco situaciones concretas. Solo la última, **opcional y apagada de
fábrica**, lleva datos de tu red:

| Situación | Qué viaja |
|---|---|
| **Activar y revalidar la licencia Full** | Tu correo, tu clave de licencia y el identificador del equipo (HWID), hacia el sistema de licencias de Materis. Solo eso, y solo para eso. La **versión de prueba es 100 % local**: no envía nada. |
| **Comprobar si hay versión nueva** | Al iniciar y cada seis horas, una consulta a un archivo público de versión (en GitHub), como cualquier descarga web. Si instalaste desde la Microsoft Store, la consulta se le hace a la Store. |
| **El Mapa de cobertura** | Las imágenes del mapa se descargan de proveedores públicos: **OpenFreeMap** (con datos de OpenStreetMap) para los planos, y los datos de elevación de **Terrain Tiles** (AWS Open Data) **solo si enciendes el relieve**, que viene apagado. La vista **Satélite** usa **Google Maps**, y solo con **tu propia clave**. Esos proveedores ven lo que ve cualquier servidor web: tu IP y qué zona del mapa pediste. **Nunca** reciben las ubicaciones, los nombres ni las métricas de tus equipos, que se quedan en tu proyecto. Si no abres el Mapa, estas peticiones no ocurren. |
| **Los Referentes fuera de tu red** (si los vigilas) | Si añades como Referente una IP pública o un dominio y lo vigilas, la app le envía un ping desde tu PC cada pocos segundos, y si es un dominio lo resuelve con el DNS de tu sistema. Ese destino ve tu IP pública, como con cualquier ping, y **no recibe ningún dato de tu red**. Se detiene en cuanto lo retiras o apagas su vigilancia. |
| **Los avisos por mensajería** (si los enciendes) | El texto de cada aviso (el nombre del proyecto y, por equipo, su nombre, su IP y su AP) viaja a los servidores de **CallMeBot**, que lo entregan a tu WhatsApp o Telegram. Si eliges un grupo de Telegram, el aviso lo lee todo el grupo. Con la mensajería apagada, nada de esto ocurre. |

La app **no accede a la ubicación de tu dispositivo**: las coordenadas de tus
nodos las colocas tú, a mano, sobre el mapa.

## Dentro de tu red

Lo que la app hace en tu red local no sale a internet:

- **Descubrimiento**: pings a los rangos que registres y consulta de la tabla
  ARP del sistema. No instala controladores ni captura tráfico.
- **Sesiones con los radios**: por SSH, HTTPS o HTTP, con las credenciales que
  tú registres, y solo para **leer** su estado.
- **Equipos que cambian de IP**: si un equipo con sesión guardada deja de
  responder en su dirección, la app lo busca preguntando a tus AP y a tus
  estaciones y consultando la tabla ARP. Antes de actualizar nada, comprueba
  por su MAC que sea el mismo equipo.
- **Herramientas** (ping continuo, traceroute, vigilancia de equipos): generan
  tráfico solo hacia los equipos que elijas y mientras las uses.
- **Servidor de la prueba de velocidad**: al levantarlo, la app abre un puerto
  de escucha en tu equipo. Solo mide el volumen transferido y deja de
  escuchar al detenerlo o al cerrar la app.
- **SNMP**: desactivado de fábrica. Solo actúa si escribes una community en
  **Archivo → Seguridad → SNMP**, y entonces pregunta la identidad de los
  equipos fuera de tus redes locales y de los de fabricante desconocido. Al
  resto no le pregunta nada, y nunca les cambia nada.

## Tus credenciales

Las contraseñas de tus radios y la community SNMP se guardan **cifradas** en
tu proyecto. La llave maestra que las protege vive en el **almacén de
credenciales de Windows**, anclada a tu usuario y tu máquina, y nunca en un
archivo. Por eso copiar un `.sscope` a otra PC no expone las credenciales:
para eso existe el
[código de transferencia](./compartir#compartir-el-proyecto-el-codigo-de-transferencia).

En tránsito, **SSH y HTTPS cifran** la sesión con el radio. **HTTP no**: si un
equipo solo admite ese modo, la app lo marca en ámbar con un candado abierto
para que la decisión sea tuya. Los equipos **RouterOS entran siempre por
SSH**, así que su sesión va cifrada siempre. SNMP v1 tampoco cifra: la
community viaja en claro por tu red, como en cualquier herramienta que lo use.

Hay dos credenciales más, de servicios que **no son de tu red**, y se guardan
de otra forma:

- **La clave de Google Maps** (vista Satélite) se guarda cifrada en el
  **almacén de credenciales de Windows**, ligada a esa máquina y a ese
  usuario. No viaja dentro del proyecto ni se copia al compartirlo, así que al
  cambiar de PC hay que volver a pegarla. Se borra con **Quitar** en
  **Preferencias → Mapa**.
- **El teléfono, el usuario de Telegram y la clave de CallMeBot** se guardan
  **sin cifrar** en tu equipo, entre las preferencias de la app y fuera del
  proyecto: no van en un `.sscope` ni en un Snapshot. Quien use tu sesión de
  Windows puede leerlos. La app los muestra **enmascarados** para que no
  aparezcan en una captura de pantalla ni en una sesión compartida.

## Solo lectura, siempre

SignalScope **nunca envía un comando de configuración a un radio**. Es una
regla de diseño del producto y no una opción: la app no tiene ninguna vía para
modificar un equipo.

## Tus datos, tu control

- Los datos locales se eliminan borrando los archivos de la app o
  desinstalándola.
- Los datos de licencia (correo, clave, HWID) se conservan en el sistema de
  licencias mientras tu licencia esté vigente. Los de tu compra los trata
  Materis según [su política](https://materis.io/privacidad). Para pedir su
  baja, escribe a **support@materis.io**.
- Al compartir, tú decides qué sale: los archivos van por tus propios medios,
  nunca por servidores nuestros, y la [protección de
  Snapshots](./compartir#proteger-los-datos-sensibles) recorta lo sensible
  antes de enviar.

En la app, **Archivo → Seguridad → Acerca de** resume estas mismas reglas y
enlaza a la política de privacidad publicada.

---

El texto completo y vigente está en la
[política de privacidad](https://sscope.materis.io/es/privacidad) del sitio de
SignalScope.
