# Primeros pasos

Para pasar de la app recién instalada a tu red monitoreada en vivo hay cuatro
pasos: crear el proyecto, registrar tus redes, escanear e iniciar sesión en los
radios.

## 1. Crea tu primer proyecto

En la pantalla de bienvenida pulsa **Nuevo proyecto**. Eliges su nombre y dónde
guardarlo, y se crea como un archivo **`.sscope`**.

Ese archivo es tu red completa (equipos, credenciales cifradas, líneas base,
Snapshots e historial) y **se autoguarda** mientras trabajas. La próxima vez, la
bienvenida te lo ofrece en **Archivos recientes** con un resumen de su estado.

![El diálogo de crear proyecto: nombre, ubicación y la ruta del archivo .sscope que se creará](/signal-scope/crear-proyecto.png)

## 2. Registra tus redes

En el panel de escaneo, las redes se registran como **máscaras CIDR** (por
ejemplo `192.168.1.0/24`) y se muestran como chips que puedes encender o
apagar. El escaneo recorre solo las encendidas.

Un proyecto nuevo nace sin ninguna red, y la app te ofrece las de tu propia PC
como chips con `+` y borde punteado. Un clic registra la que quieras; nada se
añade sin ese clic. Otros segmentos que gestiones se escriben a mano en el campo.
El rango más amplio admitido es `/16`.

## 3. Escanea

Pulsa **Escanear** (o **Escanear todas**). La app barre las redes activas con
ping, muestra el progreso por red y puedes cancelar en cualquier momento.

Todo lo que responde aparece en la tabla **Detectados** con su IP, MAC y
fabricante, y con una columna **Sugerencia** que adelanta qué parece ser cada
equipo: "Radio Ubiquiti", "Radio MikroTik", etcétera.

Al terminar, la app avisa cuántos equipos respondieron ("Escaneo terminado · N
equipos respondieron.") y te lleva a la tabla Detectados, donde quedan los
hallazgos.

![La tabla Detectados tras el escaneo: cada hallazgo con su IP, MAC, fabricante y la Sugerencia que adelanta qué es, con el botón de Iniciar sesión en los radios Ubiquiti](/signal-scope/escaneo-detectados.jpg)

::: details Un equipo dice "MAC no alcanzable", ¿qué significa?
Está detrás de un router (fuera de tu red local), y a esa distancia el escaneo
solo ve su IP. No es un problema: al iniciar sesión el equipo se identifica
completo, MAC incluida.
:::

## 4. Inicia sesión en los radios

Los radios necesitan sesión para reportar sus métricas. Usa las credenciales de
su interfaz (las de airOS o las de RouterOS, según el equipo) y elige su
**Sistema** en la ventana de inicio de sesión. Viene preseleccionado según el
fabricante que delató la MAC, y se cambia de un clic. La contraseña es
obligatoria: la app no registra un equipo sin contraseña, porque quedaría
abierto a cualquiera.

- Con **airOS** eliges el **Protocolo**: SSH, que viene por defecto, o HTTP.
  Si tu cuenta es de solo lectura, usa HTTP, porque airOS no da SSH a esas
  cuentas.
- Con **RouterOS** el transporte se fuerza a **SSH** y la opción HTTP queda
  deshabilitada: la v6 no tiene API REST. Ver
  [Equipos compatibles](./compatibilidad).

Hay dos maneras de hacerlo:

- **Individual**: el botón **Iniciar sesión** en la fila del equipo.
- **Sesión en cascada**: la que ahorra tiempo en el primer arranque. Aplica las
  mismas credenciales a todos los equipos sin sesión de una vez, con **Conectar
  todos**. Los que fallen quedan marcados para reintentar de forma individual con
  sus credenciales propias. El lote entero usa un solo sistema: si tienes
  equipos airOS y RouterOS, corre la cascada una vez por cada uno, y la segunda
  reintenta los que quedaron sin conectar.

Al conectar, **cada radio reporta su modo y se clasifica solo** en
**Estaciones** o **Puntos de acceso**, así que no hay nada que clasificar a
mano. Las credenciales quedan guardadas (cifradas dentro del proyecto) y la app
las usa para reconectar automáticamente en las próximas sesiones.

Lo que no vayas a gestionar (una ONU, un switch, el router del cliente) se pasa
a Referentes con **"Llevar a Referentes…"**, que te pide su nombre y si quieres
vigilarlo, como se explica en la
[introducción](./#como-se-organizan-tus-equipos).

::: warning Si un equipo rechaza tus credenciales, la app deja de intentarlo
Insistir hace que el propio equipo cierre el acceso (airOS lo bloquea medio
minuto tras varios intentos fallidos) y acaba dejándote fuera **también a ti,
hasta con tu terminal**. El aviso te repite lo que dijo el radio, con sus
palabras, para que corrijas el dato que falla.
:::

![La sesión en cascada: protocolo, credenciales únicas y la cola de radios conectándose uno a uno](/signal-scope/sesion-cascada.png)

::: info 🖼️ Imagen pendiente: `login-sistema.png`
El modal de inicio de sesión con el selector **Sistema** (airOS / RouterOS)
visible, y el botón de HTTP deshabilitado al elegir RouterOS con su motivo en el
tooltip.
:::

::: details Un MikroTik con dos radios deja dos filas
Es lo esperado: una caja con su AP de 2,4 GHz y su estación de 5 GHz ocupa **una
fila por radio**, aunque sea una sola sesión. Lo que es del equipo (CPU,
memoria, puertos) se repite igual en ambas. El detalle está en
[Equipos compatibles](./compatibilidad#un-equipo-una-fila-por-radio).
:::

## Ya estás monitoreando

Con las sesiones abiertas, las tablas se refrescan solas: señal en dBm (local y
remota), semáforo, throughput, distancia, uptime. A partir de aquí:

- **Marca líneas base.** Cuando un enlace esté sano y estable, **"Marcar"** fija
  su señal de ese instante como línea base de la antena. Desde entonces la app
  juzga cuánto bajó respecto a ese punto, con los estados «Estable», «Bajó vs
  base» y «Revisar enlace».
- **Guarda un Snapshot** del estado inicial de la red con **Guardar snapshot**.
  Te servirá de punto de comparación.

Las siguientes guías cubren la interfaz en detalle y cómo interpretar el
semáforo y el diagnóstico.

::: details ¿Un radio que el escaneo no encuentra?
Si un radio vive en un segmento que no puedes escanear, regístralo a mano: el
botón **Equipo (+)** del riel inferior abre el inicio de sesión con la IP
editable.
:::
