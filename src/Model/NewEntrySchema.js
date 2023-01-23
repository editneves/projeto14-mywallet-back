import joi from 'joi'

export const NewEntrySchema = joi.object({
  valor: joi.number().required(),
  descricao: joi.string().required(),
})