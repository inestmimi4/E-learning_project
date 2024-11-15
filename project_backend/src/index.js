const express = require('express');
const { json} = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');  // Required for password hashing
const app = express();
const cors = require('cors');

const PORT = 3002;

app.use(cors());
app.use(json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'products_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Endpoint to handle product retrieval
app.get('/products', (req, res) => {
    const query = `
        SELECT products.*,
               GROUP_CONCAT(
                   CONCAT(
                       '{"rating":', reviews.rating, 
                       ',"comment":"', reviews.comment, 
                       '","date":"', reviews.date, 
                       '","reviewerName":"', reviews.reviewerName, 
                       '","reviewerEmail":"', reviews.reviewerEmail, '"}'
                   )
               ) AS reviews
        FROM products
        LEFT JOIN reviews ON products.id = reviews.product_id
        GROUP BY products.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        const products = results.map(product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            tags: product.tags ? product.tags.split(',') : [],
            brand: product.brand,
            duration: product.duration, // New duration field
            reviews: product.reviews ? JSON.parse(`[${product.reviews}]`) : [],
            returnPolicy: product.returnPolicy,
            images: product.images ? product.images.split(',') : [],
            thumbnail: product.thumbnail
        }));

        res.json(products);
    });
});

// Endpoint to handle product details by ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const query = `
        SELECT products.*,
               GROUP_CONCAT(
                   CONCAT(
                       '{"rating":', reviews.rating, 
                       ',"comment":"', reviews.comment, 
                       '","date":"', reviews.date, 
                       '","reviewerName":"', reviews.reviewerName, 
                       '","reviewerEmail":"', reviews.reviewerEmail, '"}'
                   )
               ) AS reviews
        FROM products
        LEFT JOIN reviews ON products.id = reviews.product_id
        WHERE products.id = ?
        GROUP BY products.id
    `;

    db.query(query, [productId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (results.length === 0) {
            return res.status(404).send({ message: 'Product not found' });
        }

        const product = results.map(p => ({
            id: p.id,
            title: p.title,
            description: p.description,
            category: p.category,
            price: p.price,
            discountPercentage: p.discountPercentage,
            rating: p.rating,
            stock: p.stock,
            tags: p.tags ? p.tags.split(',') : [],
            brand: p.brand,
            duration: p.duration,
            reviews: p.reviews ? JSON.parse(`[${p.reviews}]`) : [],
            returnPolicy: p.returnPolicy,
            images: p.images ? p.images.split(',') : [],
            thumbnail: p.thumbnail
        }))[0];

        res.json(product);
    });
});


app.post('/register', (req, res) => {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
        return res.status(400).json({ message: 'All fields are required' });
    }


    const query = 'INSERT INTO users (name, email, password, username) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, password, username], (err, result) => {
        if (err) {
            console.error('Error inserting user into database:', err.message);
            return res.status(500).json({ message: 'Error registering user' });
        }

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
});

app.get('/login', async (req, res) => {
    const { email, password } = req.query;  // Récupérer les paramètres email et mot de passe

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const query = 'SELECT id_u, name, email, username, password FROM users WHERE email = ?';  // Requête SQL pour récupérer l'utilisateur par email

    db.query(query, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving user', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];  // L'utilisateur récupéré de la base de données

        // Si le mot de passe est haché (commence par $2a$10$), utiliser bcrypt pour comparer
        if (user.password.startsWith('$2a$10$')) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);  // Comparer le mot de passe avec le hachage
            if (!isPasswordMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            // Si le mot de passe est en texte clair, comparer directement
            if (password !== user.password) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        }

        // Si le mot de passe est valide, renvoyer les informations de l'utilisateur
        return res.json({
            message: "Login successful",
            userId: user.id_u,
            name: user.name,
            email: user.email,
            username: user.username
        });
    });
});
app.get('/users', (req, res) => {
    const query = 'SELECT `id_u`, `name`, `email`, `password`, `username` FROM `users`'; // Ajuste ici le nom de la colonne id

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving users', error: err });
        }

        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
