import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
    prompt:{
        type: String,
        required:[true, "Please provide a prompt"],
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    tag:{
        type: String,
        required: [true, "Please provide a tag"],
    }
})

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;