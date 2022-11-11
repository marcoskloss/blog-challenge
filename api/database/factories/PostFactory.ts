import Post from 'App/Models/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Post, ({ faker }) => {
  return {
    author: faker.name.fullName(),
    content: faker.lorem.text(),
    title: faker.lorem.sentence(3),
    coverImageUrl: faker.internet.url(),
  }
}).build()
