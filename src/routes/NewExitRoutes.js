import {
    listNewExit,
    createNewExit
  } from "../controller/NewExit"
  import { Router } from 'express'
  
  const NewExitRouter = Router()
  
  // Rotas de saida de valores
  NewExitRouter.get("/entrada", listNewExit)
  NewExitRouter.post("/entrada", createNewExit)
  
  export default NewExitRouter