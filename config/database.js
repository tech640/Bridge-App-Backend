
const { Pool }  = require('pg') ; 
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

            await client.query(`
                 CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
                `);
            console.log('Categories table is created '); 

            await client.query(`
                
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
                `);
                 console.log('posts table is created '); 

                 await client.query(`
                    CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
                    `);
                    console.log('comments table is created '); 

            const categoriesResult = await client.query('SELECT COUNT(*) FROM categories');
            if(parseInt(categoriesResult.rows[0].count) === 0 ){
                await client.query(`
                      INSERT INTO categories (name, description) VALUES
        ('Technology', 'Posts about technology, programming, and digital trends'),
        ('Lifestyle', 'Articles about lifestyle, health, and wellness'),
        ('Travel', 'Travel experiences, tips, and destination guides'),
        ('Food', 'Recipes, restaurant reviews, and cooking tips'),
        ('Business', 'Business advice, entrepreneurship, and career development')
                    `);
                    console.log(' default categories insert');
            }
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
