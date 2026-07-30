# Atajos y navegación rápida

El diagnóstico rápido no es una función: es la suma de gestos pequeños —
atajos, enlaces entre tablas, filtros de un clic. Esta guía los reúne todos.

## Atajos de teclado

Siempre disponibles en el panel (y listados dentro de la app con **F1**):

| Atajo | Acción |
|---|---|
| `Ctrl+S` | Guardar (consolida el archivo del proyecto para copiarlo/respaldarlo) |
| `Ctrl+N` | Nuevo proyecto |
| `Ctrl+Espacio` | Congelar / Reanudar el refresco de las tablas |
| `Ctrl+A` | Registrar un equipo por IP |
| `Ctrl+H` | Guardar snapshot |
| `Ctrl+F` | Búsqueda nativa en pantalla (resalta, no filtra) |
| `Ctrl+↓` / `Ctrl+↑` | Saltar a la tabla siguiente / anterior |
| `Esc` | En cascada: limpia el buscador con foco → cierra el modal abierto → limpia el filtro de estado y los buscadores |
| `F1` | Ayuda y atajos |

Dos aclaraciones útiles:

- **`Ctrl+F` y el buscador de cada tabla no son lo mismo**: `Ctrl+F` resalta
  texto en pantalla sin tocar nada; el buscador de la tabla **filtra** las
  filas. Para trabajar sobre un subconjunto, usa el buscador.
- **`Esc` va por capas**: el primer Esc deshace lo que estabas escribiendo,
  el segundo cierra lo que estabas mirando, el tercero limpia los filtros.
  Tres Esc te devuelven siempre a la tabla completa.

## Filtros de un clic

- **Los contadores filtran**: clic en **Críticas** (o Buenas, Atención,
  Ausentes) y la tabla de estaciones queda en ese grupo — la lista de trabajo
  del día en un clic. **Limpiar filtro** aparece en el riel inferior.
- **El nombre aísla**: clic en el nombre de una estación o un AP y su tabla
  muestra solo esa fila; otro clic en el mismo sitio la deshace.
- **El buscador de estaciones cruza con el AP**: escribir el nombre de un AP
  lista todas sus estaciones.

## Los viajes entre tablas

Cada pregunta tiene su clic, sin buscar a mano:

| Estás en… | Clic | Responde |
|---|---|---|
| Estaciones, columna AP | el **nombre** del AP | "¿cómo está su estación base?" → su fila |
| Estaciones, columna AP | el **icono de antena** | "¿y sus otros clientes?" → la tabla filtrada por ese AP |
| AP, celda Estaciones | el **contador** | "¿quiénes cuelgan de aquí?" → sus estaciones |
| AP, celda Estaciones | el **icono de ping** | ping continuo a todas sus estaciones registradas, ya corriendo |
| Una **alerta del centinela** | la tarjeta | va directo al equipo (y limpia el filtro para que no quede oculto) |
| Detectados / Otros | "Ver en Otros" / "Ver en Detectados" de los avisos | al equipo recién movido |

## Accesos directos en las filas

- **La IP es un enlace**: abre la interfaz web del radio en el navegador. A
  su lado, el **botón de ping** abre una consola con ping continuo a esa IP.
- **"Marcar OK"** fija la referencia sin salir de la fila; la **×** la quita.
- El **menú Columnas** oculta lo que no uses — menos columnas, lectura más
  rápida; la elección se recuerda por tabla.

## En el Mapa

- El **buscador lateral lleva la vista**: clic en un resultado y el mapa
  selecciona y centra (acerca si hace falta, nunca aleja).
- El botón **Centrar** (diana) de cada tarjeta reencuadra lo seleccionado.
- **Marcar** deja un pin efímero para copiar coordenadas.

## Tres rutas de diagnóstico, encadenadas

**Un cliente reclama.** Su nombre en el buscador de Estaciones → el tooltip
de la celda de señal es el diagnóstico completo → si la causa huele a sector,
el icono de antena de la columna AP muestra a sus vecinos: ¿es solo él o
todos?

**Un sector bajo sospecha.** Tabla de AP → su Estado y la columna Picos →
el contador de Estaciones lista a sus clientes → el icono de ping lanza el
ping continuo a todos, de una vez.

**El cierre del día.** Clic en **Críticas** (o Críticas + Atención) → esa es
la lista de trabajo → botón Reporte con el alcance "Críticas + Atención" y
sale el PDF para el técnico de mañana.
