import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {createUser,getUserByEmail} from "../models/user.model.js"

export const registerUser = async (req,res) => {
    try{
    const{name,email,password} = req.body

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password,saltRounds)

    const newUser = await createUser (name,email,hashedPassword)

    res.status(201).json({
        message: "Usuario registrado con éxito",
        user : newUser
    })

    }catch(error){
        console.log("Error al registrar al usuario:", error)
        if(error.code === "23505"){
            return res.status(400).json({
                message: "El correo ya está registrado"})
        }
        res.status(500).json({message: "Error interno del servidor"})


    }
   
}

export const loginUser = async(req,res) =>{
    try{
        const {email,password} = req.body

        const user = await getUserByEmail(email)

        if (!user){
            return res.status(401).json({message: "Credenciales inválidas"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(401).json({message: "Credenciales inválidas"})
        }

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token: token,
            user:{
                id: user.id,
                name: user.name,
                email: user.email
            }


        })

    }catch(error){
        console.log("Error en el login:", error)
        res.status(500).json({message: "Error interno del servidor"})

    }
}