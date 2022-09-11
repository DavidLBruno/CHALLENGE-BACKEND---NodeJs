import express, { Response, Request } from "express";
const { Op } = require("sequelize");
const { Character, Movie, Genre } = require("../db");
require("dotenv").config();
const { CLAVE_TOKEN } = process.env;
import movies from "../../data/Movies.json";

interface Parameters {
  attributes: Array<String>;
  include?: Array<Object>;
  where: {
    title?: string;
    genre?: number;
  };
  order?: [Array<String>];
}

const getMovies = async (req: any, res: Response) => {
  try {
    const { title, genre, order } = req.query;

    let parameters: Parameters = {
      attributes: ["id", "title", "date", "image"],
      where: {},
    };

    if (title) {
      parameters.include = [
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
      ];
      parameters.where.title = title;
    } else if (genre) {
      parameters.include = [
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
      ];
      parameters.where.genre = genre;
    } else if (order) {
      parameters.order = [["title", order]];
    }

    const allMovies = await Movie.findAll(parameters);

    res.status(200).json({
      mensaje: "Todas las peliulas!",
      Peliculas: allMovies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to get Movies!" });
  }
};

const createMovie = async (req: any, res: Response) => {
  try {
    const { image, title, date, Characters, Genres } = req.body;

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

    Characters.forEach(async (element: string) => {
      const movieCharacter = await Character.findOne({
        where: {
          name: element,
        },
      });
      newMovie.addCharacters(movieCharacter);
    });

    Genres.forEach(async (element: string) => {
      const movieGenre = await Genre.findOne({
        where: {
          name: element,
        },
      });
      newMovie.addGenres(movieGenre);
    });

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

export { getMovies, createMovie, editMovie, deleteMovie };
