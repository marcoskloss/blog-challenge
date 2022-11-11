import { test } from '@japa/runner'
import PostFactory from 'Database/factories/PostFactory'

const makePost = async () => {
  const post = await PostFactory.make()
  return post.toJSON()
}


test('should create a new post with success', async (ctx) => {
  const { assert, client } = ctx
  const postPayload = await makePost()
  const response = await client.post('/posts').json(postPayload)

  const { id, ...post } = response.body()

  response.assertStatus(201)
  assert.isNumber(id)
  assert.containsSubset(post, postPayload)
})

test.group('should not create a new post with wrong payload', () => {
  test('should validate a post without author', async ({ client }) => {
    const postPayload = await makePost()
    const { author: _, ...payload } = postPayload
    const response = await client.post('/posts').json(payload)
    response.assertStatus(422)
  })

  test('should validate a post without content', async ({ client }) => {
    const postPayload = await makePost()
    const { content: _, ...payload } = postPayload
    const response = await client.post('/posts').json(payload)
    response.assertStatus(422)
  })

  test('should validate a post without title', async ({ client }) => {
    const postPayload = await makePost()
    const { title: _, ...payload } = postPayload
    const response = await client.post('/posts').json(payload)
    response.assertStatus(422)
  })

  test('should validate a post without cover image url', async ({ client }) => {
    const postPayload = await makePost()
    const { coverImageUrl: _, ...payload } = postPayload
    const response = await client.post('/posts').json(payload)
    response.assertStatus(422)
  })
})
