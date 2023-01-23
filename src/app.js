import express from "express"
import cors from "cors"
import AuthRoutes from "./routes/AuthRoutes.js"
import NewEntryRoutes from "./routes/NewEntryRoutes"
import NewExitRoutes from "./routes/NewExitRoutes"

const app = express()
app.use(express.json())
app.use(cors())

app.use([AuthRoutes,NewEntryRoutes,NewExitRoutes])

app.listen(5000, () => {
  console.log('Servidor conectado')
})