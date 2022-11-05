const express = require("express");

const productRouter = require("./routes/products");
const cartRouter = require("./routes/cart");

const app = express();

const PORT = 8080

app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);