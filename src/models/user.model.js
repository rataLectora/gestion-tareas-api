import pool from "../db/index.js";

export const createUser = async (name, email, password)=>{
    const query = `
        INSERT INTO users (name,email,password)
        VALUES ($1,$2,$3)
        RETURNING id,name,email, created_at;
    `;

    const values = [name,email,password]

    try{
        const result = await pool.query(query,values)

        return result.rows[0]

    }catch(error){
        throw error;

    }
}

export const getUserByEmail = async (email) =>{
    const query = `
        SELECT * FROM users
        WHERE email = $1;
    `;

    const values = [email]
    try{
        const result = await pool.query(query,values)

        return result.rows[0]

    }catch(error){
        throw error;

    }
}