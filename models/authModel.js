const { pool } = require('../config/database.js');

// =========================
// 🔵 EXISTING CODE (DO NOT TOUCH)
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
// 🟢 NEW CODE (PHONE / OTP SYSTEM)
// =========================

const getUserByPhone = async (phone) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE phone = $1',
        [phone]
    );
    return result.rows[0];
};

const createUserByPhone = async (phone) => {
    const result = await pool.query(
        'INSERT INTO users (phone) VALUES ($1) RETURNING *',
        [phone]
    );
    return result.rows[0];
};


// =========================
// EXPORT ALL FUNCTIONS
// =========================

module.exports = {
    // existing
    createEmployee,
    getEmployeeByEmail,

    // new (OTP system)
    getUserByPhone,
    createUserByPhone
};