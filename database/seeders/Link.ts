import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { LinkFactory } from '../factories'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await LinkFactory.createMany(8);
  }
}
