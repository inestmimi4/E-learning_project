const express = require('express');
const { json } = require('express');
const fs = require('fs');
const app = express();
const PORT = 3001;

const cors = require('cors');
app.use(cors());
app.use(json());


const products = JSON.parse(fs.readFileSync('db.json', 'utf-8')).products;

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
