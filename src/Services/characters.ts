import express, { Response, Request } from "express";
import jwt from "jsonwebtoken";
import characters from "../../data/Characters.json";
require("dotenv").config();
const { Op } = require("sequelize");
const { Character, Movie } = require("../db");

const { CLAVE_TOKEN } = process.env;

interface Parameters {
  attributes: Array<String>;
  include?: Object;
  where: {
    name?: string;
    age?: number;
    idMovie?: number;
  };
}

const getCharacters = async (req: any, res: Response) => {
  try {
    jwt.verify(req.token, CLAVE_TOKEN || "tokenTest");

    const { name, age, idMovie } = req.query;

    let parameters: Parameters = {
      attributes: ["id", "name", "image"],
      where: {},
    };

    if (name) {
      parameters.attributes = [
        "id",
        "name",
        "image",
        "weight",
        "age",
        "history",
      ];

      parameters.where.name = name;
    } else if (age) {
      parameters.attributes = [
        "id",
        "name",
        "image",
        "weight",
        "age",
        "history",
      ];
      parameters.where.age = age;
    } else if (idMovie) {
      parameters.attributes = [
        "id",
        "name",
        "image",
        "weight",
        "age",
        "history",
      ];
      parameters.where.idMovie = idMovie;
    }

    (() => {
      characters.forEach(async (element) => {
        await Character.findOrCreate({
          where: {
            image: element.image,
            name: element.name,
            age: element.age,
            weight: element.weight,
            history: element.history,
          },
        });
      });
    })();

    let allCharacters = await Character.findAll(parameters);

    return res.status(200).json({
      mensaje: "All characters",
      characters: allCharacters,
    });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error to get Characters" });
  }
};

const createCharacter = async (req: Request, res: Response) => {
  try {
    const { image, name, age, history } = req.body;
    if (!image || !name || !age || !history) {
      res.status(400).json({
        mensaje: "Debe colocar Image, Name, Age e History",
      });
    }
    let characterExist = await Character.findOne({
      where: {
        name,
      },
    });
    if (characterExist)
      return res.status(400).json({
        mensaje: "El personaje ya existe",
      });

    let createNewCharacter = await Character.create({
      image,
      name,
      age,
      history,
    });

    return res.status(200).json({
      mensaje: "Personaje creado correctamente",
      character: createNewCharacter,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to create Character" });
  }
};

const editCharacter = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to edit Character" });
  }
};

const deleteCharacter = async (req: any, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to delete Character" });
  }
};

export { getCharacters, createCharacter, editCharacter, deleteCharacter };
