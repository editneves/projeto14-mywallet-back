import { NewExitSchema } from "../Model/NewExitSchema";
import db from "../config/database.js";

export async function listNewExit(req, res) {
    try {
      const dados = await db.collection("saida").find().toArray()
  
      console.log(dados)
  
      return res.send(dados)
    } catch (error) {
      res.status(500).send("Ocorreu algum erro desconhecido no servidor")
    }
  }


export async function createNewExit(req, res) {
  const saida = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(422).send("Informe o token!");

  const validation = NewExitSchema.validate(saida, {
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
        .send("Você não tem autorização para saida de valores");

    const saidaExiste = await db
      .collection("saida")
      .findOne({ descricao: saida.descricao });

    if (saidaExiste)
      return res.status(409).send("Essa saida já está cadastrada!");

    const data = await db
      .collection("saida")
      .insertOne({
        descricao: saida.descricao,
        valor: saida.valor,
        idUsuario: checkSession.idUsuario,
      });
    console.log(data);
    res.send("ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("Ocorreu algum erro desconhecido no servidor");
  }
}
