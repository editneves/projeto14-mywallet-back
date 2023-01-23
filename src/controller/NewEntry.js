import { NewEntrySchema } from "../Model/NewEntrySchema";
import db from "../config/database.js";

export async function listNewEntry(req, res) {
    try {
      const dados = await db.collection("entrada").find().toArray()
  
      console.log(dados)
  
      return res.send(dados)
    } catch (error) {
      res.status(500).send("Ocorreu algum erro desconhecido no servidor")
    }
  }


export async function createNewEntry(req, res) {
  const entrada = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(422).send("Informe o token!");

  const validation = NewEntrySchema.validate(entrada, {
    pick: ["descricao", "valor"],
    abortEarly: false,
  });

  if (validation.error) {
    const erros = validation.error.details.map((err) => {
      return err.message;
    });
    return res.status(422).send(erros);
  }

  try {
    const checkSession = await db.collection("sessoes").findOne({ token });

    if (!checkSession)
      return res
        .status(401)
        .send("Você não tem autorização para entrada de valores");

    const entradaExiste = await db
      .collection("entrada")
      .findOne({ descricao: entrada.descricao });

    if (entradaExiste)
      return res.status(409).send("Essa entrada já está cadastrada!");

    const data = await db
      .collection("entrada")
      .insertOne({
        descricao: entrada.descricao,
        valor: entrada.valor,
        idUsuario: checkSession.idUsuario,
      });
    console.log(data);
    res.send("ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("Ocorreu algum erro desconhecido no servidor");
  }
}
