# Centinela y calificación de la red

Dos herramientas que trabajan sobre el mismo diagnóstico: el **centinela**
avisa de las fallas que la señal no delata mientras trabajas en otra cosa, y
la **calificación** resume el estado del parque en una nota.

## El centinela de servicio

Un enlace puede verse perfecto —señal excelente, calidad 100 %— y aun así el
cliente estar **sin servicio**: un cable LAN suelto no toca la señal. La app
está centrada en la señal, y justo por eso existe el centinela: vigila las
fallas que **no se ven en el semáforo**.

### Qué vigila

| Aviso | Qué detecta |
|---|---|
| **Punto de acceso caído** | Un AP que estaba en línea deja de responder — se avisa **una vez por el nodo**, indicando cuántas estaciones arrastra, en vez de una alerta por cada cliente. |
| **Sesión caída** | Una estación que estaba en línea deja de responder. |
| **Sin cable LAN** | El puerto del radio quedó sin cable: el enlace se ve bien, el cliente no navega. |
| **LAN en half duplex** | El puerto negoció mal: el servicio sale degradado sin que la señal lo muestre. |
| **Antena desalineada** | Desbalance fuerte entre las dos polaridades: apunte o polarización. |
| **Radio saturado** | CPU o memoria del radio al límite: tira paquetes con la señal intacta. |
| **Equipo vigilado sin respuesta** | Un equipo de [Otros](./interfaz/detectados-y-otros) con la vigilancia activa dejó de responder — pensado para el router de un nodo. |

Los avisos se apilan **por gravedad**: primero lo que deja una celda entera
sin servicio, luego lo que afecta a un cliente, después lo que lo degrada y al
final lo que anticipa un problema.

### Qué NO vigila, a propósito

Señal, ruido, calidad de enlace, capacidad y tráfico quedan **fuera**: varían
con la lluvia, el viento y lo que el cliente esté descargando. Si entraran, el
panel se llenaría todos los días y en un mes nadie lo abriría. El centinela
solo admite condiciones que fallan en binario y que una red sana no produce.

### Cómo se comporta

- **Confirma antes de avisar**: una condición debe sostenerse unos segundos —
  un puerto que parpadea durante un reinicio no amerita una visita.
- **Una alerta por equipo y condición** mientras dure; al resolverse se marca
  y se retira sola a los minutos.
- **Causa, no consecuencia**: si cae un AP, se avisa del AP y **se callan**
  sus estaciones — un nodo caído no debe enterrar el panel bajo cincuenta
  avisos.
- **La ausencia de dato nunca es falla**: si un firmware no reporta el puerto,
  ese eje simplemente no se evalúa para ese equipo.
- **Congelar las tablas no lo detiene**: el centinela vigila el monitoreo de
  fondo, no lo que está pintado.

### Interruptores y notificaciones

En **Preferencias → Alertas** cada aviso tiene su interruptor (apagado =
esa condición ni se evalúa). Con las **notificaciones del sistema** activas,
los avisos llegan al escritorio de Windows aunque la app esté minimizada, y el
clic te lleva al equipo.

::: warning Vigila mientras la app corre
El centinela no es un servicio en segundo plano: vigila mientras SignalScope
está abierto. Lo que pase con la app cerrada no lo verá — la propia app lo
recuerda al pie del panel.
:::

![El panel del centinela: avisos de Sesión caída apilados con el motivo de cada uno, y al pie el recordatorio de que vigila mientras la app está abierta](/signal-scope/centinela-panel.jpg)

## La calificación de la red

Una **nota de 0 a 100 del parque entero**, pensada para compartirse: se
descarga como imagen lista para enviar a un socio o un cliente.

La nota no mira solo la señal: corre el **diagnóstico completo** sobre cada
estación —el mismo de la tabla, así nunca se contradicen— y promedia.

| Nota | Veredicto |
|---|---|
| ≥ 90 | Red excelente |
| ≥ 75 | Red estable |
| ≥ 50 | Requiere atención |
| < 50 | Red crítica |

Dos reglas que la hacen defendible frente a quien la reciba:

- **La nota siempre viaja con su cobertura**: "Calificado sobre N de M
  estaciones". Una nota sin decir cuánto se midió no es auditable.
- **Sin mediciones no hay nota** — se muestra "Sin datos suficientes", no un
  0 %. Y las estaciones ausentes **no penalizan**: un cliente que apaga su
  antena de noche no es una falla de tu red; se informan en su propio bloque.

La tarjeta agrupa en tres bloques — la red, la salud de los enlaces y la
disponibilidad — y sale idéntica en cualquier equipo, en tema claro u oscuro.

![La tarjeta de calificación lista para compartir: 76 % Red estable, calificado sobre 169 de 189 estaciones, con los bloques de la red, salud de los enlaces y disponibilidad](/signal-scope/calificacion-red.png)
