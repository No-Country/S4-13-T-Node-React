import { faker } from '@faker-js/faker'
import { DataSource } from 'typeorm'
import { ConfigServer } from '../Config/config'
import { Post } from '../Entities/post.entity'
class Seeder extends ConfigServer {
  constructor() {
    super()
    this.main()
  }

  async createPosts(dataSource: DataSource) {
    const post = dataSource.getRepository(Post)
    const count = await post.count()
    if (count > 0) return

    for (let i = 0; i < 50; i++) {
      const posts = post.create({
        title: faker.commerce.productName(),
        media_url: faker.image.cats(),
        tag: faker.commerce.department(),
        user_id: 1,
      })
      await post.save(posts)
      console.log(`Post ${i} created`)
    }
  }

  async main() {
    const dataSource = await this.dbConnect()
    await this.createPosts(dataSource)
    process.exit()
  }
}

new Seeder()
