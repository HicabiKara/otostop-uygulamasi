import mongoose from "mongoose"

const tripSchema = new mongoose.Schema({
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    date: { type: Date, required: true }, 
    seatsAvailable: { type: Number, required: true },
    price: { type: Number, required: true },
    notes: { type: String },    
},{ timestamps: true })

export default mongoose.models.Trip || mongoose.model("Trip", tripSchema)