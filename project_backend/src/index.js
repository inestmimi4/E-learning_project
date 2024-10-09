const express = require('express');
const { json } = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');

const PORT = 3001;

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

// Route to get all products with reviews and duration
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
            tags: product.tags ? product.tags.split(',') : [], // Splitting tags into an array
            brand: product.brand,
            duration: product.duration, // New duration field
            reviews: product.reviews ? JSON.parse(`[${product.reviews}]`) : [],
            returnPolicy: product.returnPolicy,
            images: product.images ? product.images.split(',') : [], // Splitting images into an array
            thumbnail: product.thumbnail
        }));

        res.json(products);
    });
});

// Route to get a single product by ID with reviews and duration
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
            tags: p.tags ? p.tags.split(',') : [], // Splitting tags into an array
            brand: p.brand,
            duration: p.duration, // New duration field
            reviews: p.reviews ? JSON.parse(`[${p.reviews}]`) : [],
            returnPolicy: p.returnPolicy,
            images: p.images ? p.images.split(',') : [], // Splitting images into an array
            thumbnail: p.thumbnail
        }))[0]; // We expect only one product

        res.json(product);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
