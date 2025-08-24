// models/TripRequest.ts
import mongoose, { Schema, Document, models } from "mongoose";

export interface ITripRequest extends Document {
  tripId: mongoose.Types.ObjectId;
  passengerId: mongoose.Types.ObjectId;
  driverId: mongoose.Types.ObjectId;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date;
}

const TripRequestSchema = new Schema<ITripRequest>(
  {
    tripId: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
    passengerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    driverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

// Tekrar import edildiğinde hata vermemesi için:
export default models.TripRequest || mongoose.model<ITripRequest>("TripRequest", TripRequestSchema);
