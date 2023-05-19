import ApiKeys from "../models/apiKeys.js";
import jwt from "jsonwebtoken";

export const generateApiKey = async (req, res) => {
    const {name, email, sub} = req.body;
    const date = new Date().toISOString();

    try {
        const existingUser = await ApiKeys.findOne({email})

        if(existingUser) return res.status(404).json({message: "User already exist"});

        const token = jwt.sign({ name: name, email: email, sub: sub, createdAt: date}, process.env.CREATE_API_KEY, { expiresIn: 0 });
        await ApiKeys.create({name: name, email: email, sub: sub, apiKey: token, createdAt: date});
        return res.status(200).json(token)
    } catch (error) {
        res.status(400).json({ message: "Somethins worng" })
    }
}

export const getApiKey = async(req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    try {
        let decodedData;
        if (token) {
            decodedData = jwt.decode(token);
            console.log(decodedData)
            const apiKeys = await ApiKeys.find( {email: { $eq: decodedData.email }});
            return res.status(200).json(apiKeys[0].apiKey);
        } else {
            return res.status(404).json({message: "No token no key!"})
        }
        
    } catch (error) {
        res.status(400).json({ message: "Somethins worng" })
    }
}