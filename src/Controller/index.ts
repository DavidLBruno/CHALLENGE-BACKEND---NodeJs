import express, { Router } from "express";
import { createCharacter, getPersonajes } from "../Services/characters";
import {
  createMovie,
  deleteMovie,
  editMovie,
  getMovies,
  getMoviesById,
} from "../Services/movie";
import { loginUser, registerUser } from "../Services/user";
import { verifyToken } from "../Services/verifyToken";

const router = Router();

/* User */
router.get("/login", loginUser);
router.post("/register", registerUser);
router.put("/login");
router.delete("/login");

/* Characters */
router.get("/characters", verifyToken, getPersonajes);
router.get("/character/:id", verifyToken);
router.post("/character", verifyToken);
router.put("/character", verifyToken);
router.delete("/character", verifyToken);

/* Movie */
router.get("/movies", verifyToken, getMovies);
router.get("/movie/:id", verifyToken, getMoviesById);
router.post("/movie", verifyToken, createMovie);
router.put("/movie", verifyToken, editMovie);
router.delete("/movie", verifyToken, deleteMovie);

/* Genre */
router.get("/genres", verifyToken);
router.get("/genre/:id", verifyToken);
router.post("/genre", verifyToken);
router.put("/genre", verifyToken);
router.delete("/genre", verifyToken);

export default router;
