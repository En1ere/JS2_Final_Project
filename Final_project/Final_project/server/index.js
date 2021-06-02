const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const app = express();
const handleProduct = require('./handleProduct');

app.use(express.json());
app.use('/', express.static('./public'));
app.use('/api/cart', cartRouter);

app.get('/api/products', (req, res) => {
    fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

app.get('/api/product', (req, res) => {
    fs.readFile('./server/db/currentProduct.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});
app.post('/api/product', (req, res) => {
    const { id_product, product_name, price, img } = JSON.parse(data);
            const currentProduct = {
                id_product: id_product,
                product_name: product_name,
                price: price,
                img: img
            };
            fs.writeFile('./server/db/currentProduct.json', JSON.stringify(currentProduct), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening ${port} port`);
});
