import {DataTypes} from 'sequelize'
import sequelize from '../db/db.js'
import Flashcard from './flashcards.js'

const Pile = sequelize.define('Piles', {
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

Pile.hasMany(Flashcard, { onDelete: 'CASCADE' })
Flashcard.belongsTo(Pile)

export default Pile
