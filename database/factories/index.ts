import Factory from '@ioc:Adonis/Lucid/Factory'
import Todo from '../../app/api/models/Todo'
import Link from '../../app/api/models/Link'


export const TodoFactory = Factory
  .define(Todo, ({ faker }) => {
    return {
      title: faker.lorem.words(5),
      completed: faker.datatype.boolean()
    }
  })
  .build()

export const LinkFactory = Factory
  .define(Link, ({ faker }) => {
    return {
      section_subtitle: faker.lorem.words(3),
      link: faker.lorem.sentence(),
      text: faker.lorem.words(2)
    }
  })
  .build()
