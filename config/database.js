
const { Pool }  = require('pg') ; 
require('dotenv').config(); 
const bcrypt = require('bcrypt');
const pool = new Pool({
  database:process.env.DB_NAME, 
    host:process.env.BD_HOST,
    password: process.env.DB_PASSWORD,
    user:process.env.DB_USER,
    port:process.env.DB_PORT,
})

// Test Database connection and create tables 
const initializeDatabase = async() =>{
    try{
        //test connection 
        const client = await pool.connect(); 
        // تشفير الباسوردات
        const Pass = await bcrypt.hash('0123456789', 10);
        console.log('Connected to PG Database '); 
        //Add Column
        // await pool.query(`
        //     ALTER TABLE users
        //     ADD COLUMN role_id INT REFERENCES roles(id);
        //   `);
      
        //   console.log("Column added ✅");
        //Create table Role if don't exist
        await client.query(`
          CREATE TABLE IF NOT EXISTS roles (
          id SERIAL PRIMARY KEY,
          name VARCHAR(50) UNIQUE
        );
              `);
        console.log('role table created');
        //-- refresh tokens
        await client.query(`
          CREATE TABLE IF NOT EXISTS refresh_tokens (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id),
          token TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
              `);
        console.log('refresh_tokens table created');
        //Create tables if don't exist
        await client.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        password VARCHAR(20) NOT NULL,
        role_id INT REFERENCES roles(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `);
      console.log('user table created'); 
      // إدخال البيانات
      // await client.query(`
      //   INSERT INTO users (name, email, phone, password, date_of_birth, role_id)
      //   VALUES
      //     ($1, $2, $3, $4, $5, $6),
      //     ($7, $8, $9, $10, $11, $12),
      //     ($13, $14, $15, $16, $17, $18)
      //   ON CONFLICT (email) DO NOTHING;
      // `, [
      //   'Admin User', 'admin@bridge.com', '0000000000', Pass, '1990-01-01', 4,
      //   'Store User', 'store@bridge.com', '1111111111', Pass, '1995-05-10', 2,
      //   'Driver User', 'driver@bridge.com', '2222222222', Pass, '1998-09-20', 3
      // ]);

      console.log('user Data Added');
        
            client.release();

    }
    catch(error){
        console.error('Error initializzing database:' , error ); 
    }
}



// Run initialize function 
initializeDatabase(); 

module.exports = pool; 
