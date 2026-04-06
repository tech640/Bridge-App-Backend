
const { Pool }  = require('pg') ; 
require('dotenv').config(); 
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
        console.log('Connected to PG Database '); 
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
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
            `);
            console.log('user table created'); 



        
            client.release();

    }
    catch(error){
        console.error('Error initializzing database:' , error ); 
    }
}



/*
pool.connect((err , client , res) => {
    if(err) { 
        console.error('error message to db' , err.stack);
    }
    else{
        console.log('success connect db ');
    }
})
*/


// Run initialize function 
initializeDatabase(); 

module.exports = {pool} ; 
