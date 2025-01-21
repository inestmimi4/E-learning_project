const express = require('express');
const { json} = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const app = express();
const cors = require('cors');

const PORT = 3002;

app.use(cors());
app.use(json());

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
    const { email, password } = req.query;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const query = 'SELECT id_u, name, email, username, password FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving user', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];


        if (user.password.startsWith('$2a$10$')) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {

            if (password !== user.password) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        }


        return res.json(JSON.stringify({
            message: "Login successful",
            userId: user.id_u,
            name: user.name,
            email: user.email,
            username: user.username
        }));
});});
app.get('/users', (req, res) => {
    const query = 'SELECT `id_u`, `name`, `email`, `password`, `username` FROM `users`'; // Ajuste ici le nom de la colonne id

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving users', error: err });
        }

        res.json(results);
    });
});

/*------------------------------------->*/

app.post('/cart/:userId', (req, res) => {
    const userId = req.params.userId;
    const { productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID et Product ID sont requis' });
    }

    const cartQuery = `SELECT id_c FROM cart WHERE id_u = ?`;
    db.query(cartQuery, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de recherche du panier', error: err });
        }

        let cartId = results.length ? results[0].id_c : null;

        if (!cartId) {
            const createCartQuery = `INSERT INTO cart (id_u) VALUES (?)`;
            db.query(createCartQuery, [userId], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Erreur de création du panier', error: err });
                }
                cartId = result.insertId;


                addProductToCart(cartId, productId, res);
            });
        } else {

            addProductToCart(cartId, productId, res);
        }
    });
});
function addProductToCart(cartId, productId, res) {
    const insertQuery = `INSERT INTO cart_items (id_c, id) VALUES (?, ?)`;
    db.query(insertQuery, [cartId, productId], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur d\'ajout au panier', error: err });
        }
        res.json({ message: 'Produit ajouté au panier avec succès' });
    });
}

/*--------------------------------------------------*/
app.get('/cart/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = `
        SELECT ci.id_items, p.id AS productId, p.title, p.price, p.discountPercentage, p.thumbnail
        FROM cart_items ci
        JOIN cart c ON ci.id_c = c.id_c
        JOIN products p ON ci.id = p.id
        WHERE c.id_u = ?
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de récupération du panier', error: err });
        }
        res.json(results);
    });
});
/*----------------------------------------------------------*/
app.delete('/cart/item/:itemId', (req, res) => {
    const itemId = req.params.itemId;

    const query = `DELETE FROM cart_items WHERE id_items = ?`;
    db.query(query, [itemId], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de suppression de l\'article', error: err });
        }
        res.json({ message: 'Article supprimé avec succès' });
    });
});
/*-----------------------------------------------------------*/
app.get('/cart/:userId/total', (req, res) => {
    const userId = req.params.userId;

    const query = `
        SELECT SUM(p.price) AS subtotal,
               SUM(p.price * p.discountPercentage / 100) AS discount
        FROM cart_items ci
        JOIN cart c ON ci.id_c = c.id_c
        JOIN products p ON ci.id = p.id
        WHERE c.id_u = ?
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de calcul des totaux', error: err });
        }

        const { subtotal = 0, discount = 0 } = results[0];
        const total = subtotal - discount;

        res.json({ subtotal, discount, total });
    });
});
/*--------------------------------------*/

app.get('/reviews/:productId', (req, res) => {
    const { productId } = req.params;
    const query = `SELECT * FROM reviews WHERE product_id = ?`;

    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des reviews:', err);
            return res.status(500).json({ message: 'Erreur serveur', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Aucune review trouvée pour ce produit' });
        }
        res.json(results);
    });
});
app.post('/reviews/:productId', (req, res) => {
    const { productId } = req.params;
    const { rating, comment, date, reviewerName, reviewerEmail } = req.body;

    if (!rating || !comment || !date || !reviewerName || !reviewerEmail) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    const query = `INSERT INTO reviews (product_id, rating, comment, date, reviewerName, reviewerEmail)
                   VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(query, [productId, rating, comment, date, reviewerName, reviewerEmail], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de la review:', err);
            return res.status(500).json({ message: 'Erreur serveur', error: err });
        }

        res.status(201).json({
            message: 'Review ajoutée avec succès',
            reviewId: result.insertId,
            review: { productId, rating, comment, date, reviewerName, reviewerEmail },
        });
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
