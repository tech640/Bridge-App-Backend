const pool = require("../config/database");

const findUserByPhone = async (phone) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE phone=$1",
    [phone]
  );
  return result.rows[0];
};

const createUser = async (name, phone, role_id) => {
  const result = await pool.query(
    `INSERT INTO users (name, phone, role_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [name, phone, role_id]
  );
  return result.rows[0];
};

module.exports = { findUserByPhone, createUser };