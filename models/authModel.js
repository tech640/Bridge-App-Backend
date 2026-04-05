const pool = require('../config/database.js');

const createEmployee=async(employee)=>{
     const {email,password,role}=employee;
     await  pool.query(
        'INSERT INTO employes (email,password,role) VALUES($1,$2,$3)',
        [email,password,role ||'employee']
        );
};
const getEmployeeByEmail=async(email)=>{
    const result =await pool.query('SELECT * FROM employes WHERE email=$1',[email]);
    return result.rows[0]
}
module.exports={
    createEmployee,
    getEmployeeByEmail
}
