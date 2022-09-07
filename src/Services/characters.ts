import express, { Response, Request } from "express";
const { Character, Movie } = require("../db");
require("dotenv").config();
import jwt from "jsonwebtoken";
import characters from "../../data/Characters.json";

const { CLAVE_TOKEN } = process.env;

const getCharacters = async (req: any, res: Response) => {
  try {
    jwt.verify(req.token, CLAVE_TOKEN || "tokenTest");

    (() => {
      characters.forEach(async (element) => {
        await Character.findOrCreate({
          where: {
            image: element.image,
            name: element.name,
            age: element.age,
            history: element.history,
          },
        });
      });
    })();

    let allCharacters = await Character.findAll({
      attributes: ["id", "name", "image"],
    });
    return res.status(200).json({
      mensaje: "All characters",
      characters: allCharacters,
    });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error to get Characters" });
  }
};

const getCharacterById = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    let characterById = await Character.findOne({
      where: {
        id,
      },
      attributes: ["id", "name", "image", "history"],
    });
    if (!characterById) {
      return res.status(400).json({
        mensaje: "El personaje no existe",
      });
    }
    res.status(200).json({
      mensaje: "Personaje encontrado correctamente",
      character: characterById,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to get Character" });
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

export {
  getCharacters,
  getCharacterById,
  createCharacter,
  editCharacter,
  deleteCharacter,
};
