import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        let decodedData;

        if (token) {
            decodedData = jwt.decode(token);
            if(req.userId = decodedData?.sub){
                next()
            } else {
                res.json({message: "Authentication fail!"})
            }
        } else {
            res.json({message: "Incorrect token!"})
        }

    } catch (error) {
        console.log(error)
    }
}

export default auth;