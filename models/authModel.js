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


// =========================
// EXISTING CODE
// =========================

const createEmployee = async (employee) => {
    const { email, password, role } = employee;

    await pool.query(
        'INSERT INTO employes (email, password, role) VALUES($1,$2,$3)',
        [email, password, role || 'employee']
    );
};

const getEmployeeByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM employes WHERE email = $1',
        [email]
    );
    return result.rows[0];
};

// =========================
// NEW EMAIL OTP CODE
// =========================

const getUserByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0];
};

const createUserByEmail = async (email) => {
    const result = await pool.query(
        'INSERT INTO users (email) VALUES ($1) RETURNING *',
        [email]
    );
    return result.rows[0];
};

// =========================
// EXPORT
// =========================

module.exports = {
    saveRefreshToken,
    findToken,
    getEmployeeByEmail,
    getUserByEmail,
    createUserByEmail
};
