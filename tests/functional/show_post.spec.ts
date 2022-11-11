import { test } from '@japa/runner'
import PostFactory from 'Database/factories/PostFactory' 
import { getPostRoute } from '../testHelpers/routes'

test('should return a post by a given id', async ({ client }) => {
  const savedPost = await PostFactory.create()
  const postRoute = getPostRoute(savedPost.id)
  const response = await client.get(postRoute)
  response.assertStatus(200)
  response.assertBodyContains(savedPost.toJSON())
})

test('should return 404 when post is not found', async ({ client }) => {
  const id = 999
  const savedPost = await PostFactory.merge({ id }).create()
  await savedPost.delete()
  
  const postRoute = getPostRoute(id)
  const response = await client.get(postRoute)
  response.assertStatus(404)
})