const productModel = require("../models/productModel");

// GET /products
const getProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /products/:id
const getProduct = async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /stores
const getStores = async (req, res) => {
  try {
    const stores = await productModel.getStores();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  getStores,
};