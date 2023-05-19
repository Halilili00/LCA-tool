import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Machining:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the machining
 *         lcaID:
 *           type: string
 *           description: The auto-generated lcaId of the machining
 *         creatorID:
 *           type: string
 *           description: The creator Google/Microsoft sub/id
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the machining data is created
 *         tempID:
 *           type: string
 *           description: The machining tempalte Id (MAC-0001)
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
 *      machiningExample:
 *         value:
 *          partName: part 123
 *          partID: XY31hs
 *          creator: fistName lastName
 *          description: "Example machining data"
 *          validDate:
 *              start: 2023-05-18T00:00:00.000Z
 *              end: 2025-05-29T00:00:00.000Z
 *          productionSite:
 *              factoryName: ""
 *              address: ""
 *          annualProduction:
 *              value: 1
 *          materialEF:
 *              value: 0
 *              description: ""
 *          steel:
 *              value: 0
 *          steelRemoved:
 *              value: 0
 *              coefficinet: 0
 *          partWeight:
 *              coefficinet: 0
 *          energyConsumption:
 *              value: 0
 *          machiningTime:
 *              value: 0
 *              coefficinet: 0
 *          machiningLiquidConsumption:
 *              value: 0
 *              coefficinet: 0
 *          hydraulicOilConsumption:
 *              value: 0
 *              coefficinet: 0
 *          packagingPlastic:
 *              value: 0
 *              coefficinet: 0
 *          oil:
 *              value: 0
 *              coefficinet: 0
 *          electrycity:
 *              coefficinet: 
 *                  value: 0
 *                  description: ""
 *              value: 0
 *          trackCof:
 *              value: 0
 *              description: ""
 *          shipCof:
 *              value: 0
 *              description: ""
 *          euro5:
 *              value: 0
 *              coefficinet: 0
 *          euro6:
 *              value: 0
 *              coefficinet: 0
 *          euro7:
 *              value: 0
 *              coefficinet: 0
 *          roro:
 *              value: 0
 *              coefficinet: 0
 */

const machiningSchema = mongoose.Schema({ 
    lcaID: String,
    creatorID: String,
    createdAt: Date,
    tempID: { type: String, default: "MAC-0001"},
    partName: String, 
    partID: String,
    creator: String,
    description: { type: String, default: ""},
    productionSite: {
        factoryName: { type: String, default: ""},
        address: { type: String, default: ""}
    },
    validDate: {
        start: Date,
        end: Date
    },
    annualProduction: { value: { type: Number, default: 1}, file: { data: String, name: String} },
    materialEF: {value: { type: Number, default: 0}, description: { type: String, default: ""}, file: { data: String, name: String}},
    steel: { value: { type: Number, default: 0}, file: { data: String, name: String} },
    steelRemoved: { value: { type: Number, default: 0}, coefficinet: { type: Number, default: 0}, file: { data: String, name: String} },
    partWeight: {coefficinet: { type: Number, default: 0}, file: { data: String, name: String}},
    energyConsumption: { value: { type: Number, default: 0}, file: { data: String, name: String} },
    machiningTime: { value: { type: Number, default: 0}, coefficinet: { type: Number, default: 0}, file: { data: String, name: String} },
    machiningLiquidConsumption: { value: { type: Number, default: 0}, coefficinet: { type: Number, default: 0}, file: { data: String, name: String} },
    hydraulicOilConsumption: { value: { type: Number, default: 0}, coefficinet: { type: Number, default: 0}, file: { data: String, name: String} },
    packagingPlastic: { value: { type: Number, default: 0}, coefficinet: { type: Number, default: 0}, file: { data: String, name: String} },
    oil: { value: { type: Number, default: 0}, coefficinet: { type: Number, default: 0}, file: { data: String, name: String} },
    electrycity: { value: { type: Number, default: 0}, coefficinet: {value: { type: Number, default: 0}, description: { type: String, default: ""}}, file: { data: String, name: String} },
    trackCof: {value: { type: Number, default: 0}, description: { type: String, default: ""}, file: { data: String, name: String}},
    shipCof: {value: { type: Number, default: 0}, description: { type: String, default: ""}, file: { data: String, name: String}},
    euro5: { value: { type: Number, default: 0}, coefficinet: { type: Number, default: 0}, file: { data: String, name: String} },
    euro6: { value: { type: Number, default: 0}, coefficinet: { type: Number, default: 0}, file: { data: String, name: String} },
    euro7: { value: { type: Number, default: 0}, coefficinet: { type: Number, default: 0}, file: { data: String, name: String} },
    roro: { value: { type: Number, default: 0}, coefficinet: { type: Number, default: 0}, file: { data: String, name: String} },
})

const Machining = mongoose.model("Machining", machiningSchema);

export default Machining;