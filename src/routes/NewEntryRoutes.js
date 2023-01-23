import {
    listNewEntry,
    createNewEntry
  } from "../controller/NewEntry"
  import { Router } from 'express'
  
  const NewEntryRouter = Router()
  
  // Rotas de entrada de valores
  NewEntryRouter.get("/entrada", listNewEntry)
  NewEntryRouter.post("/entrada", createNewEntry)
  
  export default NewEntryRouter