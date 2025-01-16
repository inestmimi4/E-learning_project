const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Route POST pour /api/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log('Request body:', req.body);  // Vérification du corps de la requête

    if (!username || !password) {
        return res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe requis' });
    }

    try {
        const user = await User.findOne({ username });
       /* if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }*/

        console.log('Password from request:', password);  // Vérification du mot de passe envoyé
        console.log('Password from database:', user.password);  // Vérification du mot de passe haché dans la base de données

        // Comparaison du mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Mot de passe incorrect' });
        }

        // Génération du token JWT
        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            'votre_clé_secrète',  // Remplacez par une clé secrète plus sécurisée en production
            { expiresIn: '1h' }
        );

        res.json({ message: 'Connexion réussie', token });
    } catch (err) {
        console.error('Erreur du serveur:', err);
        res.status(500).json({ error: 'Erreur du serveur', details: err.message });
    }
});

module.exports = router;
