# Imágenes de SignalScope

Las imágenes de esta carpeta se referencian desde los `.md` con la ruta
absoluta del sitio, **sin** `public/`:

```md
![Monitor en vivo](/signal-scope/monitor-en-vivo.png)
```

Cada bloque `::: info 🖼️ Imagen pendiente` en la documentación indica el nombre
de archivo esperado y qué debe mostrar. Al agregar la imagen, se reemplaza ese
bloque por la línea `![alt](/signal-scope/nombre.png)`.

El texto alternativo (`alt`) no es decorativo: descríbelo, es lo que leen los
buscadores y los lectores de pantalla.
