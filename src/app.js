import express from "express"
import cors from "cors"
import authRouter from "./routes/AuthRoutes.js"
import NewEntryRouter from "./routes/NewEntryRoutes"
import NewExitRouter from "./routes/NewExitRoutes"

const app = express()
app.use(express.json())
app.use(cors())

app.use([authRouter, NewEntryRouter, NewExitRouter])

app.listen(5000, () => {
  console.log('Servidor conectado')
})