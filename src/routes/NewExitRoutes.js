import {
    listNewExit,
    createNewExit
  } from "../controller/NewExit"
  import { Router } from 'express'
  
  const NewExitRouter = Router()
  
  // Rotas de saida de valores
  NewExitRouter.get("/saidaList", listNewExit)
  NewExitRouter.post("/saidaCreate", createNewExit)
  
  export default NewExitRouter