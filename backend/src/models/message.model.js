import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        text:{
            type:String,
        },
        audio:{
            type:String,
        }
    }
);

const Message = mongoose.model("Message",messageSchema);

export default Message;






