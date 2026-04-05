
const pool = require('../config/database.js');

const getAllUsers=async()=>{
    const result =await pool.query('SELECT * FROM users');
    return result.rows
}
const getUserById=async(id)=>{
    const result =await pool.query('SELECT * FROM users WHERE id=$1',[id]);
    return result.rows[0]
}
const updateUser=async(id,username,email,age)=>{
    await pool.query(
        'UPDATE users SET username=$1,email=$2,age=$3 WHERE id=$4',
        [username,email,age,id]
    );
}

const DeleteUser=async(id)=>{
    await pool.query('DELETE FROM users WHERE id=$1',[id]);
}

const creatUser=async(username,email,age,password)=>{
    await pool.query('INSERT INTO users(username,email,age,password) VALUES($1,$2,$3,$4)',
        [username,email,age,password]
    );
}

module.exports={
    getAllUsers,
    getUserById,
    DeleteUser,
    updateUser,
    creatUser
};