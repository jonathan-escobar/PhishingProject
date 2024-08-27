# Proyecto de Phishing con Node.js

Este proyecto es una aplicación simple que utiliza Node.js, Express, y MySQL para manejar inicios de sesión y registrar intentos de acceso. 

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (v20.17.0 o superior)
- [MySQL](https://www.mysql.com/) (o MariaDB)

## Instalación

1. **Inicializa un nuevo proyecto de Node.js y instala las dependencias necesarias:**

    ```bash
    npm init -y
    npm install express body-parser mysql bcrypt mysql2
    ```

2. **Configura MySQL para usar el protocolo de autenticación compatible:**

    Accede a MySQL desde la línea de comandos:

    ```bash
    mysql -u root -p
    ```

    Ejecuta los siguientes comandos para configurar el usuario `root`:

    ```sql
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tu_contraseña';
    FLUSH PRIVILEGES;
    ```

3. **Crea las bases de datos y tablas necesarias:**

    Asegúrate de tener las siguientes tablas en tu base de datos MySQL:

    ```sql
    CREATE DATABASE IF NOT EXISTS users;
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL
    );

    CREATE DATABASE IF NOT EXISTS login_attempts;
    CREATE TABLE IF NOT EXISTS login_attempts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password TEXT NOT NULL,
        attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

4. **Configura las credenciales de la base de datos:**

    Crea un archivo llamado `.env` en la raíz del proyecto con el siguiente contenido:

    ```plaintext
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_NAME=users
    ```

    Asegúrate de reemplazar `tu_contraseña` con la contraseña que has configurado para el usuario `root`.

## Uso

1. **Inicia el servidor:**

    ```bash
    node server.js
    ```

2. **Accede a la aplicación:**

    Abre tu navegador y dirígete a `http://localhost:3000` para interactuar con la aplicación.

## Deslinde de Responsabilidades

Este proyecto es proporcionado tal cual, sin garantías de ningún tipo. El autor no se hace responsable de cualquier daño o pérdida de datos que pueda resultar del uso de este código. Asegúrate de adaptar y probar el código según tus necesidades y requisitos específicos antes de usarlo en un entorno de producción.

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún error o tienes sugerencias para mejorar el proyecto, no dudes en abrir un problema o enviar una solicitud de extracción.
