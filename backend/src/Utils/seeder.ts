import { faker } from '@faker-js/faker'
import Entities from '../Entities'
import { AppDataSource } from '../Config/db'
const Post = AppDataSource.getRepository(Entities.Post)

const createPosts = async () => {
  const count = await Post.count()
  if (count > 0) return

  for (let i = 0; i < 50; i++) {
    await Post.create({
      title: faker.commerce.productName(),
      mediaURL: faker.image.cats(),
      tag: faker.commerce.department(),
      user_id: 1,
    }).save()
    console.log(`Post ${i} created`)
  }
}

const main = async () => {
  await AppDataSource.initialize().then(async () => {
    await createPosts()
  })
  process.exit()
}

main()
