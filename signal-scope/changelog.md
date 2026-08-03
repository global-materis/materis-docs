# Novedades por versión

La vista **Novedades** de la app resume cada versión en titulares; aquí está
el detalle, con enlaces a la guía de cada función.

## 1.2.0 — Agosto 2026

La versión más grande hasta ahora: el monitoreo se completa con mapa,
alertas, avisos al teléfono, planificación de espectro y herramientas de
campo.

**[Mapa de cobertura](./interfaz/mapa)** — la segunda vista principal, par
del Monitor. Registra tus nodos (el sitio: torre, mástil, poste), asigna sus
AP y pinta el sector de cada uno con azimut, apertura y alcance, coloreado
por banda. Las estaciones se ubican con sus propias coordenadas, con su color
de diagnóstico y su enlace trazado al AP real. El plano viaja congelado en
los snapshots.

**[Centinela de servicio](./centinela)** — avisa de las fallas que la señal
no delata: AP caído (una alerta por nodo, con cuántas estaciones arrastra),
sesión caída, cable LAN suelto, half duplex, antena desalineada y radio
saturado. Con las notificaciones de Windows activas, los avisos llegan al
escritorio aunque la app esté minimizada, y el clic lleva al equipo.

**[Avisos al teléfono](./centinela#avisos-al-telefono-whatsapp-o-telegram)** —
las fallas que el centinela detecta pueden llegarte por WhatsApp o Telegram
(vía CallMeBot), para enterarte sin estar delante de la pantalla: eliges qué
eventos salen por cada vía y cada tipo agrupa y espacia sus mensajes según su
urgencia.

**[Planificador de frecuencias](./herramientas#planificador-de-frecuencias)**
— qué tramo del espectro ocupa cada AP, cuánto queda libre y qué canales
caben en el ancho que buscas, con sugerencias, detección de DFS y la lista de
AP agrupada por nodo.

**[Diagnóstico multi-variable](./diagnostico)** — el veredicto ya no es la
señal sola: siete ejes (señal en contexto, ruido/interferencia, calidad de
enlace, capacidad, puerto Ethernet, desbalance de cadenas y salud del radio),
con las causas en palabras. La tabla suma columnas de puerto Ethernet,
modulación, latencia del enlace y sesiones; el
[AP gana su propio diagnóstico](./interfaz/puntos-de-acceso) de tres ejes.

**[Herramientas de campo](./herramientas)** — ping continuo con estadísticas
por objetivo (agrupado por sector, minimizable), traceroute con tus radios
resaltados en la ruta, prueba de velocidad iperf contra tu PC y
[comparación entre dos capturas](./snapshots#comparar-dos-momentos).

**[Buscador general — Ctrl+K](./atajos#el-buscador-general-ctrl-k)** —
escribe el cliente que te reportó y la app te deja su estación y su AP en
pantalla, listos para mirar — aunque un filtro los tuviera escondidos.

**[Calificación de la red](./centinela#la-calificacion-de-la-red)** — una
nota 0–100 del parque entero, con su cobertura declarada, descargable como
imagen para compartir.

**[Detectados y Otros](./interfaz/detectados-y-otros)** — lo que era un solo
cajón se parte en dos: la cola temporal del escaneo y el inventario
permanente de los equipos que no gestionas (routers, ONU, switches), con
nombre editable y vigilancia opcional de disponibilidad.

**Y además** — tercer formato de reporte: **CSV** listo para abrirse con
doble clic en un Excel en español; columnas de **CPU y RAM libre** en las
tablas de estaciones y AP (con **Airtime** como columna propia en AP); la
columna **Puertos llega también a los AP** (la degradación del cable de un AP
estrangula a su sector entero); una **sonda de ping opcional** que acompaña a
la latencia del radio para contrastar el aire contra el camino completo; el
inventario de **Otros** viaja también dentro de cada captura, en solo
lectura; y **Ayuda → "Cómo se calibran los umbrales"**, el detrás de cámaras
de los límites de la app.

**Lecturas más fieles** — los M5 y demás equipos con airOS 6 vuelven a
entrar; el aire ocupado de cada AP ya no se lee multiplicado; un radio que
cambia de IP se reconecta solo (la identidad es su MAC).

**Nueva imagen** — rediseño visual y la Bienvenida reorganizada como shell
con acceso directo a Proyectos, Novedades y Licencia.

## 1.1.2 — Julio 2026

- Preparación del canal de **Microsoft Store**.
- Correcciones de texto tras dejar de ser una app portable (los datos viven
  en el perfil del usuario y se migran solos).

## 1.1.1 — Julio 2026

- **Aviso de versión nueva** al arrancar.
- **Código de transferencia reforzado**: un `.sscope` que pide código ya no
  se abre a medias — sin código no se muestra nada.

## 1.1.0 — Julio 2026

- **[Privacidad de snapshots](./compartir#proteger-los-datos-sensibles)**:
  recorta los datos sensibles (IPs, MACs, nombres, modelo) antes de
  compartir una captura, de forma permanente y en el archivo mismo.
- Abrir un `.sscope` o un `.ssnap` con **doble clic** desde el explorador.
- **Instancia única**: un doble clic con la app abierta la trae al frente en
  vez de duplicarla.

## 1.0.0 — Julio 2026

Primera versión: escaneo de la red sin drivers (ping + ARP), sesión SSH/HTTP
con los radios airMAX y clasificación automática en Estaciones/AP, semáforo
de señal con [referencias por antena](./diagnostico#referencias-comparar-contra-tu-propia-red),
snapshots y reportes PDF/Excel.
