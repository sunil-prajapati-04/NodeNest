import mongoose from "mongoose";
import keepUser from "./auth.model.js";

const noteSchema  = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"keepUser",
        required:true
    },
    text:{
        type:String
    },
    image:{
        type:String
    }
},
{timestamps:true}
)

const Note = mongoose.model("Note",noteSchema);

export default Note;