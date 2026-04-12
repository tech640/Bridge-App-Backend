const pool = require("../config/database");

// const findUserByPhone = async (phone) => {
//   const result = await pool.query(
//     "SELECT * FROM users WHERE phone=$1",
//     [phone]
//   );
//   return result.rows[0];
// };

// const createUser = async (name, phone, role_id) => {
//   const result = await pool.query(
//     `INSERT INTO users (name, phone, role_id)
//      VALUES ($1, $2, $3) RETURNING *`,
//     [name, phone, role_id]
//   );
//   return result.rows[0];
// };

// 🔍 check user
const findUserByEmailOrPhone = async (email, phone) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1 OR phone=$2",
    [email, phone]
  );
  return result.rows[0];
};

// ➕ create user
const createUser = async (data) => {
  const {
    name,
    email,
    phone,
    password,
    gender_preference,
    date_of_birth,
  } = data;

  const result = await pool.query(
    `INSERT INTO users 
    (name, email, phone, password, gender_preference, date_of_birth)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *`,
    [name, email, phone, password, gender_preference, date_of_birth]
  );

  return result.rows[0];
};

module.exports = {
  findUserByEmailOrPhone,
  createUser,
};

module.exports = { findUserByPhone, createUser };