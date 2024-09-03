import { Schema } from "mongoose"
import { UserName } from "./user.interface"


const userNameSchema = new Schema<UserName>({
    firstName : {
        type: String, 
        trim: true, 
        required: [true, "First name is required"],
        maxlength: [15, "First name maximum"]
    }
})