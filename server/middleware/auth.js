import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    const token = authorization?.split(" ")[1];

    try {
        let decodedData;

        if (token) {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub
            next()
        } else {
            res.json({ message: "Incorrect token!" })
        }

    } catch (error) {
        console.log(error)
    }
}

export const isAdmin = async (req, res, next) => {
    const { authorization } = req.headers

    //console.log("admin body" + req.body)

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    const token = authorization?.split(" ")[1];

    try {
        let decodedData;

        if (token) {
            decodedData = jwt.decode(token);
            //const isPasswordCorrect =  await bcrypt.compare(password, decodedData.password)
            if (decodedData.isAdmin === true) {
                req.admin = true;
                next()
            } else {
                res.json({ message: "You are not Admin" })
            }
        } else {
            res.json({ message: "Incorrect token!" })
        }

    } catch (error) {
        console.log(error)
    }
}

/*export const canAccess = async (req, res, next) => {

    return
}*/