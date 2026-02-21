import bcrypt from "bcrypt";

import {createUser} from "../models/user.model.js"

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