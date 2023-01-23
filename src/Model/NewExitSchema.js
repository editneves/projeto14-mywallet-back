import joi from 'joi'

export const NewExitSchema = joi.object({
  valor: joi.number().required(),
  descricao: joi.string().required(),
})