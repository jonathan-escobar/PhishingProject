const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../config/db');

// Manejar inicio de sesión
router.post('/login', (req, res) => {
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
            res.json({ success: false, message: 'Usuario no encontrado' });
        }
    });
});

// Manejar registro de usuario (opcional, si necesitas guardar nuevos usuarios)
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ success: false, message: 'Error al encriptar la contraseña' });

        db.query('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, hash], (err, results) => {
            if (err) return res.status(500).json({ success: false, message: 'Error al registrar el usuario' });

            res.json({ success: true });
        });
    });
});

module.exports = router;
