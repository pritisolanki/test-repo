import db from '../db'

export class User extends db.Model<User> {
  get tableName() { return 'user' }
}
