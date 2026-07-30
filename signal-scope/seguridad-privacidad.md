# Seguridad y privacidad

El principio que ordena todo lo demás: **los datos de tu red viven en tu
equipo**. IPs, MACs, nombres, métricas, ubicaciones, proyectos, snapshots y
credenciales se guardan únicamente en tu computadora. No hay nube, no hay
analítica de uso, no hay rastreo.

## Cuándo usa internet la app

Tres situaciones concretas, y ninguna lleva datos de tu red:

| Situación | Qué viaja |
|---|---|
| **Activar y revalidar la licencia Full** | Tu correo, tu clave de licencia y el identificador del equipo (HWID). Solo eso, y solo para eso. La **versión de prueba es 100 % local**: no envía nada. |
| **Comprobar si hay versión nueva** | Una consulta a un archivo público de versión, como cualquier descarga web. |
| **El Mapa de cobertura** | Las imágenes del mapa se descargan de proveedores públicos de cartografía (CARTO/OpenStreetMap y, en vista satelital, Esri). Ellos ven lo que ve cualquier servidor web: tu IP y qué zona del mapa pediste — **nunca** las ubicaciones, nombres o métricas de tus equipos, que se quedan en tu proyecto. Si no abres el Mapa, estas peticiones no ocurren. |

La app **no accede a la ubicación de tu dispositivo**: las coordenadas de tus
nodos las colocas tú, a mano, sobre el mapa.

## Dentro de tu red

Lo que la app hace en tu red local se queda en tu red local:

- **Descubrimiento**: pings a los rangos que registres y la tabla ARP del
  sistema. No instala drivers ni captura tráfico.
- **Sesiones con los radios**: con las credenciales que tú registres, y solo
  **lectura** de estado.
- **Herramientas** (ping continuo, traceroute, vigilancia de equipos):
  generan tráfico solo hacia los equipos que elijas y mientras las uses.
- **SNMP**: desactivado de fábrica; solo actúa si tú escribes una community, y
  únicamente con consultas de lectura.

## Tus credenciales

Las contraseñas de tus radios se guardan **cifradas** en tu equipo. La llave
maestra que las protege vive en el **almacén de credenciales de Windows**,
anclada a tu usuario y tu máquina — nunca en un archivo. Por eso copiar un
`.sscope` a otra PC no expone las credenciales: para eso existe el
[código de transferencia](./compartir#compartir-el-proyecto-el-codigo-de-transferencia).

En tránsito, **SSH y HTTPS cifran** la sesión con el radio. **HTTP no** — si
un equipo solo admite ese modo, la app lo marca en ámbar con un candado
abierto para que la decisión sea tuya, en vez de ocultarlo.

## Solo lectura, siempre

SignalScope **jamás envía un comando de configuración a un radio**. Es una
regla de diseño del producto, no una opción: no existe en la app ninguna vía
para modificar un equipo.

## Tus datos, tu control

- Los datos locales se eliminan borrando los archivos de la app o
  desinstalándola.
- Los datos de licencia (correo, clave, HWID) se conservan en el sistema de
  licenciamiento mientras tu licencia esté vigente; puedes pedir su baja
  escribiendo a **support@materis.io**.
- Al compartir, tú decides qué sale: los archivos van por tus propios medios
  —nunca por servidores nuestros— y la [protección de
  snapshots](./compartir#proteger-los-datos-sensibles) recorta lo sensible
  antes de enviar.

---

El texto completo y vigente está en la
[política de privacidad](https://signal-scope.materis.io/es/privacidad) del
sitio de SignalScope.
