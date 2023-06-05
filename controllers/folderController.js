import Folder from '../models/folders.js'

const indexFolders = (req, res) => {
  console.log("SESSION", req.session)
  Folder.findAll()
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
}

const myFoldersIndex = (req, res) => {
  console.log("SESSION", req.session)
  const userId = req.session.passport.user.id
  Folder.findAll({where:{UserId: userId}})
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
}

const showFolder = (req, res) => {
  const id = req.params.id

  Folder.findByPk(id)
  .then(data => {
    if (data) {
      res.send(data)
    } else {
      res.status(404).send({
        message: `Cannot find Folder ${id}`
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error retrieving Folder ${id}: ${err}`
    })
  })
}

const createFolder = (req, res) => {
  const {body} = req
  console.log("SESSION", req.session)

  if (!req.session.passport) {
    console.log("FAILD")
    res.status(401).send("You must be logged in to create folder")
    return
  }

  const folder = {
    name: body.name,
    UserId: req.session.passport.user.id
  }

  Folder.create(folder)
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    })
  })

}

const updateFolder = (req, res) => {
  const id = req.params.id
  const {body} = req

  Folder.update(body, {where: {id: id}})
  .then(num => {
    if (num == 1) {
      res.send({
        message: `Folder ${id} Updated Successfully`
      })
    } else {
      res.send({
        message: `Error while trying to update Folder ${id}`
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Could not update Folder ${id}: ${err}`
    })
  })
}

const deleteFolder = (req, res) => {
  const id = req.params.id

  Folder.destroy({where: {id: id}})
  .then(num => {
    if (num == 1) {
      res.send({
        message: `Folder ${id} was successfully destroyed`
      })
    } else {
      res.send({
        message: `Error while trying to destroy Folder ${id}`
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Could not destroy Folder ${id}: ${err}`
    })
  })
}

export default {indexFolders, showFolder, createFolder, updateFolder, deleteFolder, myFoldersIndex}
