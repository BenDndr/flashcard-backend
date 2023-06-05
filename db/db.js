import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()
const {DB_NAME: name, DB_USER: user, DB_PASSWORD: password, DB_DIALECT: dialect} = process.env

const sequelize = new Sequelize(name, user, password, {
  dialect: dialect
})

export default sequelize
