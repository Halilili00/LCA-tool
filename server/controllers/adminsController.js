import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

import Admins from "../models/admins.js";

export const signup = async(req, res) => {
    const {email, password, name} = req.body

    try {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const result = await Admins.create({email, password: hashedPassword, name})   
        const token = jwt.sign( { email: result.email, id: result._id, name: result.name, isAdmin: result.isAdmin }, process.env.JWT_KEY, { expiresIn: "1h" } );     
        res.status(201).json({result, token})
    } catch (error) {
        res.status(400).json({message: "Somethins worng"})
    }
}

export const signin = async(req, res) => {
    const {email, password, name} = req.body

    try {
        const exitingUser = await Admins.findOne({email})
        if(!exitingUser){
            return res.status(404).json({message: "User doesn't exist"})
        }

        const isPasswordCorrect =  await bcrypt.compare(password, exitingUser.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid password"})
        }

        const token = jwt.sign( { email: exitingUser.email, sub: exitingUser._id, name: exitingUser.name, isAdmin: exitingUser.isAdmin, password: exitingUser.password }, process.env.JWT_KEY, { expiresIn: "1h" } );     
        res.status(200).json({result: exitingUser, token})
    } catch (error) {
        res.status(400).json({message: "Somethins worng"})
    }
}