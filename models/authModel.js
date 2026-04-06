const pool = require("../config/database");

const saveRefreshToken = async (user_id, token) => {
  await pool.query(
    "INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)",
    [user_id, token]
  );
};

const findToken = async (token) => {
  const result = await pool.query(
    "SELECT * FROM refresh_tokens WHERE token=$1",
    [token]
  );
  return result.rows[0];
};

module.exports = { saveRefreshToken, findToken };