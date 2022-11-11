import { test } from '@japa/runner'
import { getPostRoute } from '../testHelpers/routes'
import PostFactory from 'Database/factories/PostFactory'
import { DateTime } from 'luxon'
import Post from 'App/Models/Post'

const postRoute = getPostRoute()

test('should return all saved Posts ordered by creation date', async ({ client }) => {
  const currentDate = DateTime.now()
  const posts = await PostFactory.merge([
    { createdAt: currentDate },
    { createdAt: currentDate.plus({ minutes: 1 }) },
    { createdAt: currentDate.plus({ minutes: 2 }) },
  ]).createMany(3)

  const response = await client.get(postRoute)

  response.assertStatus(200)
  response.assertBodyContains(posts.map(post => post.toJSON()))
})

test('should return an empty list if no Post is found', async ({ client }) => {
  await Post.query().delete()

  const response = await client.get(postRoute)
  response.assertStatus(200)
  response.assertBody([])
})
