import express, { Router } from "express";
import {
  createCharacter,
  deleteCharacter,
  editCharacter,
  getCharacterById,
  getCharacters,
} from "../Services/characters";
import {
  createGenre,
  deleteGenre,
  editGenre,
  getGenres,
} from "../Services/genre";
import {
  createMovie,
  deleteMovie,
  editMovie,
  getMovies,
  getMoviesById,
} from "../Services/movie";
import {
  deleteUser,
  editUser,
  loginUser,
  registerUser,
} from "../Services/user";
import { verifyToken } from "../Services/verifyToken";

const router = Router();

/* User */
router.get("/login", loginUser);
router.post("/register", registerUser);
router.put("/login", verifyToken, editUser);
router.delete("/login", verifyToken, deleteUser);

/* Characters */
router.get("/characters", verifyToken, getCharacters);
router.get("/character/:id", verifyToken, getCharacterById);
router.post("/character", verifyToken, createCharacter);
router.put("/character", verifyToken, editCharacter);
router.delete("/character", verifyToken, deleteCharacter);

/* Movie */
router.get("/movies", verifyToken, getMovies);
router.get("/movie/:id", verifyToken, getMoviesById);
router.post("/movie", verifyToken, createMovie);
router.put("/movie", verifyToken, editMovie);
router.delete("/movie", verifyToken, deleteMovie);

/* Genre */
router.get("/genres", verifyToken, getGenres);
router.get("/genre/:id", verifyToken, getMoviesById);
router.post("/genre", verifyToken, createGenre);
router.put("/genre", verifyToken, editGenre);
router.delete("/genre", verifyToken, deleteGenre);

export default router;
