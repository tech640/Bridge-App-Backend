const pool = require("../config/database");

// 🔍 check user
const findUserByEmailOrPhone = async (email, phone) => {
  const result = await pool.query(
    `
    SELECT 
      users.id,
      users.name,
      users.email,
      users.phone,
      users.password,
      roles.name AS role
    FROM users
    JOIN roles ON users.role_id = roles.id
    WHERE users.email = $1 OR users.phone = $2
    `,
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

