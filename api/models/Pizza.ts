import { Model } from 'objection'

export default class Pizza extends Model {
  id!: number
  name!: string

  static tableName = 'pizzas'
}