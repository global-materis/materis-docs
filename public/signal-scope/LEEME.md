# Imágenes de SignalScope

Las imágenes de esta carpeta se referencian desde los `.md` con la ruta
absoluta del sitio, **sin** `public/`:

```md
![Monitor en vivo](/signal-scope/monitor-en-vivo.webp)
```

Cada bloque `::: info 🖼️ Imagen pendiente` en la documentación indica el nombre
de archivo esperado y qué debe mostrar. Al agregar la imagen, se reemplaza ese
bloque por la línea `![alt](/signal-scope/nombre.webp)`.

**Formato: WebP.** Las capturas se suben en `.webp`, no en `.png`: el 2026-09-27
se convirtieron las 22 que había y pasaron de 5,7 MB a 1,7 MB (el mapa de
cobertura solo, de 3,6 MB a 523 KB). Los nombres de la lista de abajo dicen
`.png` por historia; al agregarlas, guárdalas como `.webp`.

El texto alternativo (`alt`) no es decorativo: descríbelo, es lo que leen los
buscadores y los lectores de pantalla.

**El mismo archivo sirve a ES y a EN** (las rutas son idénticas en los dos
idiomas); lo único que cambia entre versiones es el `alt`.

---

## Pendientes de v1.3.0 (11 archivos)

Cada uno tiene su bloque `::: info` en las dos versiones de la página. Al
reemplazar, **borrar el bloque en ES y en EN**.

| Archivo | Qué debe mostrar | Páginas |
|---|---|---|
| `splash.png` | La pantalla de arranque nueva: los dos sistemas como extremos de un enlace ("Ubiquiti · airOS" y "MikroTik · RouterOS" con su **beta**), SignalScope en medio. | compatibilidad / supported-devices |
| `login-sistema.webp` | El modal de sesión con el selector **Sistema** (airOS / RouterOS) y el botón de HTTP deshabilitado al elegir RouterOS. | primeros-pasos / first-steps |
| `actualizar.png` | El modal de actualización desde la Store: el aviso de que la app se cerrará y dejará de vigilar, y **Actualizar ahora**. | instalacion / installation |
| `bandeja.webp` | El menú del icono de bandeja: cabecera con el proyecto y su estado, Monitor, Mapa y Salir. | instalacion / installation |
| `barra-indicadores.png` | La esquina derecha de la barra: lupa, **campana** con su contador y **latido** del centinela con el suyo. | interfaz/index / interface/index |
| `puertos-vigilados.webp` | La pestaña **Puertos** de la ventana de sesión: una tarjeta por puerto con su estado real y su interruptor. | interfaz/estaciones / interface/stations |
| `anadir-destino.png` | El formulario **Añadir a Referentes**: IP o dominio, nombre obligatorio y el interruptor de vigilancia. | interfaz/detectados-y-otros / interface/detected-and-others |
| `cobertura-modos.png` | El mismo nodo con muchos sectores, en **Huella** y en **Detalle** lado a lado, con el selector abierto. | interfaz/mapa / interface/map |
| `anotar-posicion.png` | La burbuja del punto marcado con "Anotar la posición de" y **Anotar aquí**, sobre un MikroTik sin coordenadas. | interfaz/mapa / interface/map |
| `mapa-base.webp` | El menú **Mapa base**: Automático, Claro, Oscuro, Satélite (con clave) y la casilla **Relieve del terreno**. | interfaz/mapa / interface/map |
| `silenciar.webp` | La tarjeta **Silenciar avisos** con su fila de plazos, y al lado su estado ya puesto ("Callado hasta el… · quedan 8 h" + Reactivar). | centinela / sentinel |
| `bandeja-avisos.png` | La campana abierta junto al latido: la lista de avisos con su hora y el punto de no leídos. | centinela / sentinel |

## Capturas existentes que conviene rehacer en v1.3.0

Siguen puestas y no rompen nada, pero muestran la app **anterior**. El motivo de
cada una, por si se prioriza:

| Archivo | Qué quedó desactualizado |
|---|---|
| `monitor-en-vivo.jpg` | El contador y el riel dicen «Otros», la columna «Referencia» con «Marcar OK». La barra no tiene campana; Modulación enseña una sola dirección; Puertos, un solo conector. **Y el tema oscuro se rehízo entero.** |
| `tabla-estaciones.webp` | Cabecera «REFERENCIA», «Marcar OK» y riel con «Otros»; falta la columna **Link sub.**. Modulación en par (`8x/1x`), tira de varios puertos, columna **Línea base** (`−58 dBm` + ×), marcas de sesión apagada / silenciada / aviso de reconexión. |
| `tabla-ap.webp` | El **puerto de subida** ya entra en la columna Estado, y el riel dice «Otros». |
| `escaneo-detectados.jpg` | El botón dice **"Llevar a Referentes…"** y la Sugerencia distingue **Radio MikroTik**. |
| `mapa-cobertura.jpg` | Mapa base OpenFreeMap (la atribución aún dice CARTO), modo **Huella** por defecto, el selector **Cobertura** en la barra y la campana. |
| `centinela-panel.jpg` | Falta el bloque de **equipos silenciados** al pie. |
| `bienvenida.jpg` | Botón **Actualizar** en el pie del rail, el estado "vigilando N equipos" y el subtítulo con «líneas base». |
| `reporte-pdf.webp` | El General lleva **tercera tabla (Referentes)** y CPU/RAM en las otras dos. |
| `pantalla-licencia.webp` | El recuadro de compatibilidad: la app ya dice **"MikroTik · beta"**. |
| `sesion-cascada.webp` | Falta el selector **Sistema** de la cascada. |
| `mensajeria.webp` | Comprobar que muestre «Por dónde», «Avisos que pides tú» y «Qué se envía». |
| `vista-snapshot.jpg`, `visor-ssnap.jpg` | La tabla **Referentes** de un Snapshot lleva **Latencia y pérdida**. |
