const express = require("express");
const router = express.Router();

const {
    getProducts,
    getProduct,
    getStores,
  } = require("../controllers/productController");

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.get("/stores", getStores);

module.exports = router;