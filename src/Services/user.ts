import express, { Response, Request } from "express";
import jwt from "jsonwebtoken";
const { User } = require("../db");
require("dotenv").config();

const { CLAVE_TOKEN } = process.env;

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, mail, password } = req.body;
    if (!name || !mail || !password) {
      return res
        .status(400)
        .json({ mensaje: "Nombre, mail o contraseña invalidos" });
    }
    let userExitent = await User.findOne({
      where: {
        mail: mail,
      },
    });

    if (userExitent) {
      return res.status(400).json("Mail already use");
    }

    await User.findOrCreate({
      where: {
        name: name,
        mail: mail,
        password: password,
      },
    });
    return res.status(200).json("User registed!");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to register User" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { mail, password } = req.body;
    if (!mail || !password) {
      return res
        .status(400)
        .json({ mensaje: "Debe colocar una contraseña o un mail valido" });
    }

    const user = await User.findOne({
      where: {
        mail: mail,
      },
    });
    if (!user || user.password !== password) {
      return res.status(500).json({ mensaje: "Mail o contraseña incorrecto" });
    }

    jwt.sign(
      { user: user },
      CLAVE_TOKEN || "tokenTest",
      (error: any, token: any) => {
        res.json({
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to login User" });
  }
};

const editUser = async (req: any, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to edit User" });
  }
};

const deleteUser = async (req: any, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: "Error to delete User" });
  }
};

export { registerUser, loginUser, editUser, deleteUser };
