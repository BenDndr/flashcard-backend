import {DataTypes} from 'sequelize'
import sequelize from '../db/db.js'
import Folder from './folders.js'

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

User.hasMany(Folder, { onDelete: 'CASCADE' })
Folder.belongsTo(User)

export default User
