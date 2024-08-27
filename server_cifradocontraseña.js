const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Configuración de bcrypt
const saltRounds = 10;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Servir archivos estáticos

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Albatr@10', // Cambia según tu configuración
    database: 'users'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT password_hash FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Error en la base de datos' });

        if (results.length > 0) {
            bcrypt.compare(password, results[0].password_hash, (err, match) => {
                if (err) return res.status(500).json({ success: false, message: 'Error al verificar la contraseña' });

                if (match) {
                    res.json({ success: true });
                } else {
                    res.json({ success: false, message: 'Credenciales inválidas' });
                }
            });
        } else {
            // Guardar el intento fallido en la base de datos
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) return res.status(500).json({ success: false, message: 'Error al cifrar la contraseña' });

                db.query('INSERT INTO login_attempts (email, password) VALUES (?, ?)', [email, hash], (err) => {
                    if (err) {
                        console.error('Error al guardar el intento de inicio de sesión:', err.message);
                        return res.status(500).json({ success: false, message: 'Error al registrar el intento de inicio de sesión' });
                    }

                    res.json({ success: false, message: 'Usuario no encontrado' });
                });
            });
        }
    });
});
// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagina.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
