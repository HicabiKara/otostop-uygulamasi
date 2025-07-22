import  { Schema, Document, models, model } from 'mongoose'

export interface IUser extends Document {
  name: string
  surname?: string
  email: string
  password: string
  birthDate: Date
  gender: "male" | "female"
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  surname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
})

const User = models.User || model<IUser>('User', userSchema)
export default User