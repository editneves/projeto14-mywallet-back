import { listNewEntry, createNewEntry } from "../controller/NewEntry";
import { Router } from "express";

const NewEntryRouter = Router();

// Rotas de entrada de valores
NewEntryRouter.get("/entradaList", listNewEntry);
NewEntryRouter.post("/entradaCreate", createNewEntry);

export default NewEntryRouter;
