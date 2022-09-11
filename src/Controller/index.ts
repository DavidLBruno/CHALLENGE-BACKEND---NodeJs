import express, { Router } from "express";
import {
  createCharacter,
  deleteCharacter,
  editCharacter,
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
router.post("/auth/login", loginUser);
router.post("/auth/register", registerUser);
router.put("/login", verifyToken, editUser);
router.delete("/login", verifyToken, deleteUser);

/* Characters */
router.get("/characters", verifyToken, getCharacters);
router.post("/character", verifyToken, createCharacter);
router.put("/character", verifyToken, editCharacter);
router.delete("/character", verifyToken, deleteCharacter);

/* Movie */
router.get("/movies", verifyToken, getMovies);
router.post("/movie", verifyToken, createMovie);
router.put("/movie", verifyToken, editMovie);
router.delete("/movie", verifyToken, deleteMovie);

/* Genre */
router.get("/genres", verifyToken, getGenres);
router.post("/genre", verifyToken, createGenre);
router.put("/genre", verifyToken, editGenre);
router.delete("/genre", verifyToken, deleteGenre);

export default router;
