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
    const { userID } = req.params;

    try {
        const machining = await Machining.find({ creatorID: { $eq: userID } }).sort({ createdAt: -1 });
        const pipemanufacturing = await PipeManufacturing.find({ creatorID: { $eq: userID } }).sort({ createdAt: -1 });

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

    let newId = await Counter.findOneAndUpdate({ _id: '63f109494cf3e28c7532a33d' }, { $inc: { machCounter: 1 } }, { new: true }) //for deploying
    //let newId = await Counter.findOneAndUpdate({ _id: '63d4113b32a19c8613a442a5' }, { $inc: { machCounter: 1 } }, { new: true })
    const lcaID = lcaIDGenerator(newId)
    //console.log(lcaID)
    let newPost = null;

    if (tempID === "MAC-0001") {
        newPost = new Machining({ ...post, creatorID: req.userId, createdAt: new Date().toISOString(), lcaID: lcaID })
    } else if (tempID === "PIP-0001") {
        newPost = new PipeManufacturing({ ...post, creatorID: req.userId, createdAt: new Date().toISOString(), lcaID: lcaID })
    }

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

    try {
        if (tempID === "MAC-0001") {
            await Machining.findByIdAndUpdate(postID, post);
        } else if (tempID === "PIP-0001") {
            await PipeManufacturing.findByIdAndUpdate(postID, post)
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    const { postID, tempID } = req.params;

    try {
        if (tempID === "MAC-0001") {
            await Machining.findByIdAndRemove(postID);
        } else if (tempID === "PIP-0001") {
            await PipeManufacturing.findByIdAndRemove(postID);
        }    
        res.status(200).json({ message: "Post is removed" })
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


/*export const updatePost = async(req, res) => {
    try {
        await Machining.updateMany({}, {$set: {euro5: {value: 0, coefficinet:0}, euro6: {value: 0, coefficinet:0}, euro7: {value: 0, coefficinet:0}, roro: {value: 0, coefficinet:0}}})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}*/