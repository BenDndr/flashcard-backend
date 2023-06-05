import Flashcard from "../models/flashcards.js"

const indexFlashcard = (req, res) => {
  const id = req.params.id

  Flashcard.findAll({where: {PileId: id}})
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
}

const showFlashcard = (req, res) => {
  const id = req.params.id

  Flashcard.findByPk(id)
  .then(data => {
    if (data) {
      res.send(data)
    } else {
      res.status(404).send({
        message: `Cannot find Flashcard ${id}`
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error retrieving Flashcard ${id}: ${err}`
    })
  })
}

const createFlashcard = (req, res) => {
  const {body} = req

  const flashcard = {
    question: body.question,
    answer: body.answer,
    PileId: body.PileId
  }

  Flashcard.create(flashcard)
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
}

const updateFlashcard = (req, res) => {
  const id = req.params.id
  const {body} = req

  Flashcard.update(body, {where: {id: id}})
  .then(num => {
    if (num == 1) {
      res.send({
        message: `Flashcard ${id} Updated Successfully`
      })
    } else {
      res.send({
        message: `Error while trying to update Flashcard ${id}`
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Could not update Flashcard ${id}`
    })
  })
}

const deleteFlashcard = (req, res) => {
  const id = req.params.id

  Flashcard.destroy({where: {id: id}})
  .then(num => {
    if (num == 1) {
      res.send({
        message: `Flashcard ${id} was successfully destroyed`
      })
    } else {
      res.send({
        message: `Error while trying to destroy Flashcard ${id}`
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Could not destroy Flashcard ${id}`
    })
  })
}

export default {indexFlashcard, showFlashcard, createFlashcard, updateFlashcard, deleteFlashcard}
