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
const {createUser, deleteUser} = userController

router.post("/user/create", createUser)
router.delete("/user/:id", deleteUser)

router.get("/folders", indexFolders)
router.post("/folder/create",checkAuthenticated, createFolder)
router.put("/folder/:id",checkAuthenticated, updateFolder)
router.delete("/folder/:id",checkAuthenticated, deleteFolder)
router.get("/folder/:id",checkAuthenticated, showFolder)
router.get("/folders/my",checkAuthenticated, myFoldersIndex)

router.get("/folder/:id/piles",checkAuthenticated, indexPile)
router.get("/pile/:id",checkAuthenticated, showPile)
router.post("/pile/create",checkAuthenticated, createPile)
router.put("/pile/:id",checkAuthenticated, updatePile)
router.delete("/pile/:id",checkAuthenticated, deletePile)

router.get("/pile/:id/flashcards",checkAuthenticated, indexFlashcard)
router.get("/flashcard/:id",checkAuthenticated, showFlashcard)
router.post("/flashcard/create",checkAuthenticated, createFlashcard)
router.put("/flashcard/:id",checkAuthenticated, updateFlashcard)
router.delete("/flashcard/:id",checkAuthenticated, deleteFlashcard)

export default router
