const express = require("express");
const ProductManager = require("./ProductManager");
const PORT = 3000

const app = express()


const productManager = new ProductManager("archivos.json");

const product1 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
}

const product2 = {
    title: "producto Testeo",
    description: "Este es un producto Testeo",
    price: 200,
    thumbnail: "Sin imagen 2",
    code: "cdf456",
    stock: 25
}

const product3 = {
    title: "producto Testeo 3",
    description: "Este es un producto Testeo 3",
    price: 200,
    thumbnail: "Sin imagen 3",
    code: "cdf45a6",
    stock: 25
}

const product4 = {
    title: "producto Testeo 4",
    description: "Este es un producto Testeo 4",
    price: 200,
    thumbnail: "Sin imagen 4",
    code: "cdfdas456",
    stock: 25
}

const product5 = {
    title: "producto Testeo 5",
    description: "Este es un producto Teste 5o",
    price: 200,
    thumbnail: "Sin imagen 5",
    code: "cdf56",
    stock: 25
}

const product6 = {
    title: "producto Testeo 6",
    description: "Este es un producto Testeo 6",
    price: 200,
    thumbnail: "Sin imagen 6",
    code: "cddasda56",
    stock: 25
}

productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);
productManager.addProduct(product4);
productManager.addProduct(product5);
productManager.addProduct(product6);

app.get("/", (req, res) => {
    // console.log(req.query)

    res.send("Server Online...!!!")
})

app.get("/products", (req, res) => {
    const products = productManager.getProducts();
    if (req.query.limit === undefined) {
        console.log(products);
        return
    }
    console.log(products.slice(0, req.query.limit));
    res.send("Ok")
});

app.get("/products/:id", async (req, res) => {
    console.log(await productManager.getProductById(req.params.id));
    res.send("Ok")
});

app.listen(PORT, () => {
    console.log(`Server OK en puerto ${PORT}`)
})