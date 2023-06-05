import {DataTypes} from 'sequelize'
import sequelize from '../db/db.js'

const Flashcard = sequelize.define('Flashcards', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false
  }
})


export default Flashcard
