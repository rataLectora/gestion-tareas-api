import  {Router} from "express"
import {createNewTask,getUserTasks,updateExistingTask,deleteExistingTask} from "../controllers/task.controller.js"
import  {verifyToken} from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/", verifyToken,createNewTask)

router.get('/',verifyToken,getUserTasks)

router.put('/:id',verifyToken,updateExistingTask)

router.delete('/:id',verifyToken,deleteExistingTask)



export default router

