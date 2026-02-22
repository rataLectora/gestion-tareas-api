import  {Router} from "express"
import {createNewTask} from "../controllers/task.controller.js"
import  {verifyToken} from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/", verifyToken,createNewTask)

export default router

