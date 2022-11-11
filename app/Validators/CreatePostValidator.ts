import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    author: schema.string(),
    title: schema.string(),
    content: schema.string(),
    coverImageUrl: schema.string(),
  })
}
