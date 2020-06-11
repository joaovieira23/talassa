import express from 'express';
import data from './data';

const app = express();

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find(x => x._id === productId); 

  if(product)
    res.send(product);
  else
    res.status(404).send({ message: "Product Not Found." })

});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(3333, () => { console.log("Server started at http://localhost:3333") });