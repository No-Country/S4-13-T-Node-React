import { faker } from '@faker-js/faker'
import { DataSource } from 'typeorm'
import { ConfigServer } from '../Config/config'
import { Post } from '../Entities/post.entity'
import { User } from '../Entities/user.entity'
import * as bcrypt from 'bcryptjs'
class Seeder extends ConfigServer {
  constructor() {
    super()
    this.main()
  }

  async createUser(dataSource: DataSource) {
    const user = dataSource.getRepository(User)
    const count = await user.count()

    if (count > 0) return

    const password_hash = await bcrypt.hash('12345678', 10)

    await user.save({
      username: 'yache',
      password: password_hash,
      email: 'juliyache@test.com',
    })
    console.log(`User created`)
  }

  async createPosts(dataSource: DataSource) {
    const post = dataSource.getRepository(Post)
    const count = await post.count()
    if (count > 0) return

    for (let i = 0; i < 50; i++) {
      const posts = post.create({
        title: faker.commerce.productName(),
        media_url: faker.image.cats(),
        tags: [faker.commerce.department()],
        user: {
          id: 1,
        },
      })
      await post.save(posts)
      console.log(`Post ${i} created`)
    }
  }

  async main() {
    const dataSource = await this.dbConnect()
    await this.createUser(dataSource)
    await this.createPosts(dataSource)
    process.exit()
  }
}

new Seeder()
