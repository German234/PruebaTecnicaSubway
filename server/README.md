
# Prueba Tecnica Subway - Backend

Sigue estos pasos para inicializar el proyecto:

1. **Clona el repositorio:**
    ```bash
    git clone <URL-del-repositorio>
    cd <nombre-del-proyecto>
    ```

2. **Instala las dependencias:**
    Utiliza npm:
    ```bash
    npm install
    ```

3. **Configura las variables de entorno:**
    Copia el archivo de ejemplo y edítalo según sea necesario:
    ```bash
    cp .env.example .env
    # Edita el archivo .env con tus configuraciones
    ```

4. **Inicia el proyecto:**
    Inicia la api:
    ```bash
    npm start
    ```
    O en modo de desarrollo:
    ```bash
    npm run dev
    ```

5. **Verifica que la aplicación esté corriendo correctamente** accediendo a la URL indicada en la consola (depende de la configuración del puerto que hayas configurado en el .env http://localhost:8080).

## Archivo de Postman

En el repositorio se incluye un archivo de colección de Postman que contiene los endpoints relevantes de la API. Puedes importar este archivo en Postman para probar fácilmente las diferentes rutas y funcionalidades del proyecto. Asegúrate de actualizar las variables de entorno en Postman según tu configuración local.
