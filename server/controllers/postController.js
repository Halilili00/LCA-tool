import Machining from "../models/machining.js"
import Counter from "../models/counter.js"
import PipeManufacturing from "../models/pipemanufacturing.js";

export const getAllMachiningPosts = async (req, res) => {
    try {
        const machining = await Machining.find().sort({ createdAt: -1 }); //newest to old
        const pipemanufacturing = await PipeManufacturing.find().sort({ createdAt: -1 });

        const combinedData = machining.concat(pipemanufacturing);
        const sortedData = combinedData.sort((a, b) => b.createdAt - a.createdAt);
        res.status(200).json(sortedData)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getMachiningPosts = async (req, res) => {
    //console.log(req.userId)

    try {
        const machining = await Machining.find({ creatorID: { $eq: req.userId } }).sort({ createdAt: -1 });
        const pipemanufacturing = await PipeManufacturing.find({ creatorID: { $eq: req.userId } }).sort({ createdAt: -1 });

        const combinedData = machining.concat(pipemanufacturing);
        const sortedData = combinedData.sort((a, b) => b.createdAt - a.createdAt);
        res.status(200).json(sortedData)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createMachiningPost = async (req, res) => {
    const post = req.body;
    const { tempID } = req.params;
    const model = getModel(tempID)

    if (!model) {
        return res.status(404).json({ message: "Invalid tempID" });
    }
    //let newId = await Counter.findOneAndUpdate({ _id: '63f109494cf3e28c7532a33d' }, { $inc: { machCounter: 1 } }, { new: true }) //for deploying
    let newId = await Counter.findOneAndUpdate({ _id: '63d4113b32a19c8613a442a5' }, { $inc: { machCounter: 1 } }, { new: true })
    const lcaID = lcaIDGenerator(newId)
    //console.log(lcaID)
    const newPost = new model({ ...post, creatorID: req.userId, createdAt: new Date().toISOString(), lcaID: lcaID });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { postID, tempID } = req.params;
    const post = req.body;
    const model = getModel(tempID)

    if (!model) {
        return res.status(404).json({ message: "Invalid tempID" });
    }

    try {
        const updatedPost = await model.findByIdAndUpdate(postID, post)
        if(updatedPost !== null){
            return res.status(200).json(post)
        } else {
            return res.status(204).json(updatedPost)
        }
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    const { postID, tempID } = req.params;
    const model = getModel(tempID)
    //console.log(req.admin)

    try {
        if (req.admin) {
            await model.findByIdAndRemove(postID);
        } else {
            const post = await model.findById(postID)
            if (post.creatorID === req.userId) {
                await model.findByIdAndRemove(postID);
                res.status(200).json({ message: "Post is removed" })
            } else {
                res.status(401).json("Not Allowed")
            }
        }
    } catch (error) {
        res.status(404).json("failed")
    }
}

const lcaIDGenerator = (newId) => {
    let lcaID = ("MAC000000000000").split("");
    let replacement = newId.machCounter.toString().length;
    lcaID.splice((lcaID.length - replacement), replacement, newId.machCounter);
    return lcaID.join('');
}

const getModel = (tempID) => {
    switch (tempID) {
        case "MAC-0001":
            return Machining;
        case "PIP-0001":
            return PipeManufacturing;
        default:
            return null;
    }
};



/*export const updatePost = async(req, res) => {
    try {
        await Machining.updateMany({}, {$set: {euro5: {value: 0, coefficinet:0}, euro6: {value: 0, coefficinet:0}, euro7: {value: 0, coefficinet:0}, roro: {value: 0, coefficinet:0}}})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}*/