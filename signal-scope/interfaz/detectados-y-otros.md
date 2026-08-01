# Detectados y Otros

Dos tablas con papeles opuestos: **Detectados** es la cola de trabajo del
escaneo y se vacía; **Otros** es el inventario permanente de los equipos que
no son radios airMAX pero quieres tener a la vista.

## Detectados: la cola del escaneo

Todo lo que encuentra un escaneo y aún no tiene identidad cae aquí, con su IP,
MAC y fabricante. La columna **Sugerencia** adelanta qué parece cada equipo:

| Sugerencia | Qué significa |
|---|---|
| **Radio Ubiquiti** (azul) | Candidato airMAX — el botón de sesión es el camino. |
| **Equipo MikroTik / TP-Link · no es airMAX** | Fabricante conocido, no gestionable por la app. |
| **No es airMAX** | Fabricante desconocido. |
| **MAC no alcanzable** | Está detrás de un router; al iniciar sesión se identifica completo. |

Cada equipo sale de la cola de una de dos maneras:

- **Iniciando sesión** — el radio declara su modo y pasa solo a Estaciones o
  Puntos de acceso.
- **"No es un radio"** — baja al inventario de **Otros**. La decisión se
  guarda: un escaneo posterior no te lo vuelve a preguntar.

La sugerencia ayuda pero **la decisión es tuya**: el botón de descarte se
resalta cuando el fabricante ya dice que no es airMAX, y queda discreto en un
radio Ubiquiti, donde descartar casi siempre sería un error.

**Limpiar lista** vacía la cola sin decidir nada — lo no resuelto reaparece en
el siguiente escaneo. Cuando la cola queda en cero, la tabla desaparece de la
vista: su trabajo terminó.

![La tabla Detectados tras un escaneo: IP, MAC y fabricante de cada hallazgo, la Sugerencia que distingue radios Ubiquiti de equipos no gestionables, y los botones de Iniciar sesión y No es un radio](/signal-scope/escaneo-detectados.jpg)

## Otros: el inventario de equipos ajenos

Un MikroTik de nodo, una ONU, un switch: no son radios airMAX, pero son parte
de tu red y conviene tenerlos registrados. **Otros siempre está visible**,
aunque esté vacía, con su propio buscador.

| Columna | Qué muestra |
|---|---|
| **Acción** | El chip **Retirar** — va primero a propósito, lejos del final de la fila, para no retirarlo desde la fila equivocada. |
| **Estado** | La vigilancia del equipo, apagada por defecto. Ver abajo. |
| **Nombre** | **Editable**: estos equipos no reportan nada, así que o lo escribes tú o la fila queda siendo una IP suelta. |
| **IP · MAC · Fabricante** | Identidad del equipo. |

### La vigilancia: "¿sigue vivo?"

Activar **Vigilar** en una fila hace un ping periódico desde tu PC. Dice
exactamente eso — *si responde desde aquí* — y no mide calidad de enlace:

- **Responde · N ms** — está en línea (y la app verificó que quien responde
  es **ese** equipo, no otro que heredó su IP).
- **Sin respuesta** — no contesta.
- **Otro equipo** (ámbar) — esa IP ahora la ocupa otro dispositivo: perdiste
  el rastro del tuyo. Un escaneo lo reencuentra en su dirección nueva.

Si además activas el aviso correspondiente en Preferencias, el
[centinela de servicio](../centinela) te alerta cuando un equipo vigilado deja
de responder — pensado para el router de un nodo, cuya caída explica la de
todos los radios que cuelgan de él.

### Retirar es de verdad

**Retirar** borra el registro completo de ese equipo, incluida la decisión de
haberlo descartado. Si un escaneo posterior lo reencuentra, vuelve a
**Detectados** como si fuera nuevo — ese es también el camino para recuperar
un radio descartado por error.
