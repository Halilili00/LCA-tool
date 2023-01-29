import Machining from "../models/machining.js"
import Counter from "../models/counter.js"

export const getAllMachiningPosts = async (req, res) => {
    try {
        const posts = await Machining.find();
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getMachiningPosts = async (req, res) => {
    const { userID } = req.params;

    try {
        const posts = await Machining.find({ creatorID: { $eq: userID } });
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createMachiningPost = async (req, res) => {
    const post = req.body;
    let newId = await Counter.findOneAndUpdate({ _id: '63d4113b32a19c8613a442a5' }, { $inc: { machConter: 1 } }, { new: true })
    const lcaID = lcaIDGenerator(newId)
    //console.log(lcaID)
    const newPost = new Machining({ ...post, creatorID: req.userId, createdAt: new Date().toISOString(), tempID: 'MAC-0001', lcaID: lcaID })

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { postID } = req.params;
    const post = req.body;

    try {
        await Machining.findByIdAndUpdate(postID, post);
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    const { postID } = req.params;

    try {
        await Machining.findByIdAndRemove(postID);
        res.status(200).json({ message: "Post is removed" })
    } catch (error) {
        res.status(404).json("failed")
    }
}

const lcaIDGenerator = (newId) => {
    let lcaID = ("MAC000000000000").split("");
    let replacement = newId.machConter.toString().length;
    lcaID.splice((lcaID.length-replacement),replacement, newId.machConter);
    return lcaID.join('');
}

/*export const updatePost = async(req, res) => {
    try {
        await Machining.updateMany({}, {$set: {euro5: {value: 0, coefficinet:0}, euro6: {value: 0, coefficinet:0}, euro7: {value: 0, coefficinet:0}, roro: {value: 0, coefficinet:0}}})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}*/