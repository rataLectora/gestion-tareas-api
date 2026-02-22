import {createTask} from "../models/task.model.js";

export const createNewTask = async(req,res)=>{
    try{
        const {title,description} = req.body;

    const userId = req.user.id;

    if(!title){
        return res.status(400).json({message: "El titulo de la tarea debe ser obligatorio"})

    }

    const newTask = await createTask(title,description,userId);

    res.status(201).json({
        message: "Tarea creada con éxito",
        task: newTask
    })


    }catch(error){
        console.log("Error al crear la tarea: ",error)
        res.status(500).json({message: "Error interno del servidor"})

    }
    
    
}