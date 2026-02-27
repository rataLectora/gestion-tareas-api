import {createTask,getTaskByUserId,updateTask,deleteTask} from "../models/task.model.js";

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

export const getUserTasks = async (req,res) =>{
  try{
    const userId = req.user.id

    const tasks = await getTaskByUserId(userId)

    res.status(200).json({
        message: "Tareas obtenidas con éxito",
        tasks:tasks
    })
  }catch(error){
    console.log("Error al obtener las tareas: ", error)
    res.status(500).json({message: "Error interno del servidor"})

  }
}

export const updateExistingTask = async (req,res) =>{
    try{
        const {id} = req.params

        const {title,description,completed} = req.body

        const userId = req.user.id

        const updatedTask = await updateTask (id,userId,title,description,completed)

        if(!updatedTask){
            return res.status(404).json({
                message: "Tarea no encontrada o no posees permisos para editarla"
            })
        }

        return res.status(200).json({
            message: "Tarea actualizada con éxito",
            task: updatedTask
        })
    }catch(error){
        console.log("Error al actualizar la tarea:",error)
        res.status(500).json({message: "Error interno del servidor"})

    }
}

export const deleteExistingTask = async (req,res) =>{
   try{
    const {id} = req.params

    const userId = req.user.id

    const deletedTask = await deleteTask(id,userId)

    if(!deletedTask){
        return res.status(404).json({
            message: "Tarea no encontrada o no tienes permisos para eliminarla"
        })
    }

    return res.status(200).json({
        message: "Tarea eliminada con éxito",
        task: deletedTask
    })

   }catch(error){
    console.log("Error al eliminar la tarea:", error)
    res.status(500).json({message: "Error interno del servidor"})

   }
}