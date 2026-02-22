import pool from "../db/index.js";

export const createTask = async (title, description,userId)=>{

    const query = `
        INSERT INTO tasks (title,description,user_id)
        VALUES ($1,$2,$3)
        RETURNING *;
    `;

    const values = [title,description,userId]

    try{

        const result  = await pool.query(query,values);
        return result.rows[0]
    }catch(error){
        throw error 

    }
}