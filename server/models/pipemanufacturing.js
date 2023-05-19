import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     PipeManufacturing:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the pipemanufacturing
 *         lcaID:
 *           type: string
 *           description: The auto-generated lcaId of the pipemanufacturing
 *         creatorID:
 *           type: string
 *           description: The creator Google/Microsoft sub/id
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the pipemanufacturing data is created
 *         tempID:
 *           type: string
 *           description: The pipemanufacturing template Id (PIP-0001)
 *         partName:
 *           type: string
 *           description: 
 *         partID:
 *           type: string
 *           description: 
 *         creator:
 *           type: string
 *           description: The creator firstname and lastname
 *         description:
 *           type: string
 *           description: Some additional description
 */

/**
 * @swagger
 * components:
 *  examples:
 *      pipemanufacturingExample:
 *         value:
 *          partName: part 123
 *          partID: XY31hs
 *          creator: fistName lastName
 *          description: "Example PipeManufacturing data"
 *          validDate:
 *              start: 2023-05-18T00:00:00.000Z
 *              end: 2025-05-29T00:00:00.000Z
 *          productionSite:
 *              factoryName: ""
 *              address: ""
 *          weight:
 *              file: ""
 *              value: 1
 *          materialEF:
 *              value: 1.61835
 *              value2: 0.0242
 *              description: ""
 *          electricityEF:
 *              value: 0
 *              description: ""
 *          lorry:
 *              coefficinet: 
 *                  value: 0
 *                  description: ""
 *              file: ""
 *              value: 0
 *          sea:
 *              coefficinet:
 *                  value: 0
 *                  description: ""
 *              file: ""
 *              value: 0
 *          processElectricityEF:
 *              file: ""
 *              value: 0
 *              description: ""
 *          cutting:
 *              time: 0
 *              electricity: 0
 *          bending:
 *              time: 0
 *              electricity: 0
 *          welding:
 *              time: 0
 *              electricity: 0
 *          pressureTest:
 *              time: 0
 *              electricity: 0
 *          drilling:
 *              time: 0
 *              electricity: 0
 */

const pipemanufacturingSchema = mongoose.Schema({ 
    lcaID: String,
    creatorID: String,
    createdAt: Date,
    tempID: { type: String, default: "PIP-0001"},
    partName: String, 
    partID: String,
    creator: String,
    description: String,
    productionSite: {
        factoryName: { type: String, default: ""},
        address: { type: String, default: ""}
    },
    validDate: {
        start: Date,
        end: Date
    },
    weight: {value: { type: Number, default: 0},file: { data: String, name: String}},
    materialEF: {value: { type: Number, default: 0}, value2: { type: Number, default: 0}, description: { type: String, default: ""}}, 
    electricityEF: {value: { type: Number, default: 0}, description: { type: String, default: ""}},
    lorry: {value: { type: Number, default: 0}, coefficinet: {value: { type: Number, default: 0}, description: { type: String, default: ""}}, file: { data: String, name: String}},
    sea: {value: { type: Number, default: 0}, coefficinet: {value: { type: Number, default: 0}, description: { type: String, default: ""}}, file: { data: String, name: String}},
    processElectricityEF: {value: { type: Number, default: 0}, description: { type: String, default: ""}, file: { data: String, name: String}},
    cutting: {time:{ type: Number, default: 0}, electricity: { type: Number, default: 0}},
    bending: {time:{ type: Number, default: 0}, electricity: { type: Number, default: 0}},
    welding: {time:{ type: Number, default: 0}, electricity: { type: Number, default: 0}},
    pressureTest: {time:{ type: Number, default: 0}, electricity: { type: Number, default: 0}},
    drilling: {time:{ type: Number, default: 0}, electricity: { type: Number, default: 0}},
})

const PipeManufacturing = mongoose.model("PipeManufacturing", pipemanufacturingSchema);

export default PipeManufacturing;