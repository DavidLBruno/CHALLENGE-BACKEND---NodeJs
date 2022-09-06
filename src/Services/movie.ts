import express, { Response, Request } from "express";
const { Character, Movie } = require("../db");
require("dotenv").config();
const { CLAVE_TOKEN } = process.env;
import movies from "../../data/Movies.json";

const getMovies = async (req: any, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to get Movies" });
  }
};
const getMoviesById = async (req: any, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to get Movie" });
  }
};
const createMovie = async (req: any, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to create Movie" });
  }
};
const editMovie = async (req: any, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to edit Movie" });
  }
};
const deleteMovie = async (req: any, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to delete Movie" });
  }
};

export { getMovies, getMoviesById, createMovie, editMovie, deleteMovie };
