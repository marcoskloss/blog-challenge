import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
import Post from 'App/Models/Post'

export default class PostsController {
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreatePostValidator)
    const post = await Post.create(data)
    response.status(201)
    return post.toJSON()
  }
}
