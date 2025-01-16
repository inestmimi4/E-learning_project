const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Import des routes d'authentification

const app = express();
const PORT = 3000;

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/products_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Middleware
app.use(express.json());

// Utilisation des routes d'authentification
app.use('/api', authRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
