const pool = require("../config/database");

// كل المنتجات
const getAllProducts = async () => {
  const result = await pool.query(`
    SELECT 
      products.id,
      products.name,
      products.base_price,
      products.image,
      stores.name AS store_name
    FROM products
    JOIN stores ON products.store_id = stores.id
  `);

  return result.rows;
};

// منتج واحد
const getProductById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM products WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

// كل المتاجر
const getStores = async () => {
  const result = await pool.query(`SELECT * FROM stores`);
  return result.rows;
};

module.exports = {
  getAllProducts,
  getProductById,
  getStores,
};