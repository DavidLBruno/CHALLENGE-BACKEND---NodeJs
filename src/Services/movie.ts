import express, { Response, Request } from "express";
const { Character, Movie, Genre } = require("../db");
require("dotenv").config();
const { CLAVE_TOKEN } = process.env;
import movies from "../../data/Movies.json";

const getMovies = async (req: any, res: Response) => {
  try {
    const allMovies = await Movie.findAll({
      attributes: ["id", "title", "date", "image"],
      include: [
        {
          model: Character,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(200).json({
      mensaje: "Todas las peliulas!",
      Peliculas: allMovies,
    });
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
    const { image, title, date, Characters, Genre } = req.body;

    const movieExist = await Movie.findOne({
      where: {
        title,
      },
    });

    if (movieExist) {
      return res.status(400).json({
        mensaje: "La pelicula ya existe",
      });
    }

    const newMovie = await Movie.create({
      image,
      title,
      date,
    });

    const movieCharacter = await Character.findOne({
      where: {
        name: Characters[0],
      },
    });

    console.log(movieCharacter);

    newMovie.addCharacters(movieCharacter);

    res.status(200).json({
      mensaje: "Pelicula creada con exito!",
      Movie: newMovie,
    });
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
