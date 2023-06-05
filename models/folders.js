import {DataTypes} from 'sequelize'
import sequelize from '../db/db.js'
import Pile from './piles.js'

const Folder = sequelize.define('Folders', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

Folder.hasMany(Pile, { onDelete: 'CASCADE' })
Pile.belongsTo(Folder)

export default Folder
