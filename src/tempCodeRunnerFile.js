import 'dotenv/config';
import express from "express";
import healthRoutes from "./routes/health.routes.js"
import authRoutes from  "./routes/auth.routes.js"
import pool from "./db/index.js";


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use(healthRoutes)
app.use("/api/auth", authRoutes)


pool.query('SELECT NOW()', (err,res) =>{
    if(err){
        console.error('Error al momento de conectar la base de datos:', err.message)
    }else{
        console.log("PostgreSQL conectado con éxito")
    }
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})



