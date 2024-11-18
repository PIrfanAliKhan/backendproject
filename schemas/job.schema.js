const mongoose=require("mongoose")
const schema= mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    salary:{
        type: Number,
        require: true,
    },
    location:{
        type: String,
        require: true,
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        require: true,
    },
});

module.exports= mongoose.model("job", schema);