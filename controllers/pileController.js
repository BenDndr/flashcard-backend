import Pile from "../models/piles.js"

const indexPile = (req, res) => {
  const id = req.params.id

  Pile.findAll({where: {FolderId: id}})
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
}

const showPile = (req, res) => {
  const id = req.params.id

  Pile.findByPk(id)
  .then(data => {
    if (data) {
      res.send(data)
    } else {
      res.status(404).send({
        message: `Cannot find Pile ${id}`
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error retrieving Pile ${id}: ${err}`
    })
  })
}

const createPile = (req, res) => {
  const {body} = req

  const pile = {
    name: body.name,
    FolderId: body.folderId
  }

  Pile.create(pile)
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
}

const updatePile = (req, res) => {
  const id = req.params.id
  const {body} = req

  Pile.update(body, {where: {id: id}})
  .then(num => {
    if (num == 1) {
      res.send({
        message: `Pile ${id} Updated Successfully`
      })
    } else {
      res.send({
        message: `Error while trying to update Pile ${id}`
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Could not update Pile ${id}: ${err}`
    })
  })
}

const deletePile = (req, res) => {
  const id = req.params.id

  Pile.destroy({where: {id: id}})
  .then(num => {
    if (num == 1) {
      res.send({
        message: `Pile ${id} was successfully destroyed`
      })
    } else {
      res.send({
        message: `Error while trying to destroy Pile ${id}`
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Could not destroy Pile ${id}: ${err}`
    })
  })
}

export default {indexPile, showPile, createPile, updatePile, deletePile}
