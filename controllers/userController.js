import User from "../models/users.js"
import sha512 from 'crypto-js/sha512.js'
import jwt from "jsonwebtoken"

// const showUser = (req, res) => {
//   const id = req.params.id

//   User.findByPk(id)
//   .then(data => {
//     if (data) {
//       res.send(data)
//     } else {
//       res.status(404).send({
//         message: `Cannot find User ${id}`
//       })
//     }
//   })
//   .catch(err => {
//     res.status(500).send({
//       message: `Error retrieving User ${id}`
//     })
//   })
// }

const createUser = (req, res) => {
  const {body} = req

  const user = {
    username: body.username,
    email: body.email,
    password: sha512(body.password).toString()
  }

  User.create(user)
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
}

// const updateUser = (req, res) => {
//   const id = req.params.id
//   const {body} = req
//   body.password = sha512(body.password).toString()
//   body.newPassword = sha512(body.newPassword).toString()

//   const newUserInfos = {
//     username: body.username,
//     password: body.newPassword
//   }

//   User.findByPk(id)
//   .then(data => {
//     if (data) {
//       if (body.password == data.password) {
//         User.update(newUserInfos, {where: {id: id}})
//         .then(num => {
//           if (num == 1) {
//             res.send({
//               message: `User ${id} Updated Successfully`
//             })
//           } else {
//             console.log(sha512(body.password).toString())
//             res.send({
//               message: `Error while trying to update User ${id}`
//             })
//           }
//         })
//         .catch(err => {
//           res.status(500).send({
//             message: `Could not update User ${id}`
//           })
//         })
//       } else {
//         res.status(401).send({message: "Wrong password"})
//       }
//     } else {
//       res.status(404).send({
//         message: `Cannot find User ${id}`
//       })
//     }
//   })
//   .catch(err => {
//     res.status(500).send({
//       message: `Error retrieving User ${id}`
//     })
//   })
// }

const deleteUser = (req, res) => {
  const id = req.params.id

  User.destroy({where: {id: id}})
  .then(num => {
    if (num == 1) {
      res.send({
        message: `User ${id} was successfully destroyed`
      })
    } else {
      res.send({
        message: `Error while trying to destroy User ${id}`
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Could not destroy User ${id}`
    })
  })
}

const login = async (username, password, done) => {
  console.log("I'm in login")
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const passwordMatch = (sha512(user.password).toString() == sha512(password).toString())
    if (!passwordMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}

export default {login, createUser, deleteUser}

// export default {showUser, createUser, updateUser, deleteUser}
