import express from "express";
import flashCardsController from "../controllers/flashcardController.js"
import folderController from "../controllers/folderController.js"
import pileController from "../controllers/pileController.js"
import userController from "../controllers/userController.js"

const router = express.Router()

const checkAuthenticated = (req, res, next) => {
  console.log(req.session)
  console.log("checkAuthenticated")
  if (req.isAuthenticated()) {
    return next()
  } else {
    return res.status(401).json({message: "You need to login before accessing this content"})
  }
}

const {indexFolders, createFolder, updateFolder, deleteFolder, showFolder, myFoldersIndex} = folderController
const {indexPile, showPile, createPile, updatePile, deletePile} = pileController
const {indexFlashcard, showFlashcard, createFlashcard, updateFlashcard, deleteFlashcard} = flashCardsController
// const {showUser, createUser, updateUser, deleteUser} = userController
const {createUser, deleteUser} = userController

router.post("/user/create", createUser)
// router.get("/user/:id", showUser)
// router.put("/user/:id/update", updateUser)
router.delete("/user/:id", deleteUser)

router.get("/folders", indexFolders)
router.post("/folder/create",checkAuthenticated, createFolder)
router.put("/folder/:id",checkAuthenticated, updateFolder)
router.delete("/folder/:id",checkAuthenticated, deleteFolder)
router.get("/folder/:id", showFolder)
router.get("/folders/my",checkAuthenticated, myFoldersIndex)

router.get("/folder/:id/piles", indexPile)
router.get("/pile/:id", showPile)
router.post("/pile/create",checkAuthenticated, createPile)
router.put("/pile/:id",checkAuthenticated, updatePile)
router.delete("/pile/:id",checkAuthenticated, deletePile)

router.get("/pile/:id/flashcards", indexFlashcard)
router.get("/flashcard/:id", showFlashcard)
router.post("/flashcard/create",checkAuthenticated, createFlashcard)
router.put("/flashcard/:id",checkAuthenticated, updateFlashcard)
router.delete("/flashcard/:id",checkAuthenticated, deleteFlashcard)

// router.post("/login",
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//   })
// )

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });

export default router
