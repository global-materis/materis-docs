# Novedades por versión

La vista **Novedades** de la app resume cada versión en titulares. Aquí está
el detalle, con enlaces a la guía de cada función.

## 1.3.0 · Septiembre 2026

**[MikroTik RouterOS](./compatibilidad).** Los equipos MikroTik se conectan
como los airMAX y caen en las mismas tablas. Una caja con dos radios ocupa una
fila por radio. El sistema (airOS o RouterOS) lo eliges al iniciar sesión,
porque el fabricante de la MAC no alcanza para distinguirlos.

**SignalScope en segundo plano.** Puedes cerrar la ventana sin detener el
diagnóstico: la app queda en la bandeja del sistema y el centinela sigue
vigilando. Para cerrarla del todo, usa Archivo → Salir de SignalScope o el
menú de su icono en la bandeja. Además, en Preferencias → General puedes
añadirla a las aplicaciones de arranque de Windows, y arranca con el último
proyecto que dejaste abierto.

**Reconexión cuando un equipo cambia de IP.** La app busca al equipo por su
MAC y lo reconecta. Puedes intervenir en el proceso y dejar una etiqueta con
el motivo de la ausencia.

**Sesiones que no insisten ante un rechazo.** La app reconoce las respuestas
del equipo y, si rechaza la cuenta, busca otras vías en vez de reintentar.
Así airOS 8.7.18 y posteriores ya no bloquean el acceso por intentos
fallidos.

**[El centinela ve más](./centinela).** Avisa si el cable de subida de un AP
negocia a 10 Mbps o en half duplex, y agrupa por AP la latencia que sufren
varias de sus estaciones a la vez: un solo aviso por nodo. Ahora se leen todos
los puertos Ethernet de cada equipo, y en la pestaña **Puertos** de su sesión
eliges cuáles vigila.

**Control por equipo.** Puedes apagar la sesión de un equipo sin olvidarlo
(conserva su registro y sale del diagnóstico hasta que la enciendas),
silenciarlo durante un plazo o pedir que te avise cuando se reconecte. La
**campana** reúne los avisos de la sesión.

**[Referentes](./interfaz/detectados-y-otros).** La tabla Otros pasa a
llamarse Referentes y admite destinos añadidos a mano, como una IP pública o
un dominio, con su estado y su latencia. La referencia de señal de cada
estación pasa a llamarse **línea base**, y funciona igual que antes.

**Reportes más completos.** Los reportes en PDF, Excel y CSV incluyen el uso
de CPU y la RAM libre de cada equipo, y tus Referentes con su estado, tiempo
de respuesta y pérdida.

**[El Mapa, por dentro y por fuera](./interfaz/mapa).** Los planos claro y
oscuro vienen de OpenFreeMap y no piden clave, y puedes activar el relieve del
terreno. La vista satelital usa Google Maps con tu propia clave, que se
registra en Preferencias → Mapa. Llegan los modos de cobertura (Huella, Foco
y Detalle), el marcador con la distancia a cada nodo y
[atajos nuevos](./atajos). A los equipos RouterOS, que no informan su
ubicación, puedes fijarles coordenadas a mano; se guardan solo en el
proyecto.

**Actualizar desde la app.** Cuando hay una versión nueva aparece el botón
**Actualizar**. En la instalación desde Microsoft Store, la actualización se
descarga e instala desde la propia app.

**Correcciones.**
- Contraste del tema oscuro.
- Sesiones duplicadas que registraban dos veces el mismo equipo.
- Equipos nuevos que el descubrimiento descartaba por coincidir con otros que
  antes tuvieron la misma IP.
- Lectura de coordenadas en airOS.
- Redirección al pulsar un aviso del centinela.
- Comparación de Snapshots.

## 1.2.3 · Agosto 2026

- **Los avisos del centinela vuelven a salir al escritorio** en las
  instalaciones desde **Microsoft Store**, donde Windows los descartaba sin
  decir nada. El centinela sí detectaba las fallas; lo que no llegaba era la
  notificación.

## 1.2.2 · Agosto 2026

- **Mensajería ya no deja tu número a la vista.** El resumen del destino
  enmascara tu teléfono y la clave de tu grupo de Telegram, para que no
  aparezcan en una captura de pantalla ni en una sesión compartida.

## 1.2.1 · Agosto 2026

- **El centinela ya no da por resuelta una avería cuando lo que se cayó fue
  la sesión.** La marca como **"Sin medir"** y vuelve a avisar en cuanto el
  equipo responde. Antes, un nodo inestable podía callar durante horas las
  antenas desalineadas de sus clientes.
- **Antena desalineada avisa desde 6 dB** de diferencia entre polaridades, y
  no desde 10. Es el límite que recomienda el propio Ubiquiti. Verás avisos de
  antenas torcidas que antes solo aparecían al abrir su diagnóstico.

## 1.2.0 · Agosto 2026

La versión más grande hasta ahora. El monitoreo se completa con mapa,
alertas, avisos al teléfono, planificación de espectro y herramientas de
campo.

**[Mapa de cobertura](./interfaz/mapa).** Es la segunda vista principal, a la
par del Monitor. Registras tus nodos (el sitio: torre, mástil, poste), les
asignas sus AP y pintas el sector de cada uno con azimut, apertura y alcance,
coloreado por banda. Las estaciones se ubican con sus propias coordenadas,
con su color de diagnóstico y su enlace trazado al AP real. El plano viaja
congelado en los Snapshots.

**[Centinela de servicio](./centinela).** Avisa de las fallas que la señal no
delata: AP caído (una alerta por nodo, con cuántas estaciones arrastra),
sesión caída, cable LAN suelto, half duplex, antena desalineada y radio
saturado. Con las notificaciones de Windows activas, los avisos llegan al
escritorio aunque la app esté minimizada, y el clic lleva al equipo.

**[Avisos al teléfono](./centinela#avisos-al-telefono-whatsapp-o-telegram).**
Las fallas que detecta el centinela pueden llegarte por WhatsApp o Telegram
(vía CallMeBot). Eliges qué eventos salen por cada vía, y cada tipo agrupa y
espacia sus mensajes según su urgencia.

**[Planificador de frecuencias](./herramientas#planificador-de-frecuencias).**
Muestra qué tramo del espectro ocupa cada AP, cuánto queda libre y qué
canales caben en el ancho que buscas, con sugerencias, detección de DFS y la
lista de AP agrupada por nodo.

**[Diagnóstico multivariable](./diagnostico).** El veredicto ya no depende
solo de la señal. Son siete ejes (señal en contexto, ruido e interferencia,
calidad de enlace, capacidad, puerto Ethernet, desbalance de cadenas y salud
del radio), con las causas explicadas en palabras. La tabla suma columnas de
puerto Ethernet, modulación, latencia del enlace y sesiones, y el
[AP tiene su propio diagnóstico](./interfaz/puntos-de-acceso) de tres ejes.

**[Herramientas de campo](./herramientas).** Ping continuo con estadísticas
por objetivo (agrupado por sector y minimizable), traceroute con tus radios
resaltados en la ruta, prueba de velocidad iperf entre dos máquinas y
[comparación entre dos Snapshots](./snapshots#comparar-dos-momentos) (beta).

**[Buscador general (Ctrl+K)](./atajos#el-buscador-general-ctrl-k).** Escribes
el cliente que te llamó y la app te deja su estación y su AP en pantalla,
aunque un filtro los tuviera escondidos.

**[Calificación de la red](./centinela#la-calificacion-de-la-red).** Una nota
de 0 a 100 de toda la red, con su cobertura declarada, que puedes descargar
como imagen para compartir.

**[Detectados y Otros](./interfaz/detectados-y-otros).** Lo que era un solo
cajón se parte en dos: la cola temporal del escaneo y el inventario
permanente de los equipos que no gestionas (routers, ONU, switches), con
nombre editable y vigilancia opcional de disponibilidad. Desde 1.3.0, Otros
se llama Referentes.

**Además.** Un tercer formato de reporte, **CSV**, que se abre con doble clic
en un Excel en español. Columnas de **CPU y RAM libre** en las tablas de
estaciones y AP, con **Airtime** como columna propia en los AP. La columna
**Puertos** llega también a los AP, porque un cable degradado en un AP
estrangula a todo su sector. Una **sonda de ping opcional** acompaña a la
latencia del radio para comparar el aire con el camino completo. El **aviso de
vencimiento de la licencia** trae **"Renovar licencia"**, que abre el enlace
de pago ya emitido. El inventario de **Otros** viaja también dentro de cada
Snapshot, en solo lectura. El atajo **Ctrl+M** alterna entre Monitor y Mapa, y
**Ayuda → "Cómo se calibra"** explica de dónde salen los límites de la app.

**Lecturas más fieles.** Los M5 y demás equipos con airOS 6 vuelven a entrar.
El aire ocupado de cada AP ya no se lee multiplicado. Un radio que cambia de
IP se reconecta solo, porque su identidad es su MAC.

**Nueva imagen.** Rediseño visual, y la Bienvenida reorganizada con acceso
directo a Proyectos, Novedades y Licencia.

## 1.1.2 · Julio 2026

- Preparación del canal de **Microsoft Store**.
- Correcciones de texto tras dejar de ser una app portable: los datos viven
  en el perfil del usuario y se migran solos.

## 1.1.1 · Julio 2026

- **Aviso de versión nueva** al arrancar.
- **Código de transferencia reforzado.** Un `.sscope` que pide código ya no
  se abre a medias: sin el código no se muestra nada.

## 1.1.0 · Julio 2026

- **[Privacidad de Snapshots](./compartir#proteger-los-datos-sensibles)**:
  recorta los datos sensibles (IP, MAC, nombres, modelo) antes de compartir un
  Snapshot, de forma permanente y en el propio archivo.
- Abrir un `.sscope` o un `.ssnap` con **doble clic** desde el explorador.
- **Instancia única**: un doble clic con la app abierta la trae al frente en
  vez de abrir otra.

## 1.0.0 · Julio 2026

Primera versión: escaneo de la red sin drivers (ping y ARP), sesión SSH o
HTTP con los radios airMAX y clasificación automática en Estaciones y AP,
semáforo de señal con
[referencias por antena](./diagnostico#referencias-comparar-contra-tu-propia-red),
Snapshots y reportes en PDF y Excel.
